'use strict'
var Song = require('../models/Song')
var User = require('../models/User')

var mongoose = require('mongoose')

module.exports = {
  getSongsList: function (req, res, next) {
    res.json({hello: 'world'})
  },
  getSong: function (req, res, next) {
    // req.query
  },
  addSong: function (req, res, next) {
    console.log(req.body)
  }
}
