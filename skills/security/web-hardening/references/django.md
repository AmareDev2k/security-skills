# Django / DRF hardening reference

Check `settings.py` (and any split settings) for:

- `DEBUG = False` in production; `ALLOWED_HOSTS` set explicitly.
- `SECRET_KEY` read from the environment, not committed.
- `SECURE_SSL_REDIRECT`, `SECURE_HSTS_SECONDS` (+ `INCLUDE_SUBDOMAINS` once sure), `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE` all `True`.
- `SECURE_CONTENT_TYPE_NOSNIFF`, `SECURE_REFERRER_POLICY`, `X_FRAME_OPTIONS` set. Run `python manage.py check --deploy` and fix every warning.
- `CSRF_TRUSTED_ORIGINS` lists only real origins. `CsrfViewMiddleware` not removed.
- CORS (`django-cors-headers`): `CORS_ALLOWED_ORIGINS` explicit; `CORS_ALLOW_ALL_ORIGINS` not `True`; no `CORS_ALLOW_CREDENTIALS = True` with broad origins.
- `AUTH_PASSWORD_VALIDATORS` configured; password hashing left at the default (PBKDF2/Argon2), not MD5/SHA1.
- Admin moved off `/admin/` or protected; superusers minimal.

## DRF specifics

- `DEFAULT_PERMISSION_CLASSES` is **not** `AllowAny`. Prefer `IsAuthenticated` as the default and loosen per view.
- `get_queryset()` filters by `request.user` (or tenant). `get_object()` goes through it. Never `Model.objects.get(pk=...)` straight from the URL.
- Serializers use an explicit `fields` list, never `fields = '__all__'` on models with sensitive columns. Mark `read_only_fields` for `owner`, `role`, `is_staff`, `tenant`.
- Throttling configured (`DEFAULT_THROTTLE_CLASSES`, stricter on auth endpoints).
- JWT (`simplejwt`): short access token lifetime, rotating refresh with blacklist, signing key managed deliberately rather than reused across services.
- `raw()`, `extra()`, `RawSQL`, and `cursor.execute` with f-strings or `%` formatting are injection risks. Use parameters.
- `mark_safe` and `|safe` only on content you fully control.
- File uploads: validate with `FileExtensionValidator` plus content sniffing, set `DATA_UPLOAD_MAX_MEMORY_SIZE` and `FILE_UPLOAD_MAX_MEMORY_SIZE`, serve media from a separate domain or bucket.
- Multi-tenant (`django-tenants` or hand-rolled): find the single place the tenant is set, and check Celery tasks, management commands, signals, and cached keys all respect it.
