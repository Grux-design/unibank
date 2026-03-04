
## Plan: Connect Supabase to the Project

This is a straightforward integration — we just need to wire up Supabase so it's ready for future backend features (auth, database, contact forms, etc.).

### What will be done

1. **Enable Lovable Cloud** — spin up a managed Supabase instance directly inside the project (no external account needed)
2. **Install Supabase client** — add `@supabase/supabase-js` as a dependency
3. **Create the client** — add `src/integrations/supabase/client.ts` with the configured Supabase client using auto-injected env vars
4. **Add types file** — create `src/integrations/supabase/types.ts` as a starting point for database types

### Result

The project will have a fully connected Supabase backend ready to use. When you're ready to add features like contact form submissions, user auth, or a CMS for blog posts, the connection will already be in place.

No database tables or auth flows will be created yet — just the connection layer.
