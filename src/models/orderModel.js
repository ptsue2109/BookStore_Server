const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    orderCode: { type: String },
    orderStatus: {
      type: String,
      enum: ["pending", "confirm", "delivered", "done", "close"],
      default: "pending",
    },
    username: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    products: [
      {
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        orderQuantity: {
          type: Number,
        },
        orderPrice: {
          type: Number,
        },
      },
    ],
  
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    totalPrice: {
      type: Number,
    },
    storeNote: { type: String, default: "" },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
