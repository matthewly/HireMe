var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SearchSchema = new Schema({
    location: {type: String},
    job_type: {type: String},
});

module.exports = mongoose.model('Search', SearchSchema);
