"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/upload";
import { MediaItem } from "@/components/CapsuleForm";
import { useState } from "react";

interface MediaUploaderProps {
  setMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}

export default function MediaUploader({ setMedia }: MediaUploaderProps) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <UploadButton<OurFileRouter, "mediaUploader">
      endpoint="mediaUploader"
      onClientUploadComplete={(files) => {
        const normalized: MediaItem[] = files.map((f) => ({
          url: f.ufsUrl,
          type: f.type.startsWith("image")
            ? "image"
            : f.type.startsWith("video")
            ? "video"
            : f.type.startsWith("audio")
            ? "audio"
            : "image",
        }));

        setMedia((prev) => [...prev, ...normalized]);
        setUploaded(true); 
      }}
      onUploadError={(err) => {
        console.error("Upload Error:", err);
        alert("Upload failed");
        setUploaded(false);
      }}
      appearance={{
        button: "bg-blue-500 text-white px-4 py-2 rounded",
      }}
      content={{
        button: ({ isUploading }) => {
          if (isUploading) return "Uploading...";
          if (uploaded) return "✅ Upload Complete";
          return "Upload Media";
        },
      }}
    />
  );
}
