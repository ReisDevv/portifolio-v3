'use client'
import { useSyncExternalStore } from 'react'

/**
 * Subscribe to the user's prefers-reduced-motion setting via the
 * platform matchMedia API. useSyncExternalStore is the idiomatic React 19
 * way to read from an external store — it avoids the cascading-render
 * pitfall of calling setState inside an effect, and stays in sync if the
 * OS-level setting changes mid-session.
 */
const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
