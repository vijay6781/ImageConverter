const { version } = require('../../package.json');
const config = require('../../config/env');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Office-Banao',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: config.serverDomain || `http://localhost:${config.port}/`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

module.exports = swaggerDef;
