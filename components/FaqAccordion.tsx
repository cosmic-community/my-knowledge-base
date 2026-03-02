'use client'

import { useState } from 'react'
import type { Faq } from '@/types'

interface FaqAccordionProps {
  faqs: Faq[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No FAQs found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        const question = faq.metadata?.question ?? faq.title
        const answer = faq.metadata?.answer ?? ''

        return (
          <div
            key={faq.id}
            className={`bg-white rounded-xl border transition-all duration-200 ${
              isOpen ? 'border-indigo-200 shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-gray-900 pr-4">
                {question}
              </span>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isOpen ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {isOpen && answer && (
              <div className="px-5 pb-5 -mt-1">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}