const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('formatDate', (date, format) => {
  return moment(date).format(format);
});

Handlebars.registerHelper('inc', (value, to) => {
  return parseInt(value, 10) + to;
});

Handlebars.registerHelper('toFixed', (value, to) => {
  if (!Number.isNaN(Number(value))) {
    return Number(value).toFixed(to);
  }
  return value;
});

module.exports = Handlebars;
