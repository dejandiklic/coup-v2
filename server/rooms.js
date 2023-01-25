class Room {
    constructor({type, name}, socketID) {
        this.name = name
        this.type = type
        this.admin = socketID
        this.playerList = [socketID]
    }
}

module.exports = {Room}