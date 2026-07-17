@AGENTS.md

# Abans SmartPay — Internal Landing Page

Project spec and build reference for this codebase. Read this before implementing any section of the page. This is a Next.js 16 / React 19 / Tailwind v4 app (see `package.json`). The page is **built**: `app/page.tsx` composes the section components in `components/` (Header, Hero, GuidanceDownload, WhySmartPay, HowItWorks, BenefitsGrid, CampaignGallery, BrandAssets, Footer) — treat this doc as the source of truth for design decisions when editing them.

## 1. What This Page Is

A single, private, internal landing page for **Abans showroom managers and sales staff**. It is not a public marketing page — it will be shared internally via **WhatsApp** as a link, so it must load fast on mobile data and look right on a phone screen first.

It exists to train and motivate showroom staff to actively sell **Abans Tiken Tika Pay** (installment smartphone sales) by explaining how **SmartPay** removes their biggest objection: fear of missed payments and defaults. SmartPay auto-locks a financed phone when a payment is missed, and auto-unlocks it once the balance is settled.

**Core campaign message (Sinhala, for reference only — the page itself is English-only):**
> ගෙවන්න දෙන්න බය වුණ කාලේ ඉවරයි!

The hero carries an English rendering of this ("The fear of missed payments is over."); no Sinhala copy is rendered on the page.

Mindset shift to reinforce throughout the page: *"What if the customer misses a payment?"* → *"We can sell with confidence."*

## 2. Audience & Distribution

- Showroom managers and sales staff, viewing mostly on mobile phones via a WhatsApp-shared link.
- Internal use only — no need for SEO, but do keep load times light (this is a training/reference hub staff may reopen repeatedly).
- Must be **simple for showroom teams to use**: clear downloads, no login, no complex navigation.
- Must be **easy to update**: content (copy, artwork images, document links, logos) should be easy to swap later without restructuring components. Prefer centralizing copy/asset references (e.g. plain data objects/arrays at the top of a section component) over hardcoding strings deep in JSX.

## 3. Tech Stack & Conventions

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` in `app/globals.css` — no `tailwind.config.js`).
- **This Next.js version has breaking changes vs. training data** — per `AGENTS.md`, check `node_modules/next/dist/docs/` before writing anything version-sensitive (routing, `Image`, `Metadata`, fonts, etc.).
- No webfont is loaded — the site uses the SF Pro system font stack (see §4); do not add `next/font` unless licensed SF Pro files are provided.
- The page is composed of section components in `components/`, assembled in `app/page.tsx` — keep `page.tsx` a thin composition and work section-by-section.
- Light mode only — no `dark:` classes, no `prefers-color-scheme: dark` block.
- Imagery is **placeholder for now**: the hero image and 8 campaign artworks are free Unsplash stock photos in `public/images/` served via `next/image`; logos in `public/brand/` are dummy SVGs (the Abans logo in `public/images/logo.png` is real). Real assets drop in by replacing files / editing the data objects at the top of each section component — no layout changes.

## 4. Design System

### Typography
- Font: **SF Pro**, delivered via the native system font stack (token `--font-sans` in `app/globals.css`): `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- SF Pro cannot be self-hosted as a webfont (Apple license), so Apple devices render true SF Pro while Android falls back to Roboto and Windows to Segoe UI — this is intentional and also means zero font download (good for WhatsApp/mobile-data loads). If licensed SF Pro files are ever provided, switch to `next/font/local` in `app/layout.tsx`; components only reference `--font-sans`, so nothing else changes.
- All copy is **English only** — no Sinhala glyph coverage is required.

### Color

Primary: **#791E7E** (HSL ≈ 297°, 61%, 31%) — a deep magenta-purple. Suggested scale (generated from the primary hue, usable as CSS variables / Tailwind `@theme` tokens, e.g. `--color-primary-500`):

| Step | Hex | Usage |
|------|---------|-------|
| 50 | #F8F1F8 | tint backgrounds, subtle section fills |
| 100 | #F1E4F2 | hover backgrounds, badge fills |
| 200 | #E6C0E8 | borders on tinted surfaces |
| 300 | #DE88E3 | decorative accents, illustrations |
| 400 | #CF52D6 | secondary accents |
| 500 | #B62DBD | links, icon accents |
| 600 | #922498 | hover state for primary buttons |
| **700** | **#791E7E** | **brand primary — CTA buttons, key headings/accents** |
| 800 | #5F1863 | pressed/active state, dark text on tint |
| 900 | #431146 | rarely used, high-contrast accents |
| 950 | #28092A | near-black brand tint, use sparingly |

Neutral grays (same hue at low saturation, so grays feel warm and on-brand rather than cold):

| Step | Hex |
|------|---------|
| 50 | #FAF9FA |
| 100 | #F6F4F6 |
| 200 | #E7E3E8 |
| 300 | #D4CDD5 |
| 400 | #AA9CAB |
| 500 | #837184 |
| 600 | #625463 |
| 700 | #4A3F4A |
| 800 | #312A32 |
| 900 | #211C21 |

Use gray-900/800 for body copy, gray-600/500 for secondary/muted text, gray-50/100 for section backgrounds and card fills. Add semantic colors only where the content needs them (e.g. a muted success green for "unlocked/on-time" states and a muted amber/red for "locked/missed payment" states in the How-It-Works steps) — keep these desaturated enough to sit comfortably next to the purple primary; don't introduce a loud red/green pair.

### Buttons
- **100% corner radius** (pill-shaped, `rounded-full`) on all buttons.
- Primary CTA: primary-700 fill, white text; hover shifts to primary-600 with a subtle lift (slight `translateY`/scale + soft shadow bloom), smooth transition (~200ms ease-out). Avoid abrupt color snaps.
- Secondary/outline buttons: primary-700 border + text on white/transparent fill, hover fills softly with primary-50 or primary-700 (choose per context) — keep the same motion treatment as primary for consistency.
- Download buttons (guidance doc, logos/brand assets) should read clearly as downloads (icon + label), same pill radius and hover treatment as CTAs.

### Motion / Animation
- Modern, subtle — not flashy. Established patterns (all in `globals.css` + `components/Reveal.tsx`, `ScrollScale.tsx`, `Parallax.tsx`):
  - Scroll-triggered reveals: fade + 28px upward translate, 0.9s, `cubic-bezier(0.16, 1, 0.3, 1)` — use `<Reveal>` with staggered `delay` for groups.
  - Animated gradient text (`.gradient-text`): purple → pink → blue panning gradient on key headline phrases (hero, benefits title, gallery title, closing line).
  - Hero aurora background: three large blurred purple/pink/blue blobs drifting on slow (18–26s) keyframe loops over a faint fading grid.
  - Hero media frame scales up (`ScrollScale`, 0.88 → 1) as it approaches the viewport center.
  - Card hover: **very subtle** — 2px lift + soft shadow, 500ms, no scale (scale/jumpy hovers were explicitly rejected).
- Keep animation performant on mobile (transform/opacity only, rAF-throttled scroll handlers) and disable all of it under `prefers-reduced-motion`.

### Layout
- Mobile-first, fully responsive up to desktop. Since distribution is via WhatsApp, assume most first views are on a phone — design and test mobile layout first, then scale up.
- Light mode only, no dark mode variant needed.

## 5. Content Structure (build in this order)

### 1. Hero — SmartPay Introduction
- English headline "The fear of missed payments **is over.**" with the key phrase in animated gradient text; aurora background; badge pill; two CTAs; trust-point row.
- Media: a 16:9 framed image (stock placeholder) with a play affordance, wrapped in `ScrollScale` — structured so the real intro video (`<video>`/`<iframe>`) swaps into the same frame later without restructuring.

### 2. Downloadable Guidance Document
- Clearly visible download section/button for the official SmartPay guidance document.
- Button copy: **"Download SmartPay Guidance Document"**
- Placeholder file/link until the real document is provided.

### 3. Problem → Solution / Benefits (the core persuasion content, several sub-blocks)

**a. Sell More with Confidence** (intro framing)
- No need to hesitate. Offer easy instalment plans and help more customers take home the smartphones they need. With Abans Tiken Tika Pay, grow your showroom sales confidently.

**b. Now, SmartPay Is Here for You**
- Abans SmartPay gives your showroom greater protection and better control over instalment smartphone sales.
- Reduces risk of missed payments
- Encourages customers to pay on time
- Gives your sales team confidence to promote Tiken Tika Pay actively

**c. What Is SmartPay?** (step-by-step, numbered — good candidate for a "how it works" stepper/timeline component with scroll-reveal per step)
1. SmartPay is installed on the customer's phone.
2. The customer uses the phone while making monthly payments.
3. If a payment is missed, the phone locks automatically.
4. The customer settles the outstanding amount.
5. Once payment is confirmed, the phone unlocks.

**d. What SmartPay Means for You** (benefit card grid — 6 cards, use the hover-animated card treatment)
1. Sell with Greater Confidence — Offer instalment plans without worrying about missed payments.
2. Encourage On-Time Payments — The locking feature keeps customers disciplined.
3. Reduce Payment Risk — Extra protection for your showroom.
4. Maintain Better Control — Clear and secure management of instalment sales.
5. Increase Smartphone Sales — Promote Tiken Tika Pay more actively.
6. Give Your Team Peace of Mind — Focus on selling with confidence.

**e. Closing reinforcement line** (rendered at the bottom of the BenefitsGrid section — no separate banner section, no CTA button)
- More Protection. More Confidence. More Sales. ("More Sales." in animated gradient text)
- SmartPay protects your business, supports timely payments, and helps you sell more.

### 4. Campaign Artworks
- **Horizontally scrollable gallery** (8 tiles, 4:5) on a white background: snap-scrolling strip where cards fan out in a subtle 3D arc (rotate/scale by distance from center, recalculated per scroll frame), edge fades, hidden scrollbar, arrow buttons on desktop, native swipe on mobile. See `components/CampaignGallery.tsx`.
- Stock placeholder images for now; swap the `src` entries in the data array when real artwork arrives.

### 5. Official Logos & Brand Assets
- Dedicated section for downloading official SmartPay logos and brand assets.
- Use dummy logos for now (real ones to follow).
- Each asset should have a clear download action (pill button, consistent with §4 button styling).

## 6. Asset & Placeholder Policy

Everything visual (hero image, campaign artwork ×8, logos) is a **placeholder for now** and will be swapped for real assets later. Structure components/data so swapping an image path or adding a real download link is the only change needed — don't hardcode placeholder-specific layout assumptions that would break with real assets of different aspect ratios.

## 7. Build Workflow

All sections are built; changes now come as **iterative design passes** on individual sections. Treat each section as its own component and implementation pass; keep `app/page.tsx` as a thin composition of section components so this incremental workflow stays easy. After changes, verify with `npm run build` and `npm run lint`.

## 8. Open Items / To Confirm Later

- Real SmartPay intro video (currently stock hero image with play affordance).
- Real guidance document file/link (currently placeholder PDF at `public/downloads/smartpay-guidance.pdf`).
- Real campaign artwork files (currently 8 stock placeholders in `public/images/artworks/`).
- Real SmartPay / Tiken Tika Pay logo files (currently dummy SVGs in `public/brand/`).
