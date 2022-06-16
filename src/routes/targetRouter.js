const express = require("express");
const router = express.Router();
const { addnew, getAll,getBoookByTarget } = require("../controllers/targetCtrler.js");


router.post("/targets", addnew);
router.get("/targets", getAll);
router.get("/targets/find-book-by-slug/:slug",getBoookByTarget )
module.exports = router;   