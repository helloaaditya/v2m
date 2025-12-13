import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Always scroll to top first when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // If there's a hash, scroll to that element after a brief delay
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100) // Small delay to ensure page has scrolled to top first

      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop

