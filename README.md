# Project Template

A full-stack starter: **FastAPI** (Python/uv) + **React** (Vite/TypeScript/Tailwind).

## Using This Template

Click **"Use this template"** on GitHub to create a new repo from this starter, then:

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO
cd YOUR_REPO
cp .env.example .env          # fill in your values
make install                  # install backend + frontend deps
make dev                      # start both dev servers
```

- Backend API: http://localhost:8000
- Frontend: http://localhost:5173
- Swagger docs: http://localhost:8000/docs

## Commands

| Command | Description |
|---|---|
| `make install` | Install all dependencies |
| `make dev` | Start backend + frontend |
| `make test` | Run tests |
| `make lint` | Check code style |
| `make format` | Auto-fix formatting |
| `make audit` | Check for vulnerable deps |

## Project Structure

```
backend/         FastAPI app (Python, uv)
  src/app/       Application source
  tests/         pytest tests
  pyproject.toml UV/Python config

frontend/        React app (Vite + TypeScript + Tailwind)
  src/           Application source
  package.json   Node deps

.github/
  workflows/
    ci.yml           Lint + test + audit (runs on every PR)
    deploy-qa.yml    Auto-deploy to QA on merge to main
    deploy-prod.yml  Manual deploy to production
```

## CI/CD Setup

### 1. GitHub Environments

Go to **Repo Settings → Environments** and create:
- `qa` — auto-deploy target (no approval needed)
- `production` — add a **Required reviewer** for the approval gate

### 2. Deploy Secrets

Add secrets to each environment (Settings → Environments → {env} → Secrets):
- `DEPLOY_TOKEN` — your deploy service token (Railway, Fly.io, Vercel, etc.)

### 3. Fill in Deploy Commands

Edit the `TODO` placeholders in:
- `.github/workflows/deploy-qa.yml`
- `.github/workflows/deploy-prod.yml`

### Workflow

```
feature/xyz → PR → CI runs (lint, test, audit)
                 → merge to main → auto-deploys to QA
                                 → manual trigger → production
```

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
