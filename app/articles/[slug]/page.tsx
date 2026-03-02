// app/articles/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticles } from '@/lib/cosmic'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: `${article.title} | My Knowledge Base`,
    description: article.metadata?.excerpt ?? '',
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const featuredImage = article.metadata?.featured_image
  const category = article.metadata?.category
  const content = article.metadata?.content ?? article.content ?? ''
  const date = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Get related articles from same category
  let relatedArticles: Awaited<ReturnType<typeof getArticles>> = []
  if (category) {
    const allArticles = await getArticles()
    relatedArticles = allArticles
      .filter((a) => a.metadata?.category?.id === category.id && a.id !== article.id)
      .slice(0, 3)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-indigo-600 transition-colors">Articles</Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/articles?category=${category.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {category.metadata?.name ?? category.title}
            </Link>
          </>
        )}
      </nav>

      {/* Category & Date */}
      <div className="flex items-center gap-3 mb-4">
        {category && (
          <Link
            href={`/articles?category=${category.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
          >
            {category.metadata?.icon && <span>{category.metadata.icon}</span>}
            {category.metadata?.name ?? category.title}
          </Link>
        )}
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Excerpt */}
      {article.metadata?.excerpt && (
        <p className="text-lg text-gray-500 mb-8 leading-relaxed">
          {article.metadata.excerpt}
        </p>
      )}

      {/* Featured Image */}
      {featuredImage && (
        <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose-kb max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.slug}`}
                className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm line-clamp-2">
                  {related.title}
                </h3>
                {related.metadata?.excerpt && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{related.metadata.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>
      </div>
    </div>
  )
}