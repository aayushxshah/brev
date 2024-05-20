const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    links : [{
        type: Schema.Types.ObjectId,
        ref: 'Link',
        default: []
    }]
});

userSchema.statics.signup = async function(username, password){
    const exists = await this.findOne({ username });

    if (exists){
        throw new Error('username taken');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        username,
        password: hash
    });

    return user;
};

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({ username });
    if (!user){
        throw new Error('invalid username');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('incorrect password');
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;