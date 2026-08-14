#!/usr/bin/env python3
"""Scaffold a new blog article folder with all locale files.

Usage:
    python scripts/new-article.py

Interactive prompts will guide you through creating the article structure.
"""

import os
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"
LOCALES = ["es-419", "en-US", "pt-BR"]


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text)


def prompt(msg: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    result = input(f"{msg}{suffix}: ").strip()
    return result or default


def main():
    print("=== New Blog Article Scaffolder ===\n")

    slug = prompt("Article slug (URL-friendly)")
    if not slug:
        print("Error: slug is required", file=sys.stderr)
        sys.exit(1)
    slug = slugify(slug)

    titles = {}
    for locale in LOCALES:
        titles[locale] = prompt(f"Title ({locale})")

    categories = prompt("Categories (comma-separated IDs)", "ai-education")
    tags = prompt("Tags (comma-separated IDs)", "ai")
    author = prompt("Author", "Fundación JD10")
    has_video = prompt("Has video? (y/n)", "n").lower() == "y"

    article_dir = BLOG_DIR / slug
    if article_dir.exists():
        print(f"Error: Directory already exists: {article_dir}", file=sys.stderr)
        sys.exit(1)

    article_dir.mkdir(parents=True)

    # meta.ts
    cats_str = ", ".join(f"'{c.strip()}'" for c in categories.split(","))
    tags_str = ", ".join(f"'{t.strip()}'" for t in tags.split(","))
    meta_content = f"""import type {{ BlogPostMeta }} from '@types/blog';

export const meta: BlogPostMeta = {{
  slug: '{slug}',
  title: {{
    'es-419': '{titles.get("es-419", "")}',
    'en-US': '{titles.get("en-US", "")}',
    'pt-BR': '{titles.get("pt-BR", "")}',
  }},
  excerpt: {{
    'es-419': '',
    'en-US': '',
    'pt-BR': '',
  }},
  date: '{__import_date()}',
  author: '{author}',
  categories: [{cats_str}],
  tags: [{tags_str}],
  {f"videoUrl: ''," if has_video else ""}
}};
"""
    (article_dir / "meta.ts").write_text(meta_content, encoding="utf-8")

    # Article components
    for locale in LOCALES:
        filename = "index.tsx" if locale == "es-419" else f"{locale}.tsx"
        component_name = "Article" + locale.replace("-", "")
        content = f"""export default function {component_name}() {{
  return (
    <div>
      <p>{'Contenido del artículo' if locale == 'es-419' else 'Article content' if locale == 'en-US' else 'Conteúdo do artigo'}.</p>
    </div>
  );
}}
"""
        (article_dir / filename).write_text(content, encoding="utf-8")

    print(f"\n✓ Article scaffolded at: {article_dir}")
    print(f"\nNext steps:")
    print(f"  1. Write content in each locale file")
    print(f"  2. Fill in excerpts in meta.ts")
    print(f"  3. Register in src/content/blog/index.ts")


def __import_date():
    from datetime import date

    return date.today().isoformat()


if __name__ == "__main__":
    main()
