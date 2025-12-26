import { useState, useEffect } from "react"

export default function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    // Try localStorage first
    const saved = localStorage.getItem("theme")
    if (saved) return saved

    // Otherwise use system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  return [theme, setTheme] as const
}
