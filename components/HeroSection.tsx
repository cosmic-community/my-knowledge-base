import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Knowledge Base
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Find answers{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              instantly
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse articles, explore FAQs, and look up terms in our comprehensive glossary — all organized by category for easy navigation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}