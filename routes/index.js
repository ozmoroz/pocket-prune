'use strict';

var express = require('express');
var router = express.Router();
const _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Check if the user is already authenticated with passport
  if (_.get(req, 'session.passport.user.pocketAccessToken')) {
    console.log('User ' + req.session.passport.user.username +
      ' is already authenticated with Pocket');
    res.render('index', { username: req.session.passport.user.username });
  } else {
    res.redirect('/auth/pocket');
  }
});

module.exports = router;
