/**
 * Create alpha numeric code of given length
 * @param {Number} length
 * @returns {string}
 */

const str = 'ACEFGHJKLMNPQRUVWXYabcdefhijkprstuvwx1234567890';
const createCode = (length = 10) => {
  let code = '';
  for (let index = 0; index < length; index += 1) {
    code += str[Math.floor(Math.random() * str.length)];
  }
  return code.toUpperCase();
};

module.exports = createCode;
