'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { chatbotData } from '@/data/chatbot'
import styles from './ChatBot.module.css'

/* Track if the user has interacted with the chatbot at least once.
   Until then, do not auto-scroll the messages container — otherwise the
   initial greeting on mount steals the page-load scroll position from
   the Hero on browsers that bubble scroll requests up the ancestor chain. */

function TypingIndicator() {
  return (
    <motion.div
      className={styles.typing}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.typingDot} />
      <span className={styles.typingDot} />
      <span className={styles.typingDot} />
    </motion.div>
  )
}

export function ChatBot() {
  const { lang } = useLanguage()
  const data = chatbotData[lang]

  const [messages, setMessages] = useState([])
  const [asked, setAsked]       = useState(new Set())
  const [typing, setTyping]     = useState(false)
  const messagesRef             = useRef(null)
  const timerRef                = useRef(null)
  const interactedRef           = useRef(false)

  // Reset on lang change
  useEffect(() => {
    clearTimeout(timerRef.current)
    setMessages([{ id: 'greeting', type: 'bot', text: data.greeting }])
    setAsked(new Set())
    setTyping(false)
  }, [lang, data.greeting])

  // Auto-scroll the messages container only — never the whole page.
  // Skip until the user has actually interacted, so the page-load Hero
  // is not scrolled past by the chatbot's greeting auto-scroll.
  useEffect(() => {
    if (!interactedRef.current) return
    const el = messagesRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const handleQuestion = (item) => {
    if (typing || asked.has(item.q)) return

    interactedRef.current = true
    setAsked(prev => new Set([...prev, item.q]))
    setMessages(prev => [
      ...prev,
      { id: `u-${Date.now()}`, type: 'user', text: item.q },
    ])
    setTyping(true)

    const delay = 700 + Math.random() * 500
    timerRef.current = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: `b-${Date.now()}`, type: 'bot', text: item.a },
      ])
      setTyping(false)
    }, delay)
  }

  return (
    <div className={styles.widget}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>NR</div>
        <div className={styles.headerInfo}>
          <span className={styles.headerName}>Nelson Reis</span>
          <span className={styles.headerSub}>Backend Developer @ PRODAM</span>
        </div>
        <div className={styles.onlineWrap}>
          <span className={styles.onlineDot} />
          <span className={styles.onlineLabel}>{data.online}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className={styles.messages}>
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              className={`${styles.msg} ${styles[msg.type]}`}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {msg.text}
            </motion.div>
          ))}
          {typing && <TypingIndicator key="typing" />}
        </AnimatePresence>
      </div>

      {/* Question chips */}
      <div className={styles.questions}>
        {data.qa.map((item, i) => (
          <button
            key={`${lang}-${i}`}
            className={`${styles.qChip} ${asked.has(item.q) ? styles.qAsked : ''}`}
            onClick={() => handleQuestion(item)}
            disabled={typing}
            aria-label={item.q}
          >
            {item.q}
          </button>
        ))}
      </div>
    </div>
  )
}
