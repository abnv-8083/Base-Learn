/**
 * requireRole - Factory middleware that checks if the authenticated user
 * has one of the allowed roles.
 *
 * Usage: router.get('/admin-only', authenticate, requireRole('admin'), handler)
 * Usage: router.get('/staff', authenticate, requireRole('admin', 'faculty'), handler)
 */
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated.'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}.`
            });
        }

        next();
    };
};

module.exports = requireRole;
