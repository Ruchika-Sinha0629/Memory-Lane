"use client";

import { useState } from "react";

interface ReactionsProps {
  capsuleId: string;
  initialCount: number; // add this line
}

export default function Reactions({ capsuleId, initialCount }: ReactionsProps) {
  const [count, setCount] = useState(initialCount);

  async function react() {
    const res = await fetch("/api/reaction/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capsuleId }),
    });

    const data = await res.json();
    setCount(data.reactions);
  }

  return (
    <button
      onClick={react}
      className="flex items-center gap-2 text-red-500"
    >
      ❤️ {count}
    </button>
  );
}
