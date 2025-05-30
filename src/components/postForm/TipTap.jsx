import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorButton from "./EditorButton";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdCode,
  MdFormatClear,
  MdTitle,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdCodeOff,
  MdFormatQuote,
  MdHorizontalRule,
  MdUndo,
  MdRedo,
  MdFormatColorText,
  MdWrapText,
  MdClearAll,
} from "react-icons/md";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div
        className="button-group flex gap-2 overflow-x-auto py-2 w-full
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-grayscale-100/10
          [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-accent-500/50"
      >
        <EditorButton
          clickHandle={() => editor.chain().focus().toggleBold().run()}
          isDisabled={!editor.can().chain().focus().toggleBold().run()}
          icon={<MdFormatBold />}
          active={editor.isActive("bold")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleItalic().run()}
          isDisabled={!editor.can().chain().focus().toggleItalic().run()}
          icon={<MdFormatItalic />}
          active={editor.isActive("italic")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleStrike().run()}
          isDisabled={!editor.can().chain().focus().toggleStrike().run()}
          icon={<MdFormatStrikethrough />}
          active={editor.isActive("strike")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleCode().run()}
          isDisabled={!editor.can().chain().focus().toggleCode().run()}
          icon={<MdCode />}
          active={editor.isActive("code")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().setParagraph().run()}
          icon={<MdTitle />}
          active={editor.isActive("paragraph")}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          icon={<span>H1</span>}
          active={editor.isActive("heading", { level: 1 })}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={<span>H2</span>}
          active={editor.isActive("heading", { level: 2 })}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          icon={<span>H3</span>}
          active={editor.isActive("heading", { level: 3 })}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          icon={<span>H4</span>}
          active={editor.isActive("heading", { level: 4 })}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          icon={<span>H5</span>}
          active={editor.isActive("heading", { level: 5 })}
        />

        <EditorButton
          clickHandle={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          icon={<span>H6</span>}
          active={editor.isActive("heading", { level: 6 })}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleBulletList().run()}
          icon={<MdFormatListBulleted />}
          active={editor.isActive("bulletList")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleOrderedList().run()}
          icon={<MdFormatListNumbered />}
          active={editor.isActive("orderedList")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={<MdCodeOff />}
          active={editor.isActive("codeBlock")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().toggleBlockquote().run()}
          icon={<MdFormatQuote />}
          active={editor.isActive("blockquote")}
        />

        <EditorButton
          clickHandle={() => editor.chain().focus().setHorizontalRule().run()}
          icon={<MdHorizontalRule />}
        />
      </div>
    </div>
  );
};

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const TipTap = ({ setPostContent, content }) => {
  return (
    <div className="glass flex gap-3 flex-col p-6">
      <label className="pb-1 text-xl md:text-2xl font-semibold">Content</label>

      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        editorProps={{ attributes: { class: "" } }}
        onUpdate={({ editor }) => {
          setPostContent(editor.getJSON());
        }}
      ></EditorProvider>
    </div>
  );
};

export default TipTap;
