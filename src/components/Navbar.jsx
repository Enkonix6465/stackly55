import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from './theme-toggle'
import { LanguageSelector } from './language-selector'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { logoutUser } from '../utils/auth'
import { ChevronDown, LogOut } from 'lucide-react'


export default function Navbar({ user }) {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if 'dark' class is present on <html>
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    // Listen for class changes (for live theme switching)
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleLogout = () => {
    // Clear user session from localStorage
    logoutUser()
    // Navigate to login page using React Router
    navigate('/login')
  }

  const navigate = useNavigate()
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : 'U'
   

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 dark:border-white/10 transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <nav className="w-full px-4 py-3 flex items-center">
        {/* Logo - Fixed Left */}
        <div className="flex-shrink-0">
          <a href="#hero" className="flex items-center gap-3">
            <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
            <span className="sr-only">Home</span>
          </a>
        </div>

        {/* Middle Navigation - Centered */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex items-center gap-8">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  {t('nav.home')}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuItem onClick={() => navigate('/home')}>
                  {t('nav.home1')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/home2')}>
                  {t('nav.home2')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          
          <li>
            <button onClick={() => navigate('/about')} className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
              {t('nav.about')}
            </button>
          </li>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  {t('nav.services')}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {/* All Services Section */}
                <DropdownMenuItem 
                  onClick={() => navigate('/services')}
                  className="font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  {t('nav.allServices')}
                </DropdownMenuItem>
                
                {/* Separator */}
                <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2 my-1" />
                
                {[
                  {label: 'Fine Dining Experience', path:'/services/fine-dining'},
                  {label: 'Takeaway & Delivery', path:'/services/takeaway-delivery'},
                  {label: 'Chef\'s Table Experience', path:'/services/chefs-table'},
                  {label: 'Private Events & Catering', path:'/services/private-events'},
                  {label: 'Wine & Beverage Pairing', path:'/services/wine-pairing'},
                  {label: 'Online Reservations', path:'/services/reservations'}
                ].map((item) => (
                  <DropdownMenuItem 
                    key={item.label} 
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li>
            <button onClick={() => navigate('/blog')} className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
              {t('nav.blog')}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/contact')} className="hover:text-red-500 dark:hover:text-red-400 transition-colors">
              {t('nav.contact')}
            </button>
          </li>
          </ul>
        </div>
        
        {/* Right Side - Fixed */}
        <div className="flex items-center gap-4">
          {/* Language Selector - Fixed Right */}
          <LanguageSelector />
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5" 
            aria-label="Menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>

          {/* User Avatar */}
          <div className="h-9 w-9 rounded-full bg-red-500 dark:bg-red-600 text-white grid place-items-center font-semibold select-none">
            {initials}
          </div>
          
          {/* Logout Button - Right Corner */}
          <button onClick={handleLogout} className="inline-flex items-center justify-center hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-4">
            {/* Home Dropdown */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900 dark:text-white">{t('nav.home')}</div>
              <div className="ml-4 space-y-2">
                <button 
                  onClick={() => { navigate('/home'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t('nav.home1')}
                </button>
                <button 
                  onClick={() => { navigate('/home2'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {t('nav.home2')}
                </button>
              </div>
            </div>

            {/* About */}
            <button 
              onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              {t('nav.about')}
            </button>

            {/* Services */}
            <div className="space-y-2">
              <div className="font-medium text-gray-900 dark:text-white">Services</div>
              <div className="ml-4 space-y-2">
                <button 
                  onClick={() => { navigate('/services'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm font-semibold text-red-600 dark:text-red-400"
                >
                  All Services
                </button>
                <button 
                  onClick={() => { navigate('/services/fine-dining'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Fine Dining Experience
                </button>
                <button 
                  onClick={() => { navigate('/services/takeaway-delivery'); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Takeaway & Delivery
                </button>
              </div>
            </div>

            {/* Blog */}
            <button 
              onClick={() => { navigate('/blog'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              {t('nav.blog')}
            </button>

            {/* Contact */}
            <button 
              onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
              className="block w-full text-left text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}