const express = require("express");
const router = express.Router();
const { addnew, getAll } = require("../controllers/bookSizeCtrler");


router.post("/bookSizes", addnew);
router.get("/bookSizes", getAll);

module.exports = router;   