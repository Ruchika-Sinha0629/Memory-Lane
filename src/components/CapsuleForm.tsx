"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUploader from "./MediaUploader";
import RecipientInput from "@/app/capsule/create/components/RecipientInput";
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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [theme, setTheme] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [privacy, setPrivacy] = useState<"private" | "collaborators" | "public">("private");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !unlockDate) return alert("Title and unlock date are required!");

    setLoading(true);
    try {
      const res = await fetch("/api/capsule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          media,
          recipients,
          collaborators: privacy === "collaborators" ? collaborators : [],
          theme,
          unlockDate,
          privacy,
          createdBy: userId,
        }),
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
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <h2 className="text-2xl font-bold">Create a Memory Capsule</h2>

      <input
        placeholder="Title"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Write your memory..."
        className="border p-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Uploadthing Media Uploader */}
      <MediaUploader setMedia={setMedia} />

      <ThemeSelector theme={theme} setTheme={setTheme} />
      <RecipientInput recipients={recipients} setRecipients={setRecipients} />
      <UnlockSelector unlockDate={unlockDate} setUnlockDate={setUnlockDate} />
      <PrivacySelector privacy={privacy} setPrivacy={setPrivacy} />

      {privacy === "collaborators" && (
        <RecipientInput
          recipients={collaborators}
          setRecipients={setCollaborators}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Create Capsule"}
      </button>
    </form>
  );
}
