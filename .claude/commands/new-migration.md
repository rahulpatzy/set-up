  # Create a Supabase migration

  Create a new Supabase migration for **$ARGUMENTS**.

  ## Steps

  1. **Inspect live schema via Supabase MCP** (if the `supabase` MCP server is connected):
     - Call `mcp__supabase__list_tables` to see existing tables and columns
     - Use that context to write accurate SQL that references real column names and types
     - If MCP is not connected, proceed using existing migration files as reference

  2. **Determine the migration directory** — look for `supabase/migrations/`. If it doesn't exist yet, create it and note that `supabase init` may be
  needed.

  3. **Create the migration file** — name it `supabase/migrations/<timestamp>_<slug>.sql` where:
     - `<timestamp>` = `date -u +%Y%m%d%H%M%S`
     - `<slug>` = snake_case description of the change

  4. **Write idempotent SQL**:
     - Use `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, etc.
     - Always include a rollback comment block at the bottom:
       ```sql
       -- Rollback:
       -- DROP TABLE IF EXISTS <name>;
       ```
     - Add RLS policies if the table will be accessed from the frontend

  5. **Update `.env.example`** if any new env vars are needed

  6. **Show the apply command**:
     ```bash
     supabase db push          # push to remote Supabase project
     # or for local dev:
     supabase db reset         # re-runs all migrations locally

  Rules

  - Never write destructive migrations without a clear rollback path
  - All timestamps should use timestamptz, not timestamp
  - Use UUIDs (gen_random_uuid()) as primary keys unless there's a reason not to
