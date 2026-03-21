const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getDashboard,
  getRecordedClasses,
  getLiveClasses,
  getAssignments,
  getTests,
  getMainAssessments,
  getLiveFaqSessions,
  updateProfile,
  mockPayment
} = require('../controllers/studentController');

// All routes require authentication
router.use(protect);

// Optionally enforce 'student' role via authorizeRoles('student') 
// but for scaffolding we'll just let any authenticated user hit them for easy testing
// router.use(authorizeRoles('student'));

router.get('/dashboard', getDashboard);
router.get('/recorded-classes', getRecordedClasses);
router.get('/live-classes', getLiveClasses);
router.get('/assignments', getAssignments);
router.get('/tests', getTests);
router.get('/main-assessments', getMainAssessments);
router.get('/faq/live-sessions', getLiveFaqSessions);
router.put('/profile', updateProfile);
router.post('/pay', mockPayment);

module.exports = router;
