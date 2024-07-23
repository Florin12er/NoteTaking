// src/components/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Note {
    id: number;
    title: string;
    dashboard_path: string;
    content: string;
}

const HomePage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/notes', { withCredentials: true });
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const truncateContent = (content: string, length: number) => {
        if (content.length > length) {
            return content.substring(0, length) + '...';
        }
        return content;
    };

    return (
        <>
        <div className="p-6 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Your Notes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <Link to={`/notes/${note.id}`} key={note.id} className="block p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 border-t-4 border-blue-600">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">{note.title}</h2>
                        {note.dashboard_path && <img src={note.dashboard_path} alt={note.title} className="w-full h-32 object-cover mb-2 rounded-md" />}
                        <p className="text-gray-700">{truncateContent(note.content, 100)}</p>
                    </Link>
                ))}
            </div>
        </div>
            </>
    );
};

export default HomePage;

