const express = require('express');
const router = express.Router();
const debugController = require('../controllers/debugController');
const debugHistoryController = require('../controllers/debugHistoryController');

// Protected routes
router.post('/', debugController.debugCode);
router.get('/history', debugHistoryController.getDebugHistory);

module.exports = router;