var mongoose = require("mongoose");

var momentSchema = mongoose.Schema({
  emotion: { type: String, required: true, possibleValues: ['happy','sad','angry','scared','disgusted','surprised']},
  description: { type: String},
  longitude : { type: Number},
  latitude : { type: Number},
  user : {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Moment', momentSchema);