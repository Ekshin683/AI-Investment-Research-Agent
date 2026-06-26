const express = require('express');
const { generateProjection } = require('../controllers/projectionController');

const router = express.Router();

router.post('/projection', generateProjection);

module.exports = router;
