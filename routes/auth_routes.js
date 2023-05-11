const express = require('express');

const router = express.Router();

const { signUp, login } = require('../controllers/auth_controller');

router.route('/register').post(signUp);
router.route('/login').post(login);

module.exports = router;
