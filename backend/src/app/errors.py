"""
Global error handling for FastAPI.

All unhandled exceptions are caught and returned as consistent JSON:
  {"error": "...", "code": "...", "detail": null | {...}}

Usage (custom app errors):
    from app.errors import AppError
    raise AppError("User not found", code="not_found", status_code=404)
"""

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.logging import get_logger

log = get_logger(__name__)


class AppError(Exception):
    """Raise this anywhere in the app to return a structured error response."""

    def __init__(
        self,
        message: str,
        code: str = "error",
        status_code: int = 400,
        detail: dict | None = None,
    ) -> None:
        self.message = message
        self.code = code
        self.status_code = status_code
        self.detail = detail
        super().__init__(message)


def register_error_handlers(app: FastAPI) -> None:
    """Register all exception handlers on the FastAPI app instance."""

    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
        log.warning("app_error", code=exc.code, message=exc.message, path=request.url.path)
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": exc.message, "code": exc.code, "detail": exc.detail},
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        log.warning("http_error", status_code=exc.status_code, path=request.url.path)
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.detail,
                "code": f"http_{exc.status_code}",
                "detail": None,
            },
        )

    @app.exception_handler(RequestValidationError)
    async def validation_error_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        log.warning("validation_error", errors=exc.errors(), path=request.url.path)
        return JSONResponse(
            status_code=422,
            content={
                "error": "Validation failed",
                "code": "validation_error",
                "detail": exc.errors(),
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        log.error(
            "unhandled_exception",
            exc_type=type(exc).__name__,
            exc=str(exc),
            path=request.url.path,
            exc_info=True,
        )
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal server error",
                "code": "internal_error",
                "detail": None,
            },
        )
