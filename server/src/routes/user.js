const express = require('express');
const router = express.Router();
const { register, login, logout, refreshToken } = require('../controllers/authController');

router.post("/register", register);
router.post("/login", login);
router.get('/logout', logout);
router.get('/refreshToken', refreshToken);

module.exports = router;