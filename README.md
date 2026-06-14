# Portfolio — Next.js + Node.js

A fullstack portfolio rebuilt with **Next.js 15** (App Router) and **Node.js** API Route Handlers. No separate server process needed — Next.js handles both the React frontend and the API.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | Node.js (built into Next.js) |
| UI | React 19 + Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |

## Project structure

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   ├── health/route.ts       ← GET /api/health
│   │   ├── projects/route.ts     ← GET /api/projects  (reads data/projects.json)
│   │   └── contact/route.ts      ← POST /api/contact  (writes data/contact-submissions.json)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx          ← fetches /api/projects client-side
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx           ← posts to /api/contact
│   │   └── Footer.tsx
│   ├── modals/
│   │   ├── ProjectModal.tsx
│   │   └── ModalGallery.tsx
│   ├── lib/api.ts                ← shared fetch helpers
│   ├── types/project.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── data/
│   ├── projects.json             ← editable project data
│   └── contact-submissions.json  ← auto-created on first submission
└── public/
    ├── img/                      ← copy your images here
    └── KRISTAL_KAMATOY.pdf       ← copy your CV here
```

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # production on http://localhost:3000
```

## Migrating your assets

Copy these files from the original project's `public/` folder:

```
public/img/icr1.png
public/img/icr2.png
public/img/img1.png
public/img/tal.jpeg
public/KRISTAL_KAMATOY.pdf
public/favicon.svg
public/icons.svg
```

## API routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Returns all projects from `data/projects.json` |
| POST | `/api/contact` | Validates and saves contact submission |

All API routes run as **Node.js Route Handlers** inside Next.js — no separate `server/index.js` is needed.
