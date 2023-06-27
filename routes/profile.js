const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile');

// Profile page
router.get('/', profileCtrl.index);

module.exports = router;
