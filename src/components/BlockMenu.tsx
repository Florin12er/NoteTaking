
const BlockMenu = ({ editor, show, setShow }) => {
  if (!editor || !show) {
    return null;
  }

  const addBlock = (type) => {
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
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'table':
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        break;
      case 'image':
        const url = window.prompt('Enter the URL of the image:');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
    }
    setShow(false);
  };

  return (
    <div className="absolute left-0 top-12 bg-white shadow-lg rounded-md p-2 z-10 w-48">
      <button onClick={() => addBlock('paragraph')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Paragraph</button>
      <button onClick={() => addBlock('heading1')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 1</button>
      <button onClick={() => addBlock('heading2')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 2</button>
      <button onClick={() => addBlock('heading3')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Heading 3</button>
      <button onClick={() => addBlock('bulletList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Bullet List</button>
      <button onClick={() => addBlock('orderedList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Ordered List</button>
      <button onClick={() => addBlock('taskList')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Task List</button>
      <button onClick={() => addBlock('codeBlock')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Code Block</button>
      <button onClick={() => addBlock('blockquote')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Blockquote</button>
      <button onClick={() => addBlock('table')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Table</button>
      <button onClick={() => addBlock('image')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition-colors">Image</button>
    </div>
  );
};

export default BlockMenu;

