# YourLinks 🔗

A polished **link-in-bio / social profile** app — a modern Next.js take on the "one link for all your socials" idea, with an iOS-style profile preview, image cropping, and a fast, reactive editor.

> **Stack:** Next.js 15 · React 19 · Tailwind CSS · Radix UI · react-hook-form + zod · zustand · next-intl · sharp · motion · react-easy-crop

## Why this project

I wanted to build a feature that feels *finished* — the kind of product App Store reviewers call "delightful." That means real image cropping (not a default file input), an iPhone-frame preview so you see the result as you type, optimistic local state, and form validation that's type-safe end to end.

## Highlights

- **Next.js 15 + React 19** — App Router, React Server Components where it counts, `sharp` for optimized image handling.
- **Radix UI + Tailwind** — accessible primitives (`dialog`, `select`, `tabs`, `slot`, `textarea`) on a `cva`/`tailwind-merge` styling system.
- **React Hook Form + zod** — schema-driven forms, types inferred straight from the schema. No drift between validation and types.
- **zustand** — lightweight, predictable client state for the editor.
- **next-intl** — first-class internationalization.
- **Image cropping** — `react-easy-crop` with a custom `dialog-image-cropper` and `image-picker` flow.
- **Motion** — `motion` for spring-based transitions and that "sweats the last 5%" polish.
- **iPhone-frame preview** — a custom `iphone-frame` that renders the live profile, so the editing loop is instant.
- **Reusable UI kit** — a `components/ui` set (button, dialog, input, select, tabs, textarea) with consistent `class-variance-authority` variants.

## Architecture

```
app/               # routes (App Router)
components/
├── ui/            # Radix primitives + cva variants (button, dialog, select, tabs, input)
├── iphone-frame   # live device preview
├── image-picker   # file + crop flow
├── dialog-image-cropper
├── profile-tab    # profile editing
├── social-media-tab
└── social-media-item
lib/utils.ts       # cn() + helpers
```

## Getting started

```bash
pnpm install
pnpm dev
```

Requires Node 20+. Open http://localhost:3000.

## What it demonstrates

- Modern full-stack React (Next 15 / RSC)
- Type-safe forms (zod + RHF) and accessible Radix components
- Product polish: crop-to-fit, live preview, motion
- i18n and a clean reusable UI kit

---

*Built by [Alisson "SkyLissh" Hernandez] — React, TypeScript, and product-driven frontend. This is a personal portfolio project.*
