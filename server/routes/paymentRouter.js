// router
const express = require("express");
const {
  paymentProcessController,
  stripeKeyController,
} = require("../controllers/paymentController");

const paymentRouter = express.Router();

// Create a payment
paymentRouter.post("/payment/process", paymentProcessController);

// Get stripe api key
paymentRouter.get("/payment/stripeapikey", stripeKeyController);

module.exports = paymentRouter;
