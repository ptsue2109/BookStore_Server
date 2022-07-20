const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/authRouter");

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
mongoose
  .connect(process.env.MONGODB_ONLINE)
  .then(() => console.log("MONGODB connected successfully"))
  .catch((error) => console.log(error));
  
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", slideRoute);
app.use("/", CateRoute);
app.use("/", BrandRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
