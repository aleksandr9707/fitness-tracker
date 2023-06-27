const Workout = require('../models/workout');

module.exports = {
  index,
  createPage,
  create,
  show,
  remove,
};

async function index(req, res) {
  try {
    const workouts = await Workout.find({});
    res.render('workouts/index', { workouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function createPage(req, res) {
  res.render('workouts/create');
}

async function create(req, res) {
  try {
    const { name, duration, bodyweight, notes, exercises } = req.body;

    // Convert the exercises array to the desired format
    const parsedExercises = exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets.map(Number),
      weight: exercise.weight.map(Number),
      reps: exercise.reps.map(Number),
      notes: exercise.notes,
    }));

    const workout = await Workout.create({
      name,
      duration,
      bodyweight,
      notes,
      exercises: parsedExercises,
    });

    res.redirect('/workouts');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res, next) {
  try {
    const workoutId = req.params.id;
    console.log('Workout ID:', workoutId);

    const workout = await Workout.findById(workoutId);
    console.log('Retrieved Workout:', workout);

    if (!workout) {
      return res.status(404).render('error', { message: 'Workout not found' });
    }

    res.render('workouts/show', { workout });
  } catch (err) {
    next(err);
  }
}


async function remove(req, res) {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.redirect('/workouts');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
