const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const User = require('./src/models/user');
const Link = require('./src/models/link');
const Log = require('./src/models/log');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const secretKey = process.env.SECRET;

const app = express();

const dbURI = `mongodb+srv://link-shortener:${dbPassword}@link-shortener.zkk3kzm.mongodb.net/link-shortener-database?retryWrites=true&w=majority&appName=link-shortener`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch(err => console.error(err));

app.use(express.json());
app.use(bodyParser.json());

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
        // console.log(decoded.id);
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
};

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username, password);
        res.status(200).json({ message: 'Success: Login', token: createToken(user._id) });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/api/signup', async (req,res) => {
    const {username, password} = req.body;
    try {
        const user = await User.signup(username, password);
        res.status(200).json({ message: 'Success: Account Created', token: createToken(user._id) });
    } catch(err) {
        res.status(400).send(err.message);
    }
})

app.get('/api/link/:id', authenticateToken, async (req, res) => {
    const link_id = req.params.id;

    try {
        const user = await User.findById(req.userId);
        if (user && user.links.includes(link_id)){
            const link = await Link.findById(link_id).populate('logs');
            if (link) {
                res.json(link);
            } else {
                res.status(400).json({message: 'Invalid link id'});
            }
        } else {
            res.status(400).json({message: 'Invalid user id'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/api/all-links', authenticateToken, async (req, res) => {
    const user_id = req.userId;
    console.log(user_id);

    try {
        const user = await User.findById(user_id).populate('links');
        if (!user){
            return res.status(404).json({message: 'Invalid ID'});
        } else {
            res.json(user.links);
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

app.post('/api/add-link', authenticateToken, async (req, res) => {
    const user_id = req.userId;
    const { url, shortenedUrl } = req.body;
    const link = { url, shortenedUrl };

    try {
        const link = new Link({ url, shortenedUrl });
        await link.save();
        const user = await User.findById(user_id);
        user.links.push(link._id);
        await user.save();
        res.status(201).json(link);
    } catch(err) {
        res.status(400).send(err.message);
    }
});

app.get('/api/redirect/:shortenedUrl', async (req,res) => {
    const shortenedUrl = req.params.shortenedUrl;
    try{
        const link = await Link.findOne({ shortenedUrl });
        if (link) {
            const log = new Log({ time: Date.now(), ip: req.ip});
            link.logs.push(log._id);
            await log.save();
            await link.save();
            res.status(200).send(link.url);
        } else {
            res.status(404).send('invalid');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }

});