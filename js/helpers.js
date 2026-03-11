/**
 * helpers.js — IEEE RAS × IAS Hackathon 2026
 * =====================================================
 * Pure render functions — each one reads from the data
 * arrays defined in data.js and builds DOM nodes via
 * createElement / appendChild loops.
 *
 * No data lives here. No event listeners live here.
 * Dependencies: data.js must be loaded before this file.
 * Called by: main.js
 * =====================================================
 */


/**
 * renderNavLinks()
 * ─────────────────
 * Populates #nav-links (desktop) and #nav-mobile (mobile)
 * from the NAV_LINKS array.
 * Items with cta:true receive button-style classes.
 */
function renderNavLinks() {
  const desktopList = document.getElementById('nav-links');
  const mobileList  = document.getElementById('nav-mobile');
  if (!desktopList || !mobileList) return;

  NAV_LINKS.forEach(function (item) {

    // ── Desktop <li><a> ──
    const desktopLi        = document.createElement('li');
    const desktopA         = document.createElement('a');
    desktopA.href          = item.href;
    desktopA.textContent   = item.label;
    if (item.cta) desktopA.className = 'btn btn-nav';
    desktopLi.appendChild(desktopA);
    desktopList.appendChild(desktopLi);

    // ── Mobile <li><a> ──
    const mobileLi       = document.createElement('li');
    const mobileA        = document.createElement('a');
    mobileA.href         = item.href;
    mobileA.textContent  = item.label;
    mobileA.className    = item.cta ? 'mobile-link btn-mobile' : 'mobile-link';
    mobileLi.appendChild(mobileA);
    mobileList.appendChild(mobileLi);
  });
}


/**
 * renderHeroMeta()
 * ─────────────────
 * Populates #hero-meta with date / venue / duration pill items
 * from the HERO_META array.
 * Inserts a .meta-divider between each item (not before the first).
 */
function renderHeroMeta() {
  const container = document.getElementById('hero-meta');
  if (!container) return;

  HERO_META.forEach(function (item, index) {

    // Vertical divider between pills — skip before first item
    if (index > 0) {
      const divider     = document.createElement('div');
      divider.className = 'meta-divider';
      container.appendChild(divider);
    }

    const pill       = document.createElement('div');
    pill.className   = 'meta-item';

    const icon       = document.createElement('span');
    icon.className   = 'meta-icon';
    icon.textContent = item.icon;

    const label      = document.createElement('span');
    label.textContent = item.text;

    pill.appendChild(icon);
    pill.appendChild(label);
    container.appendChild(pill);
  });
}


/**
 * renderStats()
 * ─────────────
 * Populates #about-stats with stat cards from the STATS array.
 * Each card shows a large number and a small label below it.
 */
function renderStats() {
  const container = document.getElementById('about-stats');
  if (!container) return;

  STATS.forEach(function (stat) {
    const card       = document.createElement('div');
    card.className   = 'stat-card';

    const num        = document.createElement('span');
    num.className    = 'stat-num';
    num.textContent  = stat.num;

    const label      = document.createElement('span');
    label.className  = 'stat-label';
    label.textContent = stat.label;

    card.appendChild(num);
    card.appendChild(label);
    container.appendChild(card);
  });
}


/**
 * renderTracks()
 * ──────────────
 * Populates #tracks-grid with challenge track cards from TRACKS.
 * Each card contains: number label, SVG icon, title, description,
 * and a row of technology tag pills.
 * Cards with featured:true get an extra badge and different styling.
 */
function renderTracks() {
  const grid = document.getElementById('tracks-grid');
  if (!grid) return;

  TRACKS.forEach(function (track) {

    // Card wrapper — 'featured' class triggers highlighted border/bg
    const card       = document.createElement('div');
    card.className   = track.featured ? 'track-card featured' : 'track-card';
    card.setAttribute('data-track', track.num);

    if (track.featured) {
      const badge       = document.createElement('div');
      badge.className   = 'track-badge';
      badge.textContent = 'Featured';
      card.appendChild(badge);
    }

    const num       = document.createElement('div');
    num.className   = 'track-num';
    num.textContent = track.num;

    const iconWrap     = document.createElement('div');
    iconWrap.className = 'track-icon';
    iconWrap.innerHTML = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${track.iconSVG}</svg>`;

    const title       = document.createElement('h3');
    title.className   = 'track-title';
    title.textContent = track.title;

    const desc       = document.createElement('p');
    desc.className   = 'track-desc';
    desc.textContent = track.desc;

    const tagsDiv     = document.createElement('div');
    tagsDiv.className = 'track-tags';
    track.tags.forEach(function (tagText) {
      const tag       = document.createElement('span');
      tag.textContent = tagText;
      tagsDiv.appendChild(tag);
    });

    card.appendChild(num);
    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsDiv);
    grid.appendChild(card);
  });
}


/**
 * renderSchedule()
 * ────────────────
 * Populates #schedule-tabs (tab buttons) and #schedule-timelines
 * (timeline panels) from the SCHEDULE array.
 *
 * - First day's tab gets the 'active' class; first timeline is visible.
 * - All other timelines get the 'hidden' class (toggled by main.js).
 * - Events with accent:true receive gold dot + card highlight.
 */
function renderSchedule() {
  const tabsContainer      = document.getElementById('schedule-tabs');
  const timelinesContainer = document.getElementById('schedule-timelines');
  if (!tabsContainer || !timelinesContainer) return;

  SCHEDULE.forEach(function (day, dayIndex) {

    // ── Tab button ──
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (dayIndex === 0 ? ' active' : '');
    btn.textContent = day.label;
    btn.setAttribute('data-day', day.id);  // used by the tab click handler in main.js
    tabsContainer.appendChild(btn);

    const timeline     = document.createElement('div');
    timeline.className = 'timeline' + (dayIndex !== 0 ? ' hidden' : '');
    timeline.id        = day.id;  // matched by data-day on the tab button

    day.events.forEach(function (event) {
      const item     = document.createElement('div');
      item.className = 'tl-item';

      const time       = document.createElement('div');
      time.className   = 'tl-time';
      time.textContent = event.time;

      const dot     = document.createElement('div');
      dot.className = event.accent ? 'tl-dot accent' : 'tl-dot';

      const content     = document.createElement('div');
      content.className = event.accent ? 'tl-content accent-card' : 'tl-content';

      const heading       = document.createElement('h4');
      heading.textContent = event.title;

      const para       = document.createElement('p');
      para.textContent = event.desc;

      content.appendChild(heading);
      content.appendChild(para);

      item.appendChild(time);
      item.appendChild(dot);
      item.appendChild(content);
      timeline.appendChild(item);
    });

    timelinesContainer.appendChild(timeline);
  });
}


/**
 * renderFAQ()
 * ───────────
 * Populates #accordion with collapsible FAQ items from FAQ_ITEMS.
 * The open/close toggle logic lives in main.js (initAccordion).
 *
 * Note: btn.textContent is used for the question (safe, no injection).
 *       para.innerHTML is used for the answer to allow <strong> etc.
 */
function renderFAQ() {
  const accordion = document.getElementById('accordion');
  if (!accordion) return;

  FAQ_ITEMS.forEach(function (faq) {
    const item     = document.createElement('div');
    item.className = 'acc-item';

    const btn = document.createElement('button');
    btn.className = 'acc-question';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = faq.question;

    const icon = document.createElement('span');
    icon.className = 'acc-icon';
    icon.setAttribute('aria-hidden', 'true');
    btn.appendChild(icon);

    const answer     = document.createElement('div');
    answer.className = 'acc-answer';

    const para     = document.createElement('p');
    para.innerHTML = faq.answer;
    answer.appendChild(para);

    item.appendChild(btn);
    item.appendChild(answer);
    accordion.appendChild(item);
  });
}


/**
 * renderFooterLinks()
 * ───────────────────
 * Populates #footer-links with <li><a> elements from FOOTER_LINKS.
 */
function renderFooterLinks() {
  const list = document.getElementById('footer-links');
  if (!list) return;

  FOOTER_LINKS.forEach(function (link) {
    const li       = document.createElement('li');
    const a        = document.createElement('a');
    a.href         = link.href;
    a.textContent  = link.label;
    li.appendChild(a);
    list.appendChild(li);
  });
}


/**
 * renderSocialLinks()
 * ───────────────────
 * Populates #social-links with anchor + SVG icon buttons
 * from the SOCIAL_LINKS array.
 *
 * SVG innerHTML is used only for the icon markup which is trusted
 * static data defined in data.js — not user-supplied input.
 */
function renderSocialLinks() {
  const container = document.getElementById('social-links');
  if (!container) return;

  SOCIAL_LINKS.forEach(function (social) {
    const a = document.createElement('a');
    a.href  = social.href;
    a.className = 'social-btn';
    a.setAttribute('aria-label', social.label);

    const svgWrap     = document.createElement('span');
    svgWrap.innerHTML = `<svg ${social.svgAttrs} fill="none" style="width:16px;height:16px;display:block">${social.iconSVG}</svg>`;

    const labelSpan       = document.createElement('span');
    labelSpan.textContent = social.label;

    a.appendChild(svgWrap.firstChild); 
    a.appendChild(labelSpan);
    container.appendChild(a);
  });
}