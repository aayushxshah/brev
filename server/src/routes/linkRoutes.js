const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/userController');
const { linkIdGet, allLinksGet, addLinkPost, redirectGet, linkIdDelete } = require('../controllers/linkController');

router.get('/all-links', authenticateToken, allLinksGet);
router.post('/add-link', authenticateToken, addLinkPost);
router.get('/:id', authenticateToken, linkIdGet);
router.delete('/:id', authenticateToken, linkIdDelete);
router.get('/redirect/:shortenedUrl', redirectGet);

module.exports = router