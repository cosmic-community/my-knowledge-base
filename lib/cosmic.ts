import { createBucketClient } from '@cosmicjs/sdk'
import type { Category, Article, Faq, GlossaryTerm } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Articles
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles')
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'articles', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
      .depth(1)
    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch article')
  }
}

export async function getArticlesByCategory(categoryId: string): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch articles by category')
  }
}

// FAQs
export async function getFaqs(): Promise<Faq[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const faqs = response.objects as Faq[]
    return faqs.sort((a, b) => {
      const orderA = a.metadata?.order ?? 999
      const orderB = b.metadata?.order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch FAQs')
  }
}

export async function getFaqsByCategory(categoryId: string): Promise<Faq[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const faqs = response.objects as Faq[]
    return faqs.sort((a, b) => {
      const orderA = a.metadata?.order ?? 999
      const orderB = b.metadata?.order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch FAQs by category')
  }
}

// Glossary
export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'glossary' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const terms = response.objects as GlossaryTerm[]
    return terms.sort((a, b) => {
      const termA = (a.metadata?.term ?? a.title).toLowerCase()
      const termB = (b.metadata?.term ?? b.title).toLowerCase()
      return termA.localeCompare(termB)
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch glossary terms')
  }
}

export async function getGlossaryByCategory(categoryId: string): Promise<GlossaryTerm[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'glossary', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const terms = response.objects as GlossaryTerm[]
    return terms.sort((a, b) => {
      const termA = (a.metadata?.term ?? a.title).toLowerCase()
      const termB = (b.metadata?.term ?? b.title).toLowerCase()
      return termA.localeCompare(termB)
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch glossary by category')
  }
}

// Search across all types
export async function searchAll(query: string): Promise<{
  articles: Article[]
  faqs: Faq[]
  glossary: GlossaryTerm[]
}> {
  const [articles, faqs, glossary] = await Promise.all([
    getArticles(),
    getFaqs(),
    getGlossaryTerms(),
  ])

  const q = query.toLowerCase()

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      (a.metadata?.excerpt ?? '').toLowerCase().includes(q) ||
      (a.metadata?.content ?? '').toLowerCase().includes(q)
  )

  const filteredFaqs = faqs.filter(
    (f) =>
      (f.metadata?.question ?? '').toLowerCase().includes(q) ||
      (f.metadata?.answer ?? '').toLowerCase().includes(q)
  )

  const filteredGlossary = glossary.filter(
    (g) =>
      (g.metadata?.term ?? g.title).toLowerCase().includes(q) ||
      (g.metadata?.definition ?? '').toLowerCase().includes(q)
  )

  return {
    articles: filteredArticles,
    faqs: filteredFaqs,
    glossary: filteredGlossary,
  }
}