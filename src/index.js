const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");
const userRoute = require("./routes/authRouter");
const HomeRoute = require("./routes/homeRoute");
const productRoute = require("./routes/productRoute");
const slideRoute = require("./routes/slidersRouter");
const CateRoute = require("./routes/categoryRoute");
const BrandRoute = require("./routes/brandRoute");
const app = express();

// const corsOptions = {
//     origin: ['http://localhost:4200'],
//     "methods": "GET,PUT,POST,DELETE,PATCH",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204,
//     credentials: true
// };
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
  .connect("mongodb://localhost:27017/ecmServer")
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log(error));
  
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", slideRoute);
app.use("/", CateRoute);
app.use("/", BrandRoute);
app.use("/", HomeRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
