"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "./MediaUploader";
import ThemeSelector from "@/app/capsule/create/components/ThemeSelector";
import UnlockSelector from "@/app/capsule/create/components/UnlockSelector";
import PrivacySelector from "@/app/capsule/create/components/PrivacySelector";

export interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

interface CapsuleFormProps {
  userId: string;
}

export default function CapsuleForm({ userId }: CapsuleFormProps) {
  const router = useRouter();

  /* ------------------ Capsule Fields ------------------ */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [recipientsInput, setRecipientsInput] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [theme, setTheme] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [privacy, setPrivacy] = useState<
    "private" | "collaborators" | "public"
  >("private");

  /* ------------------ AI Fields ------------------ */
  const [caption, setCaption] = useState("");
  const [summary, setSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ------------------ AI Generator ------------------ */
  async function generateAISummary() {
    if (!title && !content) {
      alert("Please add a title or content first");
      return;
    }

    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/capsule-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, media }),
      });

      const data = await res.json();
      setCaption(data.caption || "");
      setSummary(data.summary || "");
    } catch (err) {
      alert("Failed to generate AI summary");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !unlockDate) {
      alert("Title and unlock date are required!");
      return;
    }

    const payload = {
      title,
      content,
      media,
      recipients,
      collaborators: privacy === "collaborators" ? collaborators : [],
      theme,
      unlockDate: new Date(unlockDate).toISOString(),
      privacy,
      caption,
      summary,
      createdBy: userId,
    };

    console.log("Capsule Payload:", payload);

    setLoading(true);
    try {
      const res = await fetch("/api/capsule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create capsule");

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Create a Memory Capsule
              </h2>
            </div>
            <p className="text-gray-600">
              Preserve your precious moments for the future
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Capsule Title *
            </label>
            <input
              placeholder="Give your memory a meaningful title..."
              className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-xl transition-all duration-300 outline-none text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Memory
            </label>
            <textarea
              placeholder="Write your memory, story, or message..."
              className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-xl transition-all duration-300 outline-none min-h-32 resize-y text-gray-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Photos, Videos, or Audio
            </label>
            <MediaUploader setMedia={setMedia} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Theme / Category
            </label>
            <ThemeSelector theme={theme} setTheme={setTheme} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipients (Optional)
            </label>
            <input
              placeholder="Enter email addresses separated by commas"
              className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-xl transition-all duration-300 outline-none text-gray-900"
              value={recipientsInput}
              onChange={(e) => {
                const inputValue = e.target.value;
                setRecipientsInput(inputValue);
                setRecipients(
                  inputValue
                    .split(",")
                    .map((email) => email.trim())
                    .filter(Boolean)
                );
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unlock Date *
            </label>
            <UnlockSelector
              unlockDate={unlockDate}
              setUnlockDate={(value: string) => {
                const isoDate = new Date(value).toISOString();
                setUnlockDate(isoDate);
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Privacy Settings
            </label>
            <PrivacySelector privacy={privacy} setPrivacy={setPrivacy} />
          </div>

          {privacy === "collaborators" && (
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Collaborators
              </label>
              <input
                placeholder="Enter collaborator email addresses separated by commas"
                className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-xl transition-all duration-300 outline-none text-gray-900"
                value={collaborators.join(", ")}
                onChange={(e) =>
                  setCollaborators(
                    e.target.value
                      .split(",")
                      .map((email) => email.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>
          )}

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500 font-medium">
                AI Enhancement (Optional)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={generateAISummary}
            disabled={aiLoading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            {aiLoading ? "Thinking..." : "✨ Generate Caption & Summary"}
          </button>

          {(caption || summary) && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span>AI Generated Content</span>
              </div>

              {caption && (
                <div>
                  <p className="font-semibold text-gray-800 mb-1">AI Caption</p>
                  <p className="text-gray-700 bg-white p-3 rounded-lg">
                    {caption}
                  </p>
                </div>
              )}

              {summary && (
                <div>
                  <p className="font-semibold text-gray-800 mb-1">AI Summary</p>
                  <p className="text-gray-700 bg-white p-3 rounded-lg">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Create Capsule"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
