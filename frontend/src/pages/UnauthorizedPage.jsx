import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ph-fill ph-lock-key text-5xl text-red-500"></i>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Access Denied</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    You don't have permission to view this page. Please make sure you're logged in with the correct account role.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        onClick={() => window.history.back()} 
                        className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                    <Link 
                        to="/" 
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
