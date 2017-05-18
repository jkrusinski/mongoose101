var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  phone: Number,
  admin: Boolean
});

module.exports = mongoose.model('user', userSchema);
