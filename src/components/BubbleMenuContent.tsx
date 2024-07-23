import React from 'react';
import { Editor } from '@tiptap/react';
import ColorPicker from './ColorPicker';
import { motion } from 'framer-motion';
import { Strikethrough, Italic, Bold , Code } from 'lucide-react';


interface BubbleMenuContentProps {
    editor: Editor;
}

const BubbleMenuContent: React.FC<BubbleMenuContentProps> = ({ editor }) => (
    <div className="flex items-center space-x-2 rounded-lg">
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-full ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Bold"
    >
            <Bold/>
        </motion.button>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-full ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Italic"
        >
                <Italic/>
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`rounded-full ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Strikethrough"
        >
                <Strikethrough/>
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded-full ${editor.isActive('code') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Code"
        >
                <Code/>
            </motion.button>
            <ColorPicker
            initialColor="#000000"
            onChange={(color: string) => editor.chain().focus().setColor(color).run()}
        />
            <ColorPicker
            initialColor="#f0f0f0"
            onChange={(color: string) => editor.chain().focus().toggleHighlight({ color }).run()}
        />
        </div>
);

export default BubbleMenuContent;

