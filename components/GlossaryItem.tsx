import type { GlossaryTerm } from '@/types'

interface GlossaryItemProps {
  term: GlossaryTerm
}

export default function GlossaryItem({ term }: GlossaryItemProps) {
  const termName = term.metadata?.term ?? term.title
  const definition = term.metadata?.definition ?? ''
  const category = term.metadata?.category

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
          {termName.charAt(0).toUpperCase()}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-gray-900">{termName}</h3>
            {category && (
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {category.metadata?.name ?? category.title}
              </span>
            )}
          </div>
          {definition && (
            <p className="text-sm text-gray-600 leading-relaxed">{definition}</p>
          )}
        </div>
      </div>
    </div>
  )
}