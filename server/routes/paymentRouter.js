const express = require("express");
const {
  paymentProcessController,
} = require("../controllers/paymentController");

const paymentRouter = express.Router();

// Create a payment
paymentRouter.post("/payment/process", paymentProcessController);

// Get stripe api key
paymentRouter.post("/payment/stripeapikey", paymentProcessController);

module.exports = paymentRouter;
