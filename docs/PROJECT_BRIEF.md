# SkillNest — Project Brief

Read this file first. It's the current source of truth for decisions made since the two spec docs below were written. Where this file and the spec docs disagree, **this file wins** — it reflects the latest direction from the client and Gideon.

Reference docs in this folder:
- `project-overview.md` — original commercial/product spec (features, monetization, revenue model, page-by-page flow)
- `app-arrangement.md` — client's follow-up brief, focused on talent discovery, portfolios/showcase, and homepage IA

## What SkillNest Is
A global micro-skill marketplace connecting freelancers with clients, combining two things that are usually separate products:
1. A **discovery/portfolio layer** (Fiverr/Behance-style) — talent browsing by category, portfolios, showcase content.
2. A **transactional core** (Upwork-style) — job postings, milestone-based escrow, disputes, reviews.

Core product line: **"Show your skill. Get discovered. Get hired."**

## Current Tech Stack (locked)
- **Frontend:** Expo + React Native Web — single codebase targeting iOS, Android, and web. **Not** Next.js.
- **Backend:** NestJS (TypeScript), modular monolith — not a multi-language microservices split.
- **Database access:** Prisma ORM → PostgreSQL.
- **Hosting for dev:** Supabase (Postgres) + Upstash (Redis) — used instead of local Docker due to setup issues.
- **Package manager:** npm.
- **Repo shape:** monorepo with shared types between backend and mobile/web app.
- **Project folder:** `SkillNest Marketplace` (fresh build — not the old `Desktop/My Projects/SkillNest` folder).

## Current Sequencing
**Frontend first, backend second.** All frontend pages/screens are being built and finalized before any backend/Prisma/schema work resumes. Do not start backend implementation until told the frontend phase is complete.

## Platform-Specific Entry Flow (locked)
- **Web:** opens on the full marketing landing page.
- **Native (iOS/Android):** opens on a simple branded splash screen (the "S" logo mark alongside the "SkillNest" wordmark) — no landing page on native — then proceeds straight to Sign Up / Log In.

## Design Direction (locked)
The overall visual identity should follow the style of a reference project called **Primus** (a forex trading brand site Gideon built), adapted to SkillNest's content. This applies **app-wide, across every page** — not just the landing page.

### Brand Colors (locked, app-wide)
| Token | Hex | Usage |
|---|---|---|
| Primary accent (pink) | `#EC1257` | CTAs, active states, links, stat labels, highlighted plan border |
| Primary accent hover | `#C10E48` | Button hover/pressed state |
| Pink tint (light bg) | `#FDE8EF` | Badge backgrounds, ghost numbers, subtle highlights |
| Dark navy | `#0B1220` | Dark section backgrounds (stat bands, trust band, footer), primary headline text on light bg |
| Ink (near-black) | `#10172A` | Body headline text |
| Body gray | `#5B6472` | Body copy on light backgrounds |
| Muted gray (on dark) | `#93A0B4` | Secondary text on dark backgrounds |
| Light section background | `#F6F7FB` | Alternating section backgrounds |
| Border | `#E7E9F1` | Card borders, dividers |
| Success green | `#17A34A` | Checkmarks, verified/success states |
| White | `#FFFFFF` | Base background, card backgrounds |

**The warm cream/brown palette used in the earlier Lovable prototype is deprecated and should not be used anywhere going forward.** Every screen — onboarding, browse, profiles, gig creation, orders, messaging, everything — should use the palette above.

### Typography (locked, app-wide)
- **Headings:** Manrope (bold/extrabold weights — 700/800)
- **Body text:** Inter (400/500/600 weights)

### Layout patterns to reuse (landing page, and elsewhere where relevant)
- Two-tone hero headline (one line dark/ink, one line pink)
- Dark stat band under the hero
- Numbered 3-step process cards
- Tiered pricing cards with a highlighted "most popular" plan
- FAQ accordion
- Dark trust band, dark footer
- **Roadmap section specifically:** a vertical, alternating left/right timeline with quarter labels and filled/outline dot states — this was explicitly called out by the client as a section to replicate.

A working HTML mockup of the redesigned landing page exists (built in chat with Claude) reflecting this direction — treat it as the visual reference for translating into Expo/RN Web components, not as code to port directly (it's plain HTML/CSS/JS, not React Native).

There is also an earlier full prototype built in Lovable (React/Tailwind) covering most core screens end-to-end (onboarding, browse, gig creation, orders/escrow, messaging, profiles, etc.) — useful as a UX/flow reference, same caveat about not porting the code directly.

## Gaps Still Open (from client's `app-arrangement.md` brief, not yet reflected in current prototypes)
1. **Video showcase/portfolio upload** — with duration/size limits and compression. Not yet designed or built.
2. **"Recommended Talent" after a job post** — client posts a job, platform should proactively surface matching freelancers, not just wait for proposals. For MVP, this should be simple filtered/sorted queries (category, skills, budget, location) — not a real ML recommendation engine (that's a post-MVP goal).
3. **Availability status** (Available / Busy / Not Available) on talent cards and profiles — not yet in any prototype.
4. **Homepage should lead with an equally-weighted "Find Talent vs. Find Work" split** at the very top, per the client's brief — current prototypes introduce this later (e.g. at signup) rather than on the homepage itself.

## Notes for Whoever (or Whatever) Reads This Next
- Don't assume the two PDFs in this folder are complete — this brief has already superseded a few things in `project-overview.md` (e.g. the multi-language microservices idea was dropped in favor of a modular monolith).
- If frontend and backend decisions conflict with what's in this file, ask Gideon before proceeding — this file is meant to be updated as decisions change, not treated as permanently fixed.
