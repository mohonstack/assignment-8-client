<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# assignment-8-client (ImpactConnect)

Next.js 16.4.5 (App Router, Turbopack, React 19, Tailwind v4) client for a community-events app. Auth is better-auth backed by MongoDB; the API is a sibling repo.

## Commands

```bash
npm run lint        # eslint — must exit 0 (2 known <img> warnings in Navbar are accepted)
npx tsc --noEmit    # typecheck — must be clean
npm run build       # next build — MUST have the backend running first (see below)
```

- **`npm run build` fails with `ECONNREFUSED` unless the backend runs on `:8000`.** Start it first: `cd ../assignment-8-server && nodemon index.js`. The `/` page is statically prerendered by fetching `NEXT_PUBLIC_LOCAL_URL/featured-allEvents` at build time.
- If `tsc` complains about deleted routes (`.next/types/**`), remove `.next/types` and re-run; it is generated output.
- Both servers together: client on `:3000`, backend on `:8000`. The backend verifies JWTs by fetching `http://localhost:3000/api/auth/jwks`, so authed API calls need *both* up.

## Layout & conventions

- Source lives in `src/`; alias `@/*` → `./src/*` (tsconfig paths).
- **Proxy, not middleware:** request guarding is `src/proxy.tsx` (named export `proxy` + `config.matcher`) — Next 16 renamed middleware to proxy; do not create `middleware.ts`. It protects `/createEventForm`, `/manageEvents`, `/joinedEvents`, `/events`, `/events/:path*` and redirects to `/login?next=<path>`; the login page honors `next` (must start with `/`).
- Client-side navigation in event handlers must use `useRouter().push(...)` — **never `redirect()` from `next/navigation`** (it throws an uncaught `NEXT_REDIRECT` outside render/server actions).
- `useSearchParams()` requires a `Suspense` boundary; see `src/app/login/page.tsx` (`LoginContent` + default export wrapping it).
- Lint runs `react-hooks/set-state-in-effect`: no synchronous `setState` in `useEffect` bodies. The Navbar theme uses `useSyncExternalStore` reading `document.documentElement[data-theme]` instead; persisted theme lives in `localStorage["theme"]`.

## better-auth

- Server config: `src/app/lib/auth.ts` — MongoDB adapter, db `ImpactConnect`, `socialProviders.google` (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`), JWT via `jwtClient` plugin. Route handler: `src/app/api/auth/[...all]/route.ts`.
- Client: `src/app/lib/auth-client.ts`. **Gotcha:** it creates two `createAuthClient()` instances (`authClient` with `baseURL`/JWT plugin, plus a second one whose `signIn`/`signUp`/`useSession`/`signOut` are re-exported). Prefer importing `authClient` for new code; don't assume state is shared between the two.
- Google callback URL registered in Google Cloud Console must be `http://localhost:3000/api/auth/callback/google`.

## Environment (`.env`, gitignored — never commit)

`MONGODB_URL` (note: `URL`, not `URl`), `NEXT_PUBLIC_LOCAL_URL` (backend, `http://localhost:8000`), `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Routes

`/` (static home), `/login`, `/signUp` (public) · `/events`, `/events/[id]`, `/createEventForm`, `/manageEvents`, `/joinedEvents` (proxy-protected) · `/api/auth/[...all]`. All other paths 404 — don't link to placeholder routes.
