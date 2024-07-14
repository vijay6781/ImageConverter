const OBResponse = require('../../classes/response');
const ErrorEnum = require('./ErrorEnum');
const ErrorLogLevel = require('./ErrorLogLevel');

const DEFAULT_ERROR_MESSAGE = 'Error occurred';
const DEFAULT_ERROR_ENUM = ErrorEnum.INTERNAL_SERVER_ERROR;
const DEFAULT_TASK_TYPE = 'Unknown';
const DEFAULT_ERROR_LOG_LEVEL = ErrorLogLevel.WARN;

class ApplicationError extends Error {
  constructor({
    message = '',
    errorEnum = DEFAULT_ERROR_ENUM,
    errorLogLevel = DEFAULT_ERROR_LOG_LEVEL,
    taskType = DEFAULT_TASK_TYPE,
    errorDetail = null,
    errorList = [],
    errorContext = null,
    error = null,
  } = {}) {
    super(message || errorEnum?.message || DEFAULT_ERROR_MESSAGE);
    this.errorEnum = errorEnum;
    this.errorLogLevel = errorLogLevel;

    // Can be used to log additional details - useful for debugging
    // Note: taskType, errorDetail and errorContext should not be displayed to the user
    this.taskType = taskType;
    this.errorDetail = errorDetail;
    this.errorContext = errorContext;
    this.errorList = errorList;

    this.error = error; // root cause error
    if (error && error.stack) {
      // else do not replace stack!
      this.stack = error.stack;
    }
  }

  /**
   * This response is used to send the error JSON as HTTP response.
   * Typically used in /api requests
   *
   * @returns {{ message: string, errorCode: string }} Error
   */
  toJSONResponse() {
    return new OBResponse({
      success: false,
      status: this.errorEnum.httpStatus,
      errorCode: this.errorEnum.errorCode,
      message: this.message,
      errorList: this.errorList,
    });
  }
}

module.exports = ApplicationError;
