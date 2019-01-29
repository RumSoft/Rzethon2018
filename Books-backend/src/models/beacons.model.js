const mongoose = require('mongoose');

const BeaconsSchema = mongoose.Schema({
    line: { type: String, unique: true, require: true },
    beaconsTagName: { type: String, unique: true, require: true },
    usersToday: { type: Number, default: false },
    readingUsersToday: { type: Number, default: false }
});

module.exports = mongoose.model('Beacons', BeaconsSchema);