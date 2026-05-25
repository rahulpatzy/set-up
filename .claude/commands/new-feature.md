# Start a new feature branch

Start a new feature branch for **$ARGUMENTS**.

## Steps

1. **Confirm the working tree is clean**:
   ```bash
   git status
   ```
   If there are uncommitted changes, stop and ask the user to commit or stash them first.

2. **Switch to develop and pull latest**:
   ```bash
   git checkout develop && git pull origin develop
   ```

3. **Create and switch to the new branch**:
   - Use the naming convention: `feat/`, `fix/`, `chore/`, or `docs/` prefix
   - Derive a short kebab-case slug from `$ARGUMENTS`
   ```bash
   git checkout -b feat/<slug>
   ```

4. **Confirm the branch is ready**:
   ```bash
   git branch --show-current
   ```
   Print the branch name so the user knows where they are.

## Rules
- Always base new branches off `develop`, never `main`
- Never create a branch if uncommitted changes exist — stashing silently loses context
- Branch names: lowercase, hyphens only, no spaces or special characters
- Keep slugs short but descriptive (3–5 words max)
