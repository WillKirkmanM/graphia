import { RichTextEditor, Link } from '@mantine/tiptap';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from "lowlight"
import { useEditor, BubbleMenu } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import Blockquote from '@tiptap/extension-blockquote';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder'

import typescript from "highlight.js/lib/languages/typescript"
import rust from "highlight.js/lib/languages/rust"

interface EditorProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  showToolbar: boolean,
}

export default function Editor({ body, setBody, showToolbar }: EditorProps) {
  const lowlight = createLowlight()
  lowlight.register({ typescript, rust })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Blockquote.configure({ HTMLAttributes: { style: 'border-left: 3px solid rgba(13, 13, 13, 0.1); padding-left: 1rem;', }, }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'The pen is the tongue of the mind. - Horace' }),
      CodeBlockLowlight.configure({ lowlight })
    ],
    content: body,
    onUpdate: ({ editor }) => setBody(editor.getHTML()) 
  });

  return (
    <RichTextEditor editor={editor} >
      {editor && (
        <BubbleMenu editor={editor}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>

            <div style={{ borderLeft: '1px solid black', height: 'auto', margin: '0 10px' }} />

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.Blockquote />
              <RichTextEditor.CodeBlock />
            </RichTextEditor.ControlsGroup>

          </div>
        </BubbleMenu>
      )}
      {showToolbar && (
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      )}
      
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}