const mongoose = require("mongoose");
const mongooseDelete = require('mongoose-delete');
const mongooseDateFormat = require('mongoose-date-format');
const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        productCost: {type: Number},
        productImage: { type: String},
        productName: { type: String},
        productURL: { type: String},
        cost:  {type: Number},
        price: {type: Number},
        quantity: {type: Number},
        stock:{type: Number}
      },
    ],
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["pending", "confirm", "shipping", "done"],
      default: "pending",
    },
    shippingInfo: {
      username: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      note: {
        type: String,
      },
    },
    totalPrice :{type: Number}
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseDelete,{ deletedAt: true, overrideMethods: 'all' });
orderSchema.plugin(mongooseDateFormat);
module.exports = mongoose.model("Order", orderSchema);
