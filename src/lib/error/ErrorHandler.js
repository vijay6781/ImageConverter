const ApplicationError = require('./ApplicationError');
const ErrorLogLevel = require('./ErrorLogLevel');
// eslint-disable-next-line no-unused-vars
const ErrorCodeDefinition = require('./ErrorCodeDefinition');
const ErrorEnum = require('./ErrorEnum');

const logger = require('../logger').getChildLogger({
  module: 'lib::ErrorHandler',
});

const ErrorHandler = {
  /**
   * To check weather is an ApplicationError or not
   *
   * @param {Error|ApplicationError|any} error Error
   * @returns {boolean} Is it an ApplicationError or not
   */
  isApplicationError: (error) => error && error instanceof ApplicationError,
  /**
   * Generate an Application Error
   *
   * @param {{ message: string, errorEnum?: ErrorCodeDefinition , errorLogLevel?: string, taskType?: string, errorDetail?: any, errorContext?: any, error?: any }} options Application error options
   * @returns {ApplicationError} ApplicationError
   */
  getApplicationError: (options = {}) => {
    const { error = null } = options;
    if (ErrorHandler.isApplicationError(error)) {
      return error;
    }
    return new ApplicationError(options);
  },
  /**
   * To log error
   *
   * @param {ApplicationError} error Log error and it's payload
   * @param {any} errorPayload Error payload
   */
  logErrorPayload: (error) => {
    if (error?.errorEnum?.errorCode !== ErrorEnum.NOT_FOUND.errorCode) {
      if (error.errorLogLevel === ErrorLogLevel.WARN) {
        logger.warn(error);
      } else if (error.errorLogLevel === ErrorLogLevel.FATAL) {
        logger.fatal(error);
      } else {
        logger.error(error);
      }
    }
  },
};

module.exports = ErrorHandler;
