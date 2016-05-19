// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var LlamaSchema   = new mongoose.Schema({
  name: String,
  height: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Llama', LlamaSchema);
