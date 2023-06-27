const express = require('express');
const router = express.Router();
const workoutsRouter = require('./workouts');

// Home page
router.get('/', function(req, res) {
  res.render('index');
});

// Workouts routes
router.use('/workouts', workoutsRouter);

module.exports = router;
