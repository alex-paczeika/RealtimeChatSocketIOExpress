const path= require('path');
const http = require('http')
const express = require("express");
const socketio = require('socket.io')



const app = express();
const server = http.createServer(app)
const io = socketio(server);

//set Static folder
app.use(express.static(path.join(__dirname,'public')));

//run wehn client connects
io.on('connection', socket => {
   
//welcome current user
    socket.emit('message' , 'Welcome to ChatCord!')

    //broadcast when a user connects
    socket.broadcast.emit("message", "A user has joined the chat");

    //runs when client disconets
    socket.on('disconnect',() => {
        io.emit("message","A user has left the chat")
    })

})


const PORT= 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));