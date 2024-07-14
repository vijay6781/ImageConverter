const winston = require('winston');
const config = require('../../config/env');

const { format } = winston;
const { timestamp, json, errors, prettyPrint } = format;

const logger = winston.createLogger({
  level: ['test', 'dev', 'uat'].includes(config.env) ? 'debug' : 'info',
  format: format.combine(
    errors({ stack: true }),
    timestamp(),
    ['test', 'dev'].includes(config.env) ? prettyPrint() : json()
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

const childLoggers = {};

/**
 * To create child logger
 * @param {object} param
 * @param {string} param.label
 * @param {string} param.module
 * @returns {winston.Logger}
 */
const getChildLogger = ({ label = '', module = 'default' }) => {
  if (!childLoggers[module]) {
    childLoggers[module] = logger.child({ label, module });
  }
  return childLoggers[module];
};

module.exports.getChildLogger = getChildLogger;
