const drugService = require('../services/drugService');

async function listDrugs(req, res) {
  try {
    const data = await drugService.getDrugs(req.query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listConditions(req, res) {
  try {
    const data = await drugService.getConditionCounts(req.query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listTopDrugs(req, res) {
  try {
    const data = await drugService.getTopDrugs(req.query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listDrugs,
  listConditions,
  listTopDrugs
};
