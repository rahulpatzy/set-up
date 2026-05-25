# Open a pull request

Create a pull request for the current branch. $ARGUMENTS (optional extra context for the PR description).

## Steps

1. **Check current branch** — run `git branch --show-current`. Refuse if already on `main` or `develop`.

2. **Summarise the diff**:
   ```bash
   git diff main...HEAD --stat
   git log main...HEAD --oneline
   ```

3. **Run CI checks locally** before pushing:
   ```bash
   make lint
   make test
   ```
   Fix any failures before continuing.

4. **Push the branch**:
   ```bash
   git push -u origin $(git branch --show-current)
   ```

5. **Create the PR** with `gh pr create`:
   - **Base branch**: `develop` (default) unless the diff is a hotfix targeting `main`
   - **Title**: conventional-commit style (`feat:`, `fix:`, `chore:`, `docs:`)
   - **Body**: include Summary, Changes, and Testing sections
   - Add `--draft` if the work isn't ready for review

6. **Print the PR URL** when done.

## Rules
- Never force-push to `main` or `develop`
- CODEOWNERS auto-assigns @rahulpatzy — don't manually re-assign
