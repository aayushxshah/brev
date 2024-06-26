const User = require('../models/user');
const Link = require('../models/link');
const Log = require('../models/log');

const linkIdGet = async (req, res) => {
    const linkId = req.params.id;

    try {
        const user = await User.findById(req.userId);
        if (user && user.links.includes(linkId)){
            const link = await Link.findById(linkId).populate('logs');
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

const linkIdDelete = async (req, res) => {
    const linkId = req.params.id;
    try {
        const user = await User.findById(req.userId);
        if (user && user.links.includes(linkId)){

            const index = user.links.indexOf(linkId);
            if (index > -1) {
                user.links.splice(index, 1);
            }
            await user.save();

            const link = await Link.findById(linkId);
            for (let i = 0; i < link.logs.length; i++){
                await Log.findByIdAndDelete(link.logs[i]);
            }

            await Link.findByIdAndDelete(linkId);

            res.status(200).json({message: 'link deleted'});
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
            console.log(`userID: ${user_id}`);
            return res.status(400).json({message: 'Invalid ID'});
        } else {
            res.status(200).json(user.links);
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

const addLinkPost = async (req, res) => {
    const user_id = req.userId;
    const { url, shortenedUrl } = req.body;
    // const link = { url, shortenedUrl };

    try {
        const linkExists = await Link.findOne({ shortenedUrl });
        if (linkExists) {
            res.status(400).json({ message: 'alias already exists '});
        } else {
            const link = new Link({ url, shortenedUrl });
            await link.save();
            const user = await User.findById(user_id);
            user.links.push(link._id);
            await user.save();
            res.status(201).json(link);
        }
    } catch(err) {
        res.status(500).send(err.message);
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

module.exports = { linkIdGet, linkIdDelete, allLinksGet, addLinkPost, redirectGet };