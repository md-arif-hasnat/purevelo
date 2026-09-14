# PureVelo Website

Modern responsive Next.js website for PureVelo by Velora Grain & Foods.

## Local development

```bash
npm install
npm run dev
```

## Functional contact form

The form posts to `/api/contact` and sends email through the Resend HTTP API. Set these environment variables in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

See `.env.example`.

## Deployment

Import this GitHub repository into Vercel, add the contact-form environment variables, deploy, review, and connect the final domain after approval.
