const { clamp, round } = require('./seededRandom');

function calculateFutureValue(principal, annualReturn, years) {
  const normalizedPrincipal = Number(principal) || 0;
  const normalizedYears = Math.max(0, Number(years) || 0);
  const normalizedReturn = Number(annualReturn) / 100;

  return round(normalizedPrincipal * (1 + normalizedReturn) ** normalizedYears, 0);
}

function calculateProjectionScenarios(principal, years, scenarios) {
  const bear = calculateFutureValue(principal, scenarios.bear, years);
  const base = calculateFutureValue(principal, scenarios.base, years);
  const bull = calculateFutureValue(principal, scenarios.bull, years);

  return {
    principal: round(Number(principal) || 0, 0),
    years: Math.max(0, Number(years) || 0),
    bear,
    base,
    bull,
    upsideRange: clamp(round(((bull - base) / Math.max(base, 1)) * 100, 1), 0, 999),
    downsideRange: clamp(round(((base - bear) / Math.max(base, 1)) * 100, 1), 0, 999)
  };
}

module.exports = {
  calculateFutureValue,
  calculateProjectionScenarios
};
