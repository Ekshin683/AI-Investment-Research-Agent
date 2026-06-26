const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongodbUri: process.env.MONGODB_URI || '',
  finnhubApiKey: process.env.FINNHUB_API_KEY || '',
  alphaVantageApiKey: process.env.ALPHAVANTAGE_API_KEY || '',
  newsApiKey: process.env.NEWS_API_KEY || '',
  gnewsApiKey: process.env.GNEWS_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};
