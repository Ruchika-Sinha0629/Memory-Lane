"use client";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

export default function MediaUploader({
  setMedia,
}: {
  setMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
}) {
  const handleUpload = async (file: File) => {
    const uploadedUrl = URL.createObjectURL(file);

    let mediaType: MediaItem["type"];

    if (file.type.startsWith("image")) mediaType = "image";
    else if (file.type.startsWith("video")) mediaType = "video";
    else if (file.type.startsWith("audio")) mediaType = "audio";
    else return;

    setMedia((prev) => [
      ...prev,
      {
        url: uploadedUrl,
        type: mediaType, // ✅ now correctly typed
      },
    ]);
  };

  return (
    <input
      type="file"
      accept="image/*,video/*,audio/*"
      multiple
      onChange={(e) => {
        if (!e.target.files) return;
        Array.from(e.target.files).forEach(handleUpload);
      }}
    />
  );
}
