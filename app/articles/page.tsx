import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { getArticles, getCategories } from '@/lib/cosmic'
import type { Category } from '@/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Articles | My Knowledge Base',
  description: 'Browse all knowledge base articles organized by category.',
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categorySlug } = await searchParams
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ])

  let filteredArticles = articles
  let activeCategory: Category | null = null

  if (categorySlug) {
    activeCategory = categories.find((c) => c.slug === categorySlug) ?? null
    if (activeCategory) {
      filteredArticles = articles.filter(
        (a) => a.metadata?.category?.id === activeCategory?.id
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📖 Articles</h1>
        <p className="text-gray-500">
          {activeCategory
            ? `Showing articles in "${activeCategory.metadata?.name ?? activeCategory.title}"`
            : 'Browse all knowledge base articles'}
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/articles"
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
              href={`/articles?category=${cat.slug}`}
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

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No articles found</h3>
          <p className="text-gray-500 text-sm">
            {activeCategory ? 'Try selecting a different category.' : 'Articles will appear here once created.'}
          </p>
        </div>
      )}
    </div>
  )
}