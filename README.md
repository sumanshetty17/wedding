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

## How editing vs. your customers' view works now

- **First time ever opening a fresh deploy**: it opens straight into the
  builder so you're not locked out before anything exists yet. As soon as you
  make your first change, a dark strip appears at the top with **your
  private editing link** — copy and bookmark it immediately.
- **From then on**, that private link (with a long random `?key=...` on the
  end) is the *only* way back into the builder. It's unique to your browser
  and isn't guessable — unlike a simple `?edit=1`, nobody can type their way
  into edit mode just by trying it.
- **The plain link** (the one from "Copy link," no `key` on it) — the one
  you give customers — always shows the saved, locked, read-only version.
  No "+" icons, no "Choose file," no "Generate website" button, and no way
  to guess into edit mode.
- Losing your private edit link means losing editor access from that
  browser, so save it somewhere safe as soon as you see it.

## Important limitations to know about

Right now your site's content — and your private edit key — are both saved
using **local storage on your device**, not a shared database. That means:

- ✅ Reopening your link in a new tab, or reloading the page, on **the same
  computer/browser** correctly shows your saved, published site.
- ❌ A customer opening your link on **their own phone or computer** won't
  see your content, because local storage never leaves your device — each
  device only sees what was saved on it. If you're testing this yourself,
  make sure you're using the same normal browser window each time —
  Incognito/Private windows use separate storage and will look empty, which
  is expected, not a bug.
- ❌ Your private edit link only works on the device/browser that generated
  it. Opening it on a different device won't give you access to the same
  saved content, because that device has no local copy of it either.

This is fine for testing and demoing to yourself, but **it is not yet a real
way for actual customers to see your finished site, and it's not a
substitute for real account-based security.** To make both of those work
properly, you need:

- **File storage** for the uploaded photos/videos (e.g. Cloudinary, or
  Supabase/Firebase Storage — both have free tiers)
- **A database** to save the site name, categories, and hall listings
  permanently and share them with every visitor, regardless of device
  (Supabase or Firebase both work well and are free to start)
- **Real login-based authentication** for the owner, instead of a
  browser-local secret key, if this will ever be used for a real business

Happy to help you wire any of this up when you're ready — just say the word.
