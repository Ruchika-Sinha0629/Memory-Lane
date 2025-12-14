"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCapsulePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/capsule/get?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.capsule.title);
        setContent(data.capsule.content);
      });
  }, [id]);

  async function saveChanges() {
    await fetch(`/api/capsule/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });

    router.push(`/capsule/${id}`);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Edit Capsule</h1>

      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={saveChanges}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
