const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const userRouter = require("./routes/userRoute");
const foodItemRouter = require("./routes/foodItemRoute");
const orderRouter = require("./routes/orderRoute");
const paymentRouter = require("./routes/paymentRouter");

//config
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1", userRouter, foodItemRouter, orderRouter, paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello world from Foodi backend server!");
});

// Server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan
      .black
  );
});
