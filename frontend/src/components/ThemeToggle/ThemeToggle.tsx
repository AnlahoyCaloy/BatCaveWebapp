'use client'

import React, { useEffect, useState } from 'react'

const THEME_KEY = 'batcave_theme'

type Theme = 'light' | 'dark' | 'system' | 'matcha'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    const saved = localStorage.getItem(THEME_KEY) as Theme | null
    return saved ?? 'system'
  })
  const [mounted, setMounted] = useState(false)

  // mark component as mounted after first render (hydration complete)
  useEffect(() => {
    setMounted(true)
  }, [])

  // apply theme and listen for system changes when in 'system' mode
  useEffect(() => {
    if (!mounted) return
    const apply = (t: Theme) => {
      if (typeof document === 'undefined') return
      // ensure both html and body receive the class so body.dark rules apply
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark')
      }  else if(t === 'matcha') {
        document.documentElement.classList.add('matcha');
        document.body.classList.add('matcha')
      }
      else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark')
      }
    }

    let mq: MediaQueryList | null = null
    let handler: ((e: MediaQueryListEvent) => void) | null = null

    if (theme === 'system') {
      mq = window.matchMedia?.('(prefers-color-scheme: dark)') ?? null
      const isDark = mq ? mq.matches : false
      apply(isDark ? 'dark' : 'light')

      handler = (e: MediaQueryListEvent) => apply(e.matches ? 'dark' : 'light')
      try {
        mq?.addEventListener?.('change', handler)
      } catch {
        // ignore if addEventListener isn't supported
      }
    } else {
      apply(theme)
    }

    localStorage.setItem(THEME_KEY, theme)

    return () => {
      if (mq && handler) {
        try { mq.removeEventListener?.('change', handler) } catch { /* ignore */ }
      }
    }
  }, [theme, mounted])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // suppress theme-dependent renders until after hydration
  if (!mounted) {
    return (
      <div className="theme-toggle">
        <button
          aria-label="Toggle theme"
          className="px-3 py-1 rounded-md border bg-transparent text-sm"
          disabled
        >
          ⚙️
        </button>
      </div>
    )
  }

  let a = '';
  if (theme === 'dark') {
    a = '🌞 Light'
  } else if ( theme === 'light') {
    a = '🌙 Dark'
  } else {
    a = '🍵ྀི Matcha'
  }

  return (
    <div className="theme-toggle">
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="px-3 py-1 rounded-md border bg-transparent text-sm"
        title={`Theme: ${theme}`}
      >
        {/* {theme === 'dark' ? '🌞 Light' : '🌙 Dark'} */}
        {a}
      </button>
    </div>
  )
}

