const { CustomServerError } = require('../errors/custom_error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomServerError) {
        return res.status(err.statusCode).json({ success: false, message: err.message })
    }
    return res.status(500).json({ success: false, message: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware