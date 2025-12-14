"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import CountdownTimer from "@/components/CountDownTimer";
import RevealAnimation from "../../[id]/components/RevealAnimation";
import Comments from "../../[id]/components/Comments";
import Reactions from "../../[id]/components/Reactions";

interface MediaItem {
  url: string;
  type: "image" | "video" | "audio";
}

interface Capsule {
  _id: string;
  title: string;
  content: string;
  media: MediaItem[];
  unlockDate: string;
  isUnlocked: boolean;
  reactions?: Record<string, number>;
}

export default function CapsulePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data: session } = useSession();

  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (!id) return;

    const email = session?.user?.email ?? "";

    fetch(`/api/capsule/get?id=${id}&email=${email}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch capsule");
        return res.json();
      })
      .then((data) => {
        setCapsule(data.capsule);
        setCanEdit(Boolean(data.canEdit));
      })
      .catch(console.error);
  }, [id, session]);

  if (!capsule) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // 🔒 Single source of truth
  const isUnlocked =
    capsule.isUnlocked || new Date() >= new Date(capsule.unlockDate);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">{capsule.title}</h1>

      {/* ✏️ Edit only BEFORE unlock */}
      {!isUnlocked && canEdit && (
        <div className="text-center">
          <Link
            href={`/capsule/edit/${capsule._id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ✏️ Edit Capsule
          </Link>
        </div>
      )}

      {/* 🔒 Locked notice AFTER unlock */}
      {isUnlocked && (
        <p className="text-sm text-gray-500 italic text-center">
          🔒 This capsule is sealed and cannot be edited
        </p>
      )}

      {/* ⏳ Countdown OR Content */}
      {!isUnlocked ? (
        <CountdownTimer
          unlockDate={capsule.unlockDate}
          capsuleId={capsule._id}
          onUnlock={() =>
            setCapsule((prev) =>
              prev ? { ...prev, isUnlocked: true } : prev
            )
          }
        />
      ) : (
        <>
          <p className="text-center text-green-600 font-semibold">
            This memory has unlocked 💌
          </p>

          {/* 📜 Text Content */}
          <RevealAnimation
            title={capsule.title}
            content={capsule.content}
          />

          {/* 🖼️📹🎵 Media */}
          {capsule.media?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {capsule.media.map((m, idx) => {
                if (m.type === "image") {
                  return (
                    <img
                      key={idx}
                      src={m.url}
                      alt={`media-${idx}`}
                      className="w-full max-h-96 object-contain rounded shadow"
                    />
                  );
                }

                if (m.type === "video") {
                  return (
                    <video
                      key={idx}
                      controls
                      className="w-full max-h-96 rounded shadow"
                    >
                      <source src={m.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                if (m.type === "audio") {
                  return (
                    <audio key={idx} controls className="w-full">
                      <source src={m.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  );
                }

                return null;
              })}
            </div>
          )}

          {/* ❤️ Reactions */}
          <Reactions
            capsuleId={capsule._id}
            initialCount={capsule.reactions?.["❤️"] || 0}
          />

          {/* 💬 Comments */}
          <Comments capsuleId={capsule._id} />
        </>
      )}
    </div>
  );
}
