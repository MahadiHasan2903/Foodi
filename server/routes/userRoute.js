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
userRouter.get("/get-user/:id", getSingleUserController);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUserController
);
userRouter.put(
  "/update-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserController
);
userRouter.get("/get-users", getAllUsersController);
// Get all orders info for chart
userRouter.get(
  "/users-chart",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserDataForChartController
);

module.exports = userRouter;
