const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/userController');
const { linkIdGet, allLinksGet, addLinkPost, redirectGet } = require('../controllers/linkController');

router.get('/:id', authenticateToken, linkIdGet);
router.get('/all-links', authenticateToken, allLinksGet);
router.post('/add-link', authenticateToken, addLinkPost);
router.get('/redirect/:shortenedUrl', redirectGet);

module.exports = router