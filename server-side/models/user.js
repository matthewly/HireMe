var mongoose = require('mongoose');

var UserSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pendingTasks: {type: [String]},
  dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
