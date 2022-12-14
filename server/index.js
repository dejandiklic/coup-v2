const express = require('express');
require('dotenv').config({path: "../.env"});
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});


app.use(cors());

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.on('test', (data) => {
        console.log(data);
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