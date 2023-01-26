const removePlayerFromRoom = (roomList, userList, socket) => {
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
            //more players in room logic
            //switch admin to next player

            let locatedPlayer = userList.find((user) => user.socketID === socket.id)
            console.log(locatedPlayer)

        } else {
            roomList = roomList.filter((room) => room.name !== locatedRoom.name)
        }
    }

    return roomList
}

module.exports = {removePlayerFromRoom}