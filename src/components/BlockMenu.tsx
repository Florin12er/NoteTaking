import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import axios from 'axios';
import { Image, Upload } from 'lucide-react';

interface BlockMenuProps {
    editor: Editor | null;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onDashboardImageUpload: (path: string) => void;
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
| 'image'
| 'dashboardImage';

const BlockMenu: React.FC<BlockMenuProps> = ({ editor, show, setShow, onDashboardImageUpload }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor || !show) {
        return null;
    }

    const uploadDashboardImage = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const dashboardPath = response.data.dashboard_path;
            console.log(response.data);
            onDashboardImageUpload(dashboardPath);
            
            // Construct the full URL for the image
            const imageUrl = `http://localhost:3000/${dashboardPath}`;
            editor.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

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
            case 'image':
                if (imageUrl) {
                    editor.chain().focus().setImage({ src: imageUrl }).run();
                    setImageUrl('');
                }
                break;
            case 'dashboardImage':
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }
                break;
        }
        setShow(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            uploadDashboardImage(file);
        }
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
            <button onClick={() => addBlock('dashboardImage')} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors flex items-center">
                <Upload size={16} className="mr-2" /> Upload Dashboard
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
};

export default BlockMenu;

