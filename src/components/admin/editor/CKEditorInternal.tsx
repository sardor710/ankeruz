"use client";

import React, { useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  Table,
  TableToolbar,
  BlockQuote,
  CodeBlock,
  Alignment,
  HorizontalLine,
  SourceEditing,
  Autoformat,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "./ckeditor-custom.css";

interface CKEditorInternalProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CKEditorInternal({
  value,
  onChange,
  placeholder = "Write comprehensive product overview or blog content...",
  disabled = false,
}: CKEditorInternalProps) {
  const editorConfig = useMemo(
    () => ({
      licenseKey: "GPL",
      plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Link,
        List,
        Table,
        TableToolbar,
        BlockQuote,
        CodeBlock,
        Alignment,
        HorizontalLine,
        SourceEditing,
        Autoformat,
      ],
      toolbar: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "alignment",
        "bulletedList",
        "numberedList",
        "|",
        "link",
        "blockQuote",
        "insertTable",
        "horizontalLine",
        "codeBlock",
        "|",
        "sourceEditing",
      ],
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      placeholder,
    }),
    [placeholder]
  );

  return (
    <div className="ckeditor-custom-wrapper">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value}
        disabled={disabled}
        onChange={(_event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
