/**
 * main.js — IEEE RAS × IAS Hackathon 2026
 * =====================================================
 * Entry point. Orchestrates the full page on load.
 *
 * Responsibilities:
 *   1. Call all render functions from helpers.js to
 *      populate empty HTML containers with data from data.js
 *   2. Initialise all UI behaviours (navbar, hamburger,
 *      accordion, schedule tabs)
 *   3. Start the countdown timer
 *   4. Set up scroll-in animations (IntersectionObserver)
 *   5. Highlight the active nav link on scroll
 *
 */


/* ─────────────────────────────────────────────────────
   STEP 1 · RENDER PAGE CONTENT
   Call every helper to inject data-driven HTML into
   the empty container elements defined in index.html.
───────────────────────────────────────────────────── */
renderNavLinks();     // → #nav-links, #nav-mobile
renderHeroMeta();     // → #hero-meta
renderStats();        // → #about-stats
renderTracks();       // → #tracks-grid
renderSchedule();     // → #schedule-tabs, #schedule-timelines
renderFAQ();          // → #accordion
renderFooterLinks();  // → #footer-links
renderSocialLinks();  // → #social-links


/* ─────────────────────────────────────────────────────
   STEP 2 · NAVBAR SCROLL BEHAVIOUR
   Adds .scrolled class once the user scrolls past 60px.
   CSS uses this to switch the navbar from transparent
   (over dark hero) to a frosted white bar.
───────────────────────────────────────────────────── */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    // toggle() second arg is a boolean condition — cleaner than if/else
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load (handles page refreshes mid-scroll)
})();


/* ─────────────────────────────────────────────────────
   STEP 3 · HAMBURGER MENU (MOBILE)
   Toggles the mobile nav dropdown open/closed.
   Also closes it when a link is clicked or the user
   taps outside the navbar.
───────────────────────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  if (!hamburger || !navMobile) return;

  // Toggle open/closed on button click
  hamburger.addEventListener('click', function () {
    const isOpen = navMobile.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when any nav link inside the mobile menu is clicked
  navMobile.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when the user clicks anywhere outside the navbar
  document.addEventListener('click', function (e) {
    if (!document.getElementById('navbar').contains(e.target)) {
      navMobile.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ─────────────────────────────────────────────────────
   STEP 4 · FAQ ACCORDION
   Single-open accordion: clicking a question opens it
   and closes any other currently-open item.
   Uses event delegation on #accordion so it works on
   the dynamically-created items from renderFAQ().
───────────────────────────────────────────────────── */
(function initAccordion() {
  const accordion = document.getElementById('accordion');
  if (!accordion) return;

  accordion.addEventListener('click', function (e) {
    // Traverse up from the click target to find the button
    const btn = e.target.closest('.acc-question');
    if (!btn) return;

    const item            = btn.closest('.acc-item');
    const isCurrentlyOpen = item.classList.contains('open');

    // Close ALL open items first (single-open mode)
    accordion.querySelectorAll('.acc-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.acc-question').setAttribute('aria-expanded', 'false');
    });

    // If the clicked item was previously closed, open it now
    if (!isCurrentlyOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
    // If it was already open, it stays closed (acts as a toggle)
  });
})();


/* ─────────────────────────────────────────────────────
   STEP 5 · SCHEDULE DAY TABS
   Clicking a tab button shows the matching timeline
   panel and hides all others.
   Uses event delegation on #schedule-tabs so it works
   on the dynamically-created buttons from renderSchedule().
───────────────────────────────────────────────────── */
(function initScheduleTabs() {
  const tabsContainer = document.getElementById('schedule-tabs');
  if (!tabsContainer) return;

  tabsContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const targetDayId = btn.getAttribute('data-day');

    // Swap active class on tab buttons
    tabsContainer.querySelectorAll('.tab-btn').forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });

    // Show the matching timeline panel, hide all others
    document.querySelectorAll('.timeline').forEach(function (tl) {
      tl.classList.toggle('hidden', tl.id !== targetDayId);
    });
  });
})();


/* ─────────────────────────────────────────────────────
   STEP 6 · COUNTDOWN TIMER
   Calculates and displays time remaining until the
   event start date. Updates every second via setInterval.
   Shows '00' in all fields once the event has passed.
───────────────────────────────────────────────────── */
(function initCountdown() {
  // ── Change this date to match your actual event start ──
  const EVENT_DATE = new Date('2026-03-14T10:00:00');

  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');
  if (!elDays) return; // bail if countdown HTML not present

  /** Zero-pads a number to 2 digits: 5 → "05" */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /** Computes remaining time and updates the DOM */
  function tick() {
    const diff = EVENT_DATE - new Date(); // milliseconds remaining

    if (diff <= 0) {
      // Event has started — show zeros and stop the timer
      [elDays, elHours, elMins, elSecs].forEach(function (el) {
        el.textContent = '00';
      });
      clearInterval(timerId);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    elDays.textContent  = pad(Math.floor(totalSeconds / 86400));
    elHours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    elMins.textContent  = pad(Math.floor((totalSeconds % 3600) / 60));
    elSecs.textContent  = pad(totalSeconds % 60);
  }

  tick();                              // render immediately
  var timerId = setInterval(tick, 1000); // then every 1 second
})();


/* ─────────────────────────────────────────────────────
   STEP 7 · SCROLL-IN ANIMATIONS (IntersectionObserver)
   Fades and slides elements up as they enter the viewport.
   Injects the initial hidden state via a <style> tag so
   elements are invisible before JS runs, then adds
   .visible when each enters the viewport.
   Stagger delay is based on the element's sibling index.
───────────────────────────────────────────────────── */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return; // graceful fallback

  // Inject hidden-state styles for all animated element types
  const style = document.createElement('style');
  style.textContent = `
    .stat-card, .track-card, .tl-item, .acc-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .stat-card.visible, .track-card.visible,
    .tl-item.visible,  .acc-item.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  /**
   * observe()
   * Attaches an IntersectionObserver to all elements matching
   * the given CSS selector.  When an element becomes 10% visible,
   * a staggered delay is applied based on its index among siblings,
   * then the .visible class is added to trigger the CSS transition.
   *
   * @param {string} selector   - CSS selector for elements to watch
   * @param {number} staggerMs  - milliseconds of delay per sibling step
   */
  function observe(selector, staggerMs) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        // Stagger: each sibling appears slightly after the previous
        const siblings = Array.from(entry.target.parentElement.children);
        const index    = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (index * staggerMs) + 'ms';

        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire only once per element
      });
    }, {
      threshold:   0.1,              // trigger at 10% visibility
      rootMargin: '0px 0px -40px 0px' // slight bottom offset
    });

    document.querySelectorAll(selector).forEach(function (el) {
      observer.observe(el);
    });
  }

  observe('.stat-card',  100);
  observe('.track-card', 120);
  observe('.tl-item',     80);
  observe('.acc-item',    60);
})();


/* ─────────────────────────────────────────────────────
   STEP 8 · ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   Tracks which section is currently in view and colours
   the matching desktop nav link with --ieee-blue.
   Resets all links before applying the active colour
   so only one is highlighted at a time.
───────────────────────────────────────────────────── */
(function initActiveNav() {
  // Must match the id attributes of each <section> in index.html
  const sectionIds = ['about', 'tracks', 'schedule', 'faq'];

  function onScroll() {
    const scrollY = window.scrollY + 120; // 120px offset clears fixed navbar
    let currentId = '';

    // Find the deepest section whose top edge is above current scroll
    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) {
        currentId = id;
      }
    });

    // Apply / remove active colour on each nav link
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
      a.style.color = (a.getAttribute('href') === '#' + currentId)
        ? 'var(--ieee-blue)'   // active: IEEE blue
        : '';                  // inactive: reset to CSS default
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load to handle direct anchor navigation
})();