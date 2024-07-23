import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Mail, Lock, Key, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Reset: React.FC = () => {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Reset password attempt for:', email, 'with code:', resetCode);
        // Implement the logic to verify the reset code and update the password
        // If successful, redirect to login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            >
                <div className="flex items-center justify-center mb-8">
                    <Book className="h-10 w-10 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-gray-800">NoteApp</span>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Reset Your Password</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="you@example.com"
                                required
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Reset Code
                        </label>
                        <div className="relative">
                            <input
                                id="resetCode"
                                type="text"
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="Enter reset code"
                                required
                            />
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="Enter new password"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="Confirm new password"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                        >
                            Reset Password
                        </motion.button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500">
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Reset;

