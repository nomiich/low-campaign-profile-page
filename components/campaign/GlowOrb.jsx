import styles from './GlowOrb.module.css';

/**
 * GlowOrb — the brand's signature "emitted light" element.
 *
 * Built purely from stacked radial gradients: an outer bloom that decays to
 * alpha 0 (so there is never a visible edge against a card), a luminous ring
 * that is a gradient colour stop rather than a border/stroke, a warm interior
 * body so it reads as a lit sphere rather than a hollow donut, drifting
 * sparkle motes, and a centred label.
 *
 * Everything scales from a single `--orb-size`, so the same component works at
 * any diameter elsewhere in the product.
 */
export default function GlowOrb({ percent = 0, label = 'of goal', size, className = '' }) {
  const style = size ? { '--orb-size': typeof size === 'number' ? `${size}px` : size } : undefined;

  return (
    <div
      className={`${styles.orb} ${className}`}
      style={style}
      role="img"
      aria-label={`${percent}% ${label}`}
    >
      <span className={styles.bloom} aria-hidden="true" />
      <span className={styles.body} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.rimLight} aria-hidden="true" />
      <span className={styles.motes} aria-hidden="true" />
      <span className={styles.flare} aria-hidden="true" />
      <span className={styles.flareSm} aria-hidden="true" />
      <span className={styles.grain} aria-hidden="true" />
      <span className={styles.label}>
        <span className={styles.percent}>{percent}%</span>
        <span className={styles.caption}>{label}</span>
      </span>
    </div>
  );
}
