# IEEE RAS × IAS Hackathon 2026 — Landing Page

A landing page for our college hackathon event, built for the **IEEE RAS × IAS Student Branch Chapter, MITS Gwalior**. Made with plain HTML, CSS, and JavaScript — no frameworks, no libraries, just vanilla web. I made it so adding and changing stuff in the UI can be easily done by any fresher with little to no programming experince at all, no intimidating files to go through and no scary code to change an element, All the important ui informations are kept in a js file that anyone can easily edit

---

## How to run it

Just open `index.html` in any browser. That's it. No installs, no terminal, no setup.


## File structure

```
ieee-hackathon/
├── index.html               # The main page
├── css/
│   └── styles.css           # All the styling
├── js/
│   ├── data.js              # All the text content (edit this to update the page)
│   ├── helpers.js           # Functions that put the content onto the page
│   └── main.js              # Runs everything, handles interactions
└── assets/
    ├── ieee-logos/          # IEEE wordmark (white, blue, black versions)
    ├── ras-logos/           # RAS society logos
    └── ias-logos/           # IAS society logos
```

---

## Updating the page content

**All the text on the page lives in `js/data.js`.** You don't need to touch any HTML to update what's written on the page.

### Change event details (date, venue, etc.)
```js
// js/data.js
const HERO_META = [
  { icon: '■', text: '14–15 March 2026' },       // change date here
  { icon: '■', text: 'Innovation Hub, Block C' }, // change venue here
  { icon: '■', text: '36-Hour Hackathon' },
];
```

### Add or edit an FAQ
```js
// js/data.js
const FAQ_ITEMS = [
  {
    question: 'Your question here?',
    answer: 'Your answer here.',
  },
  // add more objects like this...
];
```

### Edit tracks
```js
// js/data.js
const TRACKS = [
  {
    num: '01',
    title: 'Track Name',
    desc: 'Short description of the track.',
    tags: ['Tag1', 'Tag2'],
    featured: false, // set true to highlight this card
    iconSVG: `...`,  // SVG path markup for the icon
  },
];
```

### Update the countdown date
```js
// js/main.js — find this line near the bottom
const EVENT_DATE = new Date('2026-03-14T10:00:00');
//                                   change this ↑
```

---

## Sections on the page

| Section | What it shows |
|---|---|
| Hero | Title, logos, date/venue pills, countdown timer, CTA buttons |
| About | Event description, stats (36hrs, prize pool, etc.), organised-by logos |
| Tracks | The 3 challenge tracks with icons and tags |
| Schedule | Day 1 and Day 2 timeline, switchable with tabs |
| FAQ | Collapsible questions and answers |
| Footer | Quick links, social media, contact email |

---

## Logo usage

We have three sets of logos in `/assets/`:

| Logo | Where it's used |
|---|---|
| `ieee_white.png` | Navbar (over dark hero), footer |
| `ieee_blue.png` | Navbar (after scrolling), About section |
| `ras_white.png` | Hero section, footer |
| `ras_colour.png` | About section "Organised by" strip |
| `ias_white.png` | Hero section, footer |
| `ias_main.png` | About section "Organised by" strip |

The dark-background logos are automatically turned white using `filter: brightness(0) invert(1)` in CSS so they look right on the navy hero and footer without needing separate files.

---

## Features

- Countdown timer that ticks down to the event date
- FAQ accordion — click to expand, only one open at a time
- Schedule tabs to switch between Day 1 and Day 2
- Navbar that goes from transparent to frosted white as you scroll
- Cards fade in as you scroll down the page
- Mobile responsive — works on phones too
- Real IEEE logos used throughout

---

## Built with

- HTML, CSS, JavaScript (all vanilla — no React, no Node, nothing to install)
- Google Fonts — Bebas Neue, DM Sans, Space Mono
- Inline SVGs for the track icons

---

## Team

Built by students of the **IEEE RAS × IAS Student Branch Chapter, MITS Gwalior**.

For questions or issues, reach out at **ieeerasias@chapter.edu**
