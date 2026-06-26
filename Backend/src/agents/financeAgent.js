const { getFinancialMetrics } = require('../services/financeService');

async function runFinanceAgent(companyProfile) {
  const metrics = await getFinancialMetrics(companyProfile);

  return {
    agent: 'Financial Analysis Agent',
    ...metrics
  };
}

module.exports = {
  runFinanceAgent
};
