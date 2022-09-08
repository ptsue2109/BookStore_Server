const express = require("express");
const router = express.Router();
const {addnew,getAll,removeItem,getDetail,update} = require ("../controllers/slider");

router.get("/sliders", getAll);
router.post("/sliders/create", addnew);
router.delete("/sliders/remove/:id",removeItem)
router.get("/sliders/get-detail/:id",getDetail)
router.patch("/sliders/update/:id",update)
module.exports = router;   