const AWS = require('aws-sdk');
const { aws, env } = require('../../../config/env');

const logger = require('../../lib/logger').getChildLogger({
  module: 'queue',
});

AWS.config.update({ region: 'ap-south-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendIndexingMessage = async function (moodboardEntry, actionType) {
  try {
    let sqsData;
    if (actionType !== 'DELETE') {
      const finalEntry = { ...moodboardEntry, space: '', style: '', package: '', elements: '' };
      Object.entries(finalEntry.tagsJson).forEach(([key, value]) => {
        finalEntry[key] = value?.toString() || '';
      });
      sqsData = {
        MessageBody: JSON.stringify({ entry: finalEntry, actionType, env: env === 'prod' ? 'prod' : 'uat' }),
        QueueUrl: aws.sqs,
      };
    } else {
      sqsData = {
        MessageBody: JSON.stringify({ entry: { id: moodboardEntry }, actionType, env: env === 'prod' ? 'prod' : 'uat' }),
        QueueUrl: aws.sqs,
      };
    }
    return sqs
      .sendMessage(sqsData)
      .promise()
      .catch((err) => {
        logger.error('Error in sending message to sqs', err);
        throw err;
      });
  } catch (err) {
    logger.error('Error in sending message', err);
  }
};

module.exports = {
  sendIndexingMessage,
};
