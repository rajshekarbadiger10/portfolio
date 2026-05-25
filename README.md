# Rajshekar Badiger — Cinematic Developer Portfolio

A cinematic, high‑polish developer portfolio built with Next.js (App Router), React, TypeScript and Tailwind CSS. It showcases projects, timeline, a contact form (SMTP via `nodemailer`) and subtle 3D / cinematic background effects.

**Live demo:** (if deployed) https://rajshekarbadiger.dev

---

## Highlights

- Cinematic, immersive UI with subtle 3D/background motion
- Smooth, inertial scrolling (Lenis) and staged section animations (Framer Motion)
- Contact form that sends email via server route using `nodemailer`
- Responsive layout and reduced-motion support
- Clean, minimal dark aesthetic (black + red accents)

---

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (smooth scrolling)
- nodemailer (server-side SMTP)
- @react-three/fiber + three (3D hero scene)

---

## Local setup

Prerequisites:
- Node.js 18+ and npm (or yarn/pnpm)

Install dependencies:

```bash
npm install
# or
# yarn
# pnpm install
```

Run dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view.

Build for production:

```bash
npm run build
npm run start
```

---

## Environment variables

Create a `.env.local` (do NOT commit this file). Example keys used by the project:

```
# SMTP settings for contact form
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false # true if using TLS on port 465
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_RECEIVER_EMAIL=your.email@example.com
```

There is a `.env.example` in the repo that you can copy and fill with values. Never commit secrets.

---

## Contact / Email notes

- The contact form posts to `/api/contact` which uses `nodemailer` to deliver mail. Ensure SMTP credentials are valid in `.env.local` and the receiving email (`CONTACT_RECEIVER_EMAIL`) is set.
- For Gmail you may need an app password or a transactional mail provider (SendGrid, Mailgun, etc.) for production.

---

## Performance & Accessibility

- Animations respect `prefers-reduced-motion`.
- Keep heavy assets (large images/videos) out of the repository; use CDN or Git LFS if necessary.

---

## Preparing for GitHub (safety checklist)

Before pushing:

- Ensure `.env.local` is in `.gitignore` (it is by default in this project template).
- Check for leaked secrets:
  - `git grep -n -E "(SMTP_PASS|SMTP_USER|API_KEY|SECRET|PASSWORD|TOKEN)" || true`
- Remove any accidentally tracked env files with:

```bash
git rm --cached .env.local || true
git commit -m "Remove local env from tracking" || true
```

If secrets were committed previously, rotate them immediately and consider history rewrite tools (`git filter-repo` or BFG).

---

## Deployment tips

- Vercel is recommended (1-click) — add the environment variables in your Vercel project settings.
- On other hosts, ensure Node 18+ and environment variables are set. For providers that block SMTP outbound (some serverless vendors), use a transactional email service's API.

---

## Development notes

- Linting: the project uses the `next/core-web-vitals` ESLint config. If your editor reports issues in `.eslintrc.json`, install dev dependencies:

```bash
npm install --save-dev eslint eslint-config-next
```

- Reduce motion is supported; toggle in system settings to verify.

---

## Contributing

If you want to contribute or suggest a change:

- Open an Issue describing the idea
- Create a branch, make changes, and open a Pull Request

---

## License

This repository does not include an explicit license file. Add one (for example MIT) if you want to grant reuse rights.

---
