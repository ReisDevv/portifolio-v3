import { RevealText } from './RevealText'
import styles from './SectionLabel.module.css'

export function SectionLabel({ eyebrow, title, index, centered = false }) {
  return (
    <div className={`${styles.wrapper} ${centered ? styles.centered : ''}`}>
      <RevealText delay={0}>
        <span className={styles.eyebrow}>
          {index && <span className={styles.index}>{index}</span>}
          <span className={styles.eyebrowText}>{eyebrow}</span>
        </span>
      </RevealText>
      <RevealText delay={0.08}>
        <h2 className={styles.title}>{title}</h2>
      </RevealText>
    </div>
  )
}
