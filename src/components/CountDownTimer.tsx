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
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl p-6 text-center shadow-xl">
        <div className="flex items-center justify-center gap-3 text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <p className="text-2xl font-bold">Capsule Unlocked 🎉</p>
        </div>
      </div>
    );
  }

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800">Time Until Unlock</h3>
        </div>
        <p className="text-sm text-gray-600">Your memory will be revealed soon</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Days */}
        <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {days}
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase text-center">Days</div>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {hours}
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase text-center">Hrs</div>
        </div>

        {/* Minutes */}
        <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {minutes}
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase text-center">Mins</div>
        </div>

        {/* Seconds */}
        <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
            {seconds}
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase text-center">Secs</div>
        </div>
      </div>

      {/* Unlock Date Display */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Unlocks on:{" "}
          <span className="font-semibold text-purple-700">
            {new Date(unlockDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}