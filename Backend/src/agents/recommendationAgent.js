const { calculateOverallScore, recommendationFromScore, confidenceFromSpread } = require('../utils/scoringEngine');
const { buildRecommendationPrompt } = require('../prompts/recommendationPrompt');

async function runRecommendationAgent({ companyProfile, financialMetrics, technicalMetrics, newsMetrics, riskMetrics }) {
  const overallScore = calculateOverallScore({
    financialScore: financialMetrics.financialScore,
    technicalScore: technicalMetrics.technicalScore,
    sentimentScore: newsMetrics.sentimentScore,
    industryScore: companyProfile.industryScore,
    riskScore: riskMetrics.riskScore
  });

  const recommendation = recommendationFromScore(overallScore);
  const confidence = confidenceFromSpread({
    financialScore: financialMetrics.financialScore,
    technicalScore: technicalMetrics.technicalScore,
    sentimentScore: newsMetrics.sentimentScore,
    industryScore: companyProfile.industryScore,
    riskScore: riskMetrics.riskScore
  });

  const prompt = buildRecommendationPrompt({
    companyName: companyProfile.companyName,
    industry: companyProfile.industry,
    sector: companyProfile.sector,
    financialScore: financialMetrics.financialScore,
    technicalScore: technicalMetrics.technicalScore,
    sentimentScore: newsMetrics.sentimentScore,
    industryScore: companyProfile.industryScore,
    riskScore: riskMetrics.riskScore,
    overallScore,
    recommendation
  });

  return {
    agent: 'Recommendation Agent',
    investmentScore: overallScore,
    recommendation,
    confidence,
    prompt,
    reasoning: [
      `Financial strength is ${financialMetrics.financialScore}/100.`,
      `Technical momentum is ${technicalMetrics.technicalScore}/100.`,
      `News sentiment is ${newsMetrics.sentimentScore}/100.`,
      `Industry outlook is ${companyProfile.industryScore}/100.`,
      `Risk safety is ${riskMetrics.riskScore}/100.`
    ]
  };
}

module.exports = {
  runRecommendationAgent
};
