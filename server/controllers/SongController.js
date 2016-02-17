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
    res.json({hello: 'world'})
  },
  getSong: function (req, res, next) {
    // req.query
  },
  addSong: function (req, res, next) {
    AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_KEY_ID})
    AWS.config.region = 'us-west-2'
    var s3Client = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    });

    var time = new Date()
    var date = time.getUTCFullYear() +'-'+ (time.getUTCMonth() + 1) +'-'+ time.getUTCDate() + '_'
    date += time.getUTCHours() +':'+ time.getUTCMinutes() +':'+ time.getUTCSeconds()
      // parse a file upload
      // var form = new formidable.IncomingForm();
    // console.log("IN FORMIDABLE")
    // form.parse(req, function(err, fields, files) {
    //   console.log(files)
    //   var params = {
    //     Bucket: 'lipsyncwith.us-data',
    //     Key: 'Videos/' + date,
    //     Body: files['video[blob]']
    //   }

    //   var s3 = new AWS.S3()
    //   s3.putObject(params, function (err, data) {
    //     if (err) console.log(err, err.stack) // an error occurred
    //     else     console.log(data)           // successful response
    //   })

    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    // })

    var form = new multiparty.Form();
    var destPath;
    form.parse(req, function (err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files['video[blob]'][0]['path']}));
      var bucket = 'lipsyncwith.us-data'
      var destPath = 'Videos/' + date
      var body = fs.createReadStream(files['video[blob]'][0]['path'])
      s3Client.putObject({
        Bucket: bucket,
        Key: destPath,
        ACL: 'public-read',
        Body: body
      }, function(err, data) {
        if (err) throw err;
        console.log("done", data);
        // res.json(data);
        console.log("https://s3.amazonaws.com/" + bucket + '/' + destPath);
      });
    });
    return
    // form.on('field', function(name, value) {
    //   if (name === 'path') {
    //     destPath = value;
    //   }
    // });
    form.on('part', function(part) {
      console.log('PART: ', part)
      var bucket = 'lipsyncwith.us-data'
      var destPath = 'Videos/' + date
      s3Client.putObject({
        Bucket: bucket,
        Key: destPath,
        ACL: 'public-read',
        Body: part,
        ContentLength: part.byteCount,
      }, function(err, data) {
        if (err) throw err;
        console.log("done", data);
        res.json(data);
        console.log("https://s3.amazonaws.com/" + bucket + '/' + destPath);
      });
    });

  }
}




