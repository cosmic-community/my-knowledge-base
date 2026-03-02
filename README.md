# My Knowledge Base

![My Knowledge Base](https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=300&fit=crop&auto=format)

A comprehensive knowledge management platform built with Next.js 16 and Cosmic CMS. Browse articles, FAQs, and glossary terms organized by category — all powered by your Cosmic content.

## Features

- 📖 **Articles** — Rich content articles with featured images, categories, and helpful vote tracking
- ❓ **FAQs** — Expandable FAQ accordion organized by category with custom ordering
- 📘 **Glossary** — Alphabetically indexed glossary with letter navigation and category filtering
- 📂 **Categories** — Unified category pages aggregating articles, FAQs, and glossary terms
- 🔍 **Search** — Client-side search across all content types
- 📱 **Responsive** — Mobile-first design that looks great on every screen size
- ⚡ **Server Components** — Leverages Next.js 16 server components for fast, SEO-friendly rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a4e5774d184b008ebaf426&clone_repository=69a4e6f54d184b008ebaf45a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a knowledge base with articles organized by category, FAQs, and a glossary."

### Code Generation Prompt

> "Build a Next.js application for a content management system called 'My Knowledge Base'. The content is managed in Cosmic CMS with the following object types: categories, articles, faqs, glossary. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router and Server Components
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+) or Node.js (v18+)
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing the content types

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-knowledge-base
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables — create a `.env.local` file:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Articles with Category Depth
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: articles } = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Article by Slug
```typescript
const { object: article } = await cosmic.objects
  .findOne({ type: 'articles', slug: 'my-article' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Categories | `categories` | Top-level organization with name, description, and icon |
| Articles | `articles` | In-depth content with excerpt, body, featured image, and category |
| FAQs | `faqs` | Question/answer pairs with category and display order |
| Glossary | `glossary` | Term/definition pairs with category grouping |

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify
1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->