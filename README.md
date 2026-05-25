# Project Template

A full-stack starter: **FastAPI** (Python/uv) + **React** (Vite/TypeScript/Tailwind).

## Using This Template

Click **"Use this template"** on GitHub to create a new repo from this starter, then:

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO
cd YOUR_REPO
make install          # install backend + frontend deps
make env-dev          # activate development environment
make dev              # start both dev servers
```

- Backend API: http://localhost:8000
- Frontend: http://localhost:5173
- Swagger docs: http://localhost:8000/docs

## Environment Setup

Create a config file for each environment (all git-ignored):

```bash
cp .env.example .env.development   # local dev
cp .env.example .env.qa            # QA
cp .env.example .env.production    # production
```

Fill in the values in each file, then generate a secure secret key for QA/prod:

```bash
openssl rand -hex 32
```

### Switching Environments

| Command | Activates |
|---|---|
| `make env-dev` | `.env.development` → `.env` |
| `make env-qa` | `.env.qa` → `.env` |
| `make env-prod` | `.env.production` → `.env` |

The active environment is always `.env` — the app reads from there.

## Commands

| Command | Description |
|---|---|
| `make install` | Install all dependencies |
| `make dev` | Start backend + frontend (opens browser) |
| `make pull` | Pull latest for current branch |
| `make sync` | Rebase current branch onto latest main |
| `make test` | Run tests |
| `make lint` | Check code style |
| `make format` | Auto-fix formatting |
| `make audit` | Check for vulnerable deps |
| `make env-dev` | Switch to development env |
| `make env-qa` | Switch to QA env |
| `make env-prod` | Switch to production env |

## Project Structure

```
backend/         FastAPI app (Python, uv)
  src/app/       Application source
  tests/         pytest tests
  pyproject.toml UV/Python config
  uv.lock        Locked dependencies

frontend/        React app (Vite + TypeScript + Tailwind)
  src/           Application source
  package.json   Node deps

.github/
  workflows/
    ci.yml       Lint + test + audit (runs on every PR)
```

## Branch & Gate Strategy

```
feature/xxx  →  PR  →  develop  (CI must pass)
                            ↓ PR
                          main   (CI must pass + 1 approval)
```

- **`develop`** — QA gate: CI (lint, test, audit) must pass to merge
- **`main`** — Prod gate: CI must pass + code owner approval required

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | FastAPI, uvicorn |
| Python env | uv |
| Frontend | React 18, Vite, TypeScript |
| Styling | Tailwind CSS |
| Linting | Ruff (Python), ESLint (TS) |
| Testing | pytest + httpx |
| CI | GitHub Actions |
