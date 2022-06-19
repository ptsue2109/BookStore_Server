const express = require("express");
const router = express.Router();
const { addnew, getAll,getDetailBySlug,removeItem ,getDetail,update,getAllActive,getBookByCateName} = require("../controllers/categoryCtrler");


router.post("/categories/create", addnew);
router.get("/categories", getAll);
router.get("/categories/list-active", getAllActive);
router.get("/categories/get-detail-by-slug/:slug", getDetailBySlug);
router.delete("/categories/remove-cate/:id",removeItem)
router.get("/categories/get-cate-by-id/:id",getDetail)
router.patch("/categories/update-cate/:id",update)
router.get("/categories/get-book-by-type/:cateName",getBookByCateName)
module.exports = router;   