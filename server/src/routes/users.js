const express = require('express');
const router = express.Router();
const checkRoles = require('../middlewares/checkRoles');
const { getAllUsers } = require('../controllers/usersController');

router.get("/", checkRoles("user"), getAllUsers);

module.exports = router;