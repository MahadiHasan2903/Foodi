const { base_url } = require("@/lib/config/server");
const { fetchTyped } = require("../client");

const getStripeApikey = async () => {
  const response = await fetchTyped(`${base_url}/payment/stripeapikey`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

const paymentProcess = async (paymentData) => {
  const response = await fetchTyped(`${base_url}/payment/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  console.log("Payment Process Response:", response);
  const client_secret = response.client_secret;
  return client_secret;
};

const payment = {
  getStripeApikey,
  paymentProcess,
};

export default payment;
