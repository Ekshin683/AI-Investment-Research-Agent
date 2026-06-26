const express = require('express');
const { analyzeCompany } = require('../controllers/analyzeController');

const router = express.Router();

router.post('/analyze', analyzeCompany);

module.exports = router;
