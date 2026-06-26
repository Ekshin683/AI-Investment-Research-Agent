import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || ''
});

export async function analyzeCompany(company) {
  const response = await client.post('/api/analyze', { company });
  return response.data.data;
}

export async function generateProjection(amount, years) {
  const response = await client.post('/api/projection', { amount, years });
  return response.data.data;
}
