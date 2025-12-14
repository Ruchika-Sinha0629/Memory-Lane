"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  unlockDate: string;
  capsuleId: string;
  onUnlock?: () => void;
}

export default function CountdownTimer({
  unlockDate,
  capsuleId,
  onUnlock,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(
    new Date(unlockDate).getTime() - Date.now()
  );
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const diff = new Date(unlockDate).getTime() - Date.now();
      setTimeLeft(diff);

      if (diff <= 0 && !unlocked) {
        setUnlocked(true);
        clearInterval(interval);

        // 🔓 Unlock capsule in DB
        await fetch("/api/capsule/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ capsuleId }),
        });

        onUnlock?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockDate, capsuleId, onUnlock, unlocked]);

  if (timeLeft <= 0) {
    return (
      <p className="text-green-600 font-semibold">
        Capsule unlocked 🎉
      </p>
    );
  }

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <p className="text-gray-600">
      Unlocks in {days}d {hours}h {minutes}m {seconds}s
    </p>
  );
}
