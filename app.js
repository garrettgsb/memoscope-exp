const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
var dotenv  = require('dotenv');

// These reference all TOP DIRECTORY routes.
// To add sub-routes, add them to the relevant
// [route].js file in the `routes` folder.

// NOTE: The files in `routes` will treat
// '/' as a reference to themselves:

// e.g.: If you want to type "localhost:3000/users/"
const routes = require('./routes/index');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const cards = require('./routes/cards');
const notification = require('./routes/notification');
const decks = require('./routes/decks');

const app = express();
//tryint to see what the fuck is wrong with the server:
// app.listen(3000, function() {
//     console.log("The frontend server is running on port 5000!");
// });
//





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "stringofwords",
    resave: true,
    saveUninitialized: true
    }));
app.use(express.static(path.join(__dirname, 'public')));


//ADD ROUTES HERE IF YOU WANT
app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/cards', cards);
app.use('/notification', notification);
app.use('/decks', decks);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
