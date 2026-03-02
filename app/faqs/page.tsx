import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { getFaqs, getCategories } from '@/lib/cosmic'
import type { Faq, Category } from '@/types'

export const metadata: Metadata = {
  title: 'FAQs | My Knowledge Base',
  description: 'Frequently asked questions organized by category.',
}

export default async function FaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams
  const [faqs, categories] = await Promise.all([
    getFaqs(),
    getCategories(),
  ])

  let activeCategory: Category | null = null
  let filteredFaqs: Faq[] = faqs

  if (categorySlug) {
    activeCategory = categories.find((c) => c.slug === categorySlug) ?? null
    if (activeCategory) {
      filteredFaqs = faqs.filter(
        (f) => f.metadata?.category?.id === activeCategory?.id
      )
    }
  }

  // Group FAQs by category for display
  const groupedFaqs: { category: Category | null; faqs: Faq[] }[] = []

  if (!categorySlug) {
    // Group by category
    const uncategorized: Faq[] = []
    const categoryMap = new Map<string, { category: Category; faqs: Faq[] }>()

    for (const faq of filteredFaqs) {
      const cat = faq.metadata?.category
      if (cat) {
        const existing = categoryMap.get(cat.id)
        if (existing) {
          existing.faqs.push(faq)
        } else {
          categoryMap.set(cat.id, { category: cat, faqs: [faq] })
        }
      } else {
        uncategorized.push(faq)
      }
    }

    for (const entry of categoryMap.values()) {
      groupedFaqs.push(entry)
    }
    if (uncategorized.length > 0) {
      groupedFaqs.push({ category: null, faqs: uncategorized })
    }
  } else {
    groupedFaqs.push({ category: activeCategory, faqs: filteredFaqs })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">❓ Frequently Asked Questions</h1>
        <p className="text-gray-500">
          {activeCategory
            ? `FAQs in "${activeCategory.metadata?.name ?? activeCategory.title}"`
            : 'Find answers to common questions'}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/faqs"
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
              href={`/faqs?category=${cat.slug}`}
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

      {/* FAQ Groups */}
      {groupedFaqs.length > 0 ? (
        <div className="space-y-12">
          {groupedFaqs.map((group, index) => {
            if (!group.faqs || group.faqs.length === 0) {
              return null
            }
            return (
              <div key={group.category?.id ?? `uncategorized-${index}`}>
                {!categorySlug && (
                  <div className="flex items-center gap-2 mb-4">
                    {group.category?.metadata?.icon && (
                      <span className="text-xl">{group.category.metadata.icon}</span>
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      {group.category?.metadata?.name ?? group.category?.title ?? 'General'}
                    </h2>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {group.faqs.length}
                    </span>
                  </div>
                )}
                <FaqAccordion faqs={group.faqs} />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🤔</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No FAQs found</h3>
          <p className="text-gray-500 text-sm">
            {activeCategory ? 'Try selecting a different category.' : 'FAQs will appear here once created.'}
          </p>
        </div>
      )}
    </div>
  )
}