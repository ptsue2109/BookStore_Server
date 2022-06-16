import Order from "../models/orderModel";
import Product from "../models/productModel";
import shortid from "shortid";

export const addToCart = async (req, res) => {
  try {
    let {
      username,
      phoneNumber,
      address,
      products,
      userInfo,
      note,
      orderQuantity,
      orderPrice,
      totalPrice,
    } = req.body;

    const newCart = await new Order({
      products,
      userInfo,
      note,
      username,
      phoneNumber,
      address,
      orderQuantity,
      orderPrice,
      totalPrice,
      orderCode: shortid.generate(),
    }).save();

    return res.status(200).json({
      newCart,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Created faile cus ${error}`,
    });
  }
};

export const listAllOrder = async (req, res) => {
  try {
    const order = await Order.find({}).populate("userInfo").exec();
    return res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(400).json({
      message: `loading fail : ${error}`,
    });
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      userInfo: req.params.id,
    })
      .populate(["products"])
      .exec();
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).send("loading fail");
  }
};

export const getOrderByOrderCode = async (req, res) => {
  try {
    const cart = await Order.findOne({
      orderCode: req.params.orderCode,
    }).exec();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send("loading fail");
  }
};

export const getOrderByPhone = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const orders = await Order.find({ phoneNumber }).exec();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).send("load data fail");
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orders = await Order.findOne({ id: req.params._id }).exec();
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).send("get data fail");
  }
};

export const changeOrder = async (req, res) => {
  const {
    price,
    stock,
    quantity,
    totalPrice,
    note,
    address,
    username,
    orderStatus,
    phoneNumber,
  } = req.body;

  try {
    const orderData = await Order.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          price,
          stock,
          quantity,
          totalPrice,
          note,
          address,
          username,
          orderStatus,
          phoneNumber,
        },
      },
      { new: true }
    ).exec();
    return res.status(200).json({
      orderData,
    });
  } catch (error) {
    res.send.json({
      message: "cập nhật thông tin đơn hàng thất bại",
    });
  }
};
