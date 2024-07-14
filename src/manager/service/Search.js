const axios = require('axios').default;
const { env, api } = require('../../../config/env');

// eslint-disable-next-line camelcase
const searchMoodboardIdsByString = async ({
  cutoff = 0.8,
  searchString = '',
  space = '',
  style = '',
  packageTag = '',
  elements = '',
}) => {
  const url = `${
    api.url
  }/search/v1?searchString=${searchString}&space=${space}&style=${style}&package=${packageTag}&elements=${elements}&cutoff=${cutoff}&index=${
    env === 'prod' ? 'moodboard-search-prod' : 'moodboard-search-uat'
  }`;

  const headers = {
    'Content-Type': 'application/json',
  };
  const res = await axios.get(url, { headers });

  return res.data?.data || [];
};

module.exports = {
  searchMoodboardIdsByString,
};
