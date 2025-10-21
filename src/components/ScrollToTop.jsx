import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  // Show button when page is scrolled down 100px for better visibility
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(false) // Hide button when on new page
  }, [location.pathname])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 animate-bounce-gentle hover:animate-none group"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ChevronUp size={28} className="text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      )}
    </>
  )
}

export default ScrollToTop
