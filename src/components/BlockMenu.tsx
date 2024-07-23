import React from 'react';
import { Editor } from '@tiptap/react';

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
| 'blockquote'
| 'table'
| 'image';


const BlockMenu: React.FC<BlockMenuProps> = ({ editor, show, setShow }) => {
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
                    .insertContent({
                        type: 'table',
                        content: [
                            {
                                type: 'tableRow',
                                content: [
                                    { type: 'tableCell', content: [{ type: 'paragraph' }] },
                                    { type: 'tableCell', content: [{ type: 'paragraph' }] },
                                ],
                            },
                            {
                                type: 'tableRow',
                                content: [
                                    { type: 'tableCell', content: [{ type: 'paragraph' }] },
                                    { type: 'tableCell', content: [{ type: 'paragraph' }] },
                                ],
                            },
                        ],
                    })
                    .run();
                break;
            }
            case 'image': {
                const url = window.prompt('Enter the URL of the image:');
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
                break;
            }
        }
        setShow(false);
    };

    return (
        <div className="relative left-48 top-0 bg-white shadow-lg rounded-md p-2 z-10 w-48">
            <button onClick={() => addBlock('paragraph')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Paragraph</button>
            <button onClick={() => addBlock('heading1')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 1</button>
            <button onClick={() => addBlock('heading2')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 2</button>
            <button onClick={() => addBlock('heading3')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 3</button>
            <button onClick={() => addBlock('heading4')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 4</button>
            <button onClick={() => addBlock('heading5')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 5</button>
            <button onClick={() => addBlock('heading6')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 6</button>
            <button onClick={() => addBlock('bulletList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Bullet List</button>
            <button onClick={() => addBlock('orderedList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Ordered List</button>
            <button onClick={() => addBlock('taskList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Task List</button>
            <button onClick={() => addBlock('codeBlock')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Code Block</button>
            <button onClick={() => addBlock('table')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Table</button>
            <button onClick={() => addBlock('image')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Image</button>
        </div>
    );
};

// Example of how to use the BlockMenu in your main editor component
export default BlockMenu;

