const express = require("express");
const {
  createOrderController,
  updateOrderController,
  deleteOrderController,
  getSingleOrderController,
  getAllOrdersController,
  getOrdersDataForChartController,
} = require("../controllers/OrderController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const orderRouter = express.Router();

// Create a new order
orderRouter.post("/create-order", isAuthenticated, createOrderController);

// Update a order by ID
orderRouter.put(
  "/update-order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateOrderController
);

// Delete a order by ID
orderRouter.delete(
  "/delete-order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOrderController
);

// Get a single order by ID
orderRouter.get("/order/:id", getSingleOrderController);

// Get all orders
orderRouter.get(
  "/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersController
);

// Get all orders info for chart
orderRouter.get(
  "/orders-chart",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersDataForChartController
);

module.exports = orderRouter;
