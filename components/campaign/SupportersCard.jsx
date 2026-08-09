import { ArrowRight, Heart } from './icons';
import styles from './SupportersCard.module.css';

export default function SupportersCard({ heading, supporters, seeAllLabel }) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.heading}>{heading}</h2>
        <Heart className={styles.headHeart} aria-hidden="true" />
      </header>

      <ul className={styles.list}>
        {supporters.map((s) => (
          <li className={styles.row} key={`${s.name}-${s.when}`}>
            <span className={styles.avatar} aria-hidden="true">
              {s.name.charAt(0)}
            </span>
            <span className={styles.name}>{s.name}</span>
            <span className={styles.amount}>{s.amount}</span>
            <span className={styles.when}>{s.when}</span>
            <Heart className={styles.rowHeart} aria-hidden="true" />
          </li>
        ))}
      </ul>

      <button type="button" className={styles.seeAll}>
        <span className={styles.seeAllLabel}>{seeAllLabel}</span>
        <ArrowRight className={styles.seeAllIcon} />
      </button>
    </article>
  );
}
