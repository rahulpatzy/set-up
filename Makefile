.PHONY: install dev test lint format clean env-dev env-qa env-prod pull

# Pull latest for current branch
pull:
	git pull origin $(shell git branch --show-current)

# Install all dependencies
install:
	cd backend && uv sync --all-extras
	cd frontend && npm ci

# Start backend + frontend concurrently, then open in browser
dev:
	@command -v concurrently >/dev/null 2>&1 || npm install -g concurrently
	@sleep 2 && open http://localhost:5173 &
	concurrently \
		--names "backend,frontend" \
		--prefix-colors "blue,green" \
		"cd backend && uv run uvicorn app.main:app --reload --port 8000 --app-dir src" \
		"cd frontend && npm run dev"

# Run backend tests
test:
	cd backend && uv run pytest -v

# Lint backend (ruff check + format check)
lint:
	cd backend && uv run ruff check .
	cd backend && uv run ruff format --check .
	cd frontend && npm run lint

# Auto-fix formatting
format:
	cd backend && uv run ruff format .
	cd backend && uv run ruff check --fix .

# Run dependency audit
audit:
	cd backend && uv run pip-audit
	cd frontend && npm audit --audit-level=high

# Switch environment (copies .env.<name> → .env)
env-dev:
	cp .env.development .env && echo "✅ Switched to development"

env-qa:
	cp .env.qa .env && echo "✅ Switched to QA"

env-prod:
	cp .env.production .env && echo "✅ Switched to production"

# Remove generated files
clean:
	find backend -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; true
	find backend -name "*.pyc" -delete 2>/dev/null; true
	rm -rf frontend/dist frontend/node_modules/.vite
