import 'highlight.js/styles/nord.css'; // or any other style you prefer
import 'highlight.js/styles/github.css'; // or any other style you prefer
import "highlight.js/styles/atom-one-dark-reasonable.css"

import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlock from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { InputRule } from '@tiptap/core';

// Import additional languages
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import julia from 'highlight.js/lib/languages/julia';
import kotlin from 'highlight.js/lib/languages/kotlin';
import typescript from 'highlight.js/lib/languages/typescript';
import dart from 'highlight.js/lib/languages/dart';

const lowlight = createLowlight(common);

// Register additional languages
lowlight.register('javascript', javascript);
lowlight.register('java', java);
lowlight.register('css', css);
lowlight.register('c', c);
lowlight.register('cpp', cpp);
lowlight.register('csharp', csharp);
lowlight.register('julia', julia);
lowlight.register('kotlin', kotlin);
lowlight.register('typescript', typescript);
lowlight.register('dart', dart);

const customLinkInputRule = new InputRule({
  find: /\[(.+)\]\((.+)\)/,
  handler: ({ state, range, match }) => {
    const [, linkText, href] = match;
    const { tr } = state;
    const start = range.from;
    const end = range.to;

    tr.replaceWith(start, end, state.schema.text(linkText))
      .addMark(start, start + linkText.length, state.schema.marks.link.create({ href }));
  },
});

export const editorConfig = {
  extensions: [
    StarterKit.configure({
      codeBlock: false,
    }),
    CharacterCount,
    Color,
    TextStyle,
    Highlight.configure({ multicolor: true }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlock.configure({
      lowlight,
      HTMLAttributes: {
        class: 'code-block',
      },
    }),
    Image,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-600 hover:underline',
      },
    }).extend([customLinkInputRule]),
    Typography,
    Placeholder.configure({
      placeholder: 'Write something …',
    }),
  ],
  content: '<p>Start typing your note here...</p>',
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none',
    },
  },
  enableInputRules: true,
  enablePasteRules: true,
};

