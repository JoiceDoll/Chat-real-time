const app = require("../app")

const server = require("http").createServer(app);
const io = require("socket.io")(server);


module.exports = io