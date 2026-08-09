import { ChevronDown, LogoStar, Search } from './icons';
import styles from './SiteHeader.module.css';

export default function SiteHeader({ site }) {
  const { brand, nav, actions } = site;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href={brand.href}>
          <span className={styles.word}>
            {brand.word}
            <LogoStar className={styles.star} />
          </span>
          <span className={styles.tagline}>{brand.tagline}</span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.label}>
                <a className={styles.navLink} href={item.href}>
                  {item.label}
                  {item.hasMenu && <ChevronDown className={styles.chevron} />}
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.searchBtn} aria-label={actions.searchLabel}>
            <Search className={styles.searchIcon} />
          </button>
          <a className={styles.login} href={actions.login.href}>
            {actions.login.label}
          </a>
          <a className={styles.signup} href={actions.signup.href}>
            {actions.signup.label}
          </a>
        </div>
      </div>
    </header>
  );
}
