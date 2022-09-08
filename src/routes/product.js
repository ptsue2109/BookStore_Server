const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAll,
  getDetail,
  remove,
  getDetailBySlug,
  update,
  search
  
} = require("../controllers/product");

router.get("/products/find-book-by-slug/:slug", getDetailBySlug);
router.get("/products/find-book-by-id/:id", getDetail);
router.get("/products", getAll);
router.post("/products/create", addProduct);
router.delete("/products/remove-book/:id", remove);
router.patch("/products/update-book/:id", update);
router.post("/search", search);
module.exports = router;
