export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    icon?: string
  }
}

export interface Article extends CosmicObject {
  type: 'articles'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    category?: Category
    helpful?: number
  }
}

export interface Faq extends CosmicObject {
  type: 'faqs'
  metadata: {
    question?: string
    answer?: string
    category?: Category
    order?: number
  }
}

export interface GlossaryTerm extends CosmicObject {
  type: 'glossary'
  metadata: {
    term?: string
    definition?: string
    category?: Category
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}