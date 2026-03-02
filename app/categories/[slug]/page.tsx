// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import FaqAccordion from '@/components/FaqAccordion'
import GlossaryItem from '@/components/GlossaryItem'
import {
  getCategoryBySlug,
  getArticlesByCategory,
  getFaqsByCategory,
  getGlossaryByCategory,
} from '@/lib/cosmic'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }
  const name = category.metadata?.name ?? category.title
  return {
    title: `${name} | My Knowledge Base`,
    description: category.metadata?.description ?? `Browse content in ${name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [articles, faqs, glossary] = await Promise.all([
    getArticlesByCategory(category.id),
    getFaqsByCategory(category.id),
    getGlossaryByCategory(category.id),
  ])

  const name = category.metadata?.name ?? category.title
  const description = category.metadata?.description ?? ''
  const icon = category.metadata?.icon ?? '📂'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-600">{name}</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12 border border-indigo-100">
        <div className="text-4xl mb-3">{icon}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        {description && (
          <p className="text-gray-600 max-w-2xl leading-relaxed">{description}</p>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span>{articles.length} article{articles.length !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}</span>
          <span>•</span>
          <span>{glossary.length} glossary term{glossary.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Articles Section */}
      {articles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📖 Articles
            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {articles.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            ❓ FAQs
            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {faqs.length}
            </span>
          </h2>
          <div className="max-w-3xl">
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}

      {/* Glossary Section */}
      {glossary.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            📘 Glossary
            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {glossary.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossary.map((term) => (
              <GlossaryItem key={term.id} term={term} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {articles.length === 0 && faqs.length === 0 && glossary.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No content yet</h3>
          <p className="text-gray-500 text-sm">Content for this category will appear here once created.</p>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Categories
        </Link>
      </div>
    </div>
  )
}