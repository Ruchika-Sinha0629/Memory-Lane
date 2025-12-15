"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Capsule } from "@/types/capsule";
import CountdownTimer from "./CountDownTimer";
import { Lock, Unlock, Edit, Eye, Tag } from "lucide-react";

interface CapsuleCardProps {
  capsule: Capsule;
  canEdit: boolean;
}

export default function CapsuleCard({ capsule, canEdit }: CapsuleCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(capsule.isUnlocked);

  // Poll server every 30s until unlocked
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
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>

      <div className="relative bg-white rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {capsule.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>{capsule.theme || "Others"}</span>
            </div>
          </div>

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isUnlocked ? "bg-purple-600" : "bg-gray-400"
            }`}
          >
            {isUnlocked ? (
              <Unlock className="w-6 h-6 text-white" />
            ) : (
              <Lock className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {!isUnlocked && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <CountdownTimer
                unlockDate={capsule.unlockDate}
                capsuleId={capsule._id}
                onUnlock={() => setIsUnlocked(true)}
              />
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Lock className="w-4 h-4" />
              <span>Capsule is locked and waiting...</span>
            </div>

            {canEdit && (
              <Link
                href={`/capsule/edit/${capsule._id}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
              >
                <Edit className="w-4 h-4" />
                Edit Capsule
              </Link>
            )}
          </div>
        )}

        {isUnlocked && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <Unlock className="w-5 h-5" />
                <span>Capsule Unlocked!</span>
              </div>
              <p className="text-sm text-purple-600 mt-1">
                Your memories are now available to view
              </p>
            </div>

            <Link
              href={`/capsule/${capsule._id}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Eye className="w-4 h-4" />
              View Capsule
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
