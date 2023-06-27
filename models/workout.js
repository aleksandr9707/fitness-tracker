const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  bodyweight: Number,
  notes: String,
  exercises: [{
    name: [String], // Update the name field to an array of strings
    sets: [Number],
    reps: [Number],
    weight: [Number],
    notes: String,
  }],
});

module.exports = mongoose.model('Workout', workoutSchema);
