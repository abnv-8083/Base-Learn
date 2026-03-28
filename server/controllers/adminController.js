const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Instructor = require('../models/Instructor');
const StudyClass = require('../models/StudyClass');
const Subject = require('../models/Subject');
const Batch = require('../models/Batch');
const ActivityLog = require('../models/ActivityLog');
const LiveClass = require('../models/LiveClass');
const RecordedClass = require('../models/RecordedClass');
const ProfileRequest = require('../models/ProfileRequest');
const logAction = require('../utils/logAction');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Helper to find a user across all collections
const findUserById = async (id) => {
    let user = await Student.findById(id);
    if (!user) user = await Faculty.findById(id);
    if (!user) user = await Instructor.findById(id);
    if (!user) user = await Admin.findById(id);
    return user;
};

const getModelByRole = (role) => {
    if (role === 'student') return Student;
    if (role === 'faculty') return Faculty;
    if (role === 'instructor') return Instructor;
    if (role === 'admin') return Admin;
    return null;
};

// GET /api/admin/dashboard
exports.getDashboardStats = asyncHandler(async (req, res) => {
    const [students, faculty, instructors, classes, subjects] = await Promise.all([
        Student.countDocuments(),
        Faculty.countDocuments(),
        Instructor.countDocuments(),
        StudyClass.countDocuments(),
        Subject.countDocuments(),
    ]);

    const paidStudents = await Student.countDocuments({ hasPaid: true });
    const revenue = `₹${(paidStudents * 3500).toLocaleString('en-IN')}`;

    res.status(200).json({ students, faculty, instructors, classes, subjects, revenue, enrollments: paidStudents });
});

// GET /api/admin/users?role=student|faculty|instructor
exports.getUsers = asyncHandler(async (req, res) => {
    const { role } = req.query;
    const Model = getModelByRole(role);
    if (!Model) return res.status(400).json({ message: 'Invalid role requested' });

    const users = await Model.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
});

// POST /api/admin/users
exports.createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, ...rest } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing required fields' });

    const Model = getModelByRole(role);
    if (!Model) return res.status(400).json({ message: 'Invalid role' });

    const exists = await Model.findOne({ email });
    if (exists) return res.status(400).json({ message: `A ${role} with this email already exists.` });

    const user = await Model.create({ name, email, password, role, isVerified: true, ...rest });
    
    await logAction(req, `Created ${role}`, `User: ${user.name}`, { targetId: user._id, targetModel: role.charAt(0).toUpperCase() + role.slice(1) });

    if (role === 'faculty' || role === 'instructor') {
        try {
            const portalUrl = `${req.protocol}://${req.get('host')}`;
            const html = `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #6366f1; margin: 0;">Base Learn</h1>
                        <p style="color: #64748b; margin: 5px 0 0 0;">Education Platform</p>
                    </div>
                    <div style="padding: 24px; background: #f8fafc; border-radius: 8px;">
                        <h2 style="color: #1e293b; margin-top: 0;">Welcome, ${name}!</h2>
                        <p style="color: #475569; line-height: 1.6;">Your ${role} account has been created. Use the credentials below to log in:</p>
                        <div style="margin: 24px 0; padding: 16px; background: white; border: 1px solid #cbd5e1; border-radius: 6px;">
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Password:</strong> ${password}</p>
                        </div>
                        <p style="color: #ef4444; font-size: 13px;">⚠️ Change your password after first login.</p>
                        <div style="margin-top: 32px; text-align: center;">
                            <a href="${portalUrl}" style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Login Portal</a>
                        </div>
                    </div>
                </div>`;
            await sendEmail({ email: user.email, subject: `Welcome to Base Learn - Your ${role} Credentials`, html });
        } catch (e) { console.error('Email fail:', e.message); }
    }

    res.status(201).json(user);
});

// PUT /api/admin/users/:id
exports.updateUser = asyncHandler(async (req, res) => {
    const { role } = req.body;
    let Model = getModelByRole(role);
    let user;

    if (Model) {
        user = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    } else {
        // Fallback: search all if role not provided
        const models = [Student, Faculty, Instructor, Admin];
        for (const M of models) {
            user = await M.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
            if (user) break;
        }
    }

    if (!user) return res.status(404).json({ message: 'User not found' });
    await logAction(req, 'Updated User', `User: ${user.name}`, { targetId: user._id, targetModel: user.role });
    res.status(200).json(user);
});

// DELETE /api/admin/users/:id
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const Model = getModelByRole(user.role);
    await logAction(req, 'Deleted User', `User: ${user.name}`, { targetId: user._id, targetModel: user.role });
    await Model.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'User deleted' });
});

// PATCH /api/admin/users/:id/status
exports.toggleUserStatus = asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const Model = getModelByRole(user.role);
    user.isActive = req.body.isActive;
    await user.save();

    const action = user.isActive ? 'Activated User' : 'Blocked User';
    await logAction(req, action, `User: ${user.name}`, { targetId: user._id, targetModel: user.role });

    res.status(200).json(user);
});

// ---- CLASS CRUD ----
exports.getClasses = asyncHandler(async (req, res) => {
    const classes = await StudyClass.find({}).sort({ createdAt: -1 });
    res.status(200).json(classes);
});

exports.createClass = asyncHandler(async (req, res) => {
    const { name, targetGrade } = req.body;
    const instructor = await Instructor.findOne({}) || await Admin.findOne({});
    
    const studyClass = await StudyClass.create({
        name,
        targetGrade,
        instructor: instructor?._id || req.user.userId
    });

    await logAction(req, 'Created Class', `Class: ${name}`, { targetId: studyClass._id, targetModel: 'StudyClass' });
    res.status(201).json(studyClass);
});

exports.updateClass = asyncHandler(async (req, res) => {
    const studyClass = await StudyClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studyClass) return res.status(404).json({ message: 'Class not found' });
    await logAction(req, 'Updated Class', `Class: ${studyClass.name}`, { targetId: studyClass._id, targetModel: 'StudyClass' });
    res.status(200).json(studyClass);
});

exports.deleteClass = asyncHandler(async (req, res) => {
    const studyClass = await StudyClass.findById(req.params.id);
    if (studyClass) {
        await logAction(req, 'Deleted Class', `Class: ${studyClass.name}`, { targetId: studyClass._id, targetModel: 'StudyClass' });
        await StudyClass.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({ message: 'Class deleted' });
});

exports.getClassDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const studyClass = await StudyClass.findById(id).lean();
    if (!studyClass) return res.status(404).json({ message: 'Class not found' });

    const batches = await Batch.find({ studyClass: id })
        .populate('instructor', 'name email')
        .lean();

    const result = batches.map(batch => ({
        ...batch,
        studentCount: batch.students?.length || 0
    }));

    res.status(200).json({
        studyClass,
        batches: result,
        totalStudents: result.reduce((acc, b) => acc + b.studentCount, 0)
    });
});

exports.getActivityLogs = asyncHandler(async (req, res) => {
    const { role } = req.query;
    const filter = role && role !== 'all' ? { actorRole: role } : {};
    const logs = await ActivityLog.find(filter).sort({ createdAt: -1 }).limit(100);
    res.status(200).json(logs);
});

// GET /api/admin/faculty/:id/details
exports.getFacultyDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const faculty = await Faculty.findById(id).select('-password');
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

    // 1. Stats from Live Classes
    const liveClasses = await LiveClass.find({ faculty: id });
    const stats = {
        totalClasses: liveClasses.length,
        completedClasses: liveClasses.filter(c => c.status === 'completed').length,
        totalStudentsReached: liveClasses.reduce((acc, c) => acc + (c.attendance?.filter(a => a.attended).length || 0), 0),
        subjectsTaught: [...new Set(liveClasses.map(c => c.subject))]
    };

    // 2. Recent Live Classes
    const recentLive = await LiveClass.find({ faculty: id })
        .sort({ scheduledAt: -1 })
        .limit(5);

    // 3. Uploaded Content (Recorded Classes)
    const uploadedContent = await RecordedClass.find({ faculty: id })
        .sort({ createdAt: -1 })
        .limit(10);

    // 4. Pending Profile Requests
    const pendingRequests = await ProfileRequest.find({ faculty: id, status: 'pending' });

    res.status(200).json({
        faculty,
        stats,
        recentClasses: recentLive,
        uploadedContent,
        pendingRequests
    });
});

// POST /api/admin/faculty/approve-request/:requestId
exports.approveProfileRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    const request = await ProfileRequest.findById(requestId).populate('faculty');
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (action === 'reject') {
        request.status = 'rejected';
        await request.save();
        return res.status(200).json({ message: 'Request rejected' });
    }

    const { faculty, type, newValue } = request;

    if (type === 'email') {
        const oldEmail = faculty.email;
        faculty.email = newValue;
        await faculty.save();

        // Notify new email
        try {
            await sendEmail({
                email: newValue,
                subject: 'Email Updated - Base Learn',
                html: `<h1>Email Updated</h1><p>Your faculty account email has been updated to this address by Admin.</p>`
            });
        } catch (e) { console.error('Email fail:', e.message); }

        request.status = 'approved';
        await request.save();
        await logAction(req, 'Approved Email Change', `Faculty: ${faculty.name} (${oldEmail} -> ${newValue})`);
    }

    if (type === 'password') {
        const tempPassword = crypto.randomBytes(4).toString('hex'); // 8 char random hex
        faculty.password = tempPassword;
        await faculty.save();

        // Send temp password to faculty
        try {
            await sendEmail({
                email: faculty.email,
                subject: 'New Password Generated - Base Learn',
                html: `<h1>Password Reset</h1><p>Your request for a password reset was approved. Your new temporary password is: <strong>${tempPassword}</strong></p><p>Please log in and change it immediately.</p>`
            });
        } catch (e) { console.error('Email fail:', e.message); }

        request.status = 'approved';
        await request.save();
        await logAction(req, 'Approved Password Reset', `Faculty: ${faculty.name}`);
    }

    res.status(200).json({ message: 'Request approved and processed' });
});
