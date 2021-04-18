const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.broadcast.emit("hi, welcome");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("disconnect", function () {
    socket.broadcast.emit("chat disconnected");
    console.log("user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
