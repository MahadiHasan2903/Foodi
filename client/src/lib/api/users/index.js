const { base_url } = require("@/lib/config/server");
const { fetchTyped } = require("../client");

const deleteUser = async (id, token) => {
  const response = await fetchTyped(`${base_url}/delete-user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.message;
};

const updateUser = async (id, token, updatedData) => {
  const response = await fetchTyped(`${base_url}/update-user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  return response.message;
};

const getSingleUser = async (id, token) => {
  const response = await fetchTyped(`${base_url}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const user = {
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    orders: response.orders,
  };

  return user;
};

const getAllUsers = async (token) => {
  const response = await fetchTyped(`${base_url}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const user = response.users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    orders: user.orders,
  }));
  return user;
};

const getUsersData = async (token) => {
  const response = await fetchTyped(`${base_url}/users-chart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data) {
    throw new Error(response.message);
  }
  return response.data;
};
const users = {
  getSingleUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUsersData,
};

export default users;
