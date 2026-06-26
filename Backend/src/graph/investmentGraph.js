const { runCompanyAgent } = require('../agents/companyAgent');
const { runFinanceAgent } = require('../agents/financeAgent');
const { runTechnicalAgent } = require('../agents/technicalAgent');
const { runNewsAgent } = require('../agents/newsAgent');
const { runRiskAgent } = require('../agents/riskAgent');
const { runProjectionAgent } = require('../agents/projectionAgent');
const { runRecommendationAgent } = require('../agents/recommendationAgent');

async function runInvestmentGraph(companyName) {
  const companyProfile = await runCompanyAgent(companyName);
  const financialMetrics = await runFinanceAgent(companyProfile);
  const technicalMetrics = await runTechnicalAgent(companyProfile);
  const newsMetrics = await runNewsAgent(companyProfile);
  const riskMetrics = await runRiskAgent(companyProfile, financialMetrics, technicalMetrics, newsMetrics);
  const projectionMetrics = await runProjectionAgent(companyProfile, financialMetrics, technicalMetrics, newsMetrics, riskMetrics);
  const recommendationMetrics = await runRecommendationAgent({
    companyProfile,
    financialMetrics,
    technicalMetrics,
    newsMetrics,
    riskMetrics
  });

  return {
    company: companyProfile,
    financial: financialMetrics,
    technical: technicalMetrics,
    news: newsMetrics,
    risk: riskMetrics,
    projection: projectionMetrics,
    recommendation: recommendationMetrics,
    scoreBreakdown: {
      financial: financialMetrics.financialScore,
      technical: technicalMetrics.technicalScore,
      news: newsMetrics.sentimentScore,
      industry: companyProfile.industryScore,
      risk: riskMetrics.riskScore
    },
    summary: {
      investmentScore: recommendationMetrics.investmentScore,
      recommendation: recommendationMetrics.recommendation,
      confidence: recommendationMetrics.confidence
    }
  };
}

module.exports = {
  runInvestmentGraph
};
