const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, verifyOTP, getNotifications, dismissNotification } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/notifications', protect, getNotifications);
router.delete('/notifications/:id', protect, dismissNotification);

module.exports = router;
