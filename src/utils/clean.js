/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const clean = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete object[key];
    }
  });
  return object;
};

module.exports = clean;
