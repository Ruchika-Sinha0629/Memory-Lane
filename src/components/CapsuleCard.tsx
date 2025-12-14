"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Capsule } from "@/types/capsule";
import CountdownTimer from "./CountDownTimer";

interface CapsuleCardProps {
  capsule: Capsule;
  canEdit: boolean; // creator OR collaborator (passed from parent)
}

export default function CapsuleCard({ capsule, canEdit }: CapsuleCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(capsule.isUnlocked);

  // 🔁 Poll server every 30s until unlocked
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
    <div className="border rounded-lg p-4 shadow space-y-3">
      <h3 className="text-xl font-semibold">{capsule.title}</h3>

      <p className="text-sm text-gray-600">
        Theme: {capsule.theme || "Others"}
      </p>

      {/* 🔒 LOCKED STATE */}
      {!isUnlocked && (
        <>
          {/* ⏳ Countdown Timer */}
          <CountdownTimer
            unlockDate={capsule.unlockDate}
            capsuleId={capsule._id}
            onUnlock={() => setIsUnlocked(true)}
          />

          <p className="text-gray-500 text-sm">Capsule locked ⏳</p>

          {/* ✏️ Edit (only creator / collaborators) */}
          {canEdit && (
            <Link
              href={`/capsule/edit/${capsule._id}`}
              className="inline-block text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              ✏️ Edit Capsule
            </Link>
          )}
        </>
      )}

      {/* 🔓 UNLOCKED STATE */}
      {isUnlocked && (
        <div className="flex flex-col gap-2">
          <p className="text-green-600 font-semibold">
            Capsule unlocked 💌
          </p>

          <Link
            href={`/capsule/${capsule._id}`}
            className="inline-block text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            👀 View Capsule
          </Link>
        </div>
      )}
    </div>
  );
}
