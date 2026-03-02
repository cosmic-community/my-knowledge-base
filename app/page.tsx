import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import FaqAccordion from '@/components/FaqAccordion'
import GlossaryItem from '@/components/GlossaryItem'
import CategoryCard from '@/components/CategoryCard'
import { getArticles, getFaqs, getGlossaryTerms, getCategories } from '@/lib/cosmic'

export default async function HomePage() {
  const [articles, faqs, glossary, categories] = await Promise.all([
    getArticles(),
    getFaqs(),
    getGlossaryTerms(),
    getCategories(),
  ])

  const recentArticles = articles.slice(0, 3)
  const topFaqs = faqs.slice(0, 5)
  const sampleGlossary = glossary.slice(0, 6)

  // Count items per category
  const categoryCounts = categories.map((cat) => ({
    category: cat,
    articleCount: articles.filter((a) => a.metadata?.category?.id === cat.id).length,
    faqCount: faqs.filter((f) => f.metadata?.category?.id === cat.id).length,
    glossaryCount: glossary.filter((g) => g.metadata?.category?.id === cat.id).length,
  }))

  return (
    <div>
      <HeroSection />

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Articles', count: articles.length, icon: '📖', href: '/articles' },
            { label: 'FAQs', count: faqs.length, icon: '❓', href: '/faqs' },
            { label: 'Glossary Terms', count: glossary.length, icon: '📘', href: '/glossary' },
            { label: 'Categories', count: categories.length, icon: '📂', href: '/categories' },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-gray-100 shadow-md p-4 text-center hover:shadow-lg hover:border-indigo-200 transition-all duration-200"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
              <p className="text-gray-500 text-sm mt-1">Latest knowledge base entries</p>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categoryCounts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              <p className="text-gray-500 text-sm mt-1">Browse by topic</p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
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
        </section>
      )}

      {/* FAQs */}
      {topFaqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-sm mt-1">Quick answers to common questions</p>
            </div>
            <Link
              href="/faqs"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="max-w-3xl">
            <FaqAccordion faqs={topFaqs} />
          </div>
        </section>
      )}

      {/* Glossary Preview */}
      {sampleGlossary.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Glossary</h2>
              <p className="text-gray-500 text-sm mt-1">Key terms and definitions</p>
            </div>
            <Link
              href="/glossary"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleGlossary.map((term) => (
              <GlossaryItem key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}