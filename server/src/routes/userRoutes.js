const express = require('express');
const router = express.Router();
const { loginPost, signupPost } = require('../controllers/userController');

router.post('/login', loginPost);
router.post('/api/signup', signupPost);

module.exports = router