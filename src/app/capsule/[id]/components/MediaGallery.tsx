// MediaGallery.tsx
"use client";

import React from "react";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

export default function MediaGallery({ media }: { media: MediaItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {media.map((m, i) => (
        <div key={i} className="rounded overflow-hidden border p-1">
          {m.type === "image" && <img src={m.url} alt="" className="w-full h-48 object-cover" />}
          {m.type === "video" && <video src={m.url} controls className="w-full h-48" />}
          {m.type === "audio" && <audio src={m.url} controls className="w-full" />}
        </div>
      ))}
    </div>
  );
}
