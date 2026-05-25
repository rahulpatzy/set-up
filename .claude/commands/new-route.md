# Scaffold a new FastAPI route

Create a complete FastAPI router module for **$ARGUMENTS**.

## What to build

1. **`backend/src/app/routers/<name>.py`** — router module with:
   - `APIRouter` instance
   - Pydantic request/response models
   - CRUD-style endpoints appropriate to the resource
   - Docstrings on every endpoint
   - Type annotations throughout

2. **Wire it into `backend/src/app/main.py`** — add the import and `app.include_router(...)` call

3. **`backend/tests/test_<name>.py`** — pytest tests covering:
   - Happy-path for each endpoint
   - At least one error/edge case

## Rules
- Use `async def` for all endpoints
- Read env vars via `os.environ["VAR"]` — never hardcode secrets
- If the route needs Supabase, import `create_client` from `supabase` and read `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- Follow existing code style (ruff-compatible)
- After writing, run `make lint` and fix any issues before finishing
