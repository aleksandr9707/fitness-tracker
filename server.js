const express = require('express');
const app = express();
const logger = require('morgan');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

const path = require('path');
const indexRouter = require('./routes/index');
const workoutsRouter = require('./routes/workouts');
const profileRouter = require('./routes/profile');

// Configure middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Define routes
app.use('/', indexRouter);
app.use('/workouts', workoutsRouter);
app.use('/profile', profileRouter);

app.use(express.static(__dirname));

// Set the MIME type for CSS files
app.get('/stylesheets/main.css', function(req, res) {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'main.css'));
});


let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

