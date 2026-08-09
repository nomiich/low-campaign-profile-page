import { Heart, Lock } from './icons';
import styles from './DonateBar.module.css';

export default function DonateBar({ donate, amounts }) {
  return (
    <section className={styles.bar} aria-label={donate.cta}>
      <div className={styles.brand}>
        <p className={styles.script}>
          {donate.script}
          <Heart className={styles.scriptHeart} />
        </p>
        <p className={styles.sub}>{donate.sub}</p>
      </div>

      <p className={styles.copy}>{donate.copy}</p>

      <div className={styles.choose}>
        <div className={styles.amounts} role="group" aria-label="Gift amount">
          {amounts.map((a) => (
            <button
              type="button"
              key={a.label}
              className={`${styles.chip} ${a.selected ? styles.chipOn : ''}`}
              aria-pressed={Boolean(a.selected)}
            >
              {a.label}
            </button>
          ))}
        </div>

        <p className={styles.secure}>
          <Lock className={styles.lock} />
          {donate.secure}
        </p>
      </div>

      <button type="button" className={styles.cta}>
        {donate.cta}
        <Heart className={styles.ctaHeart} />
      </button>
    </section>
  );
}
