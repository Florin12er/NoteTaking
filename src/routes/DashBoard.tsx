import React from 'react';
import { Outlet } from 'react-router-dom';
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
                    {/* Render the nested routes */}
                    <Outlet />
                </div>
            </motion.main>
        </div>
    );
};

export default DashBoard;

