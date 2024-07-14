const axios = require('axios').default;
const { api } = require('../../../config/env');

// eslint-disable-next-line camelcase
const createCustomJob = async ({ entity_key, action_type, entity_type, data, token }) => {
  const url = `${api.url}/boq/v1/job/create/custom`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  // eslint-disable-next-line camelcase
  const res = await axios.post(url, { entity_key, action_type, entity_type, data }, { headers });

  return res?.data;
};

const getProductsByIds = async ({ pimIds, token }) => {
  const url = `${api.url}/boq/v1/pim/bomitem/products/details`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  let res;
  try {
    res = await axios.post(url, { ids: pimIds }, { headers });
  } catch (err) {
    console.log(err);
  }
  if (!res) return [];
  return res.data?.result?.products;
};

const getProductsByIdsExt = async ({ pimIds, token }) => {
  const url = `${api.url}/boq/v1/ext/pim/bomitem/products/details`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  let res;
  try {
    res = await axios.post(url, { ids: pimIds }, { headers });
  } catch (err) {
    console.log(err);
  }
  if (!res) return [];
  return res.data?.result?.products;
};

module.exports = {
  createCustomJob,
  getProductsByIds,
  getProductsByIdsExt,
};
