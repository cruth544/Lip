var mongoose = require('mongoose')

var SongSchema = mongoose.Schema({
  name     : String,
  owner    : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songUrl  : { type: String, required: true },
  users    : [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  snippets : [ {type: mongoose.Schema.Types.ObjectId, ref: 'Snippet'} ]
})

module.exports = mongoose.model('Song', SongSchema)
