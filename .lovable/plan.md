
## Resend Integration for Unibank

Resend is a transactional email service — perfect for contact form confirmations and bank communications.

### What this requires

Before I can write any code, I need a **Resend API key** stored as a secure secret. This key is private and must never be in the frontend code — it will live exclusively inside a backend edge function.

### What will be built

1. **Secure secret**: Store the Resend API key as `RESEND_API_KEY` in Lovable Cloud secrets
2. **Edge function** `supabase/functions/send-email/index.ts`: handles all outbound emails server-side using Resend's API
3. **Contact form** on `ContactPage.tsx`: bilingual (ES/EN) form with fields for name, email, subject, and message — submits to the edge function
4. **Two emails sent on submission**:
   - Confirmation email to the visitor (from `noreply@unibank.com.pa`)
   - Internal notification email to the Unibank team inbox

### Steps in order

```
1. You provide Resend API key → stored as secret
2. Edge function created (send-email)
3. ContactPage updated with bilingual form + validation (zod)
4. Done — ready to test
```

### What I need from you first

To proceed, you'll need a **Resend API key**. Here's how to get one:

1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** → **Create API Key**
3. Copy the key (starts with `re_`)

Also — what email address should receive the internal notification when someone submits the contact form? (e.g. `contacto@unibank.com.pa`)

Once you share those two pieces of information, I'll set up the secure secret and build the full integration.
