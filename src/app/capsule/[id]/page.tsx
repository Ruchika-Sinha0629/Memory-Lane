"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link"; // ✅ ADD THIS

import CountdownTimer from "@/components/CountDownTimer";
import RevealAnimation from "./components/RevealAnimation";
import Comments from "./components/Comments";
import Reactions from "./components/Reactions";

interface Capsule {
  _id: string;
  title: string;
  content: string;
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

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">{capsule.title}</h1>

      {!capsule.isUnlocked ? (
        <CountdownTimer
          unlockDate={capsule.unlockDate}
          capsuleId={capsule._id}
          onUnlock={() =>
            setCapsule({ ...capsule, isUnlocked: true })
          }
        />
      ) : (
        <>
          <p className="text-center text-green-600 font-semibold">
            This memory has unlocked 💌
          </p>

          {/* ✅ Collaborator / creator edit button */}
          {canEdit && (
            <Link
              href={`/capsule/edit/${capsule._id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              ✏️ Edit Capsule
            </Link>
          )}

          <RevealAnimation
            title={capsule.title}
            content={capsule.content}
          />

          <Reactions
            capsuleId={capsule._id}
            initialCount={capsule.reactions?.["❤️"] || 0}
          />

          <Comments capsuleId={capsule._id} />
        </>
      )}
    </div>
  );
}
