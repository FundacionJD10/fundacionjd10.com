import type { Locale } from "@i18n/store";
import type { ComponentType } from "react";

export interface BlogCategory {
  id: string;
  label: Record<Locale, string>;
}

export interface BlogTag {
  id: string;
  label: Record<Locale, string>;
}

export interface BlogPostMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string; // ISO date
  author: string;
  categories: string[]; // category IDs
  tags: string[]; // tag IDs
  featuredImage?: string; // R2 URL or local path
  videoUrl?: string; // YouTube/Vimeo URL
  readingTime?: Record<Locale, number>; // minutes
}

export interface BlogPost {
  meta: BlogPostMeta;
  components: Partial<Record<Locale, ComponentType>>;
}

export const CATEGORIES: BlogCategory[] = [
  {
    id: "ai-education",
    label: {
      "es-419": "Educación IA",
      "en-US": "AI Education",
      "pt-BR": "Educação IA",
    },
  },
  {
    id: "projects",
    label: { "es-419": "Proyectos", "en-US": "Projects", "pt-BR": "Projetos" },
  },
  {
    id: "community",
    label: {
      "es-419": "Comunidad",
      "en-US": "Community",
      "pt-BR": "Comunidade",
    },
  },
  {
    id: "tech",
    label: {
      "es-419": "Tecnología",
      "en-US": "Technology",
      "pt-BR": "Tecnologia",
    },
  },
];

export const TAGS: BlogTag[] = [
  {
    id: "ai",
    label: { "es-419": "IA", "en-US": "AI", "pt-BR": "IA" },
  },
  {
    id: "ethics",
    label: { "es-419": "Ética", "en-US": "Ethics", "pt-BR": "Ética" },
  },
  {
    id: "open-source",
    label: {
      "es-419": "Código abierto",
      "en-US": "Open Source",
      "pt-BR": "Código aberto",
    },
  },
  {
    id: "parasocial",
    label: {
      "es-419": "Relaciones parasociales",
      "en-US": "Parasocial relationships",
      "pt-BR": "Relações parassociais",
    },
  },
];
