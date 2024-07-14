const keys = require('../config/env');

let server = null;

keys
  .init()
  .then(() => {
    const app = require('./app');
    const { config } = require('../config');
    const logger = require('./lib/logger').getChildLogger({
      module: 'src::index',
    });

    const models = require('../models');

    models.sequelize.authenticate();

    // if change anything in model then please uncomment the below line
    // models.sequelize.sync({
    // alter: true,
    // });

    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => console.error(err));

process.on('SIGTERM', () => {
  console.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
