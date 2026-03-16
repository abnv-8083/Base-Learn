import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

const ROLE_CONFIG = {
    admin: {
        label: 'Administrator',
        icon: 'ph-shield-check',
        color: 'blue',
        redirect: '/admin',
        description: 'System administration and platform management'
    },
    instructor: {
        label: 'Instructor',
        icon: 'ph-chalkboard-teacher',
        color: 'orange',
        redirect: '/instructor',
        description: 'Manage your courses, students, and content'
    },
    faculty: {
        label: 'Faculty',
        icon: 'ph-users-three',
        color: 'purple',
        redirect: '/faculty',
        description: 'Department oversight and resource planning'
    }
};

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const roleParam = searchParams.get('role') || 'instructor';
    const config = ROLE_CONFIG[roleParam] || ROLE_CONFIG.instructor;

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const colorMap = {
        blue: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-500', ring: 'focus:ring-blue-200' },
        orange: { bg: 'bg-orange-600', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-500', ring: 'focus:ring-orange-200' },
        purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-500', ring: 'focus:ring-purple-200' },
    };
    const colors = colorMap[config.color];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Invalid credentials');
            }

            const { user, token } = data.data;

            // Verify the returned role matches what they logged in as
            if (user.role !== roleParam) {
                throw new Error(`This account has role '${user.role}', not '${roleParam}'.`);
            }

            // Store token and user info
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUser', JSON.stringify(user));

            // Redirect to the correct portal
            navigate(config.redirect, { replace: true });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Left Panel - Branding */}
            <div className={`hidden lg:flex lg:w-1/2 flex-col justify-between p-12 ${colors.bg} text-white`}>
                <div className="flex items-center gap-3">
                    <i className="ph-fill ph-book-open text-4xl"></i>
                    <span className="text-2xl font-bold tracking-tight">Base Learn</span>
                </div>
                <div>
                    <div className={`w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-8 text-4xl`}>
                        <i className={`ph-fill ${config.icon}`}></i>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">{config.label} Portal</h1>
                    <p className="text-white text-opacity-80 text-lg leading-relaxed">{config.description}</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {Object.entries(ROLE_CONFIG).map(([key, val]) => (
                        <Link 
                            key={key}
                            to={`/login?role=${key}`}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${key === roleParam ? 'bg-white text-gray-900' : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'}`}
                        >
                            {val.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className={`lg:hidden flex items-center gap-2 mb-8 ${colors.text}`}>
                        <i className="ph-fill ph-book-open text-2xl"></i>
                        <span className="text-xl font-bold">Base Learn</span>
                    </div>

                    <div className={`w-12 h-12 ${colors.light} ${colors.text} rounded-xl flex items-center justify-center mb-6 text-2xl`}>
                        <i className={`ph-fill ${config.icon}`}></i>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Sign in</h2>
                    <p className="text-gray-500 mb-8">
                        Logging in as <span className="font-semibold text-gray-700">{config.label}</span>
                        <Link to={`/student/login`} className="ml-3 text-sm text-blue-600 hover:underline font-semibold">
                            Are you a student?
                        </Link>
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium flex items-center gap-2">
                            <i className="ph-fill ph-warning-circle text-lg shrink-0"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder={`${roleParam}@test.com`}
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-transparent ${colors.ring} focus:ring-4 transition text-gray-900`}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className={`text-sm font-semibold ${colors.text} hover:underline`}>
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-transparent ${colors.ring} focus:ring-4 transition text-gray-900`}
                            />
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 border border-gray-200">
                            <p className="font-bold text-gray-600 mb-1">Demo Credentials:</p>
                            <p><span className="font-semibold">Email:</span> {roleParam}@test.com</p>
                            <p><span className="font-semibold">Password:</span> password123</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 ${colors.bg} text-white rounded-xl font-bold text-base hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md`}
                        >
                            {loading ? (
                                <><i className="ph ph-spinner-gap animate-spin text-xl"></i> Signing In...</>
                            ) : (
                                <><i className="ph ph-sign-in text-xl"></i> Sign In</>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        <Link to="/" className="hover:text-gray-600 font-semibold transition">← Back to Home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
