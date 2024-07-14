const axios = require('axios').default;
const { api } = require('../../../config/env');

const getLayoutDetails = async ({ layoutId, token }) => {
  const url = `${api.url}/lead/v1/blueprint/${layoutId}/markers`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });

  return res?.data;
};

const getLeadDetails = async ({ projectId, token }) => {
  const url = `${api.url}/lead/v1/${projectId}/detail`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });

  return res?.data?.data;
};

const getLayoutDetailsInternal = async ({ token }) => {
  const url = `${api.url}/lead/v1/project/blueprint/external`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(url, { headers });
  return res?.data?.data;
};

const getProjectLayoutsDetailsInternal = async ({ projectId, token }) => {
  const url = `${api.url}/lead/v1/project/${projectId}/blueprints/internal`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(url, { headers });
  return res?.data?.data;
};

const getProjectLayoutsDetails = async ({ projectId, token }) => {
  const url = `${api.url}/lead/v1/project/${projectId}/blueprints/all`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });
  return res?.data?.data;
};
const getProjectLayoutsDetailsExt = async ({ projectId, token }) => {
  const url = `${api.url}/lead/v1/project/${projectId}/blueprints/all/ext`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.get(url, { headers });
  return res?.data?.data;
};

const updateProjectLayoutsInternal = async ({ blueprints, projectId, sequenceFlag, hideConfig, token }) => {
  const url = `${api.url}/lead/v1/project/blueprints/internal`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.put(url, { blueprints, projectId, sequenceFlag, hideConfig }, { headers });
  return res?.data;
};

const updateLayout = async ({ layoutId, syncSnapshot, syncSnapshotFFNE, isDefault, token }) => {
  const url = `${api.url}/lead/v1/blueprint/${layoutId}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  const res = await axios.put(url, { syncSnapshot, syncSnapshotFFNE, isDefault }, { headers });
  return res?.data;
};

const getLayoutExtToken = async ({ blueprintId }) => {
  const url = `${api.url}/lead/v1/ext/blueprint/${blueprintId}/share/details/internal`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const res = await axios.get(url, { headers });
  return res.data?.data;
};

module.exports = {
  getLayoutDetails,
  getLeadDetails,
  getLayoutDetailsInternal,
  getProjectLayoutsDetailsInternal,
  updateProjectLayoutsInternal,
  getLayoutExtToken,
  getProjectLayoutsDetails,
  updateLayout,
  getProjectLayoutsDetailsExt,
};
