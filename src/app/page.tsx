import { Clock, Heart, Lock, Users, Calendar, Image, Mail } from "lucide-react";

export default function HomePage() {
  const session = null; // Replace with: const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            {/* Logo & Title */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                MemoryLane
              </h1>
            </div>

            {/* Tagline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
              Preserve Today's Moments for Tomorrow's Hearts
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create digital time capsules that unlock emotions at the right moment. 
              Store memories, share with loved ones, and let your stories travel through time.
            </p>

            {/* CTA Buttons */}
            {!session ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <a
                  href="/auth/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="/auth/signin"
                  className="px-8 py-4 bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg border-2 border-gray-200"
                >
                  Sign In
                </a>
              </div>
            ) : (
              <div className="pt-6">
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
                >
                  Go to Dashboard
                  <Heart className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Families Love MemoryLane
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Time-Locked Capsules</h4>
              <p className="text-gray-600 leading-relaxed">
                Set your memories to unlock on special dates or life milestones. Create anticipation for the perfect moment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Family Collaboration</h4>
              <p className="text-gray-600 leading-relaxed">
                Invite loved ones to contribute their memories and stories to shared capsules together.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Rich Media Support</h4>
              <p className="text-gray-600 leading-relaxed">
                Store photos, videos, audio messages, and heartfelt letters all in one beautiful place.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Life Event Triggers</h4>
              <p className="text-gray-600 leading-relaxed">
                Connect capsules to graduations, weddings, birthdays, or any meaningful milestone.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Notifications</h4>
              <p className="text-gray-600 leading-relaxed">
                Automatic email reminders when capsules unlock, so no precious memory goes unnoticed.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Themed Collections</h4>
              <p className="text-gray-600 leading-relaxed">
                Organize memories into beautiful themes like Childhood, Family History, or College Years.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Your Memories Deserve to Last Forever
          </h3>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families preserving their most precious moments for generations to come.
          </p>
          {!session && (
            <a
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold text-lg"
            >
              Create Your First Capsule
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
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
    </main>
  );
}