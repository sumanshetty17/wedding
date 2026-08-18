# MarriHeaven — Wedding Event Organizer Website

This is your finished website: a real, working site for MarriHeaven with
Home, About Us, Contact Us, three wedding-style categories (Indoor, Outdoor,
Beach), and venue pages with photo/video sliders, ratings, and pricing.

This is **not** an editable drag-and-drop builder like the earlier version —
it's a real coded website. To change anything (add venues, swap photos,
add your phone number), either tell me what to change and I'll update the
code for you, or edit it yourself: everything you'd want to change lives at
the top of `src/App.jsx`, in a clearly marked "SITE CONTENT" section.

## About the current design

The look is a clean, modern style (rounded cards, soft shadows, a
rose/gold color palette, Poppins + Inter fonts) — no stretched background
photos anywhere, so nothing looks blurry at any screen size. All the
dividers between sections are crisp vector curves, not images.

## What's already in the code

- `src/App.jsx` — the whole site
- `src/firebase.js` — Firebase config for real OTP verification (needs
  your project's values pasted in — see below)
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
- **Real OTP verification** — the "Start Planning" popup's phone
  verification won't send actual texts until you finish the Firebase
  setup below. Until then it'll show a clear error instead of a code.

## Turning on real OTP verification (Firebase Phone Auth)

The site uses Firebase to text a real OTP code when someone submits the
"Start Planning" form. Firebase's free tier covers this — no backend
server needed. Takes about 10 minutes the first time.

1. Go to https://console.firebase.google.com, sign in with any Google
   account, and click **Add project**. Name it anything (e.g.
   "marriheaven") and finish the setup wizard.
2. In the left sidebar, go to **Build → Authentication**, click
   **Get started**, then open the **Sign-in method** tab and enable
   **Phone**.
3. Still in Firebase, click the gear icon → **Project settings**. Under
   "Your apps," click the **</>** (Web) icon, give it any nickname, and
   skip Firebase Hosting. It'll show you a `firebaseConfig` object with
   values like `apiKey`, `authDomain`, `projectId`, etc.
4. Open `src/firebase.js` in this project and paste those exact values
   into the `firebaseConfig` object near the top of the file.
5. Back in Firebase, go to **Authentication → Settings → Authorized
   domains** and add the domain your site will live on (e.g.
   `yoursite.onrender.com` or your custom domain). `localhost` is
   already allowed by default, so testing with `npm run dev` works
   right away.
6. Rebuild and redeploy. That's it — the popup will now send real SMS
   codes.

**One thing to know about cost:** Firebase gives a monthly free quota
for phone verification texts. If you expect a lot of enquiries, check
Firebase's current phone-auth pricing in the console before launch —
it's usage-based and can require adding a billing method once you're
past the free quota, even though typical wedding-enquiry volumes tend
to stay well within it.

If any step above throws an error, send me a screenshot of it and
I'll help you sort it out.

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
