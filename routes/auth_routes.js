const express = require('express');

const router = express.Router();

const { signUp, login, checkToken } = require('../controllers/auth_controller');

router.route('/register').post(signUp);
router.route('/login').post(login);
router.route('/getProfile').get(checkToken);

module.exports = router;
