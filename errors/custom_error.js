class CustomServerError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomServerError(message, statusCode)
}

module.exports = { createCustomError, CustomServerError }