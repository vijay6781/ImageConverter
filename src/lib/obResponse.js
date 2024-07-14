const OBResponse = require('../classes/response');

const obSend = (res) => {
  return (context) => {
    const obResponse = new OBResponse(context);
    res.status(obResponse.status).json(obResponse);
  };
};

module.exports = (req, res, next) => {
  res.obSend = obSend(res);
  next();
};
