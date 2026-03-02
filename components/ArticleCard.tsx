import Link from 'next/link'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  className?: string
}

export default function ArticleCard({ article, className = '' }: ArticleCardProps) {
  const category = article.metadata?.category
  const featuredImage = article.metadata?.featured_image
  const excerpt = article.metadata?.excerpt ?? ''
  const date = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden ${className}`}
    >
      {featuredImage && (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={article.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {category.metadata?.icon && <span>{category.metadata.icon}</span>}
              {category.metadata?.name ?? category.title}
            </span>
          )}
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Read article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}