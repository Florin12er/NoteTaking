import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import BlockMenu from '../components/BlockMenu';
import BubbleMenuContent from '../components/BubbleMenuContent';
import CodeThemeSelector from '../components/CodeSelector';
import { editorConfig } from '../components/EditorConfig';

const NoteEditor = () => {
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [theme, setTheme] = useState('nord');

  const editor = useEditor({
    ...editorConfig,
    onUpdate: () => {
      // Here you can handle content updates, e.g., save to localStorage
    },
  });
useEffect(() => {
    const loadTheme = async () => {
      const linkElement = document.getElementById('highlight-theme') || document.createElement('link');
      linkElement.id = 'highlight-theme';
      linkElement.rel = 'stylesheet';
      linkElement.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${theme}.min.css`;
      document.head.appendChild(linkElement);
    };

    loadTheme();
  }, [theme]);

  const testCodeHighlighting = () => {
    if (editor) {
      editor.chain()
        .focus()
        .insertContent(`
<pre><code class="language-javascript">
function helloWorld() {
  console.log("Hello, world!");
}
</code></pre>
<pre><code class="language-python">
def hello_world():
    print("Hello, world!")
</code></pre>
<pre><code class="language-java">
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
</code></pre>
        `)
        .run();
    }
  };

  const testLink = () => {
    if (editor) {
      editor.chain()
        .focus()
        .insertContent('This is a [custom link](https://example.com) using the new syntax.')
        .run();
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <CodeThemeSelector onChange={setTheme} />
      <div className="relative">
        <button 
          onClick={() => setShowBlockMenu(!showBlockMenu)} 
          className="absolute left-0 top-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <BlockMenu editor={editor} show={showBlockMenu} setShow={setShowBlockMenu} />
        <EditorContent editor={editor} className="min-h-[300px] border border-gray-300 rounded p-4 pl-12" />
      </div>
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }} 
          className="bg-white shadow-lg rounded-lg p-2 flex gap-2"
        >
          <BubbleMenuContent editor={editor} />
        </BubbleMenu>
      )}
      <div className="mt-4 text-sm text-gray-500">
        {editor && `Characters: ${editor.storage.characterCount.characters()}`}
      </div>
      <div className="mt-4 flex gap-2">
        <button 
          onClick={testCodeHighlighting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Test Code Highlighting
        </button>
        <button 
          onClick={testLink}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Test Custom Link
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;

