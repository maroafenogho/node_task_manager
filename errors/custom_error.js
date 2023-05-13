/* eslint-disable linebreak-style */
class CustomServerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => new CustomServerError(message, statusCode);

module.exports = { createCustomError, CustomServerError };
