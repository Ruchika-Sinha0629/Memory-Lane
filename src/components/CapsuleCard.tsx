"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Capsule } from "@/types/capsule";
import CountdownTimer from "./CountDownTimer";

interface CapsuleCardProps {
  capsule: Capsule;
}

export default function CapsuleCard({ capsule }: CapsuleCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(capsule.isUnlocked);

  // Poll the server every 30 seconds for unlock status
  useEffect(() => {
    if (isUnlocked) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/capsule/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ capsuleId: capsule._id }),
        });
        const data = await res.json();
        if (data.isUnlocked) {
          setIsUnlocked(true);
        }
      } catch (err) {
        console.error("Unlock check failed:", err);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [capsule._id, isUnlocked]);

  return (
    <div className="border rounded p-4 shadow space-y-2">
      <h3 className="text-xl font-semibold">{capsule.title}</h3>
      <p>Theme: {capsule.theme || "Others"}</p>

      {!isUnlocked ? (
        <>
           <CountdownTimer
      unlockDate={capsule.unlockDate}
      capsuleId={capsule._id}  // ✅ pass capsuleId
      onUnlock={() => setIsUnlocked(true)} // auto-update when timer ends
    />
          <p className="text-gray-500">Capsule locked ⏳</p>
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <p className="text-green-600 font-semibold">Capsule unlocked 💌</p>
          <br />
          <Link
            href={`/capsule/${capsule._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            View Capsule
          </Link>
        </div>
      )}
    </div>
  );
}
