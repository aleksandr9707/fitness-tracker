const Workout = require('../models/workout');
const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

// Workouts page
router.get('/', workoutsCtrl.index);

// Create a new workout
router.get('/create', workoutsCtrl.createPage);
router.post('/', workoutsCtrl.create);

// Workout details
router.get('/:id', async (req, res, next) => {
    try {
      const workoutId = req.params.id;
      const workout = await Workout.findById(workoutId);
  
      if (!workout) {
        return res.status(404).render('error', { message: 'Workout not found' });
      }
  
      res.render('workouts/show', { workout });
    } catch (err) {
      next(err);
    }
  });
// Edit a workout
router.get('/:id/edit', async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
      res.render('edit', { workout });
    } catch (error) {
      console.log(error);
      res.redirect('/workouts');
    }
  });
  
// Delete a workout
router.delete('/:id', workoutsCtrl.remove);

module.exports = router;
