/**
 * Inline SVG icon set — no icon package.
 * Every icon inherits `currentColor` and sizes to 1em, so callers control
 * colour and size purely from CSS.
 */

const base = {
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  focusable: 'false',
  'aria-hidden': 'true',
};

const stroke = {
  ...base,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ChevronDown(props) {
  return (
    <svg {...stroke} strokeWidth="2" {...props}>
      <path d="M6.5 9.5 12 15l5.5-5.5" />
    </svg>
  );
}

export function ChevronRight(props) {
  return (
    <svg {...stroke} strokeWidth="1.9" {...props}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg {...stroke} strokeWidth="1.8" {...props}>
      <path d="M4.5 12h14.5M13 6.2l5.8 5.8-5.8 5.8" />
    </svg>
  );
}

export function Search(props) {
  return (
    <svg {...stroke} strokeWidth="1.9" {...props}>
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="M15.7 15.7 20.5 20.5" />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg {...stroke} strokeWidth="2.4" {...props}>
      <path d="M4.8 12.4 9.6 17.2 19.2 7" />
    </svg>
  );
}

export function Heart(props) {
  return (
    <svg {...stroke} strokeWidth="1.7" {...props}>
      <path d="M12 20.2C10.4 19 3.9 14.7 3.9 9.9A4.5 4.5 0 0 1 12 7.2a4.5 4.5 0 0 1 8.1 2.7c0 4.8-6.5 9.1-8.1 10.3Z" />
    </svg>
  );
}

/* Solid map pin — the reference uses a filled glyph beside the location. */
export function PinSolid(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M12 2.4a6.9 6.9 0 0 0-6.9 6.9c0 4.9 5.7 11.1 6 11.4a1.3 1.3 0 0 0 1.9 0c.2-.3 5.9-6.5 5.9-11.4A6.9 6.9 0 0 0 12 2.4Zm0 9.5a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

export function PinOutline(props) {
  return (
    <svg {...stroke} strokeWidth="1.7" {...props}>
      <path d="M12 20.6c1-1.1 6.1-6.6 6.1-10.8a6.1 6.1 0 1 0-12.2 0c0 4.2 5.1 9.7 6.1 10.8Z" />
      <circle cx="12" cy="9.6" r="2.4" />
    </svg>
  );
}

export function Calendar(props) {
  return (
    <svg {...stroke} strokeWidth="1.7" {...props}>
      <rect x="3.6" y="5.2" width="16.8" height="15.2" rx="2.6" />
      <path d="M3.6 9.9h16.8M8 3.2v3.8M16 3.2v3.8" />
      <circle cx="8.6" cy="14" r=".95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r=".95" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="14" r=".95" fill="currentColor" stroke="none" />
      <circle cx="8.6" cy="17.4" r=".95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17.4" r=".95" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Info(props) {
  return (
    <svg {...stroke} strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11.1v5.6" />
      <circle cx="12" cy="7.9" r=".95" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Lock(props) {
  return (
    <svg {...stroke} strokeWidth="1.7" {...props}>
      <rect x="4.6" y="10.2" width="14.8" height="10.4" rx="2.6" />
      <path d="M7.9 10.2V7.6a4.1 4.1 0 0 1 8.2 0v2.6" />
      <circle cx="12" cy="14.6" r="1.35" fill="currentColor" stroke="none" />
      <path d="M12 15.6v2.1" />
    </svg>
  );
}

/* Single four-point star. */
export function Sparkle(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M12 1.6c.5 4.6 1.6 7.7 4 8.9-2.4 1.2-3.5 4.3-4 8.9-.5-4.6-1.6-7.7-4-8.9 2.4-1.2 3.5-4.3 4-8.9Z" />
    </svg>
  );
}

/* Star cluster — logo mark, trust bar, "Glow Story", the Procedure meta icon. */
export function Sparkles(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M10 2.2c.45 4.3 1.5 7.2 3.7 8.3-2.2 1.1-3.25 4-3.7 8.3-.45-4.3-1.5-7.2-3.7-8.3 2.2-1.1 3.25-4 3.7-8.3Z" />
      <path d="M18.2 12.4c.24 2.3.8 3.85 1.98 4.45-1.18.6-1.74 2.15-1.98 4.45-.24-2.3-.8-3.85-1.98-4.45 1.18-.6 1.74-2.15 1.98-4.45Z" opacity=".8" />
      <path d="M17.6 3.1c.16 1.5.53 2.5 1.3 2.9-.77.4-1.14 1.4-1.3 2.9-.16-1.5-.53-2.5-1.3-2.9.77-.4 1.14-1.4 1.3-2.9Z" opacity=".6" />
    </svg>
  );
}

/* Small four-point star used as the flourish on the wordmark. */
export function LogoStar(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M12 2c.6 5.2 2.2 8.4 5.4 10-3.2 1.6-4.8 4.8-5.4 10-.6-5.2-2.2-8.4-5.4-10C9.8 10.4 11.4 7.2 12 2Z" />
    </svg>
  );
}

/* Icon lookup used by data-driven sections (journey steps, meta row, trust). */
export const ICONS = {
  check: Check,
  heart: Heart,
  calendar: Calendar,
  sparkle: Sparkle,
  sparkles: Sparkles,
  lock: Lock,
  procedure: Sparkles,
  clinic: PinOutline,
  info: Info,
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name];
  return Cmp ? <Cmp {...props} /> : null;
}
