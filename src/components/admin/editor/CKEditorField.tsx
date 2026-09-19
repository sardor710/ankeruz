"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DOMPurify from "isomorphic-dompurify";

interface CKEditorFieldProps {
  label?: string;
  value: string;
  onChange: (sanitizedHtml: string) => void;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  minHeight?: string;
}

// Skeleton fallback while dynamic chunk loads
function EditorSkeleton({ minHeight = "240px" }: { minHeight?: string }) {
  return (
    <div
      style={{ minHeight }}
      className="animate-pulse rounded-xl border border-gray-200 bg-gray-50/70 p-4 transition-all"
    >
      <div className="mb-3 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <div className="h-6 w-14 rounded bg-gray-200" />
        <div className="h-6 w-8 rounded bg-gray-200" />
        <div className="h-6 w-8 rounded bg-gray-200" />
        <div className="h-6 w-8 rounded bg-gray-200" />
        <div className="h-6 w-20 rounded bg-gray-200" />
        <div className="h-6 w-16 rounded bg-gray-200" />
        <div className="h-6 w-16 rounded bg-gray-200" />
      </div>
      <div className="space-y-2.5 pt-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
      <div className="mt-6 flex justify-end">
        <div className="h-3 w-32 rounded bg-gray-200/80" />
      </div>
    </div>
  );
}

const DynamicCKEditor = dynamic(() => import("./CKEditorInternal"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

export function CKEditorField({
  label,
  value,
  onChange,
  placeholder = "Write product overview or blog content...",
  helperText,
  disabled = false,
  minHeight = "240px",
}: CKEditorFieldProps) {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = (html: string) => {
    setInternalValue(html);
    const cleanHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "strong",
        "em",
        "u",
        "s",
        "ul",
        "ol",
        "li",
        "blockquote",
        "code",
        "pre",
        "hr",
        "br",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "a",
        "span",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "style", "class", "title"],
    });
    onChange(cleanHtml);
  };

  // Compute approx words
  const textContent = internalValue.replace(/<[^>]+>/g, " ").trim();
  const wordCount = textContent.length > 0 ? textContent.split(/\s+/).length : 0;
  const charCount = textContent.length;

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-700 tracking-tight">
            {label}
          </label>
          <span className="text-[11px] font-mono text-gray-400">
            {wordCount} words • {charCount} chars
          </span>
        </div>
      )}

      <div
        className="rounded-xl border border-gray-200 overflow-hidden shadow-2xs transition-all focus-within:border-[#17BBEF] focus-within:ring-2 focus-within:ring-[#17BBEF]/10 bg-white"
        style={{ minHeight }}
      >
        <DynamicCKEditor
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>

      {helperText && <p className="text-[11px] text-gray-500">{helperText}</p>}
    </div>
  );
}
