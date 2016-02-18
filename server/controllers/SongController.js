'use strict'
var Song = require('../models/Song')
var User = require('../models/User')
var AWS = require('aws-sdk')
var fs = require('fs')

var formidable = require('formidable'),
    http = require('http'),
    util = require('util')
var multiparty = require('multiparty')

var mongoose = require('mongoose')

module.exports = {
  getSongsList: function (req, res, next) {
    Song.find({}).then(function (songs) {
      res.json(songs)
    }).catch(function (err) {
      console.log(err)
    })
  },
  getSong: function (req, res, next) {
    // req.query
  },
  addSnippet: function (snippet, songFile, options) {
    if (songFile) {
      var newSong = new Song()
      for(var key in options) {
        newSong[key] = options[key]
      }
      console.log("SNIPPET!", options.songUrl)
      newSong.save(function (err) {
        if (err) return console.log('ERROR: ', err)
      })
    } else {
      Song.update(
        { "songUrl": options.songUrl },
        { "$push": {
            "snippets": snippet._id
        }},
        function(err, numAffected) {
          console.log("Update error: ", err)
        })
    }
  }
}




