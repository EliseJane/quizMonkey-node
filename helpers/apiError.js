class ApiError {
  constructor(message, status = 500) {
    this.message = this.parsMessage(message);
    this.status = status;
  }

  parsMessage(message) {
    if(typeof message === "object") {
      return message.message;
    }
    return message;
  }
}

module.exports = ApiError;
