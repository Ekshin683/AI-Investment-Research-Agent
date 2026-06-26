const { clamp, round } = require('../utils/seededRandom');

async function runProjectionAgent(companyProfile, financialMetrics, technicalMetrics, newsMetrics, riskMetrics) {
  const growthAnchor = (financialMetrics.financialScore + technicalMetrics.technicalScore + newsMetrics.sentimentScore + companyProfile.industryScore + riskMetrics.riskScore) / 5;

  const bear = clamp(round(2 + growthAnchor * 0.04, 1), 1, 8);
  const base = clamp(round(6 + growthAnchor * 0.06, 1), 4, 14);
  const bull = clamp(round(12 + growthAnchor * 0.08, 1), 8, 24);

  return {
    agent: 'Projection Agent',
    bear,
    base,
    bull,
    reasoning: 'Projection ranges combine fundamental quality, price momentum, sentiment, and risk posture.'
  };
}

module.exports = {
  runProjectionAgent
};
