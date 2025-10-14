import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'
import { LanguageSelector } from '../components/language-selector'
import { ThemeToggle } from '../components/theme-toggle'

function isValidEmail(value) {
  return /.+@.+\..+/.test(String(value).toLowerCase())
}

export default function Register() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name')
      return
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const { success, message } = registerUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      password: form.password
    })

    if (!success) {
      setError(message)
      return
    }

    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
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
      <div className="relative z-20 w-full animate-fade-in">
        <header className={`${isDark ? 'bg-black/70 border-white/30' : 'bg-white/70 border-black/20'} backdrop-blur-md border-b shadow-lg transition-colors`}>
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-center sm:justify-between relative">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="flex items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 transform sm:static sm:translate-y-0 sm:transform-none">
              <LanguageSelector
                variant="login"
                className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`}
              />
              <ThemeToggle className={`${isDark ? 'text-white/80 hover:text-white hover:bg-white/20 border-white/30' : 'text-black/80 hover:text-black hover:bg-black/10 border-black/20'} border rounded-md h-9 w-9`} />
            </div>
          </div>
        </header>
      </div>
      <div className="relative z-10 flex min-h-screen items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl animate-fade-in mb-6 sm:mb-0">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 lg:p-10 animate-slide-up transition-colors ${isDark ? 'bg-white/15 border border-white/30 text-white' : 'bg-white/90 border border-white/20 text-black'} hover:shadow-3xl transition-shadow duration-300`}>
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Create your account</h2>
              <p className={`${isDark ? 'text-white/80' : 'text-black/70'} mt-1`}>Join us and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-colors ${isDark ? 'bg-white/25 border border-white/40 text-white placeholder-white/70 backdrop-blur-sm' : 'bg-white/95 border border-white/30 text-black placeholder-black/60 backdrop-blur-sm'}`}
                />
              </div>

              {error && (
                <div className={`sm:col-span-2 ${isDark ? 'text-red-200 bg-red-900/60 border border-red-600/60 backdrop-blur-sm' : 'text-red-800 bg-red-100/90 border border-red-300 backdrop-blur-sm'} rounded-md px-3 py-2 text-sm shadow-lg`}>{error}</div>
              )}

              <div className="sm:col-span-2">
                <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <span className={`text-sm ${isDark ? 'text-white/70' : 'text-black/70'}`}>Forgot your password? </span>
              <button 
                type="button"
                onClick={() => navigate('/forgot-password')}
                className={`text-sm underline cursor-pointer ${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'}`}
              >
                Reset
              </button>
            </div>

            <p className={`mt-6 text-center text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              Already have an account? <Link to="/login" className={`${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-500'} underline`}>Login</Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  )
} 