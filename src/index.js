import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRoute from "./routes/authRouter";
import productRoute from "./routes/productRoute";
import targetRoute from "./routes/targetRouter";
import slideRoute from "./routes/slidersRouter";
import CateRoute from "./routes/categoryRoute";
import HomeRoute from "./routes/homeRoute";
import BookSize from "./routes/bookSizeRoute";
import BookType from "./routes/bookTypeRoute";
import AuthorRoute from "./routes/authorRoute";
import OrderRoute from "./routes/orderRoute"
const app = express();

const corsOptions = {
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST,DELETE,PATCH",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
};
require('dotenv').config()
app.use(cors(corsOptions));
app.use(morgan('tiny'))
app.use(express.json({ limit: "50mb" }))


mongoose.connect("mongodb://localhost:27017/angular_bookstore")
    .then(() => console.log("Connecting to db"))
    .catch(err => console.log("Error connecting to db"))

app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", targetRoute);
app.use("/", slideRoute);
app.use("/", CateRoute);
app.use("/", HomeRoute);
app.use("/",BookSize);
app.use("/",BookType);
app.use("/",AuthorRoute);
app.use("/",OrderRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});