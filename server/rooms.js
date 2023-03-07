class Room {
    constructor({type, name, password = ""}, player) {
        this.name = name
        this.type = type
        this.admin = player.socketID
        this.password = password
        this.playerList = [player]
    }
}

module.exports = {Room}