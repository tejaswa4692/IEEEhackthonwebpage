# IEEE RAS × IAS Hackathon 2026 — Landing Page

A fully static, single-page event landing site for the **IEEE Robotics & Automation Society × Industry Applications Society** student chapter hackathon. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

---

## Live Preview

> Open `index.html` directly in any browser. No server required.

---

## Project Structure

```
ieee-hackathon/
├── index.html          # Page shell — empty containers, no hardcoded content
├── css/
│   └── styles.css      # Full design system (1314 lines, 15 sections)
└── js/
    ├── data.js         # All page content as plain JS arrays  (220 lines)
    ├── helpers.js      # DOM render functions — one per section (343 lines)
    └── main.js         # Entry point — calls renders + UI init  (304 lines)
```

### Why three JS files?

| File | Responsibility | Touches DOM? | Touches Data? |
|---|---|---|---|
| `data.js` | Content only | ✗ | ✓ |
| `helpers.js` | Rendering only | ✓ | ✓ (reads) |
| `main.js` | Orchestration + behaviour | ✓ | ✗ |

This separation means **updating content never requires touching render logic**, and **adding a new behaviour never risks breaking data**.

> ⚠️ Script load order in `index.html` is critical:
> ```html
> <script src="js/data.js"></script>     <!-- arrays defined first -->
> <script src="js/helpers.js"></script>  <!-- functions that read arrays -->
> <script src="js/main.js"></script>     <!-- calls everything -->
> ```

---

## Sections

| # | Section | Content Source |
|---|---|---|
| 1 | **Hero** | Static HTML + `HERO_META` array |
| 2 | **About** | Static HTML + `STATS` array |
| 3 | **Tracks** | `TRACKS` array |
| 4 | **Schedule** | `SCHEDULE` array |
| 5 | **FAQ** | `FAQ_ITEMS` array |
| 6 | **CTA Banner** | Fully static |
| 7 | **Footer** | `FOOTER_LINKS` + `SOCIAL_LINKS` arrays |

---

## Features

- **Data-driven rendering** — all dynamic content lives in `data.js` arrays; `helpers.js` loops over them to build the DOM with `createElement` / `appendChild`
- **Zero hardcoded children** — every list, card, tab, timeline row, FAQ item, and nav link is injected by JavaScript at page load
- **Live countdown timer** — counts down to the event date, updates every second, stops at zero
- **Collapsible FAQ accordion** — single-open mode; uses `max-height` CSS transition for smooth animation; built with event delegation so it works on dynamically-created items
- **Day tabs for schedule** — Day 1 / Day 2 switcher built with event delegation on a dynamically-rendered tab strip
- **Frosted navbar** — transparent over the dark hero; transitions to a white frosted-glass bar on scroll via `.scrolled` class toggled by JS
- **Active nav highlight** — current section's nav link is coloured on scroll using `IntersectionObserver`-style scroll tracking
- **Scroll-in animations** — `IntersectionObserver` fades and slides cards/items up as they enter the viewport, with staggered delay per sibling index
- **Mobile hamburger menu** — closes on link click, outside click, or re-tap
- **IEEE brand palette** — white-dominant with `#005f99` IEEE blue accents; deep navy hero and footer for visual bookends
- **Responsive** — fluid grid breakpoints at 900px (tracks → 2-col) and 768px (stack layout); timeline collapses on mobile

---

## Design System

### Color Tokens (`css/styles.css` — Section 1)

| Token | Value | Usage |
|---|---|---|
| `--ieee-blue` | `#005f99` | Buttons, borders, active states |
| `--ieee-blue-dark` | `#004070` | Hover/pressed states |
| `--ieee-blue-mid` | `#0077bb` | Links, highlights |
| `--ieee-blue-light` | `#dbeeff` | Card tints, tag pills |
| `--ieee-blue-xlt` | `#f0f7ff` | Section backgrounds |
| `--ieee-accent` | `#003a66` | Hero background, footer |
| `--ieee-gold` | `#e08a00` | Featured badges, accent dots |
| `--bg-page` | `#ffffff` | Main page surface |
| `--text-primary` | `#0d1f33` | Headings and heavy text |
| `--text-secondary` | `#3a5f80` | Body copy |

### Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | `Bebas Neue` | Hero title, section headings, track titles |
| Body | `DM Sans` | All paragraph text, buttons |
| Mono / labels | `Space Mono` | Timestamps, tags, stat labels, nav badge |

Loaded via Google Fonts. All three are declared in a single `<link>` in `<head>`.

---

## Updating Content

**All content is in `js/data.js`. You never need to touch `index.html` or `css/styles.css` to change what's on the page.**

### Add a new FAQ question

```js
// js/data.js
const FAQ_ITEMS = [
  // ... existing items ...
  {
    question: 'Your new question here?',
    answer: 'Your answer here. Supports <strong>HTML tags</strong> for emphasis.',
  },
];
```

### Add a new hackathon track

```js
// js/data.js
const TRACKS = [
  // ... existing tracks ...
  {
    num: '04',
    title: 'Your Track Name',
    desc: 'One paragraph description of the track.',
    tags: ['Tag1', 'Tag2', 'Tag3'],
    featured: false,
    iconSVG: `<path d="..." stroke="currentColor" stroke-width="2.5"/>`,
    // iconSVG renders inside a viewBox="0 0 48 48" SVG
  },
];
```

### Add a schedule day

```js
// js/data.js
const SCHEDULE = [
  // ... existing days ...
  {
    id: 'day3',           // must be unique — used as DOM id
    label: 'Day 3 — Mar 16',
    events: [
      { time: '09:00 AM', title: 'Event Title', desc: 'Short description.', accent: false },
      { time: '05:00 PM', title: 'Closing',     desc: 'Wrap up.',            accent: true  },
      // accent: true → gold dot + highlighted card (use for key moments)
    ],
  },
];
```

### Change the countdown date

```js
// js/main.js — Section 4 (STEP 6)
const EVENT_DATE = new Date('2026-03-14T10:00:00');
//                                   ↑ change this to your event datetime
```

---

## How the JavaScript Works

### Render pipeline (`main.js` → `helpers.js` → `data.js`)

```
Page Load
    │
    ▼
main.js calls renderNavLinks()
              renderHeroMeta()
              renderStats()
              renderTracks()
              renderSchedule()
              renderFAQ()
              renderFooterLinks()
              renderSocialLinks()
    │
    ▼
Each helper loops its data array
and builds DOM nodes via createElement / appendChild
    │
    ▼
Nodes appended to empty containers in index.html
(#nav-links, #tracks-grid, #accordion, etc.)
    │
    ▼
main.js initialises UI behaviours:
  - Navbar scroll listener
  - Hamburger toggle
  - FAQ accordion (event delegation)
  - Schedule tabs (event delegation)
  - Countdown timer (setInterval)
  - Scroll animations (IntersectionObserver)
  - Active nav highlight (scroll listener)
```

### Event delegation

The accordion and tab switcher use **event delegation** — a single listener on the parent container handles clicks for all dynamically-created children:

```js
// One listener on #accordion handles ALL .acc-question buttons,
// even though they were created after the listener was registered.
accordion.addEventListener('click', function (e) {
  const btn = e.target.closest('.acc-question');
  if (!btn) return;
  // ... toggle logic
});
```

This is more efficient than attaching individual listeners to each item, and it works correctly on elements that don't exist at listener registration time.

### Scroll animations

`IntersectionObserver` watches cards and list items. When an element becomes 10% visible in the viewport, a staggered CSS transition fires:

```js
// Stagger: each sibling appears 120ms after the previous
entry.target.style.transitionDelay = (siblingIndex * 120) + 'ms';
entry.target.classList.add('visible');
observer.unobserve(entry.target); // fire only once
```

The hidden initial state (`opacity: 0; transform: translateY(20px)`) is injected as a `<style>` tag by JS so elements are hidden only when JS is available — graceful degradation without JS means content is visible by default.

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- `IntersectionObserver` — supported in all modern browsers; graceful no-op if absent
- `Element.closest()` — fully supported
- CSS `backdrop-filter` — supported in Chrome/Safari/Edge; Firefox requires flag (frosted navbar degrades to solid white, no functional impact)
- CSS custom properties — fully supported
- `100svh` — supported in all modern browsers; falls back to `100vh` in older ones

---

## Accessibility

- All nav buttons have `aria-label` attributes
- FAQ accordion buttons use `aria-expanded` (toggled by JS)
- Social link anchors have `aria-label` for screen readers
- Focus ring restored via `:focus-visible` with IEEE blue outline
- Semantic HTML throughout (`<nav>`, `<section>`, `<footer>`, `<h1>`–`<h4>`)
- Color contrast: all text on white backgrounds meets WCAG AA

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| HTML | Vanilla | No framework overhead; pure semantics |
| CSS | Vanilla + Custom Properties | Full control; no build step |
| JS | Vanilla ES5-compatible | Maximum compatibility; no bundler needed |
| Fonts | Google Fonts CDN | Bebas Neue, DM Sans, Space Mono |
| Icons | Inline SVG | No external icon library; fully styleable |

---

## Local Development

No build step, no package manager, no server required.

```bash
# Clone / download the project
git clone https://github.com/your-username/ieee-hackathon-2026.git
cd ieee-hackathon-2026

# Open directly in browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

---

## License

This project was built for the IEEE RAS × IAS Student Chapter. Feel free to fork and adapt for your own chapter event — just update the content in `js/data.js` and the color tokens in `css/styles.css` Section 1.
