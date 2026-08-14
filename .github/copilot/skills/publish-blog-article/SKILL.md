# Publish Blog Article

Scaffold and register a new blog article for the Fundación JD10 website.

## When to use

Use this skill when the user asks to:

- Create a new blog post / article
- Publish a new entry on the blog
- Add a blog post about a specific topic

## Article Structure

Each blog article lives in `src/content/blog/{slug}/` with:

```
src/content/blog/{slug}/
├── index.tsx      ← es-419 (default Spanish) article component
├── en-US.tsx      ← English version
├── pt-BR.tsx      ← Portuguese version
└── meta.ts        ← Metadata (title, excerpt, date, categories, tags per locale)
```

## Steps

1. **Determine the slug** - URL-friendly, lowercase, hyphenated (e.g., `responsible-ai-usage`)

2. **Create `meta.ts`** with this structure:

```typescript
import type { BlogPostMeta } from "@types/blog";

export const meta: BlogPostMeta = {
  slug: "the-slug",
  title: {
    "es-419": "Título en español",
    "en-US": "English title",
    "pt-BR": "Título em português",
  },
  excerpt: {
    "es-419": "Breve descripción...",
    "en-US": "Brief description...",
    "pt-BR": "Breve descrição...",
  },
  date: "2026-08-07", // ISO date
  author: "Fundación JD10",
  categories: ["ai-education"], // IDs from src/types/blog.ts CATEGORIES
  tags: ["ai", "ethics"], // IDs from src/types/blog.ts TAGS
  // Optional:
  // featuredImage: 'https://archivos.fundacionjd10.com/blog/slug/cover.jpg',
  // videoUrl: 'https://www.youtube.com/watch?v=...',
  // readingTime: { 'es-419': 5, 'en-US': 5, 'pt-BR': 5 },
};
```

3. **Create article components** - Each locale gets its own React component file:
   - `index.tsx` → Spanish (es-419), the default
   - `en-US.tsx` → English
   - `pt-BR.tsx` → Portuguese

   Each component is a default export returning JSX. Use components from `@components/blog/`:
   - `VideoEmbed` for embedded video
   - `ImageGallery` for photo evidence/galleries

   Example:

   ```tsx
   import { ImageGallery } from "@components/blog/ImageGallery";

   export default function Article() {
     return (
       <div>
         <p>Article content here...</p>
         <ImageGallery
           images={[
             {
               url: "https://archivos.fundacionjd10.com/blog/slug/photo1.jpg",
               alt: "Description",
             },
           ]}
         />
       </div>
     );
   }
   ```

4. **Register the article** in `src/content/blog/index.ts`:

```typescript
import { meta as newArticleMeta } from './new-slug/meta';
import NewArticleEs from './new-slug/index';
import NewArticleEn from './new-slug/en-US';
import NewArticlePt from './new-slug/pt-BR';

// Add to the blogPosts array:
{
  meta: newArticleMeta,
  components: {
    'es-419': NewArticleEs,
    'en-US': NewArticleEn,
    'pt-BR': NewArticlePt,
  },
}
```

## Available Categories

Check `src/types/blog.ts` for current categories:

- `ai-education` - AI Education
- `projects` - Projects
- `community` - Community
- `tech` - Technology

## Available Tags

Check `src/types/blog.ts` for current tags:

- `ai`, `ethics`, `open-source`, `parasocial`

New categories/tags can be added to `src/types/blog.ts` arrays.

## Images

For blog images (evidence photos, covers):

1. Upload via `python scripts/upload-to-r2.py image.jpg --prefix blog/{slug}`
2. Use the returned URL in the article component or `meta.ts` featuredImage
