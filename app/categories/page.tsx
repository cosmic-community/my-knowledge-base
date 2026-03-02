import type { Metadata } from 'next'
import CategoryCard from '@/components/CategoryCard'
import { getCategories, getArticles, getFaqs, getGlossaryTerms } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Categories | My Knowledge Base',
  description: 'Browse knowledge base content organized by category.',
}

export default async function CategoriesPage() {
  const [categories, articles, faqs, glossary] = await Promise.all([
    getCategories(),
    getArticles(),
    getFaqs(),
    getGlossaryTerms(),
  ])

  const categoryCounts = categories.map((cat) => ({
    category: cat,
    articleCount: articles.filter((a) => a.metadata?.category?.id === cat.id).length,
    faqCount: faqs.filter((f) => f.metadata?.category?.id === cat.id).length,
    glossaryCount: glossary.filter((g) => g.metadata?.category?.id === cat.id).length,
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📂 Categories</h1>
        <p className="text-gray-500">Browse all knowledge base categories</p>
      </div>

      {categoryCounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCounts.map(({ category, articleCount, faqCount, glossaryCount }) => (
            <CategoryCard
              key={category.id}
              category={category}
              articleCount={articleCount}
              faqCount={faqCount}
              glossaryCount={glossaryCount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No categories found</h3>
          <p className="text-gray-500 text-sm">Categories will appear here once created.</p>
        </div>
      )}
    </div>
  )
}