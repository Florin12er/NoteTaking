// src/components/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

interface Note {
    ID: number;
    title: string;
    dashboard_path: string;
    content: string;
}

const HomePage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/notes', { withCredentials: true });
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const truncateContent = (content: string, length: number) => {
        if (content.length > length) {
            return content.substring(0, length) + '...';
        }
        return content;
    };

    const handleDeleteNote = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/notes/${id}`, { withCredentials: true });
            setNotes(notes.filter(note => note.ID !== id));
            alert('Note deleted successfully!');
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note.');
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = () => {
        // Clear the cookie by setting it to expire immediately
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login');
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600">Your Notes</h1>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div key={note.ID} className="relative p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 border-t-4 border-blue-600">
                        <Link to={`/note/${note.ID}`} className="block">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-2">{note.title}</h2>
                            {note.dashboard_path && <img src={note.dashboard_path} alt={note.title} className="w-full h-32 object-cover mb-2 rounded-md" />}
                            <p className="text-gray-700">{truncateContent(note.content, 100)}</p>
                        </Link>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteNote(note.ID);
                            }}
                            className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

