import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partySize: '',
    date: '',
    time: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } else {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        partySize: '',
        date: '',
        time: '',
        specialRequests: ''
      })
    }, 3000)
  }

  if (!user) {
    return null
  }

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/RContact.mp4" type="video/mp4" />
        </video>
        
        {/* Dynamic Overlay */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/50'}`}></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              {t('contact.reserveTable.title')}
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              {t('contact.reserveTable.description')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
            <a
              href="#reservation"
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
{t('contact.reserveTable.button')}
            </a>
          </ScrollAnimation>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="mx-auto max-w-4xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('contact.reservationForm.title')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('contact.reservationForm.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} rounded-2xl shadow-xl p-8 md:p-12`}>
              {submitSuccess && (
                <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
{t('contact.reservationForm.successMessage')}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.fullName')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`}
                      placeholder={t('contact.reservationForm.fullNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.emailAddress')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`}
                      placeholder={t('contact.reservationForm.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`}
                      placeholder={t('contact.reservationForm.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="partySize" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.partySize')}
                    </label>
                    <select
                      id="partySize"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    >
                      <option value="">{t('contact.reservationForm.selectPartySize')}</option>
                      <option value="1">{t('contact.reservationForm.onePerson')}</option>
                      <option value="2">{t('contact.reservationForm.twoPeople')}</option>
                      <option value="3">{t('contact.reservationForm.threePeople')}</option>
                      <option value="4">{t('contact.reservationForm.fourPeople')}</option>
                      <option value="5">{t('contact.reservationForm.fivePeople')}</option>
                      <option value="6">{t('contact.reservationForm.sixPeople')}</option>
                      <option value="7">{t('contact.reservationForm.sevenPeople')}</option>
                      <option value="8">{t('contact.reservationForm.eightPeople')}</option>
                      <option value="9+">{t('contact.reservationForm.ninePlusPeople')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.preferredDate')}
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.reservationForm.preferredTime')}
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    >
                      <option value="">{t('contact.reservationForm.selectTime')}</option>
                      <option value="17:00">{t('contact.reservationForm.time5pm')}</option>
                      <option value="17:30">{t('contact.reservationForm.time530pm')}</option>
                      <option value="18:00">{t('contact.reservationForm.time6pm')}</option>
                      <option value="18:30">{t('contact.reservationForm.time630pm')}</option>
                      <option value="19:00">{t('contact.reservationForm.time7pm')}</option>
                      <option value="19:30">{t('contact.reservationForm.time730pm')}</option>
                      <option value="20:00">{t('contact.reservationForm.time8pm')}</option>
                      <option value="20:30">{t('contact.reservationForm.time830pm')}</option>
                      <option value="21:00">{t('contact.reservationForm.time9pm')}</option>
                      <option value="21:30">{t('contact.reservationForm.time930pm')}</option>
                      <option value="22:00">{t('contact.reservationForm.time10pm')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequests" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.reservationForm.specialRequests')}
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'}`}
                    placeholder={t('contact.reservationForm.specialRequestsPlaceholder')}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t('contact.reservationForm.processingReservation')}
                      </>
                    ) : (
                      t('contact.reservationForm.reserveTable')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Restaurant Information Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {t('contact.restaurantInfo.title')}
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-300">
                {t('contact.restaurantInfo.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Phone */}
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-900'} rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${isDark ? 'border-gray-700' : 'border-gray-800'}`}>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('contact.restaurantInfo.callUs')}
                </h3>
                <p className="text-gray-300 mb-2">
                  +1 (555) 123-4567
                </p>
                <p className="text-sm text-gray-400">
                  {t('contact.restaurantInfo.dailyHours')}
                </p>
              </div>

              {/* Email */}
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-900'} rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${isDark ? 'border-gray-700' : 'border-gray-800'}`}>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('contact.restaurantInfo.emailUs')}
                </h3>
                <p className="text-gray-300 mb-2">
                  Stackly@gmail.com
                </p>
                <p className="text-sm text-gray-400">
                  {t('contact.restaurantInfo.emailResponse')}
                </p>
              </div>

              {/* Location */}
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-900'} rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${isDark ? 'border-gray-700' : 'border-gray-800'}`}>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('contact.restaurantInfo.visitUs')}
                </h3>
                <p className="text-gray-300 mb-2">
                  {t('contact.restaurantInfo.address')}
                </p>
                <p className="text-sm text-gray-400">
                  {t('contact.restaurantInfo.city')}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Map Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('contact.map.title')}
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('contact.map.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl`}>
              <div className="aspect-w-16 aspect-h-9 h-96 md:h-[500px]">
                <iframe
                  title="Restaurant Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2155718126597!2d-74.0059416845937!3d40.75889697932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square%2C%20New%20York%2C%20NY%2010036%2C%20USA!5e0!3m2!1sen!2sus!4v1620211234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Fixed Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: 'url(/images/RCTAC.jpg)'
          }}
        ></div>
        <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/50'}`}></div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              {t('contact.cta.title')}
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <p className="text-lg md:text-xl mb-10 leading-relaxed text-white/90">
              {t('contact.cta.subtitle')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
            <a
              href="#reservation"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-gray-100"
            >
              {t('contact.cta.button')}
            </a>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
