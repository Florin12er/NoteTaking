import React, { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import BlockMenu from "../components/BlockMenu";
import BubbleMenuContent from "../components/BubbleMenuContent";
import EditorConfig from "../components/EditorConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Undo, Redo, Copy, Save, Upload } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteEditor: React.FC = () => {
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [title, setTitle] = useState("");
  const [dashboardImage, setDashboardImage] = useState<File | null>(null);
  const [dashboardImagePreview, setDashboardImagePreview] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const ApiUrl = import.meta.env.VITE_NOTE_API;

  const editor = useEditor({
    ...EditorConfig,
    onUpdate: () => {
      !isMobile;
    },
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDashboardImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setDashboardImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDashboardImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!editor) return;

    const content = editor.getHTML();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (dashboardImage) {
      formData.append("dashboard_image", dashboardImage);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/notes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Note saved:", response.data);
      alert("Note saved successfully!");
      navigate(`/note/${response.data.ID}`);
    } catch (error) {
      console.error("Error saving note:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          alert(
            `Failed to save note: ${error.response?.data?.error || "Unknown error"}`,
          );
        }
      } else {
        alert("An unexpected error occurred while saving the note.");
      }
    }
  };

  const copyPlainText = () => {
    if (editor) {
      const plainText = editor.getText();
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          alert("Content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy content.");
        });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="relative">
        <AnimatePresence>
          {showBlockMenu && editor && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute z-20 right-80 top-0"
            >
              <BlockMenu
                editor={editor}
                show={showBlockMenu}
                setShow={setShowBlockMenu}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="p-4 bg-gray-50">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              className="w-full p-2 mb-4 text-3xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-colors"
              title="Undo"
            >
              <Undo size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50 transition-colors"
              title="Redo"
            >
              <Redo size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBlockMenu(!showBlockMenu)}
              className="p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-colors"
              title="Add block"
            >
              <Plus size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition-colors"
              title="Upload Dashboard Image"
            >
              <Upload size={20} />
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleDashboardImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        {dashboardImagePreview && (
          <div className="mt-4">
            <img
              src={dashboardImagePreview}
              alt="Dashboard Preview"
              className="max-w-full h-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <div className="relative">
        <EditorContent
          editor={editor}
          className="prose max-w-none p-6 sm:p-8 min-h-[50vh] focus:outline-none"
        />
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="p-2 flex flex-wrap gap-2"
        >
          <BubbleMenuContent editor={editor} />
        </BubbleMenu>
      )}

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {editor &&
            editor.storage.characterCount &&
            `Characters: ${editor.storage.characterCount.characters()}`}
        </span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyPlainText}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <Copy size={16} /> Copy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Save size={16} /> Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
