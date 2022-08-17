const express = require("express");
const router = express.Router();
const {
  addToCart,
  listAllOrder,
  getUserOrder,
  getOrderByOrderCode,
  getOrderByPhone,
  getOrderById,
  changeOrderStatus,
  sorfDeleteOrder,
  restoreOrder,
  listDeletedOrder,
  // getUserOrderDelete
} = require("../controllers/orderController");

router.post("/orders/creat-by-custom", addToCart);
router.get("/orders", listAllOrder);
router.get("/orders/deleted", listDeletedOrder);
router.get("/orders/get-user-order/:users", getUserOrder);
// router.get("/orders/get-user-order-deleted/:users", getUserOrderDelete);
router.get("/orders/get-order-by-orderCode/:orderCode", getOrderByOrderCode);
router.get("/orders/get-order-by-phone/:phoneNumber", getOrderByPhone);
router.get("/orders/get-order-by-id/:id", getOrderById);
router.patch("/orders/change-status/:id", changeOrderStatus);
router.delete("/orders/softDelte-by-orderCode/:id", sorfDeleteOrder);
router.patch("/orders/restore-by-id/:id", restoreOrder);

module.exports = router;
