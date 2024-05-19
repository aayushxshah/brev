const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const secretKey = process.env.SECRET;

const createToken = (_id) => {
    return jwt.sign({_id}, secretKey, { expiresIn: '1d' });
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded._id;
        console.log('userauth', req.userId);
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
};

const loginPost = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username, password);
        res.status(200).json({ message: 'Success: Login', token: createToken(user._id) });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

const signupPost = async (req,res) => {
    const {username, password} = req.body;
    try {
        const user = await User.signup(username, password);
        res.status(200).json({ message: 'Success: Account Created', token: createToken(user.id) });
    } catch(err) {
        res.status(400).send(err.message);
    }
};

module.exports = { authenticateToken, loginPost, signupPost };