const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const promMid = require('express-prometheus-middleware');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const config = require('../config/env');
const morgan = require('../config/morgan');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json({ limit: '5MB' }));
// enable gzip compression
app.use(bodyParser.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

// v1 api routes
app.use('/engage/', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.get('/engage', require('./routes/default.route'));

module.exports = app;
