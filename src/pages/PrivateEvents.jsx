import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function PrivateEvents() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

  const user = getCurrentUser()

  // Private events menu items (translated)
  const privateEventsMenu = [
    {
      id: 1,
      name: t('privateEvents.menus.weddingReception.name'),
      description: t('privateEvents.menus.weddingReception.description'),
      price: 85,
      image: "/images/Wedding Reception Menu.jpg",
      category: t('privateEvents.menus.weddingReception.category'),
      isWedding: true
    },
    {
      id: 2,
      name: t('privateEvents.menus.corporateGala.name'),
      description: t('privateEvents.menus.corporateGala.description'),
      price: 75,
      image: "/images/Corporate Gala Dinner.jpg",
      category: t('privateEvents.menus.corporateGala.category'),
      isCorporate: true
    },
    {
      id: 3,
      name: t('privateEvents.menus.anniversary.name'),
      description: t('privateEvents.menus.anniversary.description'),
      price: 65,
      image: "/images/Anniversary Celebration.jpg",
      category: t('privateEvents.menus.anniversary.category'),
      isRomantic: true
    },
    {
      id: 4,
      name: t('privateEvents.menus.birthday.name'),
      description: t('privateEvents.menus.birthday.description'),
      price: 55,
      image: "/images/Birthday Party Feast.jpg",
      category: t('privateEvents.menus.birthday.category'),
      isFestive: true
    },
    {
      id: 5,
      name: t('privateEvents.menus.holiday.name'),
      description: t('privateEvents.menus.holiday.description'),
      price: 60,
      image: "/images/Holiday Party Menu.jpg",
      category: t('privateEvents.menus.holiday.category'),
      isSeasonal: true
    },
    {
      id: 6,
      name: t('privateEvents.menus.graduation.name'),
      description: t('privateEvents.menus.graduation.description'),
      price: 50,
      image: "/images/Graduation Celebration.jpg",
      category: t('privateEvents.menus.graduation.category'),
      isCelebration: true
    }
  ]

  // Event packages (translated)
  const eventPackages = [
    {
      name: t('privateEvents.packages.intimate.name'),
      type: t('privateEvents.packages.intimate.type'),
      capacity: t('privateEvents.packages.intimate.capacity'),
      description: t('privateEvents.packages.intimate.description'),
      price: 1200
    },
    {
      name: t('privateEvents.packages.grand.name'),
      type: t('privateEvents.packages.grand.type'),
      capacity: t('privateEvents.packages.grand.capacity'),
      description: t('privateEvents.packages.grand.description'),
      price: 3500
    },
    {
      name: t('privateEvents.packages.luxury.name'),
      type: t('privateEvents.packages.luxury.type'),
      capacity: t('privateEvents.packages.luxury.capacity'),
      description: t('privateEvents.packages.luxury.description'),
      price: 7500
    }
  ]

  // Event services (translated)
  const eventServices = [
    {
      name: t('privateEvents.services.fullService.name'),
      description: t('privateEvents.services.fullService.description'),
      duration: t('privateEvents.services.fullService.duration'),
      price: 2500,
      image: "/images/RS1.jpg",
      includes: t('privateEvents.services.fullService.includes')
    },
    {
      name: t('privateEvents.services.weddingPlanning.name'),
      description: t('privateEvents.services.weddingPlanning.description'),
      duration: t('privateEvents.services.weddingPlanning.duration'),
      price: 5000,
      image: "/images/Wedding planing.jpg",
      includes: t('privateEvents.services.weddingPlanning.includes')
    },
    {
      name: t('privateEvents.services.corporateEvents.name'),
      description: t('privateEvents.services.corporateEvents.description'),
      duration: t('privateEvents.services.corporateEvents.duration'),
      price: 3000,
      image: "/images/Corporate Events.jpg",
      includes: t('privateEvents.services.corporateEvents.includes')
    }
  ]

  // Testimonials (translated)
  const testimonials = [
    {
      name: t('privateEvents.testimonials.items.jennifer.name'),
      role: t('privateEvents.testimonials.items.jennifer.role'),
      content: t('privateEvents.testimonials.items.jennifer.content'),
      rating: 5,
      image: "/images/RS4Testimonal1.jpg"
    },
    {
      name: t('privateEvents.testimonials.items.robert.name'),
      role: t('privateEvents.testimonials.items.robert.role'),
      content: t('privateEvents.testimonials.items.robert.content'),
      rating: 5,
      image: "/images/RS4Testimonal2.jpg"
    },
    {
      name: t('privateEvents.testimonials.items.sarah.name'),
      role: t('privateEvents.testimonials.items.sarah.role'),
      content: t('privateEvents.testimonials.items.sarah.content'),
      rating: 5,
      image: "/images/RS4Testimonal3.jpg"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar user={user} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="/Party.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white whitespace-nowrap">
              {t('privateEvents.hero.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto whitespace-nowrap">
              {t('privateEvents.hero.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('privateEvents.hero.cta')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Event Menus Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('privateEvents.menus.tag')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('privateEvents.menus.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('privateEvents.menus.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privateEventsMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {item.isWedding && (
                        <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.wedding')}
                        </span>
                      )}
                      {item.isCorporate && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.corporate')}
                        </span>
                      )}
                      {item.isRomantic && (
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.romantic')}
                        </span>
                      )}
                      {item.isFestive && (
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.festive')}
                        </span>
                      )}
                      {item.isSeasonal && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.seasonal')}
                        </span>
                      )}
                      {item.isCelebration && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('privateEvents.menus.badges.celebration')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {item.name}
                      </h3>
                      <span className="text-red-500 font-bold text-lg">${item.price}</span>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Event Packages Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('privateEvents.packages.tag')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('privateEvents.packages.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('privateEvents.packages.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventPackages.map((pkg, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">🎉</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2">{pkg.type} • {pkg.capacity}</p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>
                  <p className="text-2xl font-bold text-red-500">${pkg.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Event Services Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('privateEvents.services.tag')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('privateEvents.services.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('privateEvents.services.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventServices.map((service, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
                      <p className="text-sm opacity-90">{service.duration}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                    <div className="mb-4">
                      <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('privateEvents.services.includes')}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {service.includes}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-500">${service.price}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                        {t('privateEvents.services.book')}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('privateEvents.testimonials.tag')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('privateEvents.testimonials.title')}
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <div className="relative">
              <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <blockquote className={`text-xl italic mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Event Planning Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('privateEvents.planning.tag')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('privateEvents.planning.title')}
            </h2>
            <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('privateEvents.planning.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('privateEvents.planning.eventType')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('privateEvents.planning.options.weddingReception')}</option>
                    <option>{t('privateEvents.planning.options.corporateEvent')}</option>
                    <option>{t('privateEvents.planning.options.anniversary')}</option>
                    <option>{t('privateEvents.planning.options.birthday')}</option>
                    <option>{t('privateEvents.planning.options.holiday')}</option>
                    <option>{t('privateEvents.planning.options.graduation')}</option>
                    <option>{t('privateEvents.planning.options.other')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('privateEvents.planning.eventDate')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('privateEvents.planning.guestCount')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('privateEvents.planning.options.guests10_20')}</option>
                    <option>{t('privateEvents.planning.options.guests20_50')}</option>
                    <option>{t('privateEvents.planning.options.guests50_100')}</option>
                    <option>{t('privateEvents.planning.options.guests100_200')}</option>
                    <option>{t('privateEvents.planning.options.guests200plus')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('privateEvents.planning.serviceLevel')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('privateEvents.planning.options.fullService')}</option>
                    <option>{t('privateEvents.planning.options.weddingPlanning')}</option>
                    <option>{t('privateEvents.planning.options.corporateEvents')}</option>
                    <option>{t('privateEvents.planning.options.customPackage')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('privateEvents.planning.submit')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
