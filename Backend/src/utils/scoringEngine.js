const { clamp, round } = require('./seededRandom');

function calculateOverallScore({ financialScore, technicalScore, sentimentScore, industryScore, riskScore }) {
  const weighted =
    financialScore * 0.3 +
    technicalScore * 0.2 +
    sentimentScore * 0.15 +
    industryScore * 0.15 +
    riskScore * 0.2;

  return clamp(round(weighted), 0, 100);
}

function recommendationFromScore(score) {
  if (score >= 80) {
    return 'STRONG INVEST';
  }

  if (score >= 60) {
    return 'INVEST';
  }

  if (score >= 40) {
    return 'HOLD';
  }

  return 'PASS';
}

function confidenceFromSpread(scores) {
  const values = Object.values(scores).filter((value) => Number.isFinite(value));

  if (!values.length) {
    return 0;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const spread = Math.max(...values) - Math.min(...values);
  return clamp(round(70 + average * 0.2 - spread * 0.35), 45, 96);
}

module.exports = {
  calculateOverallScore,
  recommendationFromScore,
  confidenceFromSpread
};
