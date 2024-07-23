import React from 'react';
import NoteEditor from './Note';
import SideBar from '../components/SideBar';
import { motion } from 'framer-motion';

const DashBoard: React.FC = () => {
    return (
        <div className="h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
            <SideBar />
            <motion.main 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 h-full overflow-y-auto p-6"
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Notes</h1>
                    <NoteEditor />
                </div>
            </motion.main>
        </div>
    );
};

export default DashBoard;

