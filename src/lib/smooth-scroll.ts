import { navigate } from 'astro:transitions/client';

// In-page links (the hero's down arrow, "About", the logo on the home page) glide to their
// target instead of jumping. A link to a section on another page navigates there first and
// then glides down, the way the original site did.

const DURATION = 600;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

let frame = 0;
function scrollToY(target: number) {
  cancelAnimationFrame(frame);
  const max = document.documentElement.scrollHeight - innerHeight;
  const end = Math.max(0, Math.min(target, max));
  if (reduceMotion.matches) {
    scrollTo(0, end);
    return;
  }
  const start = scrollY;
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / DURATION);
    scrollTo(0, start + (end - start) * easeInOutCubic(t));
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}

function scrollToHash(hash: string): boolean {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + scrollY);
  return true;
}

// "/research", "/research.html", and "/research/" are the same page.
const normalize = (path: string) => path.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';

// Section to glide to once the navigation to its page lands.
let pending: { path: string; hash: string } | null = null;

// Capture phase, so this runs before the view-transition router's own click handling.
document.addEventListener(
  'click',
  (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.search) return;

    if (normalize(url.pathname) === normalize(location.pathname)) {
      if (url.hash ? scrollToHash(url.hash) : (scrollToY(0), true)) e.preventDefault();
    } else if (url.hash) {
      e.preventDefault();
      pending = { path: normalize(url.pathname), hash: url.hash };
      navigate(url.pathname);
    }
  },
  { capture: true },
);

document.addEventListener('astro:page-load', () => {
  const target = pending;
  pending = null;
  // Only on the page the link pointed at: if that navigation was abandoned for another, drop it.
  if (!target || normalize(location.pathname) !== target.path) return;
  // Let the incoming page settle before gliding down to the section.
  setTimeout(() => scrollToHash(target.hash), 250);
});
