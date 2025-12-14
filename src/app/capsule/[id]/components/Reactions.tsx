"use client";

import { useState } from "react";

interface ReactionsProps {
  capsuleId: string;
  userEmail: string;       
  initialLiked?: boolean;
  initialCount?: number;
}

export default function Reactions({
  capsuleId,
  userEmail,
  initialLiked = false,
  initialCount = 0,
}: ReactionsProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggleReaction = async () => {
    if (!userEmail) return alert("You must be signed in to react!");

    setLoading(true);

    try {
      const res = await fetch("/api/reaction/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capsuleId, userEmail }),
      });

      if (!res.ok) throw new Error("Failed to toggle reaction");

      const data = await res.json();
      setLiked(data.liked);
      setCount(data.count);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleReaction}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 ${
        liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      }`}
    >
      <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
      <span className="font-semibold">{count}</span>
    </button>
  );
}