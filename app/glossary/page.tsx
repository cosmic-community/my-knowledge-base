import type { Metadata } from 'next'
import Link from 'next/link'
import GlossaryItem from '@/components/GlossaryItem'
import { getGlossaryTerms, getCategories } from '@/lib/cosmic'
import type { GlossaryTerm, Category } from '@/types'

export const metadata: Metadata = {
  title: 'Glossary | My Knowledge Base',
  description: 'Key terms and definitions for your knowledge base.',
}

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; letter?: string }>
}) {
  const { category: categorySlug, letter: activeLetter } = await searchParams
  const [terms, categories] = await Promise.all([
    getGlossaryTerms(),
    getCategories(),
  ])

  let filteredTerms: GlossaryTerm[] = terms
  let activeCategory: Category | null = null

  if (categorySlug) {
    activeCategory = categories.find((c) => c.slug === categorySlug) ?? null
    if (activeCategory) {
      filteredTerms = terms.filter(
        (t) => t.metadata?.category?.id === activeCategory?.id
      )
    }
  }

  if (activeLetter) {
    filteredTerms = filteredTerms.filter((t) => {
      const term = t.metadata?.term ?? t.title
      return term.charAt(0).toUpperCase() === activeLetter.toUpperCase()
    })
  }

  // Get available letters
  const availableLetters = new Set<string>()
  const termsToScan = categorySlug && activeCategory
    ? terms.filter((t) => t.metadata?.category?.id === activeCategory?.id)
    : terms
  for (const t of termsToScan) {
    const term = t.metadata?.term ?? t.title
    if (term) {
      availableLetters.add(term.charAt(0).toUpperCase())
    }
  }
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📘 Glossary</h1>
        <p className="text-gray-500">
          {activeCategory
            ? `Terms in "${activeCategory.metadata?.name ?? activeCategory.title}"`
            : 'Key terms and definitions'}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/glossary"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !categorySlug
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/glossary?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat.metadata?.icon && <span className="mr-1">{cat.metadata.icon}</span>}
              {cat.metadata?.name ?? cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Letter Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
        <Link
          href={categorySlug ? `/glossary?category=${categorySlug}` : '/glossary'}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${
            !activeLetter
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
        >
          All
        </Link>
        {alphabet.map((letter) => {
          const isAvailable = availableLetters.has(letter)
          const isActive = activeLetter?.toUpperCase() === letter
          const href = categorySlug
            ? `/glossary?category=${categorySlug}&letter=${letter}`
            : `/glossary?letter=${letter}`

          return (
            <Link
              key={letter}
              href={href}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : isAvailable
                    ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    : 'text-gray-300 cursor-default'
              }`}
            >
              {letter}
            </Link>
          )
        })}
      </div>

      {/* Terms */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => (
            <GlossaryItem key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No terms found</h3>
          <p className="text-gray-500 text-sm">
            {activeLetter
              ? `No terms starting with "${activeLetter.toUpperCase()}".`
              : activeCategory
                ? 'Try selecting a different category.'
                : 'Glossary terms will appear here once created.'}
          </p>
        </div>
      )}
    </div>
  )
}