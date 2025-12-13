import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ title, description, keywords }) => {
  const location = useLocation()

  useEffect(() => {
    // Update document title
    document.title = title || 'V2 Marketing - Authorized Fosroc Dealer | KR Puram, Bangalore'

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Quality construction chemicals, waterproofing solutions, and expert consultation.')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description || 'V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Quality construction chemicals, waterproofing solutions, and expert consultation.'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'Fosroc dealer Bangalore, construction chemicals, waterproofing solutions, concrete admixtures, KR Puram, V2 Marketing')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = keywords || 'Fosroc dealer Bangalore, construction chemicals, waterproofing solutions, concrete admixtures, KR Puram, V2 Marketing'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href)
    }
  }, [location, title, description, keywords])

  return null
}

export default SEO

