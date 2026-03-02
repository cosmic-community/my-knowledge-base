import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                KB
              </div>
              <span className="text-base font-bold text-gray-900">My Knowledge Base</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your centralized knowledge hub for articles, FAQs, and glossary terms.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Content</h3>
            <ul className="space-y-2">
              <li><Link href="/articles" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Articles</Link></li>
              <li><Link href="/faqs" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">FAQs</Link></li>
              <li><Link href="/glossary" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Glossary</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Categories</Link></li>
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Powered by</h3>
            <p className="text-sm text-gray-500">
              Content managed with{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Cosmic
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} My Knowledge Base. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}