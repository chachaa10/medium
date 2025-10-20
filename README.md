# Medium Clone — README.md

A production-minded Medium-like blogging platform built with **Next.js**, **Neon (serverless Postgres)**, **Drizzle ORM** (with `drizzle-kit` migrations), **Tailwind CSS**, and **shadcn/ui**.

---

## Table of contents

1. [Project goal](#project-goal)
1. [Tech stack](#tech-stack)
1. [Repo structure (suggested)](#repo-structure-suggested)
1. [Quick start (local)](#quick-start-local)
1. [Environment variables](#environment-variables)
1. [Troubleshooting](#troubleshooting)
1. [Contributing](#contributing)
1. [License](#license)

---

## Project goal

Ship a minimal, production-ready Medium clone: users can sign up, write/save drafts, publish, read articles, comment, follow, and bookmark. First release focuses on the core publishing loop: **signup → write → publish → view**.

---

## Tech stack

- **Frontend**: Next.js (Typescript)
- **Database**: Neon (serverless Postgres) — production DB. Locally you can use Postgres via Docker. ([Neon][1])
- **ORM**: Drizzle ORM + `drizzle-kit` for migrations and schema tooling. Use the TypeScript-first schema and generate SQL migrations. ([orm.drizzle.team][2])
- **Styling**: Tailwind CSS
- **Component library**: shadcn/ui (Radix + Tailwind primitives) — for accessible UI building blocks. ([ui.shadcn.com][3])
- **Hosting / CI**: Vercel for frontend (and serverless API routes if chosen), Neon for DB. (You can host backend on Railway/Render if you prefer.)

---

## Repo structure (suggested)

<!-- TODO: Change this repo structure -->

```
/ (root)
├─ apps/
│  ├─ client/        # Next.js app (TypeScript)
│  └─ server/        # Optional: standalone Express/Fastify API if not using Next API routes
├─ packages/
│  └─ db/            # drizzle schema, migrations, seeds
├─ prisma/ (optional)
├─ .github/
│  └─ workflows/
├─ docker-compose.yml
├─ README.md
└─ TODO.md
```

> Tip: For a simple solo project, a single Next.js app with Drizzle in `src/db` is common and keeps things simple. There are official Drizzle + Neon Next.js tutorials to follow. ([orm.drizzle.team][4])

---

## Quick start (local)

1. Clone:

```bash
git clone https://github.com/chachaa10/medium-clone.git
cd medium-clone
```

2. Install:

```bash
# using npm
npm install
# or pnpm
pnpm install
# or bun
bun install
```

3. Set up environment variables (see next section). Create `.env.local` from `.env.example`.

4. Run local Postgres (optional — if you prefer local dev rather than Neon):

```bash
# using docker-compose (example included in repo)
docker-compose up -d
```

5. Generate & run migrations (Drizzle):

```bash
# generate migration based on your schema (example)
npx drizzle-kit generate --drizzle-config ./drizzle.config.ts --out migrations
# run migrations
npx drizzle-kit push --config ./drizzle.config.ts
```

(See the Drizzle docs for the exact flags you want for your chosen flow — code-first generate, then apply.) ([orm.drizzle.team][5])

6. Start dev server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000`.

---

## Environment variables

Create a `.env.local` (never commit secrets). Example variables:

```env
# Database
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Neon provides a connection string you can paste directly into `DATABASE_URL`. It typically looks like:

```
postgresql://role:password@ep-xxxxx-pooler.region.neon.tech/dbname?sslmode=require&channel_binding=require
```

---

## Database & migrations (Drizzle + Neon)

### Drizzle ORM basics

- Define your schema in TypeScript (e.g., `./drizzle/schema/your-schema.ts`) using `drizzle-orm/pg-core`.
- Use Drizzle's types in your server code to run queries in a type-safe way.

### Migrations with `drizzle-kit`

Typical flow (code-first):

1. Edit your Drizzle schema (TypeScript).
2. Run `bun run db:generate` to create an SQL migration file from schema changes.
3. Run `bun run db:migrate` / `bun run db:push` to apply migrations.

---

## Contributing

This is a solo-friendly project. If you accept external contributions:

- Use `main` for production-ready code, `develop` for integration, and `feature/<name>` branches for work.
- Keep PRs small and focused.
- Include a clear issue template and PR template.

---

## MIT LICENSE
