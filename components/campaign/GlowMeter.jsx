import styles from './GlowMeter.module.css';

/**
 * GlowMeter — the progress element that pairs with GlowOrb.
 * Driven by the same percentage value; standalone and reusable.
 */
export default function GlowMeter({
  percent = 0,
  label = 'Progress',
  height,
  className = '',
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const style = {
    '--meter-fill': `${clamped}%`,
    ...(height ? { '--meter-h': typeof height === 'number' ? `${height}px` : height } : null),
  };

  return (
    <div
      className={`${styles.track} ${className}`}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${clamped}%`}
      aria-label={label}
    >
      <span className={styles.fill} aria-hidden="true">
        <span className={styles.sheen} />
        <span className={styles.sparks} />
        <span className={styles.shimmer} />
      </span>
      <span className={styles.tip} aria-hidden="true" />
    </div>
  );
}
