import { Prisma } from "@prisma/client";

/**
 * PrismaClient options that are safe to use with Supabase's transaction-mode
 * connection pooler.
 *
 * The runtime `DATABASE_URL` points at the pooler host
 * (`aws-1-*.pooler.supabase.com:6543`), not a direct Postgres port. With
 * Prisma's default prepared statements, reads (SELECT) break across
 * transaction-pooled connections while writes (INSERT) succeed — the exact
 * symptom we saw live: a user can register but cannot sign in, because both
 * NextAuth's `authorize()` and the register route's `findUnique` duplicate
 * check throw before returning.
 *
 * Two fixes are applied here, consistently, at the client level (so the fix
 * ships in code rather than via Vercel env edits):
 *
 *  1. `preparedStatements: false` — the modern, version-supported control
 *     (Prisma >= 5.10; we are on 5.22) that disables prepared statements,
 *     the root cause of the read failures.
 *  2. `pgbouncer=true` appended to the connection string — the classic signal
 *     that tells the Prisma engine it is behind PgBouncer-style transaction
 *     pooling. Appended robustly: parsed with `URL`, only added when not
 *     already present, and existing query params preserved (`?` vs `&` handled
 *     by URLSearchParams).
 *
 * Every `new PrismaClient(...)` in the app calls this helper so the fix covers
 * all clients, including the standalone ones in `lib/auth.ts` and
 * `app/api/analytics/route.ts`.
 */
export function getPrismaClientOptions(): Prisma.PrismaClientOptions {
  const rawUrl = process.env.DATABASE_URL;
  let datasources: Prisma.PrismaClientOptions["datasources"];

  if (rawUrl) {
    try {
      const url = new URL(rawUrl);
      if (!url.searchParams.has("pgbouncer")) {
        url.searchParams.set("pgbouncer", "true");
      }
      datasources = { db: { url: url.toString() } };
    } catch {
      // Unparseable URL — leave datasources unset so Prisma falls back to
      // env("DATABASE_URL") from the schema, matching previous behavior
      // (e.g. a local dev shorthand).
    }
  }

  return {
    preparedStatements: false,
    ...(datasources ? { datasources } : {}),
  };
}
