// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DashBoard from './routes/DashBoard';
import NoteEditor from './routes/Note';
const App: React.FC = () => {
  return (
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:underline">Home</Link></li>
            <li><Link to="/note" className="text-blue-500 hover:underline">Note</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/note" element={<NoteEditor />} />
        </Routes>
      </div>
  );
};

export default App;

