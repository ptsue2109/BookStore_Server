const express = require("express");
const router = express.Router();
const { addnew, getAll } = require("../controllers/bookTypeCtrler");


router.post("/bookTypes", addnew);
router.get("/bookTypes", getAll);

module.exports = router;   