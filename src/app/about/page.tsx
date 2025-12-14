"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 hover:shadow-xl transition-all duration-300">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              MemoryLane
            </h2>
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preserving memories for generations to come
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At MemoryLane, we believe that memories are the threads that weave the fabric of our lives. Our mission is to provide a secure, beautiful, and meaningful way to preserve your most precious moments for yourself, your loved ones, and future generations.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We've created a digital time capsule platform that combines cutting-edge technology with heartfelt purpose, allowing you to capture memories today and unlock them at just the right moment in the future.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            MemoryLane was born from a simple idea: what if we could send messages to our future selves? What if we could preserve the small, beautiful moments that make life meaningful?
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Our founders experienced the bittersweet feeling of finding old photos, letters, and mementos that brought back floods of memories. We wanted to create a modern platform that captures not just images, but entire experiences—complete with context, emotion, and the ability to share them at exactly the right time.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Today, thousands of users trust MemoryLane to safeguard their memories, from birthday messages for children to wedding vows, graduation achievements, and life milestones worth celebrating.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-700 mb-3">Privacy First</h3>
              <p className="text-gray-700">
                Your memories are sacred. We use enterprise-grade encryption and never share your data with third parties.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-2xl p-6 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-pink-700 mb-3">Meaningful Design</h3>
              <p className="text-gray-700">
                Every feature is crafted to honor the importance of your memories with beautiful, intuitive experiences.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-700 mb-3">Innovation</h3>
              <p className="text-gray-700">
                We leverage AI and modern technology to enhance your memories, not replace the human touch.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Start preserving your precious memories today
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Free
          </Link>
        </div>
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
                <li><Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</Link></li>
                <li><Link href="/features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy</Link></li>
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