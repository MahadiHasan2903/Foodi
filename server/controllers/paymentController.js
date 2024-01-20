require("dotenv").config(); //If we don't use this line then it is giving error
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentProcessController = async (req, res, next) => {
  try {
    console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Mahadi",
      },
    });

    console.log("Payment Intent created:", myPayment);

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    console.error("Error in paymentProcessController:", error);
    next(error);
  }
};

const stripeKeyController = async (req, res, next) => {
  try {
    console.log("Stripe API Key:", process.env.STRIPE_SECRET_KEY);

    res.status(200).json({ stripeApiKey: process.env.STRIPE_SECRET_KEY });
  } catch (error) {
    console.error("Error in stripeKeyController:", error);
    next(error);
  }
};

module.exports = {
  paymentProcessController,
  stripeKeyController,
};
