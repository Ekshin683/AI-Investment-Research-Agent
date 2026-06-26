function hashString(value) {
  const stringValue = String(value || 'default');
  let hash = 0;

  for (let index = 0; index < stringValue.length; index += 1) {
    hash = (hash << 5) - hash + stringValue.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash) + 1;
}

function createSeededRandom(seed) {
  let state = hashString(seed) % 2147483647;

  if (state <= 0) {
    state += 2147483646;
  }

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function round(value, digits = 0) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function formatCurrency(value) {
  return `₹${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(value))}`;
}

function formatBillion(value) {
  return `${round(value, 1)}B`;
}

module.exports = {
  createSeededRandom,
  clamp,
  round,
  formatCurrency,
  formatBillion
};
