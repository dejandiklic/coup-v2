const removePlayerFromRoom = (roomList, userList, socket) => {
    let locatedRoom = {}
    roomList.every((room) => {
        if (room.playerList.find((player) => player.socketID === socket.id)) {
            locatedRoom = room
            return false
        } else {
            return true
        }
    })

    if (Object.keys(locatedRoom).length) {

        locatedRoom.playerList = locatedRoom.playerList.filter((player) => player.socketID !== socket.id)

        if (locatedRoom.playerList.length) {
            let locatedPlayer = userList.find((user) => user.socketID === socket.id)

            if (locatedPlayer.socketID === locatedRoom.admin) {
                locatedRoom.admin = locatedRoom.playerList[0].socketID
            }
            socket.to(locatedRoom.name).emit("room update", locatedRoom)

        } else {
            roomList = roomList.filter((room) => room.name !== locatedRoom.name)
        }
        socket.leave(locatedRoom.name)
    }

    return roomList
}

const locatePlayerByID = (id, userList) => {
    return userList.find(user => user.socketID === id)
}

const locateRoomByName = (name, roomList) => {
    return roomList.find(room => room.name === name)
}

module.exports = {removePlayerFromRoom, locatePlayerByID, locateRoomByName}