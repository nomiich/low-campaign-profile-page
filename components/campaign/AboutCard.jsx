import { Heart } from './icons';
import styles from './AboutCard.module.css';

export default function AboutCard({ heading, paragraphs, followLabel }) {
  const last = paragraphs.length - 1;

  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h2 className={styles.heading}>{heading}</h2>
        <Heart className={styles.headHeart} aria-hidden="true" />
      </header>

      {paragraphs.map((text, i) => (
        <p className={styles.para} key={text}>
          {text}
          {i === last && <Heart className={styles.inlineHeart} />}
        </p>
      ))}

      <button type="button" className={styles.follow}>
        <Heart className={styles.followHeart} />
        {followLabel}
      </button>
    </article>
  );
}
