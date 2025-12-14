"use client";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  text: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
}

interface CommentsProps {
  capsuleId: string;
}

export default function Comments({ capsuleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  // Fetch comments
  useEffect(() => {
    fetch(`/api/comment/get?capsuleId=${capsuleId}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, [capsuleId]);

  async function submitComment() {
    if (!text) return;

    const res = await fetch("/api/comment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capsuleId, text }),
    });

    const data = await res.json();
    if (data.comment) {
      setComments([data.comment, ...comments]);
      setText("");
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Comments</h3>

      <textarea
        className="w-full border rounded p-2"
        placeholder="Share how this made you feel..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitComment}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Comment
      </button>

      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c._id} className="border p-3 rounded">
            <p className="font-medium">{c.user.name}</p>
            <p className="text-sm text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
