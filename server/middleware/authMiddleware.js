const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Instructor = require('../models/Instructor');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

            // Search across all models for the ID
            let user = await Admin.findById(decoded.id).select('-password');
            if (!user) user = await Instructor.findById(decoded.id).select('-password');
            if (!user) user = await Faculty.findById(decoded.id).select('-password');
            if (!user) user = await Student.findById(decoded.id).select('-password');
            
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            
            req.user = user;
            req.user.userId = user._id;

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role: ${req.user?.role} is not authorized` });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };
