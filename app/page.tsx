import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(183, 68, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(183, 68, 255, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-slide-up">
          {/* Logo/Icon */}
          <div className="inline-block mb-6 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-2xl blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] p-6 rounded-2xl border border-purple-500/30">
                <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-black font-gaming mb-6 tracking-tight">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-shimmer" style={{ backgroundSize: '200% auto' }}>
              GAMESTUCK
            </span>
          </h1>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-lg opacity-50"></div>
            <h2 className="relative text-2xl md:text-3xl font-gaming font-bold text-cyan-400 tracking-widest">
              HELPER
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
            Upload a screenshot from your game and get{' '}
            <span className="text-neon-cyan font-bold">AI-powered</span>{' '}
            help with walkthroughs and guides
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-8" style={{ animationDelay: '0.4s' }}>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-purple-600/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-gaming backdrop-blur-sm">
              AI POWERED
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-cyan-600/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-gaming backdrop-blur-sm">
              INSTANT ANALYSIS
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-pink-600/20 to-pink-600/10 border border-pink-500/30 rounded-full text-pink-300 text-sm font-gaming backdrop-blur-sm">
              SMART TIPS
            </span>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <ImageUpload />
        </div>
      </div>
    </main>
  );
}
