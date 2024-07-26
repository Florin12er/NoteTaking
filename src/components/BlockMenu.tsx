import React, { useState} from 'react';
import { Editor } from '@tiptap/react';
import { Image, Type, List, ListOrdered, CheckSquare, Code, Table } from 'lucide-react';

interface BlockMenuProps {
    editor: Editor | null;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type BlockType = 
    | 'paragraph'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'bulletList'
    | 'orderedList'
    | 'taskList'
    | 'codeBlock'
    | 'table'
    | 'image'

const BlockMenu: React.FC<BlockMenuProps> = ({ editor, show, setShow }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    if (!editor || !show) {
        return null;
    }

    const addBlock = (type: BlockType) => {
        switch (type) {
            case 'paragraph':
                editor.chain().focus().setParagraph().run();
                break;
            case 'heading1':
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;
            case 'heading2':
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case 'heading3':
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                break;
            case 'heading4':
                editor.chain().focus().toggleHeading({ level: 4 }).run();
                break;
            case 'heading5':
                editor.chain().focus().toggleHeading({ level: 5 }).run();
                break;
            case 'heading6':
                editor.chain().focus().toggleHeading({ level: 6 }).run();
                break;
            case 'bulletList':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run();
                break;
            case 'taskList':
                editor.chain().focus().toggleTaskList().run();
                break;
            case 'codeBlock':
                editor.chain().focus().toggleCodeBlock().run();
                break;
            case 'table': {
                editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
                break;
            }
            case 'image':
                if (imageUrl) {
                    editor.chain().focus().setImage({ src: imageUrl }).run();
                    setImageUrl('');
                }
                break;
        }
        setShow(false);
    };

   
    return (
        <div className="absolute left-10 top-0 bg-white shadow-lg rounded-md p-2 z-10 w-48">
            <button onClick={() => addBlock('paragraph')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Type size={16} className="mr-2" /> Paragraph
            </button>
            <button onClick={() => addBlock('heading1')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Type size={16} className="mr-2" /> Heading 1
            </button>
            <button onClick={() => addBlock('heading2')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Type size={16} className="mr-2" /> Heading 2
            </button>
            <button onClick={() => addBlock('heading3')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Type size={16} className="mr-2" /> Heading 3
            </button>
            <button onClick={() => addBlock('bulletList')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <List size={16} className="mr-2" /> Bullet List
            </button>
            <button onClick={() => addBlock('orderedList')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <ListOrdered size={16} className="mr-2" /> Ordered List
            </button>
            <button onClick={() => addBlock('taskList')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <CheckSquare size={16} className="mr-2" /> Task List
            </button>
            <button onClick={() => addBlock('codeBlock')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Code size={16} className="mr-2" /> Code Block
            </button>
            <button onClick={() => addBlock('table')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Table size={16} className="mr-2" /> Table
            </button>
            <div className="px-4 py-2">
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-full p-1 text-sm border border-gray-300 rounded"
                />
                <button 
                    onClick={() => addBlock('image')} 
                    className="mt-1 w-full text-left px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors flex items-center"
                >
                    <Image size={16} className="mr-2" /> Add Image
                </button>
            </div>
        </div>
    );
};

export default BlockMenu;

