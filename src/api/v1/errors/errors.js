export class NotFound extends Error {
    constructor(elementNotFound, message = "Not found") {
        super(elementNotFound + " " + message)
        this.statusCode = 404
    }
}

export class UnauthenticatedError extends Error {
    constructor(message = "Authentication invalid") {
        super(message)
        this.statusCode = 401
    }
}

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message)
        this.statusCode = 401
    }
}

export class InvalidCredentials extends Error {
    constructor(message = "The provided username or password is incorrect") {
        super(message)
        this.statusCode = 401
    }
}

export class Registered extends Error {
    constructor(elementRegistered, message = "Alredy registered") {
        super(elementRegistered + " " + message)
        this.statusCode = 400
    }
}