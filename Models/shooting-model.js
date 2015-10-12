var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShootingSchema = new Schema({
    time: Date,
    link: String
});

module.exports = mongoose.model('shootings', ShootingSchema);