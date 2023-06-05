const express = require('express');

const router = express.Router();
const validateUserSchema = require('../middleware/user_validation');
const { userSchema, emailSchema } = require('../validators/schemas');
const verifyToken = require('../middleware/verify_token');

const {
  signUp, login, getUserProfile, forgotPassword, updatePassword,
} = require('../controllers/auth_controller');

router.post('/register', validateUserSchema(userSchema), signUp);
router.post('/forgot_password', validateUserSchema(emailSchema), forgotPassword);
router.post('/update_password', updatePassword);
// router.route('/register').post(signUp);
router.route('/login').post(login);
router.get('/get_profile', verifyToken, getUserProfile);

module.exports = router;
