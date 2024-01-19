const Order = require("../models/order");
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
    const last12Months = new Date(currentDate);
    last12Months.setMonth(currentDate.getMonth() - 11);

    const ordersData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last12Months },
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

    const xAxis = ordersData.map((item) => ({
      data: [`${getMonthName(item._id.month)} ${item._id.year}`],
    }));

    const series = [
      {
        data: ordersData.map((item) => item.count),
      },
    ];

    res.status(200).json({
      success: true,
      message: "Orders data for chart fetched successfully",
      data: { xAxis, series },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching orders data for chart",
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
};
