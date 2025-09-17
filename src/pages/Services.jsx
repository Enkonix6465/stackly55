import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

export default function Services() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
    // Theme detection
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [navigate])

  // Smooth scroll to section if hash is present
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
      }
    }
  }, [])

  const user = getCurrentUser()
  const capabilities = [
    { key: 'Menu', title: t('servicesPage.capabilities.menu.title'), points: t('servicesPage.capabilities.menu.points', { returnObjects: true }) },
    { key: 'Service', title: t('servicesPage.capabilities.service.title'), points: t('servicesPage.capabilities.service.points', { returnObjects: true }) },
    { key: 'Technology', title: t('servicesPage.capabilities.technology.title'), points: t('servicesPage.capabilities.technology.points', { returnObjects: true }) },
    { key: 'Marketing', title: t('servicesPage.capabilities.marketing.title'), points: t('servicesPage.capabilities.marketing.points', { returnObjects: true }) },
    { key: 'Operations', title: t('servicesPage.capabilities.operations.title'), points: t('servicesPage.capabilities.operations.points', { returnObjects: true }) },
    { key: 'Experience', title: t('servicesPage.capabilities.experience.title'), points: t('servicesPage.capabilities.experience.points', { returnObjects: true }) }
  ]
  const [activeCapability, setActiveCapability] = useState(capabilities[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isWheelHovered, setIsWheelHovered] = useState(false)
  const servicesSectionRef = useRef(null)

  // Auto-cycle active capability when not hovered
  useEffect(() => {
    if (isWheelHovered) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % capabilities.length)
    }, 2200)
    return () => clearInterval(id)
  }, [isWheelHovered, capabilities.length])

  // Sync capability text with active index
  useEffect(() => {
    setActiveCapability(capabilities[activeIndex])
  }, [activeIndex])


  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  const benefits = t('servicesPage.benefits', { returnObjects: true })

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/Rservices.mp4" type="video/mp4" />
          {t('services.video.notSupported')}
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <div className="mb-8">
                <span className="text-red-500 text-lg font-medium tracking-wider uppercase">{t('servicesPage.hero.welcome')}</span>
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                  {t('servicesPage.hero.titleLine1')}
                  <span className="block text-red-500">{t('servicesPage.hero.titleLine2')}</span>
          </h1>
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
                  {t('servicesPage.hero.description')}
          </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
            <a
                  href="#services"
                  className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl"
            >
                  {t('servicesPage.hero.ctaExplore')}
            </a>
            <a
              href="/contact"
                  className="bg-transparent text-white px-8 py-4 text-lg font-semibold border-2 border-white rounded-full transition-all duration-300 hover:bg-white hover:text-black"
                >
                  {t('servicesPage.hero.ctaBook')}
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Services Masonry */}
<section
      ref={servicesSectionRef}
      id="services"
      className={isDark ? 'py-24 bg-gray-900' : 'py-24 bg-white'}
    >        
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.masonry.badge')}</span>
            <h2 className={isDark ? 'text-5xl font-bold text-white mt-4 mb-6' : 'text-5xl font-bold text-black mt-4 mb-6'}>
              {t('servicesPage.masonry.title')}
      </h2>
            <p className={isDark ? 'text-xl text-gray-300 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
              {t('servicesPage.masonry.subtitle')}
      </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              { 
                key: 'fineDining',
                image: '/images/RS1.jpg'
              },
              { 
                key: 'privateEvents',
                image: '/images/RS2.jpg'
              },
              { 
                key: 'takeawayDelivery',
                image: '/images/RS3.jpg'
              },
              { 
                key: 'winePairing',
                image: '/images/RS4.jpg'
              },
              { 
                key: 'chefsTable',
                image: '/images/RS5.jpg'
              },
              { 
                key: 'onlineReservations',
                image: '/images/RS6.jpg'
              },
            ].map((service, idx) => (
              <div
                key={service.key}
                className={isDark ? 'break-inside-avoid bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group' : 'break-inside-avoid bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group'}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(`servicesPage.masonry.items.${service.key}.title`)}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t(`servicesPage.masonry.items.${service.key}.category`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className={isDark ? 'text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300' : 'text-2xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300'}>
                    {t(`servicesPage.masonry.items.${service.key}.title`)}
                  </h3>
                  <p className={isDark ? 'text-gray-300 mb-6 leading-relaxed' : 'text-gray-600 mb-6 leading-relaxed'}>
                    {t(`servicesPage.masonry.items.${service.key}.description`)}
                    </p>
                    <button
                    onClick={() => navigate('/contact')}
                    className={isDark ? 'text-red-400 font-semibold hover:text-red-300 transition-colors duration-300 flex items-center gap-2' : 'text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 flex items-center gap-2'}
                  >
                    {t('servicesPage.common.learnMore')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className={isDark ? 'py-24 bg-gray-900' : 'py-24 bg-gray-50'}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.testimonials.badge')}</span>
            <h2 className={isDark ? 'text-5xl font-bold text-white mt-4 mb-6' : 'text-5xl font-bold text-black mt-4 mb-6'}>
              {t('servicesPage.testimonials.title')}
            </h2>
            <p className={isDark ? 'text-xl text-gray-300 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
              {t('servicesPage.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              const testimonialImages = [
                "/images/RST1.jpg",
                "/images/RST2.jpg",
                "/images/RST3.jpg"
              ]
              const testimonials = t('servicesPage.testimonials.items', { returnObjects: true })
              return testimonials.map((testimonial, idx) => ({ ...testimonial, image: testimonialImages[idx] }))
            })().map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className={isDark ? 'bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300' : 'bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className={isDark ? 'font-bold text-white' : 'font-bold text-black'}>{testimonial.name}</h4>
                    <p className={isDark ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className={isDark ? 'text-gray-300 leading-relaxed italic' : 'text-gray-600 leading-relaxed italic'}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={isDark ? 'py-24 bg-gray-900' : 'py-24 bg-white'}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.gallery.badge')}</span>
            <h2 className={isDark ? 'text-5xl font-bold text-white mt-4 mb-6' : 'text-5xl font-bold text-black mt-4 mb-6'}>{t('servicesPage.gallery.title')}</h2>
            <p className={isDark ? 'text-xl text-gray-300 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
              {t('servicesPage.gallery.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              '/images/RS1.jpg',
              '/images/RS2.jpg',
              '/images/RS3.jpg',
              '/images/RS4.jpg',
              '/images/RS5.jpg',
              '/images/RS6.jpg',
              '/images/RST1.jpg',
              '/images/RST2.jpg',
              '/images/RST3.jpg'
            ].map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={src}
                  alt={t('servicesPage.gallery.alt')}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className={isDark ? 'py-24 bg-gray-900' : 'py-24 bg-white'}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.menu.badge')}</span>
            <h2 className={isDark ? 'text-5xl font-bold text-white mt-4 mb-6' : 'text-5xl font-bold text-black mt-4 mb-6'}>
              {t('servicesPage.menu.title')}
      </h2>
            <p className={isDark ? 'text-xl text-gray-300 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
              {t('servicesPage.menu.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Menu Categories */}
            <div className="space-y-8">
              {[
                {
                  category: t('servicesPage.menu.categories.appetizers.title'),
                  items: t('servicesPage.menu.categories.appetizers.items', { returnObjects: true })
                },
                {
                  category: t('servicesPage.menu.categories.mainCourses.title'),
                  items: t('servicesPage.menu.categories.mainCourses.items', { returnObjects: true })
                },
                {
                  category: t('servicesPage.menu.categories.desserts.title'),
                  items: t('servicesPage.menu.categories.desserts.items', { returnObjects: true })
                }
              ].map((section, idx) => (
                <div key={section.category} className={isDark ? 'bg-gray-800 rounded-2xl p-8' : 'bg-gray-50 rounded-2xl p-8'}>
                  <h3 className={isDark ? 'text-2xl font-bold text-white mb-6' : 'text-2xl font-bold text-black mb-6'}>{section.category}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className={isDark ? 'font-semibold text-white' : 'font-semibold text-black'}>{item.name}</h4>
                          <p className={isDark ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>{item.description}</p>
                        </div>
                        <span className="text-red-600 font-bold ml-4">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
                </div>

            {/* Menu Image */}
            <div className="relative">
              <img
                src="/images/Indian thali.jpeg"
                alt={t('servicesPage.menu.imageAlt')}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{t('servicesPage.menu.cardTitle')}</h3>
                <p className="text-lg">{t('servicesPage.menu.cardSubtitle')}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
                <a
                  href="/contact"
              className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl"
            >
              {t('servicesPage.menu.viewFull')}
            </a>
          </div>
        </div>
      </section>

      

      {/* Location & Hours */}
      <section className={isDark ? 'py-24 bg-gray-900' : 'py-24 bg-white'}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.location.badge')}</span>
            <h2 className={isDark ? 'text-5xl font-bold text-white mt-4 mb-6' : 'text-5xl font-bold text-black mt-4 mb-6'}>
              {t('servicesPage.location.title')}
            </h2>
            <p className={isDark ? 'text-xl text-gray-300 max-w-3xl mx-auto' : 'text-xl text-gray-600 max-w-3xl mx-auto'}>
              {t('servicesPage.location.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Location Info */}
            <div className="space-y-8">
              <div className={isDark ? 'bg-gray-800 rounded-2xl p-8' : 'bg-gray-50 rounded-2xl p-8'}>
                <h3 className={isDark ? 'text-2xl font-bold text-white mb-6' : 'text-2xl font-bold text-black mb-6'}>{t('servicesPage.location.cardTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={isDark ? 'font-bold text-white' : 'font-bold text-black'}>{t('servicesPage.location.address')}</h4>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>123 Culinary Street<br />Downtown District<br />New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={isDark ? 'font-bold text-white' : 'font-bold text-black'}>{t('servicesPage.location.phone')}</h4>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={isDark ? 'font-bold text-white' : 'font-bold text-black'}>{t('servicesPage.location.email')}</h4>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>info@restaurant.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className={isDark ? 'bg-gray-800 rounded-2xl p-8' : 'bg-gray-50 rounded-2xl p-8'}>
                <h3 className={isDark ? 'text-2xl font-bold text-white mb-6' : 'text-2xl font-bold text-black mb-6'}>{t('servicesPage.location.hoursTitle')}</h3>
                <div className="space-y-3">
                  {[
                    { day: t('servicesPage.location.hours.monThu'), hours: "5:00 PM - 10:00 PM" },
                    { day: t('servicesPage.location.hours.friSat'), hours: "5:00 PM - 11:00 PM" },
                    { day: t('servicesPage.location.hours.sun'), hours: "4:00 PM - 9:00 PM" },
                    { day: t('servicesPage.location.hours.brunch'), hours: "Saturday & Sunday 10:00 AM - 3:00 PM" }
                  ].map((schedule, idx) => (
                    <div key={idx} className={isDark ? 'flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0' : 'flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0'}>
                      <span className={isDark ? 'font-medium text-white' : 'font-medium text-black'}>{schedule.day}</span>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative">
              <div className={isDark ? 'w-full h-96 bg-gray-800 rounded-2xl flex items-center justify-center' : 'w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center'}>
                <div className="text-center">
                  <svg className={isDark ? 'w-16 h-16 text-gray-500 mx-auto mb-4' : 'w-16 h-16 text-gray-400 mx-auto mb-4'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className={isDark ? 'text-gray-300 font-medium' : 'text-gray-500 font-medium'}>{t('servicesPage.location.mapTitle')}</p>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-gray-400 text-sm'}>{t('servicesPage.location.mapSubtitle')}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {t('servicesPage.location.openNow')}
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="/contact"
              className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-xl"
            >
              {t('servicesPage.location.ctaReserve')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


