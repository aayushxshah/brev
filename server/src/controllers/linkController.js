const User = require('../models/user');
const Link = require('../models/link');
const Log = require('../models/log');

const linkIdGet = async (req, res) => {
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
};

const allLinksGet = async (req, res) => {
    const user_id = req.userId;

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
};

const addLinkPost = async (req, res) => {
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
};

const redirectGet = async (req,res) => {
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
};

module.exports = { linkIdGet, allLinksGet, addLinkPost, redirectGet };