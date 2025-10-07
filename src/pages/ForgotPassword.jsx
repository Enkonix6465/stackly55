import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { ThemeToggle } from '../components/theme-toggle'
import { resetPassword } from '../utils/auth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [step, setStep] = useState(1) // 1: email, 2: reset password
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function handleEmailSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError(t('forgotPassword.errorEmailRequired'))
      return
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (!userExists) {
      setError(t('forgotPassword.errorEmailNotFound'))
      return
    }

    setStep(2)
    setSuccess(t('forgotPassword.successEmailVerified'))
  }

  function handlePasswordReset(e) {
    e.preventDefault()
    setError('')
    
    if (newPassword.length < 6) {
      setError(t('forgotPassword.errorPasswordLength'))
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError(t('forgotPassword.errorPasswordsMismatch'))
      return
    }

    const result = resetPassword(email, newPassword)
    if (result.success) {
      setSuccess(t('forgotPassword.successPasswordReset'))
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } else {
      setError(result.message)
    }
  }

  function handleBackToEmail() {
    setStep(1)
    setError('')
    setSuccess('')
    setNewPassword('')
    setConfirmPassword('')
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
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {step === 1 ? t('forgotPassword.resetPassword') : t('forgotPassword.setNewPassword')}
              </h2>
              <p className={`${isDark ? 'text-white/80' : 'text-black/70'} mt-1`}>
                {step === 1 ? t('forgotPassword.enterEmailToContinue') : t('forgotPassword.createNewPassword')}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{t('forgotPassword.email')}</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('forgotPassword.emailPlaceholder')}
                    className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                  />
                </div>

                {error && (
                  <div className={`${isDark ? 'text-red-200 bg-red-900/60 border border-red-600/60 backdrop-blur-sm' : 'text-red-800 bg-red-100/90 border border-red-300 backdrop-blur-sm'} rounded-md px-3 py-2 text-sm shadow-lg`}>{error}</div>
                )}

                <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  {t('forgotPassword.continue')}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{t('forgotPassword.newPassword')}</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t('forgotPassword.newPasswordPlaceholder')}
                    className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{t('forgotPassword.confirmPassword')}</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
                    className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                  />
                </div>

                {error && (
                  <div className={`${isDark ? 'text-red-200 bg-red-900/60 border border-red-600/60 backdrop-blur-sm' : 'text-red-800 bg-red-100/90 border border-red-300 backdrop-blur-sm'} rounded-md px-3 py-2 text-sm shadow-lg`}>{error}</div>
                )}

                {success && (
                  <div className={`${isDark ? 'text-green-200 bg-green-900/60 border border-green-600/60 backdrop-blur-sm' : 'text-green-800 bg-green-100/90 border border-green-300 backdrop-blur-sm'} rounded-md px-3 py-2 text-sm shadow-lg`}>{success}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className={`flex-1 btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${isDark ? 'bg-white/20 text-red-300 border-2 border-red-400 hover:bg-red-500 hover:text-white backdrop-blur-sm' : 'bg-white/90 text-black border-2 border-black/30 hover:bg-black/80 hover:text-white backdrop-blur-sm'}`}
                  >
                    {t('forgotPassword.back')}
                  </button>
                  <button type="submit" className="flex-1 btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    {t('forgotPassword.resetPasswordButton')}
                  </button>
                </div>
              </form>
            )}

            <p className={`mt-6 text-center text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              {t('forgotPassword.rememberPassword')} <Link to="/login" className={`${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'} underline`}>{t('forgotPassword.signIn')}</Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  )
}
