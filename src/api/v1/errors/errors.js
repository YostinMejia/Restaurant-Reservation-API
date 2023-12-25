export class NotFound extends Error {
    constructor(elementNotFound, message = "Not found") {
        super(elementNotFound + " " + message)
        this.statusCode = 404
    }
}

export class Registered extends Error {
    constructor(elementRegistered, message = "Alredy registered") {
        super(elementRegistered + " " + message)
        this.statusCode = 400
    }
}