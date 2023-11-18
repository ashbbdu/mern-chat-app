const express = require("express");
const { createChat } = require("../controllers/Chat");
const { auth } = require("../middlewares/auth");

const router = express.Router();
router.post("/create-chat" , auth , createChat);

// getall chats
// router.get("/getChats" , auth , getAllChats)

// create chat group

// router.post("/createGroup" , auth , createChatGroup)

// Rename chat group

// router.put("/renameGroup/:id" , auth , renameChatGroup)

// Remove user from group

// router.put("/removeFromGroup" , auth , removeFromGroup)

// Add User into group

// router.put("addToGroup" , auth , addToGroup)


module.exports = router;


