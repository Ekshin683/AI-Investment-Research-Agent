const { getCompanyProfile } = require('../services/companyService');

async function runCompanyAgent(companyName) {
  const profile = await getCompanyProfile(companyName);

  return {
    agent: 'Company Research Agent',
    ...profile
  };
}

module.exports = {
  runCompanyAgent
};
