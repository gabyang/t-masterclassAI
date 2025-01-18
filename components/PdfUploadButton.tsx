"use client";

import { useState } from "react";

export default function PdfUploadButton() {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      // POST to /api/pdf where we’ll do the conversion
      const res = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("PDF upload failed");
      }

      const data = await res.json();

      // data might contain:
      // { pdfId: string, pageImages: string[] } or something similar
      console.log("Upload successful", data);

      // Optionally, store the returned info in some global or parent state
      // so the carousel can be populated
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="cursor-pointer">
        <span className="btn">Upload PDF</span>
        <input
          accept="application/pdf"
          style={{ display: "none" }}
          type="file"
          onChange={handleUpload}
        />
      </label>

      {uploading && <p>Uploading…</p>}
    </div>
  );
}
