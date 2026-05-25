"""
Supabase JWT authentication for FastAPI.

Supabase signs JWTs with your project's JWT secret (Settings → API → JWT Secret).
Add JWT_SECRET to your .env files.

Usage — protect a route:

    from app.auth import get_current_user, CurrentUser

    @router.get("/me")
    async def me(user: CurrentUser) -> dict:
        return {"user_id": user["sub"], "email": user.get("email")}

Or get the full token payload:

    from app.auth import get_current_user

    @router.get("/me")
    async def me(payload: dict = Depends(get_current_user)) -> dict:
        return payload
"""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.config import get_settings

_bearer = HTTPBearer(auto_error=True)


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(_bearer)],
) -> dict:
    """
    FastAPI dependency that validates a Supabase JWT and returns the decoded payload.
    Raises HTTP 401 if the token is missing, expired, or invalid.
    """
    settings = get_settings()
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False},  # Supabase doesn't set aud by default
        )
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc

    return payload


# Convenience type alias for use in route signatures
CurrentUser = Annotated[dict, Depends(get_current_user)]
