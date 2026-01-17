# Lead Capture (Email) Setup

Your portfolio includes a **lead capture modal** that collects visitor details and sends them to you.

## Recommended delivery (Formspree)

Frontends can’t safely send email directly without exposing secrets. The simplest safe approach is **Formspree**:

1. Create a form in Formspree (it gives you an endpoint like `https://formspree.io/f/xxxxxxx`).
2. In your project root, create a file named `.env.local`:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
```

3. Restart your dev server / redeploy.

## Fallback behavior (no endpoint configured)

If `VITE_FORMSPREE_ENDPOINT` is not set, the modal will fall back to opening the visitor’s email client via `mailto:` (this does **not** auto-send).

