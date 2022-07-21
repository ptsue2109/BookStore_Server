const express = require("express");
const router = express.Router();
const { getHomeData } = require("../controllers/homeCtrler");


router.get("/home", getHomeData);

module.exports = router;   