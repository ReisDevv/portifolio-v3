'use client'
import { Component } from 'react'

/**
 * If WebGL is unavailable or the 3D scene throws (lost context, driver
 * issues, unsupported device), swallow it and render nothing — the rest of
 * the page keeps working with its normal dark background.
 */
export class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Scene3D] disabled after error:', error?.message)
    }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
