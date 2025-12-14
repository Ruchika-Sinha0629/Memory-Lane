import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions); 

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">MemoryLane</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Create digital time capsules that unlock emotions at the right moment.
      </p>

      {!session ? (
        <div className="flex gap-4">
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Go to Dashboard
        </Link>
      )}
    </main>
  );
}
