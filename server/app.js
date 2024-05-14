const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const User = require('./src/models/user');
const Link = require('./src/models/link');

require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;

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

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ message: 'Login successful', userId: user._id });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/new-user', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userExists = await !!User.findOne({ username });
        if (!userExists) {
            res.status(401).send('username exists');
        } else {
            const user = new User({ username, password });
            user.save();
            res.status(200).send('account made');
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
})

app.get('/api/link/:id', async (req, res) => {
    const link_id = req.params.id;
    const user_id = req.get('Authorization');

    try {
        const user = await User.findById(user_id);
        if (user && user.links.includes(link_id)){
            const link = Link.findById(link_id);
            if (link) {
                res.json(await Link.findById(link_id));
            } else {
                res.status(404).send('Invalid link id');
            }
        } else {
            res.status(404).send('Invalid user id');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/api/all-links', async (req, res) => {
    const user_id = req.get('Authorization');

    try {
        const user = await User.findById(user_id).populate('links');
        if (!user){
            return res.status(404).send('Invalid ID');
        } else {
            res.json(user.links);
        }
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/add-link', async (req, res) => {
    const user_id = req.get('Authorization');
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
            const time = Date.now();
            link.log.push({
                time,
                ip: req.ip
            });
            await link.save();
            res.status(200).send(link.url);
        } else {
            res.status(404).send('invalid');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }

});