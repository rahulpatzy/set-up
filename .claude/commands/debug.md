# Debug the running app

Investigate and diagnose an issue with the app. Problem: **$ARGUMENTS**

## Checklist — run through these in order

### 1. Environment
```bash
cat .env | grep -v "KEY\|SECRET\|PASSWORD"   # check active env (redact secrets)
echo "ENVIRONMENT=$(grep ^ENVIRONMENT .env | cut -d= -f2)"
```
Verify `.env` exists and `ENVIRONMENT` is set correctly.

### 2. Backend health
```bash
curl -s http://localhost:8000/health | python3 -m json.tool
```
If it fails, check if the server is running (`lsof -i :8000`).

### 3. Backend logs
Look for recent errors in the terminal running `make dev`, or re-run:
```bash
cd backend && uv run uvicorn app.main:app --reload --port 8000
```

### 4. Frontend
- Open browser console (F12) — report any red errors
- Check Network tab for failed `/api/` requests
- Run `cd frontend && npm run build` to catch TypeScript errors

### 5. Tests
```bash
make test
```
Report any failures with full output.

### 6. Linting
```bash
make lint
```

### 7. Dependencies
```bash
make audit
```

## After diagnosis
- Summarise what you found
- Propose a fix with a clear explanation
- Ask before applying if the fix touches more than 3 files
