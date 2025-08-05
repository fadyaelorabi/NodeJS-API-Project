class AppError extends Error {
  constructor(status, message) {
    super();
  }
  create(message, statusCode, statusText) {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}
module.exports = new AppError();
