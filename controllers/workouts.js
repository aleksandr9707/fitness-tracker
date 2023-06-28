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
      name: Array.isArray(exercise.name) ? exercise.name[0] : exercise.name,
      sets: Array.isArray(exercise.sets) ? exercise.sets.map(Number) : [],
      reps: Array.isArray(exercise.reps) ? exercise.reps.map(Number) : [],
      weight: Array.isArray(exercise.weight) ? exercise.weight.map(Number) : [],
      notes: Array.isArray(exercise.notes) ? exercise.notes : [],
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
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).render('error', { message: 'Workout not found' });
    }

    const renderedWorkout = {
      name: workout.name,
      duration: workout.duration,
      bodyweight: workout.bodyweight,
      notes: workout.notes,
      startTime: workout.startTime,
      endTime: workout.endTime,
      exercises: [],
    };

    workout.exercises.forEach((exercise) => {
      const renderedExercise = {
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        notes: exercise.notes,
      };

      renderedWorkout.exercises.push(renderedExercise);
    });

    res.render('workouts/show', { workout: renderedWorkout });
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

