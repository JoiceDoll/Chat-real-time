const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const io = require("./config/Socket");

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.static("./pages"));

let messages = [];

io.on("connection", (socket) => {
  socket.emit("previousMessages", messages);
  socket.on("message", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

module.exports = app;
