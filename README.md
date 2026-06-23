# Daybase

Daybase is a minimal personal memory bank built with Next.js App Router, Convex, TypeScript, Tailwind CSS, and an iOS-friendly PWA shell.

## What is included

- Today view with quick capture, recent memories, and important memories
- Searchable memory library with category filters
- Full capture form with title, notes, category, tags, and importance
- Memory detail, edit, and delete flows
- Realtime Convex persistence
- Mobile safe areas, fixed bottom navigation, installable metadata, and app icons

This MVP intentionally has no AI, integrations, dashboard, service worker, or authentication. It is suited to single-user development and personal testing. Add authentication before deploying it as a public multi-user product.

## Local setup

Requirements: Bun and a Convex account or local Convex development environment.

```bash
bun install
bunx convex dev --once
bun run dev
```

The Convex setup command creates or selects a development deployment, writes `NEXT_PUBLIC_CONVEX_URL` to `.env.local`, validates the schema, and generates the typed API. The combined dev command then watches Convex and starts Next.js at [http://localhost:3000](http://localhost:3000).

To run the frontend and backend separately:

```bash
bun run dev:backend
bun run dev:web
```

## Verification

```bash
bun run test
bun run lint
bun run build
```

## Project structure

```text
app/
  capture/                 New memory flow
  memories/                Memory list and detail/edit routes
  convex-client-provider.tsx
  layout.tsx               Metadata, viewport, providers, app shell
  manifest.ts              PWA manifest
components/                Reusable Daybase UI components
convex/
  memories.ts              Queries and mutations
  memories.test.ts         Backend behavior tests
  schema.ts                memories table and indexes
lib/
  memory.ts                Shared categories, types, and tag normalization
public/icons/              PWA icons
```

## Data model

The `memories` table stores `title`, `content`, `category`, `tags`, `importance`, `createdAt`, and `updatedAt`. It is indexed by creation time, category plus creation time, and importance plus creation time.

Search is intentionally bounded to the newest 100 memories for this MVP and matches title, content, category, and tags. A dedicated search field or richer search service can be introduced later without changing the capture experience.

## PWA scope

The manifest and icons support installation and standalone display. Daybase does not register a service worker or cache personal memory responses. That keeps the private-data boundary simple until an explicit offline and identity design is added.
