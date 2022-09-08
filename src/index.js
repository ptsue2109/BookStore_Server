const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");
const userRoute = require("./routes/auth");
const HomeRoute = require("./routes/home");
const productRoute = require("./routes/product");
const slideRoute = require("./routes/sliders");
const CateRoute = require("./routes/category");
const BrandRoute = require("./routes/brand");
const OrderRoute  = require("./routes/order");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(morgan("tiny"));
app.use(
  express.json({
    limit: "50mb",
  })
);
dotenv.config({
  path: __dirname + "/configs/settings.env",
});
//
cloudinary.config({
  cloud_name: "asm-ph13269",
  api_key: "449723454328925",
  api_secret: "1UV_RDivk2CaWxn38szYuKovhH8",
});


mongoose
//  .connect("mongodb://127.0.0.1:27017/ecmServer")
   .connect("mongodb://127.0.0.1:27017/ecmServer")
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log(error));
  
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", slideRoute);
app.use("/", CateRoute);
app.use("/", BrandRoute);
app.use("/", HomeRoute);
app.use("/",OrderRoute);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
