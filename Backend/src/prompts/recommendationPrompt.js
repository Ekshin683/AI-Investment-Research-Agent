function buildRecommendationPrompt(context) {
  return [
    'You are the Recommendation Agent for an investment research system.',
    'Provide a transparent summary that explains how the final recommendation was derived.',
    '',
    `Company: ${context.companyName}`,
    `Industry: ${context.industry}`,
    `Sector: ${context.sector}`,
    `Financial Score: ${context.financialScore}`,
    `Technical Score: ${context.technicalScore}`,
    `News Sentiment Score: ${context.sentimentScore}`,
    `Industry Score: ${context.industryScore}`,
    `Risk Score: ${context.riskScore}`,
    `Overall Score: ${context.overallScore}`,
    `Recommendation: ${context.recommendation}`,
    '',
    'Explain the strongest supporting signals, the main risks, and the future outlook scenarios in plain language.'
  ].join('\n');
}

module.exports = {
  buildRecommendationPrompt
};
