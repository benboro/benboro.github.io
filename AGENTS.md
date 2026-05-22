# Agent Instructions

## Architecture

Read ARCHITECTURE.md before exploring the codebase. It contains the directory map,
key abstractions, and entry points. Only read raw source files when you need detail
beyond what ARCHITECTURE.md covers.

## robots.txt Maintenance

The site ships a `robots.txt` at the repo root that blocks known AI/LLM training
and AI-search crawlers while leaving regular search engines allowed. The list of
blocked user-agents goes stale as new crawlers appear and existing ones rename.

Whenever you touch `robots.txt`, or when the user asks for a refresh:

1. Check current authoritative sources for the canonical user-agent strings —
   each operator publishes the name they crawl under (e.g., OpenAI's GPTBot page,
   Anthropic's ClaudeBot page, Google's "Google-Extended" docs, Common Crawl's
   CCBot docs, Perplexity, ByteDance/Bytespider, Apple's Applebot-Extended, etc.).
2. Add any newly announced AI/training/AI-search crawlers; remove or rename any
   that have been deprecated.
3. Preserve the structure: a single `User-agent: *` / `Allow: /` block at the top
   so regular search engines stay crawlable, followed by one `User-agent: <name>`
   / `Disallow: /` block per AI crawler.
4. Do not block image asset paths for all bots — image-search indexing is already
   handled by the `<meta name="robots" content="noimageindex">` tag in `index.html`,
   and disallowing `/assets/img/` would hurt regular SEO.
5. Remember that `robots.txt` is honor-system: it only affects compliant crawlers,
   not malicious scrapers. Don't oversell its protection when describing changes.
