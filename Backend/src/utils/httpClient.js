const axios = require('axios');

function createHttpClient(baseURL, defaultHeaders = {}) {
  return axios.create({
    baseURL,
    headers: {
      'User-Agent': 'AI-Investment-Research-Agent/1.0',
      ...defaultHeaders
    },
    timeout: 8000
  });
}

async function safeAxiosCall(promise, fallback) {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    console.warn(`API call failed: ${error?.message || 'unknown error'} — falling back to mock data`);
    return fallback;
  }
}

module.exports = {
  createHttpClient,
  safeAxiosCall
};
