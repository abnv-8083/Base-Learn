const adminController = require('./server/controllers/adminController');
const adminRoutes = [
    'getDashboardStats', 'getUsers', 'createUser', 'updateUser', 'deleteUser', 
    'toggleUserStatus', 'getFacultyDetails', 'approveProfileRequest', 'getClasses', 
    'createClass', 'updateClass', 'getClassDetails', 'deleteClass', 'getActivityLogs', 
    'getProfileRequests', 'rejectProfileRequest', 'getStudentDetails', 
    'getInstructorDetails', 'uploadImage'
];

adminRoutes.forEach(fn => {
    if (typeof adminController[fn] !== 'function') {
        console.log(`❌ ERROR: adminController.${fn} is ${typeof adminController[fn]}`);
    } else {
        console.log(`✅ adminController.${fn} is OK`);
    }
});
