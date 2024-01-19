const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen.black);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.black);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
