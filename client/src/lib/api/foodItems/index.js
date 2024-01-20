const { base_url } = require("@/lib/config/server");
const { fetchTyped } = require("../client");

const createfoodItem = async (token, foodItemData) => {
  const response = await fetchTyped(`${base_url}/create-foodItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(foodItemData),
  });

  return response.message;
};

const deletefoodItem = async (id, token) => {
  const response = await fetchTyped(`${base_url}/delete-foodItem/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.message;
};

const updatefoodItem = async (id, token, updatedData) => {
  const response = await fetchTyped(`${base_url}/update-foodItem/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  return response.message;
};

const getSinglefoodItem = async (id, token) => {
  const response = await fetchTyped(`${base_url}/foodItem/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error(response.message);
  }
  const foodItem = response.data;

  return foodItem;
};

const getAllfoodItems = async (token) => {
  const response = await fetchTyped(`${base_url}/foodItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error(response.message);
  }

  const foodItem = response.data.map((foodItem) => ({
    id: foodItem._id,
    name: foodItem.name,
    originalPrice: foodItem.originalPrice,
    discountPrice: foodItem.discountPrice,
    sold: foodItem.sold,
    category: foodItem.category,
    description: foodItem.description,
    ratings: foodItem.ratings,
    events: foodItem.events,
    image: foodItem.image,
  }));
  return foodItem;
};

const getfoodItemsData = async (token) => {
  const response = await fetchTyped(`${base_url}/foodItems-chart`, {
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
const foodItems = {
  createfoodItem,
  deletefoodItem,
  updatefoodItem,
  getSinglefoodItem,
  getAllfoodItems,
  getfoodItemsData,
};

export default foodItems;
