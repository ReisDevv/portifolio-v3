import styles from './GlassCard.module.css'

export function GlassCard({ children, className = '', as: Tag = 'div', elevated = false, ...props }) {
  return (
    <Tag
      className={`${styles.card} ${elevated ? styles.elevated : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
