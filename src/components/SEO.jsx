import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ 
  title, 
  description, 
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  noindex = false,
  schemaType = 'LocalBusiness' // LocalBusiness, Organization, Product, WebPage
}) => {
  const location = useLocation()
  const baseUrl = 'https://v2marketing.in' // Update with your actual domain
  const defaultImage = `${baseUrl}/logo.png` // Update with your actual logo URL

  useEffect(() => {
    const fullTitle = title 
      ? `${title} | V2 Marketing - Authorized Fosroc Dealer`
      : 'V2 Marketing - Authorized Fosroc Dealer | KR Puram, Bangalore'
    
    const fullDescription = description || 'V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Quality construction chemicals, waterproofing solutions, and expert consultation. Serving Whitefield, Hoodi, Hoskote and surrounding areas.'
    
    const fullKeywords = keywords || 'Fosroc dealer Bangalore, construction chemicals, waterproofing solutions, concrete admixtures, KR Puram, V2 Marketing, Fosroc products, construction chemicals Bangalore'
    
    const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`
    const imageUrl = ogImage || defaultImage

    // Update document title
    document.title = fullTitle

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, attribute, value, content) => {
      let meta = document.querySelector(selector)
      if (meta) {
        meta.setAttribute(attribute, value)
      } else {
        meta = document.createElement('meta')
        if (selector.includes('property')) {
          meta.setAttribute('property', attribute)
        } else {
          meta.setAttribute('name', attribute)
        }
        document.getElementsByTagName('head')[0].appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Basic Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', fullDescription)
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', fullKeywords)
    updateMetaTag('meta[name="author"]', 'name', 'author', 'V2 Marketing')
    updateMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    updateMetaTag('meta[name="viewport"]', 'name', 'viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes')
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', currentUrl)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', currentUrl)
      document.getElementsByTagName('head')[0].appendChild(canonical)
    }

    // Open Graph Tags
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType)
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl)
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', fullDescription)
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    updateMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    updateMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'V2 Marketing')
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN')

    // Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', currentUrl)
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', fullDescription)
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    // Additional SEO Tags
    updateMetaTag('meta[name="geo.region"]', 'name', 'geo.region', 'IN-KA')
    updateMetaTag('meta[name="geo.placename"]', 'name', 'geo.placename', 'Bangalore')
    updateMetaTag('meta[name="geo.position"]', 'name', 'geo.position', '13.0;77.7')
    updateMetaTag('meta[name="ICBM"]', 'name', 'ICBM', '13.0, 77.7')

    // Structured Data (JSON-LD)
    let structuredData = {}
    
    if (schemaType === 'Product') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': title || 'Fosroc Construction Chemicals',
        'description': fullDescription,
        'brand': {
          '@type': 'Brand',
          'name': 'Fosroc'
        },
        'offers': {
          '@type': 'Offer',
          'availability': 'https://schema.org/InStock',
          'priceCurrency': 'INR'
        }
      }
    } else if (schemaType === 'Organization') {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'V2 Marketing',
        'url': baseUrl,
        'logo': `${baseUrl}/logo.png`,
        'description': fullDescription,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+917829531999',
          'contactType': 'Sales',
          'areaServed': 'IN',
          'availableLanguage': 'en'
        },
        'sameAs': []
      }
    } else {
      // Default: LocalBusiness
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'V2 Marketing',
        'description': fullDescription,
        'url': baseUrl,
        'telephone': '+917829531999',
        'image': imageUrl,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'KR Puram',
          'addressLocality': 'Bangalore',
          'addressRegion': 'Karnataka',
          'postalCode': '560036',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '13.0',
          'longitude': '77.7'
        },
        'areaServed': [
          {
            '@type': 'City',
            'name': 'KR Puram'
          },
          {
            '@type': 'City',
            'name': 'Whitefield'
          },
          {
            '@type': 'City',
            'name': 'Hoodi'
          },
          {
            '@type': 'City',
            'name': 'Hoskote'
          }
        ],
        'priceRange': '$$',
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '19:00'
          }
        ],
        'sameAs': []
      }
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.getElementsByTagName('head')[0].appendChild(script)

  }, [location, title, description, keywords, ogImage, ogType, canonicalUrl, noindex, schemaType, baseUrl, defaultImage])

  return null
}

export default SEO
