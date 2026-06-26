const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./Config/config');

const analyzeRoutes = require('./src/routes/analyze');
const projectionRoutes = require('./src/routes/projection');

const app = express();

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'AI Investment Research & Future Outlook Agent',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', analyzeRoutes);
app.use('/api', projectionRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message || 'Unexpected server error'
  });
});

app.listen(config.port, () => {
  console.log(`API server running on port ${config.port}`);
});
