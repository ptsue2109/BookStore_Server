import Order from "../models/orderModel";
import Product from "../models/productModel";
import User from "../models/authModel";
import shortid from "shortid";

module.exports = {
   addToCart: async (req, res) => {
      try {
         const {
            address,
            email,
            username,
            note,
            phoneNumber,
            products,
            price,
            users,
            productCost,
            productImage,
            productName,
            productURL,
            stock,
            totalPrice,
         } = req.body;

         let lstProducts = [];
         for (let productItem of products) {
            let objProduct = {};
            objProduct.product = productItem.product;
            objProduct.price = productItem.price;
            objProduct.cost = productItem.cost;
            objProduct.productCost = productItem.productCost;
            objProduct.productImage = productItem.productImage;
            objProduct.quantity = productItem.quantity;
            objProduct.productName = productItem.productName;
            objProduct.productURL = productItem.productURL;
            objProduct.stock = productItem.stock;
            lstProducts.push(objProduct);
         }

         const order = new Order({
            orderCode: shortid.generate(),
            products: lstProducts,
            price,
            users,
            shippingInfo: {
               address,
               email,
               username,
               note,
               phoneNumber,
            },
            totalPrice,
         }).save();
         res.status(201).json(order);
      } catch (error) {
         return res.status(500).send("Đặt hàng thất bại");
      }
   },

   listAllOrder: async (req, res) => {
      try {
         const orders = await Order.find({ deleted: false })
            .populate("users")
            .exec();
         return res.status(200).json({
            orders,
         });
      } catch (error) {
         return res.status(400).json({
            message: `loading fail : ${error}`,
         });
      }
   },
   listDeletedOrder: async (req, res) => {
      try {
         const orders = await Order.findWithDeleted({ deleted: true }).exec();
         return res.status(200).json({
            orders,
         });
      } catch (error) {
         return res.status(400).json({
            message: `loading fail : ${error}`,
         });
      }
   },
   // getUserOrder: async (req, res) => {
   //    try {
   //       const userInfo = await User.findOne({ users: req.params.id }).exec();
   //       const orders = await Order.find({ users: userInfo._id }).exec();
   //       res.status(200).json({
   //          userInfo,
   //          orders,
   //       });
   //    } catch (error) {
   //       res.status(500).send(`Lấy sản phẩm thất bại ${error}`);
   //    }
   // },
   getUserOrder: async (req, res) => {
      try {
         const userInfo = await User.findOne({ users: req.params.id }).exec();
         const orderDeleted = await Order.findWithDeleted({ deleted: true, users:userInfo._id }).exec();
         const orders = await Order.find({ users: userInfo._id }).exec();
         res.status(200).json({
            userInfo,
            orders,
            orderDeleted

         });
      } catch (error) {
         res.status(500).send(`Lấy sản phẩm thất bại ${error}`);
      }
   },
   getOrderByOrderCode: async (req, res) => {
      try {
         const cart = await Order.findOne({
            orderCode: req.params.orderCode,
         })
            .populate("products.products")
            .exec();
         res.status(200).json(cart);
      } catch (error) {
         res.status(500).send("loading fail" + error);
      }
   },
   getOrderByPhone: async (req, res) => {
      const { phoneNumber } = req.params;
      try {
         const orders = await Order.find({ phoneNumber }).exec();
         res.status(200).json({ orders });
      } catch (error) {
         res.status(500).send("load data fail");
      }
   },

   getOrderById: async (req, res) => {
      try {
         const orders = await Order.findOne({ id: req.params._id }).exec();
         return res.status(200).json({
            orders,
         });
      } catch (error) {
         res.status(500).send("get data fail");
      }
   },
   changeOrderStatus: async (req, res) => {
      try {
         const order = await OrderModel.findOneAndUpdate(
            { _id: req.params.id },
            {
               ...req.body,
            },
            { $new: true }
         );
         res.status(201).json(order);
      } catch (error) {
         console.log(error);
         res.status(500).json("Cập nhật thất bại");
      }
   },

   removeOrder: async (req, res) => {
      try {
         const order = await Order.findOneAndDelete({ id: req.params._id });
         return res.status(200).json({
            order,
         });
      } catch (error) { }
   },

   sorfDeleteOrder: async (req, res, next) => {
      try {
        
         const orderDel = await Order.find({ _id: req.params.id }).exec();
         const order = await Order.delete({ _id: req.params.id }).exec();
         return res.status(200).json({ order, orderDel });
      } catch (error) {
         return res.status(400).json({
            error: `Xoá sản phẩm  thất bại ${error}`,
         });
      }
   },

   restoreOrder: async (req, res) => {
      try {
         const order = await Order.restore({ _id: req.params.id }).exec();
         const orderTarget = await Order.find({ _id: req.params.id }).exec();
         return res.status(200).json({ order, orderTarget });
      } catch (error) {
         return res.status(400).json({
            error: "Restore sản phẩm thất bại",
         });
      }
   },
};
