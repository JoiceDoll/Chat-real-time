const { Router } = require("express");
const Chat = require("../controllers/chatController");
const routers = Router();

routers.get("/", Chat.chatPage);

module.exports = routers;
