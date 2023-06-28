const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  bodyweight: Number,
  notes: String,
  exercises: [{
    name: String,
    sets: [Number],
    reps: [Number],
    weight: [Number],
    notes: [String],
  }],
});

module.exports = mongoose.model('Workout', workoutSchema);
