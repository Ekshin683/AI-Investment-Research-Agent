const { createSeededRandom, clamp, round, formatCurrency } = require('../utils/seededRandom');

const sectorProfiles = {
  technology: {
    industry: 'Technology',
    sector: 'Information Technology',
    ceo: 'Market Leadership Team',
    headquarters: 'Silicon Valley, USA',
    industryScore: 84
  },
  automotive: {
    industry: 'Automotive',
    sector: 'Consumer Cyclical',
    ceo: 'Elon Musk',
    headquarters: 'Austin, Texas, USA',
    industryScore: 72
  },
  finance: {
    industry: 'Financial Services',
    sector: 'Financial Services',
    ceo: 'Executive Committee',
    headquarters: 'New York, USA',
    industryScore: 68
  },
  healthcare: {
    industry: 'Healthcare',
    sector: 'Healthcare',
    ceo: 'Leadership Team',
    headquarters: 'Cambridge, Massachusetts, USA',
    industryScore: 76
  },
  energy: {
    industry: 'Energy',
    sector: 'Energy',
    ceo: 'Operations Board',
    headquarters: 'Houston, Texas, USA',
    industryScore: 64
  }
};

function guessProfile(companyName) {
  const normalized = companyName.trim();
  const lookup = normalized.toLowerCase();

  if (lookup.includes('tesla') || lookup.includes('motor') || lookup.includes('auto')) {
    return sectorProfiles.automotive;
  }

  if (lookup.includes('bank') || lookup.includes('capital') || lookup.includes('financial')) {
    return sectorProfiles.finance;
  }

  if (lookup.includes('health') || lookup.includes('pharma') || lookup.includes('bio')) {
    return sectorProfiles.healthcare;
  }

  if (lookup.includes('oil') || lookup.includes('gas') || lookup.includes('energy')) {
    return sectorProfiles.energy;
  }

  return sectorProfiles.technology;
}

async function getCompanyProfile(companyName) {
  const profile = guessProfile(companyName);
  const random = createSeededRandom(companyName);
  const marketCapValue = 150 + random() * 900;
  const employeeCount = 18000 + Math.round(random() * 150000);

  return {
    companyName: companyName.trim(),
    industry: profile.industry,
    sector: profile.sector,
    ceo: profile.ceo,
    marketCap: formatCurrency(marketCapValue * 1000),
    marketCapValue: round(marketCapValue, 1),
    description: `${companyName.trim()} is presented as a ${profile.industry.toLowerCase()} business with a focus on long-term growth, operational scale, and capital efficiency.`,
    headquarters: profile.headquarters,
    employees: employeeCount,
    industryScore: profile.industryScore,
    reasoning: 'The company profile is generated from sector heuristics and seeded market assumptions. Ready for live API integration via Finnhub API keys.'
  };
}

module.exports = {
  getCompanyProfile
};
