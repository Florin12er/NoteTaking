import React, { useState } from 'react';
import { Book, PenTool, Layout, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
            <header className="bg-white shadow-lg">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Book className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-2xl font-bold text-blue-600">NoteApp</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openModal}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Try App
                    </motion.button>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl font-bold mb-6 text-blue-800"
                    >
                        Capture Your Thoughts with Ease
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl mb-10 text-gray-700 max-w-2xl mx-auto"
                    >
                        Organize, collaborate, and bring your ideas to life with our intuitive note-taking app.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openModal}
                        className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        Start Taking Notes
                    </motion.button>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { icon: PenTool, title: "Easy Note-Taking", description: "Jot down your ideas quickly and effortlessly." },
                        { icon: Layout, title: "Organize Your Thoughts", description: "Categorize and structure your notes with ease." },
                        { icon: Users, title: "Collaborate Seamlessly", description: "Share and work together on projects in real-time." },
                    ].map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 * index }}
                            className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <feature.icon className="h-16 w-16 mx-auto text-blue-600 mb-6" />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h2>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </main>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
                        >
                            <button 
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Join NoteApp</h2>
                            <Link
                                to="/login"
                                className="block w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300 mb-4 text-center font-semibold shadow-md hover:shadow-lg"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition duration-300 mb-6 text-center font-semibold shadow-md hover:shadow-lg"
                            >
                                Register
                            </Link>
                            <button className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition duration-300 mb-4 flex items-center justify-center font-semibold shadow-md hover:shadow-lg">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2"><path fill="currentColor" d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path></svg>
                                Login with GitHub
                            </button>
                            <button className="w-full bg-white text-black py-3 rounded-full hover:bg-zinc-200 transition duration-300 flex items-center justify-center font-semibold shadow-md hover:shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                                    Login with Google
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;

