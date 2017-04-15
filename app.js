'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var PocketStrategy = require('passport-pocket');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');

const config = require('./config');
const index = require('./routes/index');
const pocket = require('./routes/pocket');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport!

app.use(session({
  secret: config.POCKET_API.SESSION_SECRET, // session secret
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());

// Passport Set up

const pocketStrategy = new PocketStrategy({
  consumerKey: config.POCKET_API.POCKET_CONSUMER_KEY,
  callbackURL: config.POCKET_CALLBACK_URL
}, function(username, accessToken, done) {
  process.nextTick(function() {
    return done(null, {
      username: username,
      accessToken: accessToken
    });
  });
});

passport.serializeUser(function(user, done) {
  done(null, { username: user.username, pocketAccessToken: user.accessToken });
});

passport.deserializeUser(function(user, done) {
  done(null, user.id);
});

passport.use(pocketStrategy);

app.use('/', index);
app.use('/auth', pocket);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
