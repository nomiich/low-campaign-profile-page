import Image from 'next/image';
import { Check, Heart, Icon, PinSolid } from './icons';
import styles from './ProfileCard.module.css';

export default function ProfileCard({ campaign }) {
  const { name, age, verified, location, photo, quote, meta } = campaign;

  return (
    <article className={styles.card}>
      <div className={styles.portrait}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 310px"
          className={styles.photo}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.nameRow}>
          <h1 className={styles.name}>
            {name}, {age}
          </h1>
          {verified && (
            <span className={styles.verified}>
              <Check className={styles.verifiedIcon} />
              Verified
            </span>
          )}
        </div>

        <p className={styles.location}>
          <PinSolid className={styles.pin} />
          {location}
        </p>

        <blockquote className={styles.quote}>
          <span className={styles.mark} aria-hidden="true">
            &ldquo;
          </span>
          <p className={styles.quoteText}>
            &quot;{quote}&quot;
            <Heart className={styles.quoteHeart} />
          </p>
        </blockquote>

        <dl className={styles.meta}>
          {meta.map((item) => (
            <div className={styles.metaItem} key={item.label}>
              <dt className={styles.metaLabel}>
                <Icon name={item.icon} className={styles.metaIcon} />
                {item.label}
              </dt>
              <dd className={styles.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
