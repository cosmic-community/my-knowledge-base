import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-indigo-600 border border-indigo-200 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  )
}