const express = require('express');

const router = express.Router();
const validateUserSchema = require('../middleware/user_validation');
const userSchema = require('../validators/schemas');

const { signUp, login, checkToken } = require('../controllers/auth_controller');

router.post('/register', validateUserSchema(userSchema), signUp);
// router.route('/register').post(signUp);
router.route('/login').post(login);
router.route('/getProfile').get(checkToken);

module.exports = router;
