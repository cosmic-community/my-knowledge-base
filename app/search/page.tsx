import type { Metadata } from 'next'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import ArticleCard from '@/components/ArticleCard'
import GlossaryItem from '@/components/GlossaryItem'
import FaqAccordion from '@/components/FaqAccordion'
import { searchAll } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Search | My Knowledge Base',
  description: 'Search across articles, FAQs, and glossary terms.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: query } = await searchParams
  let results: Awaited<ReturnType<typeof searchAll>> | null = null

  if (query && query.trim()) {
    results = await searchAll(query.trim())
  }

  const totalResults = results
    ? results.articles.length + results.faqs.length + results.glossary.length
    : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Search</h1>
        <p className="text-gray-500 mb-6">Search across articles, FAQs, and glossary terms</p>
        <SearchBar initialQuery={query ?? ''} autoFocus={!query} />
      </div>

      {/* Results */}
      {query && results && (
        <div>
          <p className="text-sm text-gray-500 mb-8">
            Found <span className="font-semibold text-gray-900">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>

          {totalResults === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔎</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No results found</h3>
              <p className="text-gray-500 text-sm">Try different keywords or browse our content directly.</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <Link href="/articles" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Browse Articles</Link>
                <Link href="/faqs" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Browse FAQs</Link>
                <Link href="/glossary" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Browse Glossary</Link>
              </div>
            </div>
          )}

          {/* Articles Results */}
          {results.articles.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📖 Articles
                <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {results.articles.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* FAQ Results */}
          {results.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                ❓ FAQs
                <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {results.faqs.length}
                </span>
              </h2>
              <FaqAccordion faqs={results.faqs} />
            </section>
          )}

          {/* Glossary Results */}
          {results.glossary.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                📘 Glossary
                <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {results.glossary.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {results.glossary.map((term) => (
                  <GlossaryItem key={term.id} term={term} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* No query yet */}
      {!query && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">💡</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Start searching</h3>
          <p className="text-gray-500 text-sm">Enter a keyword to search across all content types.</p>
        </div>
      )}
    </div>
  )
}