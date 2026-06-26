const { createSeededRandom, clamp, round } = require('../utils/seededRandom');

function buildPriceSeries(companyName) {
  const random = createSeededRandom(`${companyName}:price`);
  const start = 100 + random() * 120;

  return Array.from({ length: 12 }, (_value, index) => {
    const drift = index * (1.5 + random() * 3.5);
    const volatility = (random() - 0.5) * 14;
    return round(start + drift + volatility, 2);
  });
}

async function getTechnicalMetrics(companyProfile) {
  const priceHistory = buildPriceSeries(companyProfile.companyName);
  const oneMonthTrend = round(((priceHistory[11] - priceHistory[10]) / Math.max(priceHistory[10], 1)) * 100, 1);
  const sixMonthTrend = round(((priceHistory[11] - priceHistory[5]) / Math.max(priceHistory[5], 1)) * 100, 1);
  const oneYearTrend = round(((priceHistory[11] - priceHistory[0]) / Math.max(priceHistory[0], 1)) * 100, 1);
  const fiftyTwoWeekHigh = round(Math.max(...priceHistory), 2);
  const fiftyTwoWeekLow = round(Math.min(...priceHistory), 2);
  const movingAverage = round(priceHistory.reduce((sum, value) => sum + value, 0) / priceHistory.length, 2);
  const volatility = round(
    priceHistory.reduce((sum, value) => sum + Math.abs(value - movingAverage), 0) / priceHistory.length / movingAverage * 100,
    1
  );

  const score = clamp(
    round(
      52 +
        oneMonthTrend * 0.55 +
        sixMonthTrend * 0.45 +
        oneYearTrend * 0.2 -
        volatility * 0.9
    ),
    0,
    100
  );

  return {
    priceHistory,
    oneMonthTrend,
    sixMonthTrend,
    oneYearTrend,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    volatility,
    movingAverage,
    growthPercent: oneYearTrend,
    technicalScore: score,
    reasoning: 'Technical strength is modeled from the last year of price action, moving average, and volatility. Ready for live API integration via Alpha Vantage API keys.'
  };
}

module.exports = {
  getTechnicalMetrics
};
