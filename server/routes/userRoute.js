const express = require("express");
const {
  registrationController,
  activateUserController,
  loginController,
  getAllUsersController,
  getSingleUserController,
  deleteUserController,
  updateUserController,
  getUserDataForChartController,
} = require("../controllers/userController");

const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/registration", registrationController);
userRouter.post("/activate-user", activateUserController);
userRouter.post("/login", loginController);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUserController
);
userRouter.put("/update-user/:id", isAuthenticated, updateUserController);
userRouter.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsersController
);
userRouter.get("/user/:id", isAuthenticated, getSingleUserController);
// Get all orders info for chart
userRouter.get(
  "/users-chart",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserDataForChartController
);

module.exports = userRouter;
