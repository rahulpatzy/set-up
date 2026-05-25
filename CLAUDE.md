# Project Template

## Architecture

Full-stack template: **FastAPI** (Python) + **React** (Vite/TypeScript/Tailwind). Supabase as the database/auth backend.

```
backend/
  src/app/main.py    FastAPI entrypoint — add routers here
  src/app/routers/   Route modules
  tests/             pytest tests
  pyproject.toml     Dependencies + ruff/pytest config
  uv.lock            Locked deps (always commit)

frontend/
  src/App.tsx        Root component
  src/main.tsx       Entry point
  src/index.css      Tailwind directives
  vite.config.ts     Proxies /api/* → backend

.github/workflows/
  ci.yml             Lint + test + audit on every PR

Makefile             All dev shortcuts
.env.example         Template for env files
CODEOWNERS           Auto-assigns @rahulpatzy as reviewer
```

## Branch Strategy

```
feature/xxx  →  PR  →  develop  (CI must pass = QA gate)
                            ↓ PR
                          main   (CI must pass = prod gate)
```

- **Always create a new branch per feature/fix** — never commit directly to `develop` or `main`
- **Claude must create a new branch before making any code or config changes**, even small ones — no exceptions
- Branch naming: `feat/`, `fix/`, `docs/`, `chore/`
- Workflow: `git checkout main && make pull` → `git checkout -b feat/my-thing` → make changes → PR → merge

## Quick Start

```bash
make install      # uv sync + npm ci
make env-dev      # activate development environment
make dev          # start both servers + open browser
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Swagger: http://localhost:8000/docs

## Commands

| Command | What it does |
|---|---|
| `make dev` | Start both servers + open browser |
| `make test` | Run pytest |
| `make lint` | Ruff check + ESLint |
| `make format` | Auto-fix with ruff |
| `make install` | `uv sync` + `npm ci` |
| `make pull` | Pull latest for current branch |
| `make env-dev` | Switch to `.env.development` |
| `make env-qa` | Switch to `.env.qa` |
| `make env-prod` | Switch to `.env.production` |

## Environment Variables

Each environment has its own git-ignored file:

```
.env.development    local dev (localhost URLs, dev Supabase project)
.env.qa             QA config
.env.production     prod config
.env                active slot — app reads this, make env-* copies into it
```

Key variables:

| Variable | Used by | Notes |
|---|---|---|
| `SUPABASE_URL` | backend + frontend | Project URL |
| `SUPABASE_ANON_KEY` | frontend | Safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | backend only | Never expose to frontend |
| `DATABASE_URL` | backend | Direct Postgres connection |
| `SECRET_KEY` | backend | `openssl rand -hex 32` |
| `ENVIRONMENT` | backend | `development` / `qa` / `production` |
| `VITE_API_URL` | frontend | Backend URL (Vite exposes `VITE_` vars) |
| `VITE_SUPABASE_URL` | frontend | Supabase URL for client |
| `VITE_SUPABASE_ANON_KEY` | frontend | Anon key for client |

## Backend

```bash
cd backend
uv sync --all-extras                              # install deps
uv run uvicorn app.main:app --reload --port 8000 --app-dir src  # dev server
uv run pytest -v                                  # tests
uv run ruff check . && uv run ruff format --check . # lint
uv add package-name                               # add dep
```

Add new routes in `backend/src/app/routers/`. Include in `main.py`:
```python
from app.routers import my_router
app.include_router(my_router.router, prefix="/my-route", tags=["my-route"])
```

## Frontend

```bash
cd frontend
npm run dev          # dev server (localhost:5173)
npm run build        # production build → dist/
npm run lint         # ESLint
npm install pkg      # add dep
```

API calls use `/api/` prefix — Vite proxies to backend:
```ts
const res = await fetch('/api/health')  // → localhost:8000/health
```

## Supabase

Each environment has its own Supabase project. Get keys from **Supabase dashboard → Project Settings → API**.

```python
# Backend
from supabase import create_client
import os

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"]  # use service role on backend
)
```

```ts
// Frontend
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY  // use anon key on frontend
)
```

## CI

All 3 jobs must pass before any PR can merge:

1. **backend-ci** — `ruff check`, `ruff format --check`, `pytest`
2. **frontend-ci** — `eslint`, `vite build`
3. **audit** — `pip-audit` + `npm audit`
