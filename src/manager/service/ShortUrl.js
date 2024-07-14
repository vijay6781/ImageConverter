const axios = require('axios').default;
const { api, externalVisitsLimit } = require('../../../config/env');

const logger = require('../../lib/logger').getChildLogger({
  module: 'service::Url',
});

const createShortUrl = async ({ url }) => {
  logger.debug('Creating shortened url', { url });

  const version = 1;

  return axios
    .post(
      `${api.domainUrl}/rest/v${version}/short-urls`,
      {
        longUrl: url,
        deviceLongUrls: {
          android: url,
          ios: url,
          desktop: url,
        },
        // validSince: moment().utc(),
        // validUntil: moment().add(15, 'days').utc(),
        maxVisits: externalVisitsLimit,
        tags: ['API', 'URL', 'SHORT'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': api.xApiKey,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

module.exports = {
  createShortUrl,
};
