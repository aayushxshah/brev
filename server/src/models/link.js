const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url : {
        type: String,
        required: true
    },
    shortenedUrl : {
        type: String,
        required: true
    },
    log : {
        type: [{
            time: Date,
            ip: String
        }]
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;