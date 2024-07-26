import React, { useCallback, useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import ColorPicker from "./ColorPicker";
import { motion } from "framer-motion";
import {
  Strikethrough,
  Italic,
  Bold,
  Code,
  Type,
  Terminal,
  Palette,
} from "lucide-react";
import CodeThemeSelector from "../components/CodeSelector";

interface BubbleMenuContentProps {
  editor: Editor | null;
}

interface Font {
  name: string;
  value: string;
}

const fonts: Font[] = [
  { name: "Default", value: "inherit" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Arial Black", value: '"Arial Black", sans-serif' },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Trebuchet MS", value: '"Trebuchet MS", sans-serif' },
  { name: "Impact", value: "Impact, sans-serif" },
  { name: "Times New Roman", value: '"Times New Roman", serif' },
  { name: "Didot", value: "Didot, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "American Typewriter", value: '"American Typewriter", serif' },
  { name: "Courier", value: "Courier, monospace" },
  { name: "Courier New", value: '"Courier New", monospace' },
  { name: "Lucida Console", value: '"Lucida Console", monospace' },
  { name: "Monaco", value: "Monaco, monospace" },
  { name: "Brush Script MT", value: '"Brush Script MT", cursive' },
  { name: "Comic Sans MS", value: '"Comic Sans MS", cursive' },
  { name: "Lucida Sans", value: '"Lucida Sans", sans-serif' },
  { name: "Palatino", value: "Palatino, serif" },
  { name: "Garamond", value: "Garamond, serif" },
  { name: "Bookman", value: "Bookman, serif" },
  { name: "Avant Garde", value: "Avant Garde, sans-serif" },
  { name: "Papyrus", value: "Papyrus, fantasy" },
  { name: "Copperplate", value: "Copperplate, fantasy" },
];

const FontSelector: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <select
      onChange={(e) =>
        editor.chain().focus().setFontFamily(e.target.value).run()
      }
      value={editor.getAttributes("textStyle").fontFamily || "inherit"}
      className="py-1 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      {fonts.map((font) => (
        <option
          key={font.name}
          value={font.value}
          style={{ fontFamily: font.value }}
        >
          {font.name}
        </option>
      ))}
    </select>
  );
};

interface ColorPickerProps {
  initialColor: string;
  onChange: (color: string) => void;
  title?: string; // Add this line
}

const ExtendedColorPicker: React.FC<ColorPickerProps> = ({ title, ...props }) => (
  <div>
    {title && <span>{title}</span>}
    <ColorPicker {...props} />
  </div>
);

const BubbleMenuContent: React.FC<BubbleMenuContentProps> = ({ editor }) => {
  const [theme, setTheme] = useState("github-light");

  const loadTheme = useCallback(async () => {
    let linkElement = document.getElementById(
      "highlight-theme",
    ) as HTMLLinkElement | null;
    if (!linkElement) {
      linkElement = document.createElement("link") as HTMLLinkElement;
      linkElement.id = "highlight-theme";
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }
    linkElement.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/${theme}.min.css`;
  }, [theme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  if (!editor) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-1 md:p-2">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-start md:space-x-2">
        <div className="flex space-x-1 mb-1 md:mb-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${editor.isActive("bold") ? "bg-blue-200" : "hover:bg-gray-100"}`}
            title="Bold"
          >
            <Bold size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${editor.isActive("italic") ? "bg-blue-200" : "hover:bg-gray-100"}`}
            title="Italic"
          >
            <Italic size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 rounded ${editor.isActive("strike") ? "bg-blue-200" : "hover:bg-gray-100"}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </motion.button>
        </div>
        <div className="flex space-x-1 mb-1 md:mb-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1 rounded ${editor.isActive("code") ? "bg-blue-200" : "hover:bg-gray-100"}`}
            title="Inline Code"
          >
            <Code size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1 rounded ${editor.isActive("codeBlock") ? "bg-blue-200" : "hover:bg-gray-100"}`}
            title="Code Block"
          >
            <Terminal size={16} />
          </motion.button>
        </div>
        <div className="flex items-center space-x-1 mb-1 md:mb-0">
          <Type size={16} className="text-gray-500" />
          <FontSelector editor={editor} />
        </div>
        <div className="flex items-center space-x-1 mb-1 md:mb-0">
          <Palette size={16} className="text-gray-500" />
          <CodeThemeSelector
            currentTheme="base-16/dracula"
            onChange={setTheme}
          />
        </div>
        <div className="flex space-x-1">
          <ExtendedColorPicker
            initialColor="#000000"
            onChange={(color: string) => {
              editor.chain().focus().setColor(color).run();
              return true; // Return a boolean
            }}
            title="Text Color"
          />
          <ExtendedColorPicker
            initialColor="#ffffff"
            onChange={(color: string) => {
              editor.chain().focus().toggleHighlight({ color }).run();
              return true; // Return a boolean
            }}
            title="Highlight Color"
          />
        </div>
      </div>
    </div>
  );
};

export default BubbleMenuContent;

