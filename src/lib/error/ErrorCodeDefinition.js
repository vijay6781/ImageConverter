class ErrorCodeDefinition {
  /**
   * Constructor for ErrorCodeDefinition
   *
   * @param {string} errorCode Error code.
   * @param {number} httpStatus - from npm module 'http-status-codes'
   * @param {string} message - Human readable message.
   */
  constructor(errorCode, httpStatus, message = '') {
    this.errorCode = errorCode;
    this.httpStatus = httpStatus;
    this.message = message;
  }
}

module.exports = ErrorCodeDefinition;
