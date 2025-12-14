"use client";

import { useState } from "react";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

export default function MediaUploader({
  setMedia,
}: {
  setMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      // fake upload / replace with real upload logic
      const uploaded = files.map((file) => {
        const type = file.type.split("/")[0] as
          | "image"
          | "video"
          | "audio";

        return {
          url: URL.createObjectURL(file),
          type,
        };
      });

      setMedia((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false); // ✅ CRITICAL
    }
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">Upload Media</label>

      <input
        type="file"
        multiple
        accept="image/*,video/*,audio/*"
        onChange={handleFileChange}
      />

      {isUploading && (
        <p className="text-sm text-gray-500">Uploading…</p>
      )}
    </div>
  );
}
