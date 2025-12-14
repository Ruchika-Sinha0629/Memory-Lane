"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-4 border rounded-xl">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>

        {/* Email + Password */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await signIn("credentials", {
              email,
              password,
              callbackUrl: "/dashboard",
            });
          }}
          className="space-y-3"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Sign In
          </button>
        </form>

        <div className="text-center text-gray-500">OR</div>

        {/* Google */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border py-2 rounded"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
