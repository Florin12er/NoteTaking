// src/App.tsx
import React from 'react';
import "highlight.js/styles/base16/dracula.css"
import { Routes, Route} from 'react-router-dom';
import DashBoard from './routes/DashBoard';
import  Home  from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ResetRequest from './routes/ResetRequest';
import Reset from './routes/ResetPassword';
const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
                <Route path="/note" element={<DashBoard />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset-request" element={<ResetRequest/>}/>
                <Route path="/reset-password" element={<Reset/>}/>
            </Routes>
    );
};

export default App;

