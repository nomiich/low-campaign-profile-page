import GlowMeter from './GlowMeter';
import GlowOrb from './GlowOrb';
import { Heart, Info } from './icons';
import styles from './GlowGoalCard.module.css';

export default function GlowGoalCard({ campaign }) {
  const { percent, raisedLabel, goalLabel, content } = campaign;

  return (
    <article className={styles.card}>
      <span className={styles.wash} aria-hidden="true" />

      <p className={styles.eyebrow}>
        {content.goalEyebrow}
        <button type="button" className={styles.info} aria-label={content.goalInfoLabel}>
          <Info className={styles.infoIcon} />
        </button>
      </p>

      <div className={styles.figures}>
        <p className={styles.amount}>{raisedLabel}</p>
        <p className={styles.of}>of {goalLabel} goal</p>
      </div>

      <GlowOrb percent={percent} label="of goal" className={styles.orb} />

      <GlowMeter percent={percent} label="Glow Goal progress" className={styles.meter} />

      <div className={styles.footer}>
        <p className={styles.hearts}>
          <Heart className={styles.heartIcon} />
          {content.supportersLine}
        </p>
        <p className={styles.days}>{content.daysLine}</p>
      </div>
    </article>
  );
}
