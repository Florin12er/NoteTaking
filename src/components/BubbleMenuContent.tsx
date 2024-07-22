import React from 'react';
import ColorPicker from './ColorPicker';

const BubbleMenuContent = ({ editor }) => (
  <>
    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.61 9.172l-3.83-3.83A2 2 0 0 0 8.368 5H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4.368a2 2 0 0 0 1.414-.586l3.83-3.83a2 2 0 0 0 0-2.828zM4 13V7h4.368l3.83 3.83L8.368 13H4z" />
      </svg>
    </button>
    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-1.293l-2.5 11H11.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1.293l2.5-11H10.5a.5.5 0 0 1-.5-.5z" clipRule="evenodd" />
      </svg>
    </button>
    <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 5.293a1 1 0 0 1 1.414 0L10 6.586l1.293-1.293a1 1 0 1 1 1.414 1.414L11.414 8l1.293 1.293a1 1 0 0 1-1.414 1.414L10 9.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L8.586 8 7.293 6.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
      </svg>
    </button>
    <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-1 rounded ${editor.isActive('code') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
    <ColorPicker
      initialColor="#000000"
      onChange={(color) => editor.chain().focus().setColor(color).run()}
    />
    <ColorPicker
      initialColor="#ffff00"
      onChange={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
    />
  </>
);

export default BubbleMenuContent;

