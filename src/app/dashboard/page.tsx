"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import CapsuleCard from "@/components/CapsuleCard";
import { Capsule } from "@/types/capsule";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  // Fetch user capsules initially
  const fetchCapsules = async () => {
    if (!session?.user?.email) return;
    const res = await fetch(`/api/capsule/user?email=${session.user.email}`);
    const data = await res.json();
    setCapsules(data.capsules || []);
  };

  useEffect(() => {
    fetchCapsules();
  }, [session]);

  // Polling to unlock capsules
  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedCapsules = await Promise.all(
        capsules.map(async (c) => {
          if (!c.isUnlocked && new Date(c.unlockDate) <= new Date()) {
            const res = await fetch("/api/capsule/unlock", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ capsuleId: c._id }),
            });
            const data = await res.json();
            return { ...c, isUnlocked: data.isUnlocked };
          }
          return c;
        })
      );
      setCapsules(updatedCapsules);
    }, 10000); // check every 10s

    return () => clearInterval(interval);
  }, [capsules]);

  const grouped = capsules.reduce<Record<string, Capsule[]>>((acc, c) => {
    const theme = c.theme || "Others";
    acc[theme] = acc[theme] || [];
    acc[theme].push(c);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Capsules</h1>

        <div className="flex gap-3">
          <Link
            href="/capsule/create"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + New Capsule
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Capsules grouped by theme */}
      {Object.entries(grouped).map(([theme, themeCapsules]) => (
        <div key={theme} className="space-y-3">
          <h2 className="text-xl font-semibold">{theme}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {themeCapsules.map((c) => (
              <CapsuleCard key={c._id} capsule={c} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
