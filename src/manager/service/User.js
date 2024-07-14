const axios = require('axios').default;
const { api } = require('../../../config/env');

const getAccountDetails = async ({ token }) => {
  const url = `${api.url}/usvc/v1/account/profile`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });

  return res?.data;
};

const getTempToken = async (accountId, layoutId) => {
  const result = await axios.post(`${api.url}/auth/v1/token/cb`, { accountId, layoutId });
  return result.data.token;
};

const generateExtToken = async (passcode) => {
  const result = await axios.post(`${api.url}/auth/v1/ext/generateToken`, { passcode });
  return result.data;
};

module.exports = {
  getAccountDetails,
  getTempToken,
  generateExtToken,
};
