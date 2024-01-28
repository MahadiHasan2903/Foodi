const FoodItem = require("../models/foodItem");
const { getMonthName } = require("../utils/getMonthName");
const cloudinary = require("cloudinary").v2;

// Create a new food item
const createFoodItemController = async (req, res) => {
  try {
    const myCloud = await cloudinary.uploader.upload(req.body.image, {
      folder: "foodi-user-avatar",
    });

    req.body.image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };

    const newFoodItem = await FoodItem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Food Item created successfully",
      newFoodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating food item",
      error: error.message,
    });
  }
};

// Update a food item by ID
const updateFoodItemController = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    console.log(foodItem);
    if (!foodItem) {
      return res.status(404).json({
        status: "fail",
        message: "Food Item not found",
      });
    } else {
      if (req.body.image) {
        const existingFoodItem = await FoodItem.findById(req.params.id);
        await cloudinary.uploader.destroy(existingFoodItem.image.public_id);

        const myCloud = await cloudinary.uploader.upload(req.body.image, {
          folder: "foodi-user-avatar",
        });

        req.body.image = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      const updatedFoodItem = await FoodItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Food Item updated successfully",
        updatedFoodItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating food item",
      error: error.message,
    });
  }
};

// Delete a food item by ID
const deleteFoodItemController = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    console.log(foodItem);
    if (!foodItem) {
      return res.status(404).json({
        status: "fail",
        message: "Food Item not found",
      });
    } else {
      const foodItemToDelete = await FoodItem.findById(req.params.id);

      await cloudinary.uploader.destroy(foodItemToDelete.image.public_id);
      await FoodItem.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Food item deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting food item",
      error: error.message,
    });
  }
};

// Get a single food item by ID
const getSingleFoodItemController = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    console.log(foodItem);
    if (!foodItem) {
      return res.status(404).json({
        status: "fail",
        message: "Food Item not found",
      });
    } else {
      const foodItem = await FoodItem.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Food item fetched successfully",
        data: foodItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching food item",
      error: error.message,
    });
  }
};

// Get all food items
const getAllFoodItemsController = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching food items",
      error: error.message,
    });
  }
};

// Get data for chart
const getFoodItemsDataForChartController = async (req, res) => {
  try {
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear() - (month < 0 ? 1 : 0);
      return { month: (month + 12) % 12, year };
    });

    const foodItemsData = await FoodItem.aggregate([
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

    const months = [];
    const values = [];

    last12Months.reverse().forEach((item) => {
      const monthName = getMonthName(item.month + 1);
      months.push(`${monthName} ${item.year}`);

      const match = foodItemsData.find(
        (data) =>
          data._id.year === item.year && data._id.month === item.month + 1
      );
      values.push(match ? match.count : 0);
    });

    res.status(200).json({
      success: true,
      message: "Food items data for chart fetched successfully",
      data: { months, values },
    });
  } catch (error) {
    console.error("Error fetching food items data for chart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch food items data for chart",
      error: error.message,
    });
  }
};

module.exports = {
  createFoodItemController,
  updateFoodItemController,
  deleteFoodItemController,
  getSingleFoodItemController,
  getAllFoodItemsController,
  getFoodItemsDataForChartController,
};
