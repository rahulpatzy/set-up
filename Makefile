.PHONY: install dev test lint format clean

# Install all dependencies
install:
	cd backend && uv sync --all-extras
	cd frontend && npm ci

# Start backend + frontend concurrently
dev:
	@command -v concurrently >/dev/null 2>&1 || npm install -g concurrently
	concurrently \
		--names "backend,frontend" \
		--prefix-colors "blue,green" \
		"cd backend && uv run uvicorn app.main:app --reload --port 8000" \
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

# Remove generated files
clean:
	find backend -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; true
	find backend -name "*.pyc" -delete 2>/dev/null; true
	rm -rf frontend/dist frontend/node_modules/.vite
