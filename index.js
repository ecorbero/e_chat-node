const express = require("express");
var http  = require("http");
// const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// Middleware
app.use(express.json());
// Keep all the connected clients variable
var clients = {};

// Connect io
io.on("connection", (socket) => {
    console.log("connexted");
    console.log(socket.id, "has joined");
    socket.on("signin", (idInput) => {
        console.log(idInput);
        clients[idInput] = socket;
        console.log(clients);   
    });
    socket.on("message", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if (clients[targetId]) clients[targetId].emit("message",msg);
    });
});

app.route("/check").get((req,res) =>{
    return res.json("Your App is Working fine");
});

// Listen to Server
server.listen(port, 'localhost', () => {
    console.log("Server Started");
})



