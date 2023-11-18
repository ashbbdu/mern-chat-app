const express = require("express");
const { getAllUsers } = require("../controllers/User");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/allUsers" , auth , getAllUsers);

module.exports = router;