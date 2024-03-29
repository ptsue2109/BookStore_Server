const express = require("express");
const router = express.Router();
const {
    addnew,
    getAll,
    getDetailBySlug,
    removeItem,
    getAllActive,
    getDetail,
    update,
    getProductByBrandName
} = require("../controllers/brand");


router.post("/brands/create", addnew);
router.get("/brands", getAll);
router.get("/brands/list-active", getAllActive);
router.get("/brands/get-detail-by-slug/:slug", getDetailBySlug);
router.delete("/brands/remove-brands/:id", removeItem)
router.get("/brands/get-brands-by-id/:id", getDetail)
router.patch("/brands/update-brands/:id", update)
router.get("/brands/get-products-by-slug/:slug",getProductByBrandName)
module.exports = router;