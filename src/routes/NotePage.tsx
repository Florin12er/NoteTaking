import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface Note {
  ID: number;
  title: string;
  dashboard_path: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_NOTE_API;
  const UserApi = import.meta.env.VITE_USER_AUTH_API;

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${ApiUrl}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const truncateContent = (content: string, length: number) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const plainText = doc.body.textContent || "";
    if (plainText.length > length) {
      return plainText.substring(0, length) + "...";
    }
    return plainText;
  };

  const handleDeleteNote = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${ApiUrl}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted note from the state
      setNotes(notes.filter((note) => note.ID !== id));
      alert("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          alert(
            `Failed to delete note: ${error.response?.data?.error || error.message}`,
          );
        }
      } else {
        alert("An unexpected error occurred while deleting the note.");
      }
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${UserApi}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          <div
            key={note.ID}
            className="relative p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200 border-t-4 border-blue-600"
          >
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteNote(note.ID);
                }}
                className="top-0 right-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {note.dashboard_path && (
              <img
                src={`${ApiUrl}/${note.dashboard_path}`}
                alt={note.title}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
            )}

            <Link to={`/note/${note.ID}`} className="block">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                {note.title ? note.title : "untitled"}
              </h2>
              <p className="text-gray-700">
                {truncateContent(note.content, 100)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
