import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window {
    turnstile: any;
  }
}

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [turnstileResponse, setTurnstileResponse] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
    const navigate = useNavigate();
    const turnstileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.onloadTurnstileCallback = () => {
            setIsTurnstileLoaded(true);
        };

        return () => {
            document.body.removeChild(script);
            delete window.onloadTurnstileCallback;
        };
    }, []);

    useEffect(() => {
        if (isTurnstileLoaded && turnstileRef.current) {
            window.turnstile.render(turnstileRef.current, {
                sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
                callback: function(token: string) {
                    setTurnstileResponse(token);
                },
            });
        }
    }, [isTurnstileLoaded]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/register', {
                username: username,
                email: email,
                password: password,
                'cf-turnstile-response': turnstileResponse
            });

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'An error occurred during registration');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
            if (window.turnstile) {
                window.turnstile.reset();
            }
        }
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

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="Username"
                                required
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="turnstile" className="block text-sm font-medium text-gray-700 mb-1">
                            CAPTCHA
                        </label>
                        <div ref={turnstileRef}></div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Sign Up'}
                        </motion.button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;

