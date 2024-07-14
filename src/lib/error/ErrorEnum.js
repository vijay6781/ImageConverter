const HttpStatus = require('http-status');
const ErrorCodeDefinition = require('./ErrorCodeDefinition');

/*
 * Note: Never change error codes - example: OBAPI-400-0002 should always mean USER_ALREADY_EXISTS
 * since it might break client's error handling logic,
 * and also causes inconsistency in log messages
 * */
const ErrorEnum = {
  BAD_REQUEST: new ErrorCodeDefinition('OBAPI-400-0000', HttpStatus.BAD_REQUEST, 'Bad request.'),
  VALIDATION_ERROR: new ErrorCodeDefinition('OBAPI-400-0001', HttpStatus.UNPROCESSABLE_ENTITY, 'Invalid data input.'),
  UNAUTHORIZED: new ErrorCodeDefinition('OBAPI-401-0000', HttpStatus.UNAUTHORIZED, 'You are not authorized.'),
  FORBIDDEN_REQUEST: new ErrorCodeDefinition('OBAPI-403-0000', HttpStatus.FORBIDDEN, 'Resource not available.'),
  NOT_FOUND: new ErrorCodeDefinition('OBAPI-404-0000', HttpStatus.NOT_FOUND, 'Resource not found.'),
  INTERNAL_SERVER_ERROR: new ErrorCodeDefinition(
    'OBAPI-500-0000',
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Something went wrong.'
  ),
  INVALID_DATA_ERROR: new ErrorCodeDefinition('OBAPI-500-0001', HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong.'),
  BAD_GATEWAY: new ErrorCodeDefinition('OBAPI-502-0000', HttpStatus.BAD_GATEWAY, 'Bad gateway.'),
};

module.exports = ErrorEnum;
