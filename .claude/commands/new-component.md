# Scaffold a new React component

Create a new React component for **$ARGUMENTS**.

## What to build

1. **`frontend/src/components/<Name>.tsx`** — component with:
   - Named export (not default)
   - TypeScript props interface
   - Tailwind CSS styling
   - Loading + error states if the component fetches data
   - Accessible markup (semantic HTML, aria labels where needed)

2. **Wire it up** — if a parent file is obvious (e.g. `App.tsx`), import and render it there

3. **API calls** — use `/api/` prefix so Vite proxies to the backend:
   ```ts
   const res = await fetch('/api/<endpoint>')
   ```

## Rules
- Functional components only (no class components)
- Use `useState` / `useEffect` for local state; suggest React Query if the component does heavy data fetching
- No inline styles — Tailwind classes only
- After writing, run `cd frontend && npm run lint` and fix any issues
