# TODO.md — Deliverables for Medium Clone (solo dev)

> Quick rules
>
> - Create one issue per top-level checkbox.
> - Use `feature/<short-name>` branches.
> - Keep commits small and atomic.
> - Stick to the MVP first — anything marked **P2** is post-MVP.

---

## Table of contents

- [Project Setup](#project-setup)
- [Planning Deliverables](#planning-deliverables)
- [Environment & CI/CD](#environment--cicd)
- [Database & Backend](#database--backend)
- [Frontend](#frontend)
- [Integration](#integration)
- [Performance & Ops](#performance--ops)
- [Documentation & Handoff](#documentation--handoff)
- [Optional / Post-MVP (P2)](#optional--post-mvp-p2)

---

## Project Setup

- [x] **Init repository & basic files**

  - [x] Create GitHub repo (public/private as desired)
  - [x] Add `README.md` (short project brief)
  - [x] Add `.gitignore`
  - [x] Add `LICENSE`
  - [ ] Add `CODE_OF_CONDUCT.md` (optional)
  - Acceptance: Repo visible, cloning works, README contains project goal and stack.

- [x] **Repo skeleton**

  - [x] Create `/client` and `/server` folders or monorepo structure
  - [x] Add `package.json` in root with workspace scripts (if monorepo)
  - [x] Add `./.env.example`
  - Acceptance: `npm run dev` or `pnpm dev` starts both client/server locally per scripts.

---

## Planning Deliverables (from Planning Phase)

- [ ] **Project brief** (1-paragraph)

  - Acceptance: Single paragraph describing goal, target audience, MVP scope.

- [ ] **Feature list (MVP + backlog)**

  - [ ] List of must-haves
  - [ ] List of nice-to-haves
  - Acceptance: Clear separation between MVP & backlog.

- [ ] **Prioritized user stories (converted to issues)**

  - [ ] Auth stories
  - [ ] Article stories (draft, publish)
  - [ ] Profile stories
  - [ ] Feed & follow stories
  - [ ] Comments & bookmarks
  - Acceptance: Each story has acceptance criteria and estimate.

- [ ] **High-level architecture diagram**

  - [ ] Text sketch or image stored in repo (`ARCHITECTURE.md` or `./docs/architecture.png`)
  - Acceptance: Shows client, API, DB, storage, CI/CD, and third-party services.

- [ ] **Minimal data model (Prisma schema / ERD)**

  - [ ] User, Article, Comment, Follow, Bookmark, (optional: Like)
  - Acceptance: Uploaded `prisma/schema.prisma` or `db/schema.sql`.

- [ ] **API contract (API.md)**

  - [ ] Auth endpoints
  - [ ] User endpoints
  - [ ] Article endpoints
  - [ ] Comment & engagement endpoints
  - Acceptance: File `API.md` with methods, paths, request/response examples.

- [ ] **Wireframes / Page list**

  - [ ] Sketches for every MVP page (can be pen+photo or Figma)
  - Pages: Landing, Signup/Login, Feed, Article view, Editor, Profile, Bookmarks, Settings
  - Acceptance: Images or Figma links in `./design/wireframes/`.

- [ ] **Milestone timeline (roadmap)**

  - [ ] Weekly sprint plan (1–4 weeks as earlier)
  - Acceptance: `ROADMAP.md` with milestones and expected outcomes.

- [ ] **Risk register**

  - [ ] List of top 5 risks + mitigations
  - Acceptance: `RISK.md` present.

---

## Environment & CI/CD

- [ ] **Local dev environment**

  - [ ] Docker Compose file for local Postgres (optional but recommended)
  - [ ] Scripts to seed dev database (small sample users & articles)
  - Acceptance: `docker-compose up` brings up DB and app connects.

- [x] **Environment variables**

  - [x] Define required env vars in `.env.example`:

    - `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV`, `NEXT_PUBLIC_API_URL`, `CLOUDINARY_URL` (optional)

  - Acceptance: `.env.example` present and documented.

- [ ] **CI/CD pipeline**

  - [ ] GitHub Actions workflow to run lint/build and deploy on push to `main` (basic)
  - [ ] Deploy preview on pull request (if using Vercel/GitHub integration)
  - Acceptance: Workflow file `.github/workflows/ci.yml` present and passing on main.

- [ ] **Secrets & hosting accounts setup**

  - [ ] Create accounts (Vercel, Railway/Render, Supabase/Neon)
  - [ ] Add necessary secrets to provider env (DB, JWT_SECRET)
  - Acceptance: Provider shows secrets and assigned to project.

---

## Database & Backend

- [ ] **DB schema & migrations**

  - [x] Implement models: User, Article, Comment, Follow, Bookmark
  - [x] Create initial migration files
  - Acceptance: Migration runs successfully, tables created.

- [ ] **Auth system**

  - [x] POST `/api/auth/signup`

    - Validate input, hash password, create user, return token or set cookie

  - [x] POST `/api/auth/login`

    - Validate credentials, issue token/cookie

  - [ ] GET `/api/auth/me`

    - Return current user (protected)

  - Subtasks:

    - [x] Implement password hashing (bcrypt/argon2)
    - [ ] Implement JWT or session cookie logic
    - [ ] Implement simple rate-limiting on auth endpoints

  - Acceptance: Sign up, login, and `me` work end-to-end with secure password storage.

- [ ] **User management**

  - [ ] GET `/api/users/:username`
  - [ ] PATCH `/api/users/me`
  - Acceptance: Public profile viewable; auth-required updates persist.

- [ ] **Articles API**

  - [ ] POST `/api/articles` — create draft or publish
  - [ ] PATCH `/api/articles/:id` — edit
  - [ ] DELETE `/api/articles/:id` — delete (soft-delete optional)
  - [ ] GET `/api/articles/:slug` — read
  - [ ] GET `/api/articles` — list with pagination, filtering (tag, author)
  - Subtasks:

    - [ ] Slug generation (unique)
    - [ ] Read-time & excerpt generation (simple)
    - [ ] Tag handling (join table or array)

  - Acceptance: Can create draft, publish, and fetch by slug.

- [ ] **Comments**

  - [ ] POST `/api/articles/:id/comments`
  - [ ] GET `/api/articles/:id/comments`
  - Acceptance: Authenticated user can comment; comments persist and load.

- [ ] **Follow / Bookmark**

  - [ ] POST & DELETE follow endpoints
  - [ ] POST & DELETE bookmark endpoints
  - Acceptance: Follow/bookmark toggles persist and reflect in feeds.

- [ ] **Utilities & middleware**

  - [ ] Request validation (zod/joi)
  - [ ] Error handling middleware
  - [ ] Logging (basic console + error logs)
  - Acceptance: API returns consistent error format, logs errors.

---

## Frontend

(Recommended: Next.js; implement server-side routes where helpful for SEO.)

- [ ] **Project scaffold**

  - [ ] Create Next.js app in `/client`
  - [ ] Install Tailwind CSS (or your styling choice)
  - Acceptance: `npm run dev` serves Next app.

- [ ] **Global layout & theme**

  - [ ] Header with nav, login/signup links
  - [ ] Footer (simple)
  - Acceptance: Layout used by all pages.

- [ ] **Auth pages**

  - [ ] Signup page + form -> calls backend
  - [ ] Login page -> calls backend
  - [ ] Client-side session handling (store token cookie or rely on httpOnly cookie)
  - Acceptance: User can log in and remain authenticated across pages.

- [ ] **Home / Feed**

  - [ ] Feed page lists paginated published articles
  - [ ] Trending/tag sidebar (simple tag cloud)
  - Acceptance: Feed loads articles from `/api/articles`.

- [ ] **Article view**

  - [ ] Display title, metadata (author, date), content (render Markdown)
  - [ ] Comments section (list + form)
  - [ ] Bookmark & like buttons
  - Acceptance: Visiting `/articles/[slug]` shows full article and comments load.

- [ ] **Editor**

  - [ ] Title input, tags input, body editor (Markdown or Rich text)
  - [ ] Autosave draft every X seconds or on change
  - [ ] Publish & Save Draft buttons
  - Subtasks:

    - [ ] Implement Markdown editor (react-markdown + textarea) **or**
    - [ ] Integrate a lightweight richtext editor (TipTap / Draft.js) — careful with bundle size

  - Acceptance: Create draft & publish flows work; editor autosaves.

- [ ] **Profile pages**

  - [ ] Public profile (bio, avatar, articles)
  - [ ] Edit profile page (auth required)
  - Acceptance: Profile updates persist; public view shows articles.

- [ ] **Bookmarks & Bookmarks page**

  - [ ] List user saved articles
  - Acceptance: Bookmarks created from article view and show in bookmarks list.

- [ ] **Search (basic)**

  - [ ] Search bar for articles by title/tag
  - Acceptance: Returns relevant article list; not required to be full-text (DB filtering ok).

- [ ] **Responsive & accessibility**

  - [ ] Mobile breakpoints
  - [ ] Basic a11y: labels, focus states, alt text
  - Acceptance: Core pages usable on phone; forms accessible by screen reader basics.

---

## Integration

- [ ] **Connect frontend -> backend**

  - [ ] Configure proxy / base URL for dev
  - [ ] Ensure CORS & cookies work (if using httpOnly cookies)
  - Acceptance: Frontend can call protected endpoints and maintain auth.

- [ ] **Image handling (basic)**

  - [ ] Avatar upload flow (can be placeholder URL for MVP)
  - Subtasks (if adding):

    - [ ] Integrate Cloudinary or S3 signed uploads

  - Acceptance: Avatar URL persists and displays.

- [ ] **Run migrations on production DB**

  - [ ] Prepare migration script for production (`prisma migrate deploy` or equivalent)
  - Acceptance: Migration runs and DB schema correct.

---

## Performance & Ops

- [ ] **Caching basics**

  - [ ] Implement server-side caching for feed queries (simple TTL)
  - [ ] Use CDN for static assets (Vercel handles this for Next)
  - Acceptance: Feed requests faster on cache hit.

- [ ] **Pagination & lazy loading**

  - [ ] Implement pagination or cursor-based loading for feeds & comments
  - Acceptance: Feed loads in pages, not all at once.

- [ ] **Monitoring & logs**

  - [ ] Setup basic error logging (Sentry or simple log forwarding) — **P2**
  - Acceptance: Errors captured in provider dashboard (if implemented).

- [ ] **Backups**

  - [ ] Ensure DB provider has automatic backups (verify)
  - Acceptance: Backup setting confirmed.

---

## Deployment

- [ ] **Choose hosts & configure**

  - [ ] Frontend: Vercel (recommended) — connect repo, set env vars
  - [ ] Backend: Railway / Render / Vercel Serverless / single Docker on DigitalOcean
  - [ ] Database: Supabase / Neon / Heroku Postgres
  - Acceptance: All services linked to repo and env vars set.

- [ ] **SSL & domain**

  - [ ] Add custom domain (optional) and confirm HTTPS
  - Acceptance: Site accessible via domain with valid SSL cert.

- [ ] **Run smoke tests after deploy**

  - [ ] Signup -> login -> publish -> view article
  - Acceptance: End-to-end happy path works on production URL.

- [ ] **Setup automatic deploys**

  - [ ] Push to `main` triggers production deploy
  - Acceptance: Confirm deploying on commit to `main`.

---

## Documentation & Handoff

- [ ] **README (full)**

  - [ ] Setup dev (install, env, run)
  - [ ] Tech stack & architecture summary
  - Acceptance: Developer can clone + run locally using README steps.

- [ ] **API.md**

  - [ ] All endpoints described with sample requests/responses
  - Acceptance: Frontend dev can use API.md to implement calls.

- [ ] **ARCHITECTURE.md**

  - [ ] Diagram, explanation of design decisions, scaling notes
  - Acceptance: Clear rationale for stack and deployment.

- [ ] **ROADMAP.md**

  - [ ] Post-MVP improvements, nice-to-haves with priorities
  - Acceptance: Future work prioritized and sequenced.

- [ ] **CONTRIBUTION & ISSUE TEMPLATES**

  - [ ] Add basic issue templates and PR template
  - Acceptance: Contributors know how to open issues & PRs.

---

## Optional / Post-MVP (P2)

These are valuable but delay MVP. Triage them after core shipping.

- [x] Social login (Google)
- [ ] Image upload with CDN signed uploads
- [ ] Real-time comments (WebSockets)
- [ ] Advanced search (Elasticsearch or Postgres full-text)
- [ ] Notifications (email or in-app)
- [ ] Analytics integration (Google Analytics or Plausible)
- [ ] Sentry or full observability
- [ ] Multi-tenant or paid features

---

## Example acceptance checklist for a big feature (Article publish — copy into the issue)

**Article publish — Acceptance**

- [ ] Author can open editor and create an article.
- [ ] Draft is autosaved every X seconds or when user clicks save.
- [ ] Author clicks Publish → backend sets `is_published=true` and `published_at`.
- [ ] Slug is generated and unique; frontend redirects to `/articles/:slug`.
- [ ] Article page shows title, author, date, body, tags, and comments section.
- [ ] Non-authenticated users can read published articles.
- [ ] Published article appears in the home feed and is paginated correctly.

---

## Estimates (very rough)

Useful for solo planning. Adjust to your speed.

- Repo + planning docs: 4–8 hours
- Auth + DB migrations: 8–16 hours
- Article API + backend CRUD: 12–24 hours
- Editor + autosave: 8–20 hours (depends on editor choice)
- Frontend pages (feed, article, profile): 12–28 hours
- Integration & deploy: 6–12 hours
- Polish & accessibility: 6–12 hours

---

## Final note (encouragement)

Ship the smallest happy path first: **signup → write → publish → view**. That one loop proves the product exists and unlocks everything else. Keep checkboxes small, push often, and don’t polish UI until the loop works.
