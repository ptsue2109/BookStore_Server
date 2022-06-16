const express = require("express");
const router = express.Router();
const {addnew,getAll,removeItem,getDetail,update} = require ("../controllers/slidersCtrler.js");

router.get("/sliders", getAll);
router.post("/sliders", addnew);
router.delete("/sliders/:id",removeItem)
router.get("/sliders/:id",getDetail)
router.patch("/sliders/:id",update)
module.exports = router;   