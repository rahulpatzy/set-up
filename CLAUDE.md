# Project Template

## Architecture

Full-stack template: **FastAPI** (Python) + **React** (Vite/TypeScript/Tailwind). Supabase as the database/auth backend.

```
backend/           FastAPI app (Python, managed with uv)
  src/app/         Application source
  src/app/main.py  FastAPI entrypoint — add routers here
  tests/           pytest tests
  pyproject.toml   Dependencies and ruff/pytest config
  uv.lock          Locked dependencies (always commit this)

frontend/          React app (Vite + TypeScript + Tailwind)
  src/App.tsx      Root component
  src/main.tsx     Entry point
  src/index.css    Tailwind directives
  package.json     Node deps
  package-lock.json Locked deps (always commit this)
  vite.config.ts   Vite config — proxies /api/* to backend

.github/workflows/
  ci.yml           Lint + test + audit (runs on every PR)

.claude/
  settings.json    Pre-allowed commands for Claude Code

CODEOWNERS         Auto-assigns @rahulpatzy as reviewer on PRs
Makefile           All dev shortcuts (see below)
.env.example       Template — copy to .env.development etc.
```

## Branch Strategy

```
feature/xxx  →  PR  →  develop  (CI must pass = QA gate)
                            ↓ PR
                          main   (CI must pass = prod gate)
```

- **Always create a new branch for each feature/fix** — never commit directly to `develop` or `main`
- Branch naming: `feat/`, `fix/`, `docs/`, `chore/`
- `develop` and `main` are protected — pushes are blocked, PRs required

## Quick Start

```bash
make install      # install all deps (uv sync + npm ci)
make env-dev      # activate development environment
make dev          # start backend + frontend, opens browser
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Swagger: http://localhost:8000/docs

## Key Commands

| Command | What it does |
|---|---|
| `make dev` | Start both servers + open browser |
| `make test` | Run pytest |
| `make lint` | Ruff check + ESLint |
| `make format` | Auto-fix with ruff |
| `make install` | `uv sync` + `npm ci` |
| `make pull` | Pull latest for current branch |
| `make sync` | Fetch main + rebase current branch |
| `make env-dev` | Switch to `.env.development` |
| `make env-qa` | Switch to `.env.qa` |
| `make env-prod` | Switch to `.env.production` |

## Environment Variables

Each environment has its own file (all git-ignored):

```
.env.development    ← local dev (localhost URLs, dev Supabase project)
.env.qa             ← QA config
.env.production     ← prod config
.env                ← active slot (app reads this — make env-* copies into it)
```

Key variables:
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — public anon key (safe to expose to frontend)
- `SUPABASE_SERVICE_ROLE_KEY` — secret key (backend only, never expose)
- `DATABASE_URL` — direct Postgres connection string
- `SECRET_KEY` — app secret (generate: `openssl rand -hex 32`)
- `ENVIRONMENT` — `development` | `qa` | `production`
- `VITE_API_URL` — backend URL for frontend (Vite exposes `VITE_` prefixed vars)
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — for frontend Supabase client

## Backend

```bash
cd backend
uv sync --all-extras          # install deps
uv run uvicorn app.main:app --reload --port 8000   # dev server
uv run pytest -v              # tests
uv run ruff check .           # lint
uv run ruff format .          # format
```

Add new routes in `backend/src/app/routers/`. Include them in `main.py`:
```python
from app.routers import my_router
app.include_router(my_router.router, prefix="/my-route", tags=["my-route"])
```

## Frontend

```bash
cd frontend
npm install          # install deps
npm run dev          # dev server (localhost:5173)
npm run build        # production build → dist/
npm run lint         # ESLint
```

API calls from the frontend use `/api/` prefix — Vite proxies these to the backend:
```ts
const res = await fetch('/api/health')   // proxied to localhost:8000/health
```

## Adding Dependencies

```bash
# Python
cd backend && uv add package-name

# JavaScript
cd frontend && npm install package-name
```

Always commit the updated lockfiles (`uv.lock`, `package-lock.json`).

## CI

GitHub Actions runs on every push and PR (`.github/workflows/ci.yml`):

1. **backend-ci** — `ruff check`, `ruff format --check`, `pytest`
2. **frontend-ci** — `eslint`, `vite build`
3. **audit** — `pip-audit` (Python), `npm audit` (JS)

All 3 must pass before a PR can be merged to `develop` or `main`.

## Supabase

Each environment has its own Supabase project. Keys live in the per-environment `.env` files.
Find them at: **Supabase dashboard → Project Settings → API**.

```python
# Backend usage
from supabase import create_client
import os

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"]  # use service role on backend
)
```

```ts
// Frontend usage
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY   // use anon key on frontend
)
```
