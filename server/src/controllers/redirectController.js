const Link = require('../models/link');
const Log = require('../models/log');

const redirectGet = async (req,res) => {
    const shortenedUrl = req.params.shortenedUrl;
    try{
        const link = await Link.findOne({ shortenedUrl });
        if (link) {
            const log = new Log({ time: Date.now(), ip: req.ip});
            link.logs.push(log._id);
            await log.save();
            await link.save();
            res.status(200).json({url: link.url});
        } else {
            res.status(404).send('invalid');
        }
    } catch(err) {
        res.status(400).send(err.message);
    }
};

module.exports = { redirectGet };