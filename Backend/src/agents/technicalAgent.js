const { getTechnicalMetrics } = require('../services/technicalService');

async function runTechnicalAgent(companyProfile) {
  const metrics = await getTechnicalMetrics(companyProfile);

  return {
    agent: 'Technical Analysis Agent',
    ...metrics
  };
}

module.exports = {
  runTechnicalAgent
};
