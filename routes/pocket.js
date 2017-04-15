'use strict';
var passport = require('passport');
var express = require('express');
var router = express.Router();

// Passport routes for express
router.get('/', passport.authenticate('pocket'),
function(req, res) {
    // The request will be redirected to Pocket for authentication, so this
    // function will not be called.
});

router.get('/callback', passport.authenticate('pocket', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true })
);

module.exports = router;
