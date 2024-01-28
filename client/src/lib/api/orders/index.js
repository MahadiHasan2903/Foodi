const { base_url } = require("@/lib/config/server");
const { fetchTyped } = require("../client");

const createOrder = async (token, orderData) => {
  const response = await fetchTyped(`${base_url}/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.data) {
    throw new Error(response.message);
  }
  const orderDetails = response.data;

  return orderDetails;
};

const updateOrder = async (id, token, status) => {
  const response = await fetchTyped(`${base_url}/update-order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.data) {
    throw new Error(response.message);
  }
  const UpdatedOrderDetails = response.data;

  return UpdatedOrderDetails;
};

const deleteOrder = async (id, token) => {
  const response = await fetchTyped(`${base_url}/delete-order/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.message;
};

const getSingleOrder = async (id, token) => {
  const response = await fetchTyped(`${base_url}/order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error(response.message);
  }
  const order = response.data;

  return order;
};

const getAllOrders = async (token) => {
  const response = await fetchTyped(`${base_url}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error(response.message);
  }

  const orderData = response.data.map((order) => ({
    id: order._id,
    shippingAddress: order.shippingAddress,
    paymentInfo: order.paymentInfo,
    cart: order.cart,
    user: order.user,
    totalPrice: order.totalPrice,
    status: order.status,
    paidAt: order.paidAt,
  }));
  return orderData;
};

const getOrdersData = async (token) => {
  const response = await fetchTyped(`${base_url}/orders-chart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data) {
    throw new Error(response.message);
  }

  const chartDetails = response.data;
  return chartDetails;
};

const getFoodItemsInOrder = async (id, token) => {
  const response = await fetchTyped(`${base_url}/order-item/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data) {
    throw new Error(response.message);
  }

  const FoodItemsInOrder = response.data;
  return FoodItemsInOrder;
};

const getUserOrder = async (id, token) => {
  const response = await fetchTyped(`${base_url}/user-order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data) {
    throw new Error(response.message);
  }

  const userOrders = response.data;
  return userOrders;
};

const orders = {
  createOrder,
  deleteOrder,
  updateOrder,
  getSingleOrder,
  getAllOrders,
  getOrdersData,
  getFoodItemsInOrder,
  getUserOrder,
};

export default orders;
