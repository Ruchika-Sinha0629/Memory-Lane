"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import CountdownTimer from "@/components/CountDownTimer";
import RevealAnimation from "./components/RevealAnimation";
import Comments from "./components/Comments";
import Reactions from "./components/Reactions";

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
  caption?: string;
  summary?: string;
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 font-semibold">Loading your memory...</p>
        </div>
      </div>
    );
  }

  const hearts = capsule.reactions?.hearts ?? [];
  const userEmailValue = session?.user?.email ?? "";
  const initialLiked = hearts.includes(userEmailValue);
  const initialCount = hearts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6l4 2"
                  />
                </svg>
                <span className="text-sm font-semibold text-purple-600">
                  Memory Capsule
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {capsule.title}
              </h1>
            </div>

            {capsule.isUnlocked && canEdit && (
              <Link
                href={`/capsule/edit/${capsule._id}`}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Link>
            )}
          </div>
        </div>

        {!capsule.isUnlocked ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Capsule Locked
              </h3>
              <p className="text-gray-600">This memory will unlock soon...</p>
            </div>
            <CountdownTimer
              unlockDate={capsule.unlockDate}
              capsuleId={capsule._id}
              onUnlock={() => setCapsule({ ...capsule, isUnlocked: true })}
            />
          </div>
        ) : (
          <>
            {/* Unlocked Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl shadow-xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 text-white">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-2xl font-bold">
                  This Memory Has Unlocked! 💌
                </p>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <RevealAnimation
                title={capsule.title}
                content={capsule.content}
              />
            </div>

            {/* Media Display */}
            {capsule.isUnlocked && capsule.media?.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Attached Media
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {capsule.media.map((m, idx) => {
                    if (m.type === "image")
                      return (
                        <img
                          key={idx}
                          src={m.url}
                          alt={`media-${idx}`}
                          className="w-full max-h-96 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        />
                      );
                    if (m.type === "video")
                      return (
                        <video
                          key={idx}
                          controls
                          className="w-full max-h-96 rounded-2xl shadow-lg"
                        >
                          <source src={m.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      );
                    if (m.type === "audio")
                      return (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <svg
                              className="w-6 h-6 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                              />
                            </svg>
                            <span className="font-semibold text-gray-700">
                              Audio Message
                            </span>
                          </div>
                          <audio controls className="w-full">
                            <source src={m.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      );
                  })}
                </div>
              </div>
            )}

            {/* AI Caption & Summary */}
            {(capsule.caption || capsule.summary) && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 font-semibold mb-6">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="text-xl">AI Enhanced Content</span>
                </div>

                {capsule.caption && (
                  <div className="mb-6">
                    <p className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      AI Caption
                    </p>
                    <p className="text-gray-800 bg-white p-4 rounded-xl shadow-sm">
                      {capsule.caption}
                    </p>
                  </div>
                )}

                {capsule.summary && (
                  <div>
                    <p className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      AI Summary
                    </p>
                    <p className="text-gray-800 bg-white p-4 rounded-xl shadow-sm">
                      {capsule.summary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reactions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Reactions
              </h3>
              <Reactions
                capsuleId={capsule._id}
                userEmail={userEmailValue}
                initialLiked={initialLiked}
                initialCount={initialCount}
              />
            </div>

            {/* Comments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comments</h3>
              <Comments capsuleId={capsule._id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
