const { createSeededRandom, clamp, round } = require('../utils/seededRandom');

function buildHeadline(companyName, tone, index) {
  const headlineTemplates = {
    positive: [
      `${companyName} expands product momentum`,
      `${companyName} posts strong operational signals`,
      `${companyName} attracts bullish analyst attention`
    ],
    negative: [
      `${companyName} faces near-term execution pressure`,
      `${companyName} sees margin concerns surface`,
      `${companyName} enters a period of market scrutiny`
    ],
    neutral: [
      `${companyName} maintains steady strategic positioning`,
      `${companyName} issues routine quarterly updates`,
      `${companyName} remains on watch amid market rotation`
    ]
  };

  return headlineTemplates[tone][index % headlineTemplates[tone].length];
}

async function getNewsSentiment(companyProfile) {
  const random = createSeededRandom(`${companyProfile.companyName}:news`);
  const positive = 4 + Math.round(random() * 6);
  const negative = 1 + Math.round(random() * 4);
  const neutral = 2 + Math.round(random() * 4);
  const sentimentScore = clamp(round(50 + positive * 5 - negative * 8 + neutral * 1.5), 0, 100);

  const articles = [
    { tone: 'positive', title: buildHeadline(companyProfile.companyName, 'positive', 0) },
    { tone: 'positive', title: buildHeadline(companyProfile.companyName, 'positive', 1) },
    { tone: 'negative', title: buildHeadline(companyProfile.companyName, 'negative', 0) },
    { tone: 'neutral', title: buildHeadline(companyProfile.companyName, 'neutral', 0) },
    { tone: 'neutral', title: buildHeadline(companyProfile.companyName, 'neutral', 1) }
  ];

  return {
    positive,
    negative,
    neutral,
    articles,
    sentimentScore,
    summary: `News flow is currently ${sentimentScore >= 65 ? 'constructive' : sentimentScore >= 45 ? 'mixed' : 'cautious'} for ${companyProfile.companyName}.`,
    reasoning: 'News sentiment is estimated from the balance of positive, negative, and neutral coverage in a deterministic mock feed. Ready for live API integration via NewsAPI API keys.'
  };
}

module.exports = {
  getNewsSentiment
};
