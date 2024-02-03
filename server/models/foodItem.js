const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    sold: { type: Number, default: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true },
    ratings: [
      {
        ratings: { type: Number },
        reviews: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    events: {
      isEvent: { type: Boolean, default: false },
      start_Date: { type: Date },
      finish_Date: { type: Date },
    },
  },
  { timestamps: true }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
