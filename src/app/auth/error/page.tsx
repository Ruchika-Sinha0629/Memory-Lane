"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  const errorMessage =
    error === "CredentialsSignin"
      ? "Invalid email or password"
      : "Something went wrong during authentication";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-red-600">Authentication Error</h1>

          <p className="text-gray-700 font-medium">{errorMessage}</p>

          <Link
            href="/auth/signin"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
