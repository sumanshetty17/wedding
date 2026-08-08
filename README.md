# MarriHeaven — Wedding Event Organizer Website

This is your finished website: a real, working site for MarriHeaven with
Home, About Us, Contact Us, three wedding-style categories (Indoor, Outdoor,
Beach), and venue pages with photo/video sliders, ratings, and pricing.

This is **not** an editable drag-and-drop builder like the earlier version —
it's a real coded website. To change anything (add venues, swap photos,
add your phone number), either tell me what to change and I'll update the
code for you, or edit it yourself: everything you'd want to change lives at
the top of `src/App.jsx`, in a clearly marked "SITE CONTENT" section.

## What's already in the code

- `src/App.jsx` — the whole site
- `src/main.jsx` — starts the app
- `index.html`, `vite.config.js`, `package.json` — standard project files

## What still needs your real details

- **Contact number and email** — currently blank on purpose. Give them to
  me and I'll add them, or fill in `CONTACT_INFO` near the top of
  `App.jsx`.
- **Real venues** — right now each category (Indoor / Outdoor / Beach) has
  two sample placeholder venues so you can see exactly how the site works.
  Send me real venue names, photos, videos, price ranges, and descriptions
  and I'll swap them in — or add more objects to the `venues` array
  yourself, following the same pattern as the existing ones.
- **Photos/videos are currently free stock placeholder images** from
  Unsplash, just to show the layout working. Swap these for real venue
  photos whenever you have them.

## Step 1 — Run it locally (optional, to preview before deploying)

```
npm install
npm run dev
```

## Step 2 — Deploy it for real

You're likely already set up on Render from before. If so: replace
`src/App.jsx` in your GitHub repo with the new one, commit, and Render
redeploys automatically.

If starting fresh, two easy options:

### Option A — Netlify (fastest)
1. Run `npm run build` — creates a `dist` folder.
2. Go to https://app.netlify.com/drop and drag the `dist` folder in.
3. You get a live link immediately.

### Option B — Render or Vercel (auto-redeploys on every push)
1. Push this project to a GitHub repo.
2. Connect that repo on Render (Static Site, build command
   `npm install && npm run build`, publish directory `dist`) or Vercel
   (auto-detected, no settings needed).
3. You get a live link, and every future `git push` redeploys it
   automatically.

## A note on how this site works

This is a straightforward content website — the content (venues, prices,
text, contact info) lives directly in the code, not in a database. That
means:

- Every visitor, on any device, sees the exact same site — this fixes
  the earlier issue where a customer's device wouldn't show your saved
  content.
- To make future changes (new venue, updated price, real contact info),
  you update the code and redeploy — either by asking me to make the
  change and sending you the updated file, or editing `App.jsx` yourself.

If later on you want site owners (or customers) to add their own venues
through a visual interface instead of editing code, that's a bigger step —
it means adding a real database and admin login — and I'm happy to help
you build that when you're ready for it.
