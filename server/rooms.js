class Room {
    constructor({type, name}, player) {
        this.name = name
        this.type = type
        this.admin = player.socketID
        this.playerList = [player]
    }
}

module.exports = {Room}