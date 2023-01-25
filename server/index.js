const express = require('express');
require('dotenv').config({path: "../.env"});
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');
const {User} = require('./users')
const {Room} = require('./rooms')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});


app.use(cors());

let userList = []
let roomList = []
let lobbyRoom = {
    playerList: [],
    name: "Lobby"
}


//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    socket.on("user joined", (data, callback) => {
        const user = new User(data)
        userList.push(user)
        lobbyRoom.playerList.push(user.socketID)
        socket.join("Lobby")
        callback(roomList)
    })

    socket.on("new room", (data, callback) => {
        let room = new Room(data, socket.id)
        roomList.push(room)
        socketIO.emit("room list update", roomList)
        callback(room)
    })

    socket.on('disconnect', () => {
        userList = userList.filter((user) => user.socketID !== socket.id)
        lobbyRoom.playerList = lobbyRoom.playerList.filter((socketID) => socketID !== socket.id)
        let locatedRoom = {}
        roomList.every((room) => {
            if (room.playerList.find((player) => player === socket.id)) {
                locatedRoom = room
            }
            return !locatedRoom;
        })

        if (Object.keys(locatedRoom).length) {

            locatedRoom.playerList = locatedRoom.playerList.filter((player) => player !== socket.id)

            if (locatedRoom.playerList.length) {
                //switch admin to next player
            } else {
                roomList = roomList.filter((room) => room.name !== locatedRoom.name)
                socketIO.emit("room list update", roomList)
            }
        }
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