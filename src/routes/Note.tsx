import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import BlockMenu from '../components/BlockMenu';
import BubbleMenuContent from '../components/BubbleMenuContent';
import CodeThemeSelector from '../components/CodeSelector';
import EditorConfig from '../components/EditorConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Undo, Redo, Copy, Save } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NoteEditor: React.FC = () => {
    const [showBlockMenu, setShowBlockMenu] = useState(false);
    const [theme, setTheme] = useState('github-light');
    const [isMobile, setIsMobile] = useState(false);
    const [title, setTitle] = useState('');
    const [dashboardImage, setDashboardImage] = useState('');
    const navigate = useNavigate();

    const editor = useEditor({
        ...EditorConfig,
        onUpdate: () => {
            !isMobile;
        },
    });

    const loadTheme = useCallback(async () => {
        let linkElement = document.getElementById('highlight-theme') as HTMLLinkElement | null;
        if (!linkElement) {
            linkElement = document.createElement('link') as HTMLLinkElement;
            linkElement.id = 'highlight-theme';
            linkElement.rel = 'stylesheet';
            document.head.appendChild(linkElement);
        }
        linkElement.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${theme}.min.css`;
    }, [theme]);

    useEffect(() => {
        loadTheme();
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [loadTheme]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDashboardImageUpload = (url: string) => {
        setDashboardImage(url);
    };

    const handleSave = async () => {
        if (!editor) return;

        const content = editor.getHTML();
        try {
            const response = await axios.post('http://localhost:3000/notes', {
                title,
                dashboard_path: dashboardImage,
                content,
            }, { withCredentials: true });

            console.log('Note saved:', response.data);
            alert('Note saved successfully!');

            // Navigate to the newly created note's page
            navigate(`/note/${response.data.ID}`);
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Failed to save note.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CodeThemeSelector onChange={setTheme} />
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
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    className="w-full p-2 mb-4 text-3xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {dashboardImage && (
                <div className="p-4">
                    <img src={dashboardImage} alt="Dashboard" className="w-full h-64 object-cover mb-4 rounded-md" />
                </div>
            )}

            <div className="relative">
                <AnimatePresence>
                    {showBlockMenu && editor && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute z-20 right-52 top-0"
                        >
                            <BlockMenu 
                                editor={editor} 
                                show={showBlockMenu} 
                                setShow={setShowBlockMenu} 
                                onDashboardImageUpload={handleDashboardImageUpload} 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <EditorContent 
                    editor={editor} 
                    className="prose max-w-none p-6 sm:p-8 min-h-[50vh] focus:outline-none"
                />
            </div>

            {editor && (
                <BubbleMenu 
                    editor={editor} 
                    tippyOptions={{ duration: 100 }} 
                    className="bg-white shadow-lg rounded-lg p-2 flex flex-wrap gap-2 border border-gray-200"
                >
                    <BubbleMenuContent editor={editor} />
                </BubbleMenu>
            )}

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {editor && editor.storage.characterCount && `Characters: ${editor.storage.characterCount.characters()}`}
                </span>
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (editor) {
                                navigator.clipboard.writeText(editor.getHTML());
                                alert('Content copied to clipboard!');
                            }
                        }}
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

