import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResetRequest: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Reset password request for:', email);
        // Implement the logic to send a reset code to the email
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
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                        >
                            Send Reset Code
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

export default ResetRequest;

