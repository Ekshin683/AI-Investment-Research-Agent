const { createSeededRandom, clamp, round, formatBillion } = require('../utils/seededRandom');

function getFinanceBaseline(industryScore) {
  if (industryScore >= 80) {
    return 0.82;
  }

  if (industryScore >= 70) {
    return 0.74;
  }

  if (industryScore >= 60) {
    return 0.66;
  }

  return 0.58;
}

async function getFinancialMetrics(companyProfile) {
  const random = createSeededRandom(`${companyProfile.companyName}:finance`);
  const baseline = getFinanceBaseline(companyProfile.industryScore);
  const revenueGrowth = round(6 + random() * 24, 1);
  const revenue = round(20 + random() * 280, 1);
  const netIncome = round((revenue * (0.08 + random() * 0.18)), 1);
  const eps = round(1 + random() * 7, 2);
  const cashFlow = round(revenue * (0.12 + random() * 0.18), 1);
  const debtToEquity = round(0.2 + random() * 1.6, 2);
  const peRatio = round(12 + random() * 38, 1);

  const score = clamp(
    round(
      baseline * 100 +
        revenueGrowth * 0.55 +
        netIncome * 0.08 +
        cashFlow * 0.06 -
        debtToEquity * 11 -
        Math.max(peRatio - 20, 0) * 0.42
    ),
    0,
    100
  );

  const revenueTrend = Array.from({ length: 5 }, (_value, index) => {
    const trendRandom = createSeededRandom(`${companyProfile.companyName}:revenue:${index}`)();
    return round(revenue * (0.68 + index * 0.11 + trendRandom * 0.08), 1);
  });

  return {
    revenue,
    revenueTrend,
    revenueGrowth,
    netIncome,
    eps,
    cashFlow,
    debtToEquity,
    peRatio,
    financialScore: score,
    revenueLabel: formatBillion(revenue),
    reasoning: 'Financial strength is modeled from revenue growth, profitability, cash flow, and balance-sheet quality. Ready for live API integration via Finnhub API keys.'
  };
}

module.exports = {
  getFinancialMetrics
};
