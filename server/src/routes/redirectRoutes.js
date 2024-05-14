const express = require('express');
const router = express.Router();
const { redirectGet } = require('../controllers/redirectController');

router.get('/:shortenedUrl', redirectGet);

module.exports = router