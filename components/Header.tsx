import Link from 'next/link'

const navItems = [
  { label: 'Articles', href: '/articles' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Categories', href: '/categories' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
              KB
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              My Knowledge Base
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-2 p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}