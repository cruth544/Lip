var express = require('express')
var router  = new express.Router()
var usersController = require('../controllers/users')

var restaurantsController = require('../controllers/restaurants')
 var passport = require('passport')
  require("./passport")(passport)

// USER ROUTES

router.route('/')

router.route('/auth/facebook')
  .get(passport.authenticate('facebook', {scope: 'email'}));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

module.exports = router;
