const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    time: {
        type: Date,
        required: true
    },
    ip: {
        type: String,
        required: true
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;