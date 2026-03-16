const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'baselearn_dev_secret_key_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// ─── Mock User "Database" ────────────────────────────────────────────────────
// In production, replace these with real DB queries.
const MOCK_USERS = [
    { id: 'usr-001', fullName: 'Arjun Sharma',  email: 'student@test.com',    password: 'password123', role: 'student',    grade: '10' },
    { id: 'usr-002', fullName: 'Dr. Priya Rao', email: 'instructor@test.com', password: 'password123', role: 'instructor' },
    { id: 'usr-003', fullName: 'Prof. Meena',   email: 'faculty@test.com',    password: 'password123', role: 'faculty' },
    { id: 'usr-004', fullName: 'Admin User',     email: 'admin@test.com',      password: 'password123', role: 'admin' },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const signToken = (user) => {
    return jwt.sign(
        { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// ─── POST /api/v1/auth/register (Student only) ───────────────────────────────
exports.registerStudent = async (req, res, next) => {
    try {
        const { fullName, grade, email, password, phone } = req.body;

        if (!fullName || !grade || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide full name, grade, email, and password'
            });
        }

        const newUser = {
            id: 'usr-' + Date.now(),
            fullName,
            email,
            grade,
            phone: phone || null,
            role: 'student',
        };

        const token = signToken(newUser);

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: { user: newUser, token }
        });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/v1/auth/login (All roles) ────────────────────────────────────
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Look up user in mock store
        const user = MOCK_USERS.find(u => u.email === email);

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = signToken(user);
        const { password: _pw, ...safeUser } = user; // strip password from response

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user: safeUser, token }
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/v1/auth/me (Protected) ────────────────────────────────────────
exports.getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        data: { user: req.user }
    });
};

// ─── Legacy: loginStudent (kept for backward-compat, uses new logic) ────────
exports.loginStudent = async (req, res, next) => {
    // Map the old 'emailOrPhone' field to the new 'email' field
    req.body.email = req.body.emailOrPhone || req.body.email;
    return exports.login(req, res, next);
};
