const mongoose = require('mongoose');
const Log = require('./log');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url : {
        type: String,
        required: true
    },
    shortenedUrl : {
        type: String,
        required: true,
        unique: true
    },
    logs : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Log',
            default: []
        }]
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;