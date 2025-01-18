"use client";

import { useState } from "react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    // Create a temporary URL for the uploaded PDF file
    const objectUrl = URL.createObjectURL(file);

    setPdfUrl(objectUrl);
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <label className="cursor-pointer">
        {/* This "Upload" button can be styled as you wish */}
        <span className="rounded-lg px-3 py-2 bg-indigo-600 text-white">
          Upload PDF
        </span>
        {/* Actual file input is hidden; the label is styled as a button */}
        <input
          accept="application/pdf"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />
      </label>

      {/* If a PDF is selected, show it in an iframe */}
      {pdfUrl && (
        <iframe
          className="border border-gray-300"
          height="800"
          src={pdfUrl}
          title="PDF Viewer"
          width="600"
        />
      )}
    </div>
  );
}
