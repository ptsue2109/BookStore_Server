const express = require("express");
const router = express.Router();
const {
  addToCart,
  listAllOrder,
  getUserOrder,
  getOrderByOrderCode,
  getOrderByPhone,
  getOrderById,
  changeOrder,
  removeOrder
} = require("../controllers/orderController");

router.post("/orders/creat-by-custom", addToCart);
router.get("/orders", listAllOrder);
router.get("/orders/get-user-order/:id", getUserOrder);
router.get("/orders/get-order-by-orderCode/:orderCode", getOrderByOrderCode);
router.get("/orders/get-order-by-phone/:phoneNumber", getOrderByPhone);
router.get("/orders/get-order-by-id/:id", getOrderById);
router.patch("/orders/change-order/:orderCode", changeOrder);
router.delete("/orders/delete-order/:id",removeOrder)
module.exports = router;
