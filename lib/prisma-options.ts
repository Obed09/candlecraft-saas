/**
 * Builds a Supabase transaction-pooler-safe Postgres connection URL.
 *
 * The runtime `DATABASE_URL` points at the pooler host
 * (`aws-1-*.pooler.supabase.com:<port>`, typically 6543), not a direct
 * Postgres port. With `?pgbouncer=true` appended, the Prisma engine knows it
 * is behind PgBouncer-style transaction pooling and disables the
 * prepared-statement path that otherwise breaks reads (SELECT) across pooled
 * connections while writes (INSERT) succeed — the exact live symptom (a user
 * can register but cannot sign in, because NextAuth `authorize()` and the
 * register duplicate-check `findUnique` both throw).
 *
 * This helper is deliberately type-free: it returns a plain string URL, so it
 * cannot fail type-checking against any @prisma/client version. Callers pass
 * the result to PrismaClient's top-level, long-standing `datasourceUrl`
 * option. (Note: the client-level `preparedStatements` option must NOT be
 * used — it is not a valid `PrismaClientOptions` property for this
 * generated client in Prisma 5.22, and using it fails `next build`. The
 * `pgbouncer=true` connection-string signal alone is the documented fix and
 * covers every client automatically.)
 */
export function buildPoolerUrl(
  rawUrl: string | undefined
): string | undefined {
  if (!rawUrl) return undefined;
  try {
    const url = new URL(rawUrl);
    if (!url.searchParams.has("pgbouncer")) {
      url.searchParams.set("pgbouncer", "true");
    }
    // url.toString() preserves all existing query params.
    return url.toString();
  } catch {
    // Unparseable URL — return undefined so Prisma falls back to
    // env("DATABASE_URL") from the schema, matching previous behavior
    // (e.g. a local dev shorthand).
    return undefined;
  }
}
