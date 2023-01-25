const express = require('express');
require('dotenv').config({path: "../.env"});
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');
const {User} = require('./users')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});


app.use(cors());

let userList = []


//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    socket.on("addUser", (data) => {
        const user = new User(data)
        userList.push(user)
    })
    socket.on('disconnect', () => {
        userList = userList.filter((user) => user.socketID !== socket.id)
    });
    socket.on('test', (data) => {
        socket.emit("response", data + "-back")
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});