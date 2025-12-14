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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Memory Capsules
                </h1>
              </div>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name || session?.user?.email}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/capsule/create"
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Capsule
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full shadow-lg hover:shadow-xl hover:border-red-300 hover:text-red-600 transform hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Capsules grouped by theme */}
        {Object.keys(grouped).length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center">
            <svg className="w-16 h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Capsules Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start preserving your precious memories by creating your first time capsule!
            </p>
            <Link
              href="/capsule/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Capsule
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([theme, themeCapsules]) => (
              <div key={theme} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">{theme}</h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-200 to-transparent"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themeCapsules.map((c) => (
                    <CapsuleCard
                      key={c._id}
                      capsule={c}
                      canEdit={
                        c.createdBy === session?.user?.email ||
                        c.collaborators?.includes(session?.user?.email ?? "")
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
                <h3 className="text-2xl font-bold">MemoryLane</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Preserving your most precious moments for generations to come.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="/features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 MemoryLane. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}