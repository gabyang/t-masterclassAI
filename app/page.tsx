"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import PdfViewer from "@/components/PdfViewer";

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
      <div className="w-full h-full flex items-start justify-center gap-5 pt-10">
        {/* Left side: Interactive Avatar */}
        <div className="w-1/2 h-full flex flex-col items-start justify-start">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
              width: "100%", // Ensures the container spans the full width
              textAlign: "center", // Aligns inline text content
            }}
          >
            <big style={{ textAlign: "center", width: "100%" }}>
              Interactive Tutor
            </big>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-full">
            <InteractiveAvatar />
          </div>
        </div>

        {/* Right side: PDF Viewer */}
        <div className="w-1/2 h-full flex flex-col items-start justify-start">
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
              width: "100%", // Ensures the container spans the full width
              textAlign: "center", // Aligns inline text content
            }}
          >
            <big style={{ textAlign: "center", width: "100%" }}>
              Lecture Contents
            </big>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full h-full">
            <PdfViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
