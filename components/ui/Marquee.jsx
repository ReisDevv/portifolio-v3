'use client'
import styles from './Marquee.module.css'

const SKILLS = [
  'C#', '.NET Core', 'ASP.NET', 'Legacy ASP', 'Entity Framework',
  'SQL Server', 'MySQL', 'PostgreSQL', 'T-SQL', 'Stored Procedures',
  'Java', 'OOP', 'Algoritmos', 'Estrutura de Dados',
  'Azure', 'Docker', 'REST APIs', 'Clean Architecture', 'SOLID', 'LINQ',
  'WinForms', 'MVC', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Node.js', 'HTML', 'CSS', 'Git', 'CI/CD', 'Linux',
  'Inglês B2', 'Weekly Meetings', 'Maratona SBC',
]

export function Marquee() {
  const repeated = [...SKILLS, ...SKILLS]

  return (
    <div className={styles.outer} aria-hidden="true">
      <div className={styles.track}>
        {repeated.map((skill, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.gem}>◆</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
