import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { ThemeToggle } from '../components/theme-toggle'
import { loginUser, getUsers, saveUsers } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    console.log('🔍 Login attempt:', { email, password })

    if (!email.trim() || !password) {
      setError(t('login.errorEmailPassword'))
      return
    }

    // Check for admin credentials
    if ((email === "admin@enkonix.in" || email === "admin@enkonix.com") && password === "admin123") {
      console.log('✅ Admin credentials detected')
      
      // Create admin user object (DO NOT add to users list)
      const adminUser = {
        id: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: email,
        password: password,
        role: 'admin',
        loginTime: new Date().toISOString(),
        isAdmin: true // Special flag to identify admin
      }
      
      // Store admin user in localStorage for authentication ONLY
      localStorage.setItem('authUser', JSON.stringify(adminUser))
      console.log('💾 Admin user authenticated:', adminUser)
      
      // Verify storage
      const stored = localStorage.getItem('authUser')
      console.log('🔍 Stored auth data:', stored)
      
      console.log('🚀 Navigating to admin dashboard')
      navigate('/admin-dashboard', { replace: true })
      return
    }

    console.log('👤 Regular user login attempt')
    const { success, message } = loginUser(email, password)
    if (!success) {
      setError(message)
      return
    }
    navigate('/home', { replace: true })
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/55L.jpg)',
        }}
      />
      {/* Dark overlay for better contrast */}
      <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`} />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
      
      {/* Header with Language Selector */}
      <div className="relative z-20 w-full animate-fade-in">
        <header className={`${isDark ? 'bg-black/70 border-white/30' : 'bg-white/70 border-black/20'} backdrop-blur-md border-b shadow-lg transition-colors`}>
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            
            {/* Language Selector + Theme Toggle */}
            <div className="flex items-center gap-2">
              <LanguageSelector
                variant="login"
                className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`}
              />
              <ThemeToggle className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`} />
            </div>
          </div>
        </header>
      </div>
      
      <div className="relative z-10 flex h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg lg:max-w-xl animate-fade-in">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 lg:p-10 animate-slide-up transition-colors ${isDark ? 'bg-white/15 border border-white/30 text-white' : 'bg-white/90 border border-white/20 text-black'} hover:shadow-3xl transition-shadow duration-300`}>
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{t('login.welcomeBack')}</h2>
              <p className={`${isDark ? 'text-white/80' : 'text-black/70'} mt-1`}>{t('login.loginToContinue')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{t('login.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{t('login.password')}</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>

              {error && (
                <div className={`${isDark ? 'text-red-200 bg-red-900/60 border border-red-600/60 backdrop-blur-sm' : 'text-red-800 bg-red-100/90 border border-red-300 backdrop-blur-sm'} rounded-md px-3 py-2 text-sm shadow-lg`}>{error}</div>
              )}

              <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                {t('login.signIn')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className={`text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                {t('login.forgotPassword')}{' '}
                <Link to="/forgot-password" className={`underline ${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'}`}>
                  {t('login.reset')}
                </Link>
              </span>
            </div>

            <p className={`mt-6 text-center text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              {t('login.noAccount')} <Link to="/register" className={`${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'} underline`}>{t('login.register')}</Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  )
} 