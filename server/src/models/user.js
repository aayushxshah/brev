const mongoose = require('mongoose');
const Link = require('./link');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    links : [{
        type: Schema.Types.ObjectId,
        ref: 'Link'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;