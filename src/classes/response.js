class Response {
  constructor({ success = true, status = 200, result, errorCode = 0, message = 'success', errorList = [] }) {
    this.success = success;
    this.status = status;
    this.result = result;
    this.errorCode = errorCode;
    this.errorList = errorList;
    this.message = message;
  }
}

module.exports = Response;
