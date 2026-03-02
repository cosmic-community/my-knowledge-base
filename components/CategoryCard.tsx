import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  articleCount?: number
  faqCount?: number
  glossaryCount?: number
}

export default function CategoryCard({
  category,
  articleCount = 0,
  faqCount = 0,
  glossaryCount = 0,
}: CategoryCardProps) {
  const name = category.metadata?.name ?? category.title
  const description = category.metadata?.description ?? ''
  const icon = category.metadata?.icon ?? '📂'
  const totalItems = articleCount + faqCount + glossaryCount

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
    >
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
        {name}
      </h3>

      {description && (
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-400">
        {articleCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="text-indigo-400">📖</span> {articleCount} article{articleCount !== 1 ? 's' : ''}
          </span>
        )}
        {faqCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="text-indigo-400">❓</span> {faqCount} FAQ{faqCount !== 1 ? 's' : ''}
          </span>
        )}
        {glossaryCount > 0 && (
          <span className="flex items-center gap-1">
            <span className="text-indigo-400">📘</span> {glossaryCount} term{glossaryCount !== 1 ? 's' : ''}
          </span>
        )}
        {totalItems === 0 && <span>No items yet</span>}
      </div>
    </Link>
  )
}