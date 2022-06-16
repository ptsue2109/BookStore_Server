const express = require("express");
import { Add } from './../controllers/authCtrler';
const router = express.Router();
const { Resgister, Login, List,removeUser ,update,getDetail} = require ("../controllers/authCtrler");

router.post("/register", Resgister);
router.post("/login", Login);

router.get("/users", List);
router.post('/users/create-user', Add);
router.delete("/users/remove-user/:id",removeUser);
router.get('/users/get-user-by-id/:id', getDetail);
router.patch('/users/update-user/:id', update);
module.exports = router;   