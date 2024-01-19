const express = require("express");
const {
  createFoodItemController,
  updateFoodItemController,
  deleteFoodItemController,
  getSingleFoodItemController,
  getAllFoodItemsController,
  getFoodItemsDataForChartController,
} = require("../controllers/foodItemController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const foodItemRouter = express.Router();

// Create a new food item
foodItemRouter.post(
  "/create-foodItem",
  isAuthenticated,
  authorizeRoles("admin"),
  createFoodItemController
);

// Update a food item by ID
foodItemRouter.put(
  "/update-foodItem/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateFoodItemController
);

// Delete a food item by ID
foodItemRouter.delete(
  "/delete-foodItem/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteFoodItemController
);

// Get a single food item by ID
foodItemRouter.get("/foodItem/:id", getSingleFoodItemController);

// Get all food items
foodItemRouter.get("/foodItems", getAllFoodItemsController);

// Get all food items info for chart
foodItemRouter.get(
  "/foodItems-chart",
  isAuthenticated,
  authorizeRoles("admin"),
  getFoodItemsDataForChartController
);

module.exports = foodItemRouter;
