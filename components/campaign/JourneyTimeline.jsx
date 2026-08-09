import { Icon } from './icons';
import styles from './JourneyTimeline.module.css';

/* The reference underlines a trailing phrase inside one step's body. */
function StepBody({ text, link }) {
  if (!link || !text.includes(link)) return <>{text}</>;
  const [before] = text.split(link);
  return (
    <>
      {before}
      <span className={styles.bodyLink}>{link}</span>
    </>
  );
}

export default function JourneyTimeline({ heading, steps }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.heading}>{heading}</h2>

      <ol className={styles.list}>
        {steps.map((step) => (
          <li className={`${styles.step} ${styles[step.state]}`} key={step.title}>
            <span className={styles.node}>
              <Icon name={step.icon} className={styles.glyph} />
            </span>
            <div className={styles.text}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>
                <StepBody text={step.body} link={step.bodyLink} />
              </p>
            </div>
            <span className={styles.meta}>{step.meta}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
