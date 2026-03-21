const ActivityLog = require('../models/ActivityLog');

/**
 * Log an action performed by an authenticated user.
 * Call this inside any controller that performs a meaningful action.
 *
 * @param {Object} req        - Express request (must have req.user populated)
 * @param {string} action     - Short description, e.g. 'Uploaded Video'
 * @param {string} target     - Human-readable target, e.g. 'Student: Arjun Kumar'
 * @param {Object} [options]  - Optional: { targetId, targetModel, details }
 */
const logAction = async (req, action, target = '', options = {}) => {
    try {
        await ActivityLog.create({
            actor: req.user?.userId || req.user?._id,
            actorName: req.user?.name || 'Unknown',
            actorRole: req.user?.role || 'unknown',
            action,
            target,
            targetId: options.targetId || null,
            targetModel: options.targetModel || null,
            details: options.details || null,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        });
    } catch (err) {
        // Log silently — never let audit logging break the main request
        console.error('[ActivityLog] Failed to log action:', err.message);
    }
};

module.exports = logAction;
