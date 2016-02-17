var mongoose = require('mongoose')

var SongSchema = mongoose.Schema({
  name     : { type: String, required: true },
  owner    : String,
  song     : String,
  users    : [ String ],
  snippets : [ ] //type: Schema.Types.ObjectId, ref: 'Snippet',

})

module.exports = mongoose.model('Song', SongSchema)
