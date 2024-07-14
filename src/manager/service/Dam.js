const axios = require('axios').default;
const { api } = require('../../../config/env');

const getMoodboardIdsByUser = async ({ token }) => {
  const url = `${api.url}/dam/v1/album/moodboards`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });

  return res.data;
};

const getCpMoodboardIdsByUser = async ({ token }) => {
  const url = `${api.url}/dam/v1/cp/album/moodboards`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });

  return res.data;
};

const addMoodboardToAlbum = async ({ albumId, moodboardId, token }) => {
  const url = `${api.url}/dam/v1/album/${albumId}/moodboard/${moodboardId}/add`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.put(url, {}, { headers });

  return res.data;
};

module.exports = {
  getMoodboardIdsByUser,
  addMoodboardToAlbum,
  getCpMoodboardIdsByUser,
};
