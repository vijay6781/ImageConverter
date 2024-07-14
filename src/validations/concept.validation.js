const Joi = require('joi');

const createConcept = {
  body: Joi.object().keys({
    projectId: Joi.string().label('projectId').required(),
    name: Joi.string().label('name').required(),
  }),
};

const updateConcept = {
  params: Joi.object().keys({
    id: Joi.string().label('id').required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().label('name'),
    designStyle: Joi.array().items(Joi.string()).allow(null).label('designStyle'),
    superArea: Joi.number().label('superArea'),
    carpetArea: Joi.number().label('carpetArea'),
    height: Joi.number().label('height'),
  }),
};

const completeConcept = {
  params: Joi.object().keys({
    id: Joi.string().label('id').required(),
  }),
};

const conceptsByProjectId = {
  params: Joi.object().keys({
    projectId: Joi.string().label('projectId').required(),
  }),
};

const conceptById = {
  params: Joi.object().keys({
    conceptId: Joi.string().label('conceptId').required(),
  }),
};

const createArea = {
  body: Joi.object().keys({
    conceptId: Joi.string().label('id').required(),
    parentArea: Joi.string().label('parentArea').required(),
    mainArea: Joi.string().label('mainArea').required(),
    spaceId: Joi.number().label('spaceId').required(),
    name: Joi.string().label('name').required(),
    image: Joi.string().label('image').required(),
    dimensions: Joi.string().label('dimensions').required(),
    areaSize: Joi.number().label('areaSize').required(),
    attributes: Joi.string().label('attributes').required(),
  }),
};

const updateArea = {
  params: Joi.object().keys({
    areaId: Joi.string().label('areaId').required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().label('name'),
    dimensions: Joi.object().label('dimensions'),
    areaSize: Joi.number().label('areaSize'),
  }),
};

const areaById = {
  params: Joi.object().keys({
    areaId: Joi.string().label('areaId').required(),
  }),
};

const updateRoomConfig = {
  params: Joi.object().keys({
    areaId: Joi.string().label('areaId').required(),
  }),
  body: Joi.object().keys({
    roomConfigId: Joi.number().label('roomConfigId').required(),
    designStyle: Joi.string().label('designStyle'),
    shellData: Joi.array().label('shellData'),
    productData: Joi.array().label('productData'),
    serviceData: Joi.array().label('serviceData'),
  }),
};

const createNote = {
  params: Joi.object().keys({
    areaId: Joi.string().label('areaId').required(),
  }),
  body: Joi.object().keys({
    path: Joi.string().label('path').required(),
    text: Joi.string().label('text').required(),
  }),
};

const updateNote = {
  params: Joi.object().keys({
    noteId: Joi.string().label('noteId').required(),
  }),
  body: Joi.object().keys({
    text: Joi.string().label('text').required(),
  }),
};

const getNoteByAreaIdPath = {
  params: Joi.object().keys({
    areaId: Joi.string().label('areaId').required(),
  }),
  query: Joi.object().keys({
    q: Joi.string().label('q').required(),
  }),
};

const getStatus = {
  params: Joi.object().keys({
    type: Joi.string().label('types').required(),
  }),
};

module.exports = {
  createConcept,
  updateConcept,
  completeConcept,
  conceptsByProjectId,
  conceptById,
  createArea,
  updateArea,
  areaById,
  updateRoomConfig,
  createNote,
  updateNote,
  getNoteByAreaIdPath,
  getStatus,
};
