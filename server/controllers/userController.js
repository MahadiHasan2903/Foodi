const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const createActivationToken = require("../utils/createActivationCode");
const sendActivationEmail = require("../utils/sendActivationEmail");
const { getMonthName } = require("../utils/getMonthName");

// Registration Controller
const registrationController = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, avatar } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "foodi-user-avatar",
    });
    const registeredUser = new User({
      name,
      email,
      password,
      role,
      phoneNumber,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const activationToken = createActivationToken(registeredUser);

    await sendActivationEmail(registeredUser, activationToken);

    res.status(201).json({
      success: true,
      message: `Please check your email: ${registeredUser.email} to activate your account`,
      activationToken: activationToken.token,
      registeredUser,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// Activate User Controller
const activateUserController = async (req, res, next) => {
  try {
    const { activation_token, activation_code, registeredUser } = req.body;
    // console.log(
    //   "Activation Token",
    //   activation_token,
    //   "Activation Code",
    //   activation_code,
    //   "Registered User:",
    //   registeredUser
    // );
    const { user, activationCode } = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET_KEY
    );
    if (activationCode !== activation_code) {
      return res.status(400).json({
        success: false,
        message: "Invalid Activation Code",
      });
    }

    const hashedPassword = await bcrypt.hash(registeredUser.password, 10);

    // Check if the email already exists in the database
    const existingEmail = registeredUser.email;
    const existingUser = await User.findOne({ email: existingEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    // Save the user information with the hashed password
    const newUser = new User({
      name: registeredUser.name,
      email: existingEmail,
      password: hashedPassword,
      role: registeredUser.role,
      phoneNumber: registeredUser.phoneNumber,
      avatar: registeredUser.avatar,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during activation:", error);
    res.status(400).json({
      success: false,
      message: "Invalid Activation Token",
      error: error.message,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    const userToSend = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatar: user.avatar,
      orders: user.orders,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userToSend,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

//Get Single User
const getSingleUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the user",
    });
  }
};

//Delete User
const deleteUserController = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the user to get the avatar information
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Destroy the avatar in Cloudinary before deleting the user
    await cloudinary.uploader.destroy(userToDelete.avatar.public_id);

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// Update User
const updateUserController = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    // Fetch the existing user
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if a new avatar is provided
    if (updates.avatar) {
      // Destroy the previous avatar in Cloudinary
      await cloudinary.uploader.destroy(existingUser.avatar.public_id);

      // Upload the new avatar to Cloudinary
      const newAvatar = await cloudinary.uploader.upload(updates.avatar, {
        folder: "foodi-user-avatar",
      });

      // Update the user's avatar information
      updates.avatar = {
        public_id: newAvatar.public_id,
        url: newAvatar.secure_url,
      };
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

const getUserDataForChartController = async (req, res) => {
  try {
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear() - (month < 0 ? 1 : 0);
      return { month: (month + 12) % 12, year };
    });

    const userData = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(last12Months[11].year, last12Months[11].month, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const xAxis = last12Months.map((item) => ({
      data: [`${getMonthName(item.month + 1)} ${item.year}`],
    }));

    const series = [
      {
        data: last12Months.map((item) => {
          const match = userData.find(
            (data) =>
              data._id.year === item.year && data._id.month === item.month + 1
          );
          return match ? match.count : 0;
        }),
      },
    ];

    res.status(200).json({
      success: true,
      message: "User data for chart fetched successfully",
      data: { xAxis, series },
    });
  } catch (error) {
    console.error("Error fetching user data for chart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user data for chart",
      error: error.message,
    });
  }
};

// ... (rest of the code remains unchanged)

module.exports = {
  registrationController,
  loginController,
  getAllUsersController,
  getSingleUserController,
  deleteUserController,
  updateUserController,
  activateUserController,
  getUserDataForChartController,
};
