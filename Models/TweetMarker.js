var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MarkerSchema = new Schema({
    count: Number,
    time: Date,
    hastags: [String]
});

module.exports = mongoose.model('marker', MarkerSchema);
