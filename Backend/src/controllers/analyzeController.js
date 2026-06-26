const { runInvestmentGraph } = require('../graph/investmentGraph');

async function analyzeCompany(req, res, next) {
  try {
    const company = String(req.body?.company || '').trim();

    if (!company) {
      return res.status(400).json({
        message: 'Company name is required.'
      });
    }

    const report = await runInvestmentGraph(company);

    return res.json({
      success: true,
      data: report
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  analyzeCompany
};
