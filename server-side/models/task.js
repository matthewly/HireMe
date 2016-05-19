var mongoose = require('mongoose');

var TaskSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, defualt: ""},
  deadline: {type: Date, required: true},
  completed: {type: Boolean, default: false},
  assignedUser: {type: String, default: ""},
  assignedUserName: {type: String, default: "unassigned"},
  dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);
