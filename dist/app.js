'use strict';
// Navigation remains usable without JavaScript; JS adds mobile disclosure and active state.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobile = matchMedia('(max-width: 800px)');
let previousFocus;
function setMenu(open, restore = false) {
  if (open) previousFocus = document.activeElement;
  header.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open ? 'Close <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">＋</span>';
  document.body.style.overflow = open ? 'hidden' : '';
  // The full-screen menu isolates the page from keyboard and assistive navigation.
  document.querySelectorAll('main, .site-footer, .header-github').forEach(el => el.inert = open);
  if (open) nav.querySelector('a').focus();
  else if (restore && previousFocus) previousFocus.focus();
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
  if (event.key === 'Tab') {
    const items = [menuButton, ...nav.querySelectorAll('a')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
mobile.addEventListener('change', () => setMenu(false));
const progress = document.querySelector('.scroll-progress');
let scrollQueued = false;
function updateScroll() {
  const extent = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${extent > 0 ? scrollY / extent : 0})`;
  scrollQueued = false;
}
addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
addEventListener('resize', updateScroll);
updateScroll();
const activeObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    nav.querySelectorAll('a').forEach(a => {
      if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-15% 0px -60% 0px' });
document.querySelectorAll('main > section[id]').forEach(section => activeObserver.observe(section));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); revealObserver.unobserve(entry.target); } });
}, { rootMargin: '0px 0px 70px 0px', threshold: 0.03 });
if (!reducedMotion.matches) document.querySelectorAll('.reveal').forEach(el => { el.classList.add('is-pending'); revealObserver.observe(el); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) document.querySelectorAll('.is-pending').forEach(el => el.classList.remove('is-pending')); });
const disciplines = {
  ai: 'AI / Intelligence earns its place by making software useful.',
  systems: 'SYSTEMS / Explicit boundaries, durable state, and recovery.',
  software: 'SOFTWARE / Data models, interfaces, and behavior you can inspect.',
  product: 'PRODUCT / Complex capabilities, made clear and usable.'
};
document.querySelectorAll('[data-system]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-system]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('.system-description').textContent = disciplines[button.dataset.system];
}));
const heroSystem = document.querySelector('.hero-system');
if (heroSystem) {
  const svg = heroSystem.querySelector('svg');
  heroSystem.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const rect = heroSystem.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    svg.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
  }, { passive: true });
  heroSystem.addEventListener('pointerleave', () => svg.style.transform = '');
}
const stages = [
  ['01 / PLANNER', 'Break the task into a scoped plan. Human approval comes before implementation.'],
  ['02 / CODER', 'Implement within staging. Promotion to the canonical project requires human approval.'],
  ['03 / TESTER', 'Test architecture and execution validate the promoted work before review.'],
  ['04 / REVIEWER', 'Inspect the changes and review artifacts. Durable workflow state supports recovery.']
];
document.querySelectorAll('.orchestration').forEach(panel => {
  panel.querySelectorAll('[data-agent]').forEach(button => button.addEventListener('click', () => {
    panel.querySelectorAll('[data-agent]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    const [label, text] = stages[Number(button.dataset.agent)];
    panel.querySelector('.agent-detail .mono').textContent = label;
    panel.querySelector('.agent-detail p').textContent = text;
  }));
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
