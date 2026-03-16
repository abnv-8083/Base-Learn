import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Decodes the payload of a JWT without a library.
 * Returns null if the token is invalid or expired.
 */
const decodeToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        // Check expiry (exp is in seconds, Date.now() is ms)
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return null; // Token expired
        }
        return decoded;
    } catch {
        return null;
    }
};

/**
 * Get the login redirect URL for a given role.
 */
const getLoginUrlForRole = (role) => {
    if (role === 'student') return '/student/login';
    return `/login?role=${role}`;
};

/**
 * ProtectedRoute - Guards a route by authentication AND role.
 *
 * Props:
 *  - allowedRoles: string[]  e.g. ['student'] or ['admin', 'faculty']
 *  - children: ReactNode
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();

    const token = localStorage.getItem('authToken')
        || localStorage.getItem('studentToken'); // legacy fallback

    const user = decodeToken(token);

    // Not authenticated at all
    if (!user) {
        const loginUrl = allowedRoles?.length
            ? getLoginUrlForRole(allowedRoles[0])
            : '/student/login';
        return <Navigate to={loginUrl} state={{ from: location }} replace />;
    }

    // Authenticated but wrong role
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
