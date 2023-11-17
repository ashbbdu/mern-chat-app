const express = require("express");
const { getAllUsers } = require("../controllers/User");

const router = express.Router();

router.get("/allUsers" , getAllUsers);

module.exports = router;