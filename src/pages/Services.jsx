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
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="mb-6 sm:mb-8">
                <span className="text-red-500 text-base sm:text-lg font-medium tracking-wider uppercase">{t('servicesPage.hero.welcome')}</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
                  {t('servicesPage.hero.titleLine1')}
                  <span className="block text-red-500">{t('servicesPage.hero.titleLine2')}</span>
          </h1>
                <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                  {t('servicesPage.hero.description')}
          </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    if (servicesSectionRef.current) {
                      servicesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      window.location.hash = 'services'
                    }
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
                >
                  {t('servicesPage.hero.ctaExplore')}
                </a>
                <a
                  href="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
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
      className={isDark ? 'py-12 sm:py-16 md:py-24 bg-gray-900' : 'py-12 sm:py-16 md:py-24 bg-white'}
    >        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.masonry.badge')}</span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
              {t('servicesPage.masonry.title')}
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('servicesPage.masonry.subtitle')}
      </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
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
                
                <div className="p-6 sm:p-8">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-red-400 transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t(`servicesPage.masonry.items.${service.key}.title`)}
                  </h3>
                  <p className={`text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t(`servicesPage.masonry.items.${service.key}.description`)}
                    </p>
                    <a
                      href={
                        service.key === 'fineDining'
                          ? '/services/fine-dining'
                          : service.key === 'takeawayDelivery'
                            ? '/services/takeaway-delivery'
                            : service.key === 'chefsTable'
                              ? '/services/chefs-table'
                              : service.key === 'privateEvents'
                                ? '/services/private-events'
                                : service.key === 'winePairing'
                                  ? '/services/wine-pairing'
                                  : service.key === 'onlineReservations'
                                    ? '/services/reservations'
                                    : '/contact'
                      }
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
                    >
                      View
                    </a>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className={isDark ? 'py-12 sm:py-16 md:py-24 bg-gray-900' : 'py-12 sm:py-16 md:py-24 bg-gray-50'}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.testimonials.badge')}</span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
              {t('servicesPage.testimonials.title')}
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('servicesPage.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className={`rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-black'} text-sm sm:text-base`}>{testimonial.name}</h4>
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className={`text-sm sm:text-base leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={isDark ? 'py-12 sm:py-16 md:py-24 bg-gray-900' : 'py-12 sm:py-16 md:py-24 bg-white'}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.gallery.badge')}</span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>{t('servicesPage.gallery.title')}</h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('servicesPage.gallery.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              '/images/RS1.jpg',
              '/images/RS2.jpg',
              '/images/RS3.jpg',
              '/images/RS4.jpg',
              '/images/RS5.jpg',
              '/images/RS6.jpg',
              '/images/Garden Fresh Bowl.jpg',
              '/images/Masala Chai.jpg',
              '/images/Tandoori Delights.jpg'
            ].map((src, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={src}
                  alt={t('servicesPage.gallery.alt')}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className={isDark ? 'py-12 sm:py-16 md:py-24 bg-gray-900' : 'py-12 sm:py-16 md:py-24 bg-white'}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.menu.badge')}</span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
              {t('servicesPage.menu.title')}
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('servicesPage.menu.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Menu Categories */}
            <div className="space-y-6 sm:space-y-8">
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
                <div key={section.category} className={`rounded-2xl p-6 sm:p-8 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-black'}`}>{section.category}</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-black'}`}>{item.name}</h4>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                        </div>
                        <span className="text-red-600 font-bold ml-3 sm:ml-4 text-sm sm:text-base">{item.price}</span>
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
                className="w-full h-[250px] sm:h-[300px] lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{t('servicesPage.menu.cardTitle')}</h3>
                <p className="text-sm sm:text-base lg:text-lg">{t('servicesPage.menu.cardSubtitle')}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-16">
                <a
                  href="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
                >
              {t('servicesPage.menu.viewFull')}
            </a>
          </div>
        </div>
      </section>

      

      {/* Location & Hours (CTA with background) */}
      <section
        className="relative py-12 sm:py-16 md:py-24 bg-center bg-cover bg-fixed"
        style={{ backgroundImage: 'url("/images/RECEP.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('servicesPage.location.badge')}</span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 sm:mb-6 px-4 text-white`} style={{ fontFamily: 'serif' }}>
              {t('servicesPage.location.title')}
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 text-white`}>
              {t('servicesPage.location.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 sm:gap-12 lg:gap-16">
            {/* Operating Hours */}
            <div className={`rounded-2xl p-6 sm:p-8 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-black'}`}>{t('servicesPage.location.hoursTitle')}</h3>
                <div className="space-y-3">
                  {[
                    { day: t('servicesPage.location.hours.monThu'), hours: "5:00 PM - 10:00 PM" },
                    { day: t('servicesPage.location.hours.friSat'), hours: "5:00 PM - 11:00 PM" },
                    { day: t('servicesPage.location.hours.sun'), hours: "4:00 PM - 9:00 PM" },
                    { day: t('servicesPage.location.hours.brunch'), hours: "Saturday & Sunday 10:00 AM - 3:00 PM" }
                  ].map((schedule, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-2 border-b last:border-b-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <span className={`font-medium text-sm sm:text-base ${isDark ? 'text-white' : 'text-black'}`}>{schedule.day}</span>
                      <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
            </div>

            {/* Map removed as requested */}
          </div>

          <div className="text-center mt-8 sm:mt-16">
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact') }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
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


