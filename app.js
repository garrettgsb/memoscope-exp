var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// These reference all TOP DIRECTORY routes.
// To add sub-routes, add them to the relevant
// [route].js file in the `routes` folder.

// NOTE: The files in `routes` will treat
// '/' as a reference to themselves:

// e.g.: If you want to type "localhost:3000/users/"
var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var cards = require('./routes/cards');
var notification = require('./routes/notification');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ADD ROUTES HERE IF YOU WANT
app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);
app.use('/cards', cards);
app.use('/notification', notification);




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

app.get('/dashboard', function(req,res){
  res.send("Hello Oblate Spheroid");
});
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
