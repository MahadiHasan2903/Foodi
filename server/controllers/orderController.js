const Order = require("../models/order");
const FoodItem = require("../models/foodItem");
const User = require("../models/user");
const { getMonthName } = require("../utils/getMonthName");

const createOrderController = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateOrderController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(order);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    } else {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        status: "success",
        message: "Order updated successfully",
        data: updatedOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteOrderController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    } else {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Order deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getSingleOrderController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get order successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      message: "Get orders successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getOrdersDataForChartController = async (req, res) => {
  try {
    const currentDate = new Date();
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear() - (month < 0 ? 1 : 0);
      return { month: (month + 12) % 12, year };
    });

    const ordersData = await Order.aggregate([
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
          const match = ordersData.find(
            (data) =>
              data._id.year === item.year && data._id.month === item.month + 1
          );
          return match ? match.count : 0;
        }),
      },
    ];

    res.status(200).json({
      success: true,
      message: "Orders data for chart fetched successfully",
      data: { xAxis, series },
    });
  } catch (error) {
    console.error("Error fetching orders data for chart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders data for chart",
      error: error.message,
    });
  }
};

const getFoodItemsInOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    // Extract food item IDs and quantities from the order's cart
    const foodItemsInCart = order.cart.map((cartItem) => ({
      itemId: cartItem.item,
      quantity: cartItem.quantity,
    }));

    // Retrieve the food items with details
    const foodItemsDetails = await Promise.all(
      foodItemsInCart.map(async (cartItem) => {
        const foodItem = await FoodItem.findById(cartItem.itemId);
        return {
          itemDetails: foodItem,
          quantity: cartItem.quantity,
        };
      })
    );

    res.status(200).json({
      status: "success",
      message: "Get food items in order successfully",
      data: foodItemsDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId).populate("orders");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Extract order details from the user's orders
    const userOrders = user.orders.map((order) => ({
      orderId: order._id,
      totalPrice: order.totalPrice,
      status: order.status,
      shippingAddress: order.shippingAddress,
    }));

    res.status(200).json({
      status: "success",
      message: "Get user orders successfully",
      data: userOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getSingleOrderController,
  getAllOrdersController,
  getOrdersDataForChartController,
  getFoodItemsInOrderController,
  getUserOrdersController,
};
