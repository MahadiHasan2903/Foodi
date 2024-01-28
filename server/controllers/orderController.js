const Order = require("../models/order");
const FoodItem = require("../models/foodItem");
const User = require("../models/user");
const { getMonthName } = require("../utils/getMonthName");
const mongoose = require("mongoose");

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

//Get all orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "name email phoneNumber",
    });

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

//Get all orders for chart
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

    const months = [];
    const values = [];

    last12Months.reverse().forEach((item) => {
      const monthName = getMonthName(item.month + 1);
      months.push(`${monthName} ${item.year}`);

      const match = ordersData.find(
        (data) =>
          data._id.year === item.year && data._id.month === item.month + 1
      );
      values.push(match ? match.count : 0);
    });

    res.status(200).json({
      success: true,
      message: "Orders data for chart fetched successfully",
      data: { months, values },
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

//Get food items from a order
const getFoodItemsInOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    const foodItemsInOrder = await Promise.all(
      order.cart.map(async (cartItem) => {
        const foodItem = await FoodItem.findById(cartItem.item);
        return {
          foodItem,
          quantity: cartItem.quantity,
        };
      })
    );

    res.status(200).json({
      status: "success",
      message: "Get food items in order successfully",
      data: foodItemsInOrder,
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

//get a  single  user orders
const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.params.id;

    const userOrders = await Order.find({ user: userId })
      .select("shippingAddress totalPrice status cart")
      .populate("cart.item", "name");

    // Transform the userOrders array to include only the necessary fields
    const simplifiedOrders = userOrders.map((order) => ({
      shippingAddress: order.shippingAddress,
      totalPrice: order.totalPrice,
      status: order.status,
      items: order.cart.length,
    }));

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders: simplifiedOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
