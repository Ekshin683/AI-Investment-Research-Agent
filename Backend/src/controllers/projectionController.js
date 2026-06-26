const { calculateProjectionScenarios } = require('../utils/projectionCalculator');

async function generateProjection(req, res, next) {
  try {
    const amount = Number(req.body?.amount);
    const years = Number(req.body?.years);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        message: 'A valid investment amount is required.'
      });
    }

    if (!Number.isFinite(years) || years <= 0) {
      return res.status(400).json({
        message: 'A valid investment horizon in years is required.'
      });
    }

    const scenarios = calculateProjectionScenarios(amount, years, {
      bear: 4,
      base: 10,
      bull: 18
    });

    return res.json({
      success: true,
      data: scenarios
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  generateProjection
};
