import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";
import DOMPurify from "dompurify";
import React from "react";

export default function RichText({ textJson }) {
  // Sanitized and safe renderer for tip tap
  if (!textJson || typeof textJson !== "object")
    throw new Error("please provide a tiptap object as the text content");

  const html = generateHTML(textJson, [StarterKit]);
  const safeHtml = DOMPurify.sanitize(html);

  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    ></div>
  );
}
