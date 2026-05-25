# Project Template

## Architecture

This is a **FastAPI + React** full-stack template.

```
backend/    FastAPI app (Python, managed with uv)
frontend/   React + Vite + TypeScript + Tailwind
```

## Quick Start

```bash
cp .env.example .env   # fill in your values
make install           # install all deps (backend + frontend)
make dev               # start both servers
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- API docs: http://localhost:8000/docs

## Common Commands

| Command | What it does |
|---|---|
| `make dev` | Start backend + frontend concurrently |
| `make test` | Run pytest (backend) |
| `make lint` | Ruff check + format check |
| `make format` | Auto-fix formatting with ruff |
| `make install` | `uv sync` + `npm ci` |

## Backend

```bash
cd backend
uv sync                                          # install deps
uv run uvicorn app.main:app --reload             # start dev server
uv run pytest                                    # run tests
uv run ruff check . && uv run ruff format --check .   # lint
```

Source lives in `backend/src/app/`. Add new routers in `backend/src/app/routers/`.

## Frontend

```bash
cd frontend
npm install       # install deps
npm run dev       # start dev server
npm run build     # production build
npm run lint      # eslint check
```

Source lives in `frontend/src/`. The `VITE_API_URL` env var sets the backend URL.

## Environment Variables

Copy `.env.example` to `.env` and fill in values. Never commit `.env`.

| Variable | Description |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `SECRET_KEY` | App secret (generate with `openssl rand -hex 32`) |
| `ENVIRONMENT` | `development` / `qa` / `production` |
| `VITE_API_URL` | Backend URL for frontend |

## Branch Strategy

```
feature/xxx  →  PR  →  main
```

- PRs to `main` trigger CI (lint, test, audit)
- Run locally with `make dev`

## Adding Features

- New API route: create `backend/src/app/routers/your_router.py`, include in `main.py`
- New page: add component in `frontend/src/pages/`, add route in `App.tsx`
- New dep (Python): `uv add package-name`
- New dep (JS): `npm install package-name`
