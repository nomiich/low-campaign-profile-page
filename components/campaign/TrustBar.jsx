import { ChevronRight, Icon } from './icons';
import styles from './TrustBar.module.css';

export default function TrustBar({ items }) {
  return (
    <section className={styles.bar} aria-label="Trust and privacy">
      {items.map((item, i) => (
        <div className={styles.col} key={item.heading}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <span className={`${styles.icon} ${i === 0 ? styles.iconBare : styles.iconRing}`}>
            <Icon name={item.icon} className={styles.glyph} />
          </span>
          <div className={styles.text}>
            <h2 className={styles.heading}>{item.heading}</h2>
            <p className={styles.body}>
              {item.body}{' '}
              <a
                className={`${styles.link} ${item.link.arrow ? styles.linkArrow : ''}`}
                href={item.link.href}
              >
                {item.link.label}
                {item.link.arrow && <ChevronRight className={styles.linkIcon} />}
              </a>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
