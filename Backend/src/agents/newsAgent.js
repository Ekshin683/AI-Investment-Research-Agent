const { getNewsSentiment } = require('../services/newsService');

async function runNewsAgent(companyProfile) {
  const sentiment = await getNewsSentiment(companyProfile);

  return {
    agent: 'News Sentiment Agent',
    ...sentiment
  };
}

module.exports = {
  runNewsAgent
};
