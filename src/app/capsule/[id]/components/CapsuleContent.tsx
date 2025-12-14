"use client";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

interface CapsuleContentProps {
  content: string;
  media?: MediaItem[];
}

export default function CapsuleContent({ content, media }: CapsuleContentProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg">{content}</p>

      {media && media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {media.map((m, i) => (
            <div key={i}>
              {m.type === "image" && (
                <img src={m.url} alt="media" className="rounded w-full" />
              )}
              {m.type === "video" && (
                <video src={m.url} controls className="rounded w-full" />
              )}
              {m.type === "audio" && (
                <audio src={m.url} controls className="w-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
