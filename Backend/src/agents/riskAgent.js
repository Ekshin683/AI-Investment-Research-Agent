const { clamp, round, createSeededRandom } = require('../utils/seededRandom');

async function runRiskAgent(companyProfile, financialMetrics, technicalMetrics, newsMetrics) {
  const random = createSeededRandom(`${companyProfile.companyName}:risk`);
  const debtRisk = clamp(round(100 - financialMetrics.financialScore + financialMetrics.debtToEquity * 18), 0, 100);
  const competitionRisk = clamp(round(100 - companyProfile.industryScore + random() * 12), 0, 100);
  const regulatoryRisk = clamp(
    round(
      companyProfile.sector === 'Financial Services' || companyProfile.sector === 'Healthcare'
        ? 58 + random() * 18
        : 38 + random() * 14
    ),
    0,
    100
  );
  const volatilityRisk = clamp(round(Math.min(technicalMetrics.volatility * 6, 100)), 0, 100);
  const sentimentRisk = clamp(round(100 - newsMetrics.sentimentScore), 0, 100);

  const rawRisk = (debtRisk + competitionRisk + regulatoryRisk + volatilityRisk + sentimentRisk) / 5;
  const riskScore = clamp(round(100 - rawRisk), 0, 100);

  return {
    agent: 'Risk Analysis Agent',
    debtRisk,
    competitionRisk,
    regulatoryRisk,
    volatilityRisk,
    sentimentRisk,
    riskScore,
    reasoning: 'Risk is converted into a safety score, so a higher riskScore means lower overall exposure.'
  };
}

module.exports = {
  runRiskAgent
};
