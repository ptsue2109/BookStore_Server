import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import userRoute from "./routes/authRouter";
import productRoute from "./routes/productRoute";
import slideRoute from "./routes/slidersRouter";
import CateRoute from "./routes/categoryRoute";
import OrderRoute from "./routes/orderRoute";
import BrandRoute from "./routes/brandRoute"
const app = express();

// const corsOptions = {
//     origin: ['http://localhost:4200'],
//     "methods": "GET,PUT,POST,DELETE,PATCH",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204,
//     credentials: true
// };
require('dotenv').config()
app.use(cors());
app.use(morgan('tiny'))
app.use(express.json({ limit: "50mb" }))

// 

mongoose.connect("mongodb+srv://phuongthaotrinh:phuongthaotrinh@beangular.mph64.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connecting to db"))
    .catch(err => console.log("Error connecting to db"))

app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", slideRoute);
app.use("/", CateRoute);
// app.use("/", HomeRoute);
// app.use("/",OrderRoute);
app.use("/",BrandRoute)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});