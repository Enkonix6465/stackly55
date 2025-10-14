import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function WinePairing() {
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

  // Wine pairing menu items
  const winePairingMenu = [
    {
      id: 1,
      name: t('winePairing.menu.items.champagneCaviar.name'),
      description: t('winePairing.menu.items.champagneCaviar.description'),
      price: 180,
      image: "/images/Lobster Risotto.jpg",
      category: t('winePairing.menu.items.champagneCaviar.category'),
      isLuxury: true
    },
    {
      id: 2,
      name: t('winePairing.menu.items.bordeauxWagyu.name'),
      description: t('winePairing.menu.items.bordeauxWagyu.description'),
      price: 220,
      image: "/images/Prime Beef Tenderloin.jpg",
      category: t('winePairing.menu.items.bordeauxWagyu.category'),
      isPremium: true
    },
    {
      id: 3,
      name: t('winePairing.menu.items.burgundyLobster.name'),
      description: t('winePairing.menu.items.burgundyLobster.description'),
      price: 280,
      image: "/images/Mediterranean Seafood Pasta.jpg",
      category: t('winePairing.menu.items.burgundyLobster.category'),
      isClassic: true
    },
    {
      id: 4,
      name: t('winePairing.menu.items.chiantiRisotto.name'),
      description: t('winePairing.menu.items.chiantiRisotto.description'),
      price: 95,
      image: "/images/Signature Grilled Salmon.jpg",
      category: t('winePairing.menu.items.chiantiRisotto.category'),
      isItalian: true
    },
    {
      id: 5,
      name: t('winePairing.menu.items.portChocolate.name'),
      description: t('winePairing.menu.items.portChocolate.description'),
      price: 65,
      image: "/images/Chocolate Lava Cak.jpg",
      category: t('winePairing.menu.items.portChocolate.category'),
      isDessert: true
    },
    {
      id: 6,
      name: t('winePairing.menu.items.sauternesFoieGras.name'),
      description: t('winePairing.menu.items.sauternesFoieGras.description'),
      price: 150,
      image: "/images/Garden Fresh Bowl.jpg",
      category: t('winePairing.menu.items.sauternesFoieGras.category'),
      isFrench: true
    }
  ]

  // Wine collection
  const wineCollection = [
    {
      name: t('winePairing.collection.items.domPerignon.name'),
      type: t('winePairing.collection.items.domPerignon.type'),
      year: t('winePairing.collection.items.domPerignon.year'),
      description: t('winePairing.collection.items.domPerignon.description'),
      price: 320,
      region: t('winePairing.collection.items.domPerignon.region')
    },
    {
      name: t('winePairing.collection.items.chateauMargaux.name'),
      type: t('winePairing.collection.items.chateauMargaux.type'),
      year: t('winePairing.collection.items.chateauMargaux.year'),
      description: t('winePairing.collection.items.chateauMargaux.description'),
      price: 520,
      region: t('winePairing.collection.items.chateauMargaux.region')
    },
    {
      name: t('winePairing.collection.items.drc.name'),
      type: t('winePairing.collection.items.drc.type'),
      year: t('winePairing.collection.items.drc.year'),
      description: t('winePairing.collection.items.drc.description'),
      price: 1500,
      region: t('winePairing.collection.items.drc.region')
    }
  ]

  // Wine experiences
  const wineExperiences = [
    {
      name: t('winePairing.experiences.items.sommelierJourney.name'),
      description: t('winePairing.experiences.items.sommelierJourney.description'),
      duration: t('winePairing.experiences.items.sommelierJourney.duration'),
      price: 120,
      image: "/images/RS1.jpg",
      wines: t('winePairing.experiences.items.sommelierJourney.wines')
    },
    {
      name: t('winePairing.experiences.items.foodWinePairing.name'),
      description: t('winePairing.experiences.items.foodWinePairing.description'),
      duration: t('winePairing.experiences.items.foodWinePairing.duration'),
      price: 180,
      image: "/images/RS2.jpg",
      wines: t('winePairing.experiences.items.foodWinePairing.wines')
    },
    {
      name: t('winePairing.experiences.items.privateCellarTour.name'),
      description: t('winePairing.experiences.items.privateCellarTour.description'),
      duration: t('winePairing.experiences.items.privateCellarTour.duration'),
      price: 95,
      image: "/images/RS3.jpg",
      wines: t('winePairing.experiences.items.privateCellarTour.wines')
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: t('winePairing.testimonials.items.isabella.name'),
      role: t('winePairing.testimonials.items.isabella.role'),
      content: t('winePairing.testimonials.items.isabella.content'),
      rating: 5,
      image: "/images/RS5Testimonal1.jpg"
    },
    {
      name: t('winePairing.testimonials.items.david.name'),
      role: t('winePairing.testimonials.items.david.role'),
      content: t('winePairing.testimonials.items.david.content'),
      rating: 5,
      image: "/images/RS5Testimonal2.jpg"
    },
    {
      name: t('winePairing.testimonials.items.sophie.name'),
      role: t('winePairing.testimonials.items.sophie.role'),
      content: t('winePairing.testimonials.items.sophie.content'),
      rating: 5,
      image: "/images/RS5Testimonal3.jpg"
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
            <source src="/Winee.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-4">
              {t('winePairing.hero.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              {t('winePairing.hero.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="px-4">
              <button onClick={() => navigate('/contact')} className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors w-full sm:w-auto">
                {t('winePairing.hero.cta')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Wine Pairing Menu Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('winePairing.menu.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.menu.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.menu.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {winePairingMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      {item.isLuxury && (
                        <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.luxury')}
                        </span>
                      )}
                      {item.isPremium && (
                        <span className="bg-gold-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.premium')}
                        </span>
                      )}
                      {item.isClassic && (
                        <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.classic')}
                        </span>
                      )}
                      {item.isItalian && (
                        <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.italian')}
                        </span>
                      )}
                      {item.isDessert && (
                        <span className="bg-pink-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.dessert')}
                        </span>
                      )}
                      {item.isFrench && (
                        <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('winePairing.menu.tags.french')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {item.name}
                      </h3>
                      <span className="text-red-500 font-bold text-base sm:text-lg">${item.price}</span>
                    </div>
                    <p className={`text-xs sm:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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

      {/* Wine Collection Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('winePairing.collection.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.collection.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.collection.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wineCollection.map((wine, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">🍷</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {wine.name}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2 text-sm sm:text-base">{wine.type} • {wine.year}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2">{wine.region}</p>
                  <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {wine.description}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-red-500">${wine.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Experiences Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('winePairing.experiences.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.experiences.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.experiences.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wineExperiences.map((experience, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{experience.name}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{experience.duration}</p>
                    </div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {experience.wines}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {experience.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                      <span className="text-xl sm:text-2xl font-bold text-red-500">${experience.price}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto">
                        {t('winePairing.experiences.bookCta')}
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
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('winePairing.testimonials.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-8 sm:mb-16 px-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('winePairing.testimonials.title')}
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <div className="relative">
              <div className={`p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <blockquote className={`text-lg sm:text-xl italic mb-4 sm:mb-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                  />
                  <div>
                    <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Wine Tasting Reservation Section */}
      <section className={`relative py-10 sm:py-16 md:py-20`}>
        <div className="absolute inset-0 z-0 bg-center bg-cover bg-fixed" style={{ backgroundImage: 'url(/images/RECEPCTA.jpg)' }}>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('winePairing.form.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 text-white`}>
              {t('winePairing.form.title')}
            </h2>
            <p className={`text-lg sm:text-xl mb-8 sm:mb-12 px-4 text-gray-200`}>
              {t('winePairing.form.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur shadow-lg`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('winePairing.form.date')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 sm:p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} text-sm sm:text-base`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('winePairing.form.time')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.form.times.t600')}</option>
                    <option>{t('winePairing.form.times.t630')}</option>
                    <option>{t('winePairing.form.times.t700')}</option>
                    <option>{t('winePairing.form.times.t730')}</option>
                    <option>{t('winePairing.form.times.t800')}</option>
                    <option>{t('winePairing.form.times.t830')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('winePairing.form.partySize')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.form.guests.two')}</option>
                    <option>{t('winePairing.form.guests.four')}</option>
                    <option>{t('winePairing.form.guests.six')}</option>
                    <option>{t('winePairing.form.guests.eight')}</option>
                    <option>{t('winePairing.form.guests.ten')}</option>
                    <option>{t('winePairing.form.guests.twelve')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('winePairing.form.experienceType')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.experiences.items.sommelierJourney.name')}</option>
                    <option>{t('winePairing.experiences.items.foodWinePairing.name')}</option>
                    <option>{t('winePairing.experiences.items.privateCellarTour.name')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors">
                {t('winePairing.form.submit')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
