const express = require('express');
const drugController = require('../controllers/drugController');

const router = express.Router();

router.get('/drugs', drugController.listDrugs);
router.get('/drugs/conditions', drugController.listConditions);
router.get('/drugs/top', drugController.listTopDrugs);

module.exports = router;
