import { RevealText } from './RevealText'
import styles from './SectionLabel.module.css'

export function SectionLabel({ eyebrow, title, centered = false }) {
  return (
    <div className={`${styles.wrapper} ${centered ? styles.centered : ''}`}>
      {eyebrow && (
        <RevealText delay={0}>
          <span className={styles.eyebrow}>{eyebrow}</span>
        </RevealText>
      )}
      <RevealText delay={0.1}>
        <h2 className={styles.title}>{title}</h2>
      </RevealText>
    </div>
  )
}
