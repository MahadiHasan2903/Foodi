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
    message: response.message,
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    avatar: response.user.avatar,
    orders: response.user.orders,
    accessToken: response.token,
  };
};

const registration = async (registrationData) => {
  const response = await fetchTyped(`${base_url}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.activationToken) {
    throw new Error("Registration Failed");
  }

  return {
    message: response.message,
    activationToken: response.activationToken,
    registeredUser: response.registeredUser,
  };
};

const userActivation = async (activationData) => {
  console.log(activationData);
  const response = await fetchTyped(`${base_url}/activate-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activationData),
  });

  if (!response.user) {
    throw new Error("Registration Failed");
  }
  console.log(response);

  return {
    message: response.message,
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    phoneNumber: response.user.phoneNumber,
  };
};

const authentication = {
  login,
  registration,
  userActivation,
};

export default authentication;
