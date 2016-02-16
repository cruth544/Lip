var mongoose = require('mongoose')

var SnippetSchema = mongoose.Schema({
  name      : { type: String, required: true },
  owner     : String,
  startTime : Number,
  endTime   : Number
  video     : [ String ]
})



module.exports = mongoose.model('Snippet', SnippetSchema)
