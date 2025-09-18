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
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white whitespace-nowrap">
              {t('winePairing.hero.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('winePairing.hero.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('winePairing.hero.cta')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Wine Pairing Menu Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('winePairing.menu.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.menu.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.menu.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {winePairingMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {item.isLuxury && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.luxury')}
                        </span>
                      )}
                      {item.isPremium && (
                        <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.premium')}
                        </span>
                      )}
                      {item.isClassic && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.classic')}
                        </span>
                      )}
                      {item.isItalian && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.italian')}
                        </span>
                      )}
                      {item.isDessert && (
                        <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.dessert')}
                        </span>
                      )}
                      {item.isFrench && (
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('winePairing.menu.tags.french')}
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

      {/* Wine Collection Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('winePairing.collection.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.collection.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.collection.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wineCollection.map((wine, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">🍷</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {wine.name}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2">{wine.type} • {wine.year}</p>
                  <p className="text-gray-500 text-sm mb-2">{wine.region}</p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {wine.description}
                  </p>
                  <p className="text-2xl font-bold text-red-500">${wine.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Experiences Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('winePairing.experiences.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('winePairing.experiences.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('winePairing.experiences.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wineExperiences.map((experience, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{experience.name}</h3>
                      <p className="text-sm opacity-90">{experience.duration}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {experience.wines}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {experience.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-500">${experience.price}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
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
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('winePairing.testimonials.badge')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('winePairing.testimonials.title')}
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

      {/* Wine Tasting Reservation Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('winePairing.form.badge')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('winePairing.form.title')}
            </h2>
            <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('winePairing.form.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('winePairing.form.date')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('winePairing.form.time')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.form.times.t600')}</option>
                    <option>{t('winePairing.form.times.t630')}</option>
                    <option>{t('winePairing.form.times.t700')}</option>
                    <option>{t('winePairing.form.times.t730')}</option>
                    <option>{t('winePairing.form.times.t800')}</option>
                    <option>{t('winePairing.form.times.t830')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('winePairing.form.partySize')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.form.guests.two')}</option>
                    <option>{t('winePairing.form.guests.four')}</option>
                    <option>{t('winePairing.form.guests.six')}</option>
                    <option>{t('winePairing.form.guests.eight')}</option>
                    <option>{t('winePairing.form.guests.ten')}</option>
                    <option>{t('winePairing.form.guests.twelve')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('winePairing.form.experienceType')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('winePairing.experiences.items.sommelierJourney.name')}</option>
                    <option>{t('winePairing.experiences.items.foodWinePairing.name')}</option>
                    <option>{t('winePairing.experiences.items.privateCellarTour.name')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
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
