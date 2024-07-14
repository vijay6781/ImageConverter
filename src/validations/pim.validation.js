const Joi = require('joi');

const areaById = {
  params: Joi.object().keys({
    areaId: Joi.string().label('Area Id').required(),
  }),
};

const damImageFilter = {
  params: Joi.object().keys({
    pageNo: Joi.number().label('Page no'),
    pageSize: Joi.number().label('Page size'),
    sort: Joi.string().label('Page no'),
    responseType: Joi.string().label('Page size'),
  }),
  body: {
    filter: Joi.array().label('Style Code'),
  },
};

const styleCode = {
  params: Joi.object().keys({
    stylecode: Joi.string().label('Style Code').required(),
    pageNo: Joi.number().label('Page no'),
    pageSize: Joi.number().label('Page size'),
  }),
};

// const createComments = {
//   params: Joi.object().keys({
//     message: Joi.string().label('message').required(),
//     conceptId: Joi.string().label('conceptId').required(),
//   }),
// };

const getRoomconfig = {
  params: Joi.object().keys({
    style: Joi.string().label('style').required(),
    areaCategory: Joi.string().label('areaCategory').required(),
  }),
};

const roomConfigId = {
  params: Joi.object().keys({
    roomconfigid: Joi.string().label('roomconfigid').required(),
  }),
};

const roomProductById = {
  params: Joi.object().keys({
    roomid: Joi.number().label('id').required(),
  }),
};

const productById = {
  params: Joi.object().keys({
    productId: Joi.number().label('productId').required(),
  }),
};

const similarProductById = {
  params: Joi.object().keys({
    productId: Joi.number().label('productId').required(),
  }),
};

const categoryId = {
  params: Joi.object().keys({
    categoryId: Joi.number().label('categoryId').required(),
  }),
};

module.exports = {
  areaById,
  damImageFilter,
  styleCode,
  // createComments,
  getRoomconfig,
  roomProductById,
  productById,
  similarProductById,
  categoryId,
  roomConfigId,
};
