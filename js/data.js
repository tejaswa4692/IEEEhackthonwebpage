/**
 * data.js — IEEE RAS × IAS Hackathon 2026
 * =====================================================
 * Single source of truth for ALL page content.
 * Edit the arrays here to update the website —
 * no HTML or CSS changes required.
 *
 * Consumed by: helpers.js (render functions)
 * =====================================================
 */


/**
 * NAV_LINKS
 * Drives both the desktop <ul#nav-links> and mobile <ul#nav-mobile>.
 * Set cta:true on the item that should render as a styled button.
 */
const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Tracks',   href: '#tracks' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'FAQ',      href: '#faq' },
  { label: 'Register', href: '#register', cta: true },
];


/**
 * HERO_META
 * Info pills displayed under the tagline in the hero section.
 * icon: a Unicode character used as a decorative bullet.
 */
const HERO_META = [
  { icon: '■', text: '14–15 March 2026' },
  { icon: '■', text: 'Innovation Hub, Block C' },
  { icon: '■', text: '36-Hour Hackathon' },
];


/**
 * STATS
 * The four highlight stat cards in the About section.
 */
const STATS = [
  { num: '36',   label: 'Hours of Hacking' },
  { num: '3',    label: 'Challenge Tracks' },
  { num: '₹1L+', label: 'Prize Pool' },
  { num: '50+',  label: 'Teams Expected' },
];


/**
 * TRACKS
 * Challenge track cards shown in the Tracks section.
 *
 * Fields:
 *   num      — display number label (e.g. '01')
 *   title    — track name
 *   desc     — short description paragraph
 *   tags     — array of tech keyword strings
 *   featured — if true, adds a "Featured" badge and highlighted border
 *   iconSVG  — inner SVG path markup (rendered inside a 48×48 viewBox)
 */
const TRACKS = [
  {
    num: '01',
    title: 'Smart Automation',
    desc: 'Design autonomous systems that streamline industrial or domestic workflows. Think conveyor intelligence, robotic pick-and-place, or adaptive manufacturing pipelines powered by sensor fusion.',
    tags: ['PLC', 'ROS2', 'Edge AI', 'IIoT'],
    featured: false,
    iconSVG: `<path d="M24 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" stroke="currentColor" stroke-width="2.5"/>
              <path d="M24 4v4M24 40v4M4 24h4M40 24h4M7.76 7.76l2.83 2.83M37.41 37.41l2.83 2.83M7.76 40.24l2.83-2.83M37.41 10.59l2.83-2.83"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  {
    num: '02',
    title: 'Human-Robot Interaction',
    desc: 'Build intuitive interfaces between humans and machines. From gesture-controlled arms to assistive exoskeletons and social robots — create experiences that feel natural, safe, and empowering.',
    tags: ['CV', 'NLP', 'Haptics', 'HCI'],
    featured: true,
    iconSVG: `<circle cx="24" cy="12" r="6" stroke="currentColor" stroke-width="2.5"/>
              <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M36 20h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <rect x="30" y="16" width="8" height="14" rx="2" stroke="currentColor" stroke-width="2.5"/>`,
  },
  {
    num: '03',
    title: 'Sustainable Systems',
    desc: 'Tackle energy efficiency and environmental sustainability with automation. Design smart grids, waste-sorting robots, renewable energy management systems, or predictive maintenance solutions that reduce carbon footprint.',
    tags: ['IoT', 'SCADA', 'ML', 'Embedded'],
    featured: false,
    iconSVG: `<path d="M8 40c4-12 12-20 32-24C36 32 28 40 8 40z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M8 40c2-8 6-14 14-18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M20 12V8M28 16l3-3M36 24h4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  },
];


/**
 * SCHEDULE
 * Day-by-day hackathon agenda.
 *
 * Fields per day:
 *   id     — used as the timeline panel's DOM id and tab data-day value
 *   label  — tab button text
 *   events — array of event objects:
 *     time   — display time string
 *     title  — event name
 *     desc   — one-sentence description
 *     accent — if true, the dot and card receive gold highlight styling
 */
const SCHEDULE = [
  {
    id: 'day1',
    label: 'Day 1 — Mar 14',
    events: [
      { time: '08:30 AM', title: 'Registration & Check-in',      desc: 'Collect your badges, set up workstations, and meet your neighbours.',                                          accent: false },
      { time: '10:00 AM', title: 'Opening Ceremony',             desc: 'Welcome address by IEEE chapter leads, keynote from industry sponsor, and track briefings.',                  accent: false },
      { time: '11:00 AM', title: 'Hacking Begins!',              desc: 'The clock starts. Teams dive into problem statements and begin ideation sprints.',                            accent: true  },
      { time: '01:00 PM', title: 'Lunch + Mentor Roundtable',    desc: 'Catered lunch and informal mentoring sessions with IEEE industry experts.',                                    accent: false },
      { time: '04:00 PM', title: 'Workshop: ROS2 & Prototyping', desc: 'Optional hands-on session — continue hacking or learn new tools from mentors.',                              accent: false },
      { time: '08:00 PM', title: 'Dinner + Progress Check-in',   desc: 'Mid-hackathon gut-check. Teams share 2-minute rapid updates with judges.',                                    accent: false },
      { time: '12:00 AM', title: 'Night Fuel & Coding Marathon', desc: 'Snacks, coffee, and ambient music. The deep work begins.',                                                     accent: false },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2 — Mar 15',
    events: [
      { time: '07:00 AM', title: 'Morning & Breakfast',          desc: 'Rise and refuel. Final push on prototypes and demo prep begins.',                                             accent: false },
      { time: '10:00 AM', title: 'Code Freeze',                  desc: 'All submissions locked. No new commits — time to polish your pitch deck.',                                    accent: true  },
      { time: '11:00 AM', title: 'Project Demos — Round 1',      desc: 'Teams present live demos at their stations. Judges evaluate across all tracks.',                             accent: false },
      { time: '01:30 PM', title: 'Lunch & Judge Deliberation',   desc: 'Top 6 teams shortlisted for the final stage presentation.',                                                   accent: false },
      { time: '03:00 PM', title: 'Final Stage Presentations',    desc: 'Shortlisted teams pitch to a panel of IEEE senior members and industry judges.',                             accent: false },
      { time: '05:30 PM', title: 'Awards & Closing Ceremony',    desc: 'Winners announced, prizes awarded, and certificates distributed. Networking dinner to follow.',               accent: true  },
    ],
  },
];


/**
 * FAQ_ITEMS
 * Each object becomes one collapsible accordion row.
 * The `answer` field supports embedded HTML (e.g. <strong> tags).
 */
const FAQ_ITEMS = [
  {
    question: 'Who can participate in the hackathon?',
    answer: "The hackathon is open to all currently enrolled undergraduate and postgraduate students from any engineering or technology discipline. You don't have to be an IEEE member to register — though members may enjoy priority registration. Teams must consist of 2–4 members, and inter-college teams are warmly encouraged.",
  },
  {
    question: 'Do I need to have a project idea before registering?',
    answer: "Nope! You can register first and ideate later. However, submitting a rough project concept during registration is strongly recommended — it helps us match you with the right mentors and equipment. You are also free to pivot or completely change your idea once the problem statements are officially released at the opening ceremony.",
  },
  {
    question: 'What hardware and software resources will be provided?',
    answer: "We'll have a hardware lab stocked with Arduino &amp; Raspberry Pi kits, servo motors, ultrasonic sensors, cameras, and basic prototyping supplies. Cloud compute credits (AWS / GCP) will be available to registered teams. For software, participants may use any open-source framework — ROS2, TensorFlow, OpenCV, and more are pre-configured on lab machines. Bring your own laptop for the best experience.",
  },
  {
    question: 'Is there a registration fee?',
    answer: 'Registration is completely free for all participants. Meals, snacks, and beverages throughout both days are included. IEEE student member teams also receive a complimentary prototyping component kit worth ₹500. There is no hidden cost — just show up ready to build.',
  },
  {
    question: 'How will projects be judged?',
    answer: 'Projects are evaluated by a panel of IEEE senior members and industry professionals on four criteria: <strong>Technical Innovation</strong> (30%), <strong>Feasibility &amp; Implementation</strong> (30%), <strong>Impact &amp; Relevance</strong> (25%), and <strong>Presentation Quality</strong> (15%). All teams receive written feedback from judges after the event.',
  },
];


/**
 * FOOTER_LINKS
 * Quick-navigation anchor links in the footer's middle column.
 */
const FOOTER_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Tracks',   href: '#tracks' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'FAQ',      href: '#faq' },
];


/**
 * SOCIAL_LINKS
 * Social media buttons rendered in the footer's right column.
 *
 * Fields:
 *   label    — accessible name + visible text label
 *   href     — link target (placeholder '#' is fine)
 *   iconSVG  — inner SVG path markup
 *   svgAttrs — attribute string added to the <svg> open tag (e.g. viewBox)
 */
const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://github.com/tejaswa4692',
    svgAttrs: 'viewBox="0 0 24 24"',
    iconSVG: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor"/>
              <rect x="2" y="9" width="4" height="12" fill="currentColor"/>
              <circle cx="4" cy="4" r="2" fill="currentColor"/>`,
  },
  {
    label: 'Instagram',
    href: 'https://github.com/tejaswa4692',
    svgAttrs: 'viewBox="0 0 24 24"',
    iconSVG: `<rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="2" fill="none"/>
              <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>`,
  },
  {
    label: 'Twitter / X',
    href: 'https://github.com/tejaswa4692',
    svgAttrs: 'viewBox="0 0 24 24"',
    iconSVG: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>`,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/tejaswa4692',
    svgAttrs: 'viewBox="0 0 24 24"',
    iconSVG: `<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor"/>`,
  },
];