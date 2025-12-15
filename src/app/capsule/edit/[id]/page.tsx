"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/upload";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

export default function EditCapsulePage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !session?.user?.email) return;

    fetch(`/api/capsule/get?id=${id}&email=${session.user.email}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data.capsule.isUnlocked || !data.canEdit) {
          router.push(`/capsule/${id}`);
          return;
        }

        setTitle(data.capsule.title);
        setContent(data.capsule.content);
        setMedia(data.capsule.media || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load capsule");
        setLoading(false);
      });
  }, [id, session, router]);

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/capsule/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          content,
          media,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Failed to save changes");
      }

      router.push(`/capsule/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Edit Capsule
            </h1>
          </div>
          <p className="text-gray-600">
            Make changes to your memory capsule before it's sealed
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Capsule Title
            </label>
            <input
              className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a memorable title..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              className="w-full border-2 border-gray-200 rounded-xl p-4 min-h-[200px] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none resize-none text-gray-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your memory here..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Media Files
            </label>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center bg-purple-50/50">
              <UploadButton<OurFileRouter, "mediaUploader">
                endpoint="mediaUploader"
                onClientUploadComplete={(files) => {
                  const newMedia: MediaItem[] = files.map((f) => ({
                    url: f.url,
                    type: f.type.startsWith("image/")
                      ? "image"
                      : f.type.startsWith("video/")
                        ? "video"
                        : "audio",
                  }));
                  setMedia((prev) => [...prev, ...newMedia]);
                }}
                onUploadError={(err: any) => {
                  console.error(err);
                  setError("Upload failed");
                }}
              />
            </div>
          </div>

          {media.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Uploaded Media ({media.length})
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {media.map((m, i) => (
                  <div
                    key={i}
                    className="border-2 border-gray-200 rounded-xl p-3 bg-white relative group"
                  >
                    {m.type === "image" && (
                      <img
                        src={m.url}
                        alt={`media-${i}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    {m.type === "video" && (
                      <video
                        src={m.url}
                        controls
                        className="w-full h-48 rounded-lg"
                      />
                    )}
                    {m.type === "audio" && (
                      <div className="flex items-center justify-center h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                        <audio src={m.url} controls className="w-full px-4" />
                      </div>
                    )}
                    <button
                      onClick={() =>
                        setMedia(media.filter((_, idx) => idx !== i))
                      }
                      className="absolute top-5 right-5 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </>
              )}
            </button>

            <button
              onClick={() => router.push(`/capsule/${id}`)}
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full shadow-lg hover:shadow-xl hover:border-gray-300 transform hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
