class User {
    constructor({username, type, socketID, authenticated}) {
        this.username = username
        this.type = type
        this.socketID = socketID
        this.authenticated = authenticated
    }
}

module.exports = {User}