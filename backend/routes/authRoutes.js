const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

// POST /api/v1/auth/register  (Student registration)
router.post('/register', authController.registerStudent);

// POST /api/v1/auth/login  (Universal login — all roles)
router.post('/login', authController.login);

// GET /api/v1/auth/me  (Protected — returns current user info)
router.get('/me', authenticate, authController.getMe);

module.exports = router;
