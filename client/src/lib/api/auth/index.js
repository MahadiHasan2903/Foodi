const { base_url } = require("@/lib/config/server");
const { fetchTyped } = require("../client");

const login = async (loginData) => {
  const response = await fetchTyped(`${base_url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return {
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    avatar: response.user.avatar,
    orders: response.user.orders,
    accessToken: response.token,
  };
};

const registrationResponse = async (registrationData) => {
  const response = await fetchTyped(`${base_url}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.otp) {
    throw new Error("Registration Failed");
  }

  return {
    activationToken: response.activationToken,
  };
};

const userActivationResponse = async (activationData) => {
  const response = await fetchTyped(`${base_url}/activate-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activationData),
  });

  if (!response.otp) {
    throw new Error("Registration Failed");
  }

  return {
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    phoneNumber: response.user.phoneNumber,
  };
};

const authentication = {
  login,
  registrationResponse,
  userActivationResponse,
};

export default authentication;
