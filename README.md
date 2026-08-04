# Evermore Weddings — Website Builder

This is your wedding-business website builder, packaged as a real project you can
run on your own computer and publish to a live web address.

## What's inside

- `src/App.jsx` — the whole builder (the same one you've been using in chat)
- `src/main.jsx` — starts the app
- `index.html`, `vite.config.js`, `package.json` — standard project files

## Before you start

You need **Node.js** installed on your computer (version 18 or newer).
Check by opening a terminal and running:

```
node -v
```

If that fails, download Node from https://nodejs.org (choose the LTS version)
and install it, then come back here.

## Step 1 — Install and run it locally

Open a terminal, go into this folder, and run:

```
npm install
npm run dev
```

Vite will print a local address like `http://localhost:5173` — open that in
your browser. This is the exact same builder, running for real on your
machine.

## Step 2 — Put it online with a real link

You have two easy, free options. Pick one.

### Option A — Netlify (fastest, no account setup required to try)

1. Run `npm run build` in this folder. It creates a `dist` folder.
2. Go to https://app.netlify.com/drop in your browser.
3. Drag the `dist` folder into the page.
4. Netlify gives you a live link immediately (like `random-name-123.netlify.app`).
5. Create a free Netlify account to keep the site and rename the link
   (Site settings → Change site name), or connect your own domain later.

### Option B — Vercel (best if you want auto-updates when you make changes)

1. Create a free account at https://vercel.com (you can sign up with GitHub,
   GitLab, or email).
2. Put this project in a GitHub repository:
   - Create a new repo on https://github.com/new
   - In this folder, run:
     ```
     git init
     git add .
     git commit -m "Wedding site builder"
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
3. In Vercel, click "Add New Project," pick that GitHub repo, and click Deploy.
   Vercel detects it's a Vite project automatically — no settings to change.
4. You'll get a real link like `wedding-site-builder.vercel.app` within a
   minute. Every time you push changes to GitHub, it redeploys automatically.

### Using your own domain (e.g. evermoreweddings.com)

Both Netlify and Vercel let you attach a custom domain for free once you own
one (buy one from Namecheap, GoDaddy, Google Domains, etc. — usually
$10–15/year). Site settings → Domains → follow their instructions to point
your domain at the site.

## Important limitation to know about

Right now, everything you build (site name, photos, categories, halls) lives
only in the browser's memory for that visit — it resets if the page is
reloaded, and each visitor would see a blank builder rather than your saved
content. That's fine for trying it out or demoing it to a client, but **it's
not yet set up to save your real content permanently or show your finished
site to actual wedding customers.**

To make this a real product where you build the site once and customers see
your saved version, you'd need to add:

- **File storage** for the uploaded photos/videos (e.g. Cloudinary, or
  Supabase/Firebase Storage — both have free tiers)
- **A database** to save the site name, categories, and hall listings
  permanently (Supabase or Firebase both work well and are free to start)
- **A published vs. editable split** — so you edit at one link and customers
  view the saved, live version at another

Happy to help you wire any of this up when you're ready — just say the word.
