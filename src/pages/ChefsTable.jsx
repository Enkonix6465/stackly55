import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function ChefsTable() {
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

  // Chef's table exclusive menu items
  const chefsTableMenu = [
    {
      id: 1,
      translationKey: 'amuseBouche',
      price: 25,
      image: "/images/Lobster Risotto.jpg",
      isExclusive: true
    },
    {
      id: 2,
      translationKey: 'wagyuCarpaccio',
      price: 45,
      image: "/images/Prime Beef Tenderloin.jpg",
      isPremium: true
    },
    {
      id: 3,
      translationKey: 'lobsterThermidor',
      price: 52,
      image: "/images/Mediterranean Seafood Pasta.jpg",
      isClassic: true
    },
    {
      id: 4,
      translationKey: 'truffleRisotto',
      price: 38,
      image: "/images/Signature Grilled Salmon.jpg",
      isSignature: true
    },
    {
      id: 5,
      translationKey: 'chocolateSouffle',
      price: 28,
      image: "/images/Chocolate Lava Cak.jpg",
      isExclusive: true
    },
    {
      id: 6,
      translationKey: 'caviarSelection',
      price: 150,
      image: "/images/Garden Fresh Bowl.jpg",
      isLuxury: true
    }
  ]

  // Premium wine pairings
  const winePairings = [
    {
      id: 'domPerignon',
      name: "Dom Pérignon Vintage",
      type: "Champagne",
      year: "2015",
      description: "Perfect for celebrations and seafood courses",
      price: 320
    },
    {
      id: 'chateauMargaux',
      name: "Château Margaux",
      type: "Red Wine",
      year: "2018",
      description: "Elegant Bordeaux for premium meats",
      price: 520
    },
    {
      id: 'drc',
      name: "Domaine de la Romanée-Conti",
      type: "Pinot Noir",
      year: "2019",
      description: "Rare Burgundy for special occasions",
      price: 1500
    }
  ]

  // Chef's table experiences
  const chefsTableExperiences = [
    {
      id: 'chefsTable',
      name: "Chef's Table Experience",
      description: "Exclusive kitchen-side dining with chef interaction and personalized service",
      duration: "3.5 hours",
      price: 280,
      image: "/images/RS1.jpg",
      maxGuests: 8
    },
    {
      id: 'wineJourney',
      name: "Sommelier's Wine Journey",
      description: "Each course paired with premium wines by our master sommelier",
      duration: "4 hours",
      price: 350,
      image: "/images/RS2.jpg",
      maxGuests: 6
    },
    {
      id: 'privateKitchen',
      name: "Private Chef's Kitchen",
      description: "Complete private dining experience with dedicated chef and staff",
      duration: "5 hours",
      price: 450,
      image: "/images/RS3.jpg",
      maxGuests: 12
    }
  ]

  // Testimonials
  const testimonials = [
    {
      id: 't1',
      name: "Alexander Thompson",
      role: "Food Critic",
      content: "The chef's table experience is absolutely extraordinary. The intimate setting and chef interaction create an unforgettable culinary journey.",
      rating: 5,
      image: "/images/RS3Testimonal1.jpg"
    },
    {
      id: 't2',
      name: "Victoria Chen",
      role: "Restaurant Owner",
      content: "This is fine dining at its absolute finest. The attention to detail and personalized service is unmatched anywhere.",
      rating: 5,
      image: "/images/RS3Testimonal2.jpg"
    },
    {
      id: 't3',
      name: "Marcus Rodriguez",
      role: "Food Blogger",
      content: "An exclusive experience that redefines luxury dining. Every moment is carefully orchestrated for perfection.",
      rating: 5,
      image: "/images/RS3Testimonal3.jpg"
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
            <source src="/Rhome2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-xl mx-auto px-4 sm:px-6 w-full">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight px-4" style={{ fontFamily: 'serif' }}>
              {t('chefsTablePage.hero.title')} {t('chefsTablePage.hero.subtitle')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto px-4">
              {t('chefsTablePage.hero.description')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="px-4">
              <button onClick={() => navigate('/contact')} className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                {t('chefsTablePage.hero.ctaReserve')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Exclusive Menu Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('chefsTablePage.menu.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
                {t('chefsTablePage.menu.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('chefsTablePage.menu.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chefsTableMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={t(`chefsTablePage.menu.items.${item.translationKey}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      {item.isExclusive && (
                        <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('chefsTablePage.menu.badges.exclusive')}
                        </span>
                      )}
                      {item.isPremium && (
                        <span className="bg-gold-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('chefsTablePage.menu.badges.premium')}
                        </span>
                      )}
                      {item.isSignature && (
                        <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('chefsTablePage.menu.badges.signature')}
                        </span>
                      )}
                      {item.isClassic && (
                        <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('chefsTablePage.menu.badges.classic')}
                        </span>
                      )}
                      {item.isLuxury && (
                        <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('chefsTablePage.menu.badges.luxury')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {t(`chefsTablePage.menu.items.${item.translationKey}.name`)}
                      </h3>
                      <span className="text-red-500 font-bold text-base sm:text-lg">${item.price}</span>
                    </div>
                    <p className={`text-xs sm:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`chefsTablePage.menu.items.${item.translationKey}.description`)}
                    </p>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {t(`chefsTablePage.menu.items.${item.translationKey}.category`)}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Wine Pairing Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('chefsTablePage.wine.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
                {t('chefsTablePage.wine.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('chefsTablePage.wine.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {winePairings.map((wine, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">🍷</span>
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t(`chefsTablePage.wine.items.${wine.id}.name`)}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2 text-sm sm:text-base">{t(`chefsTablePage.wine.items.${wine.id}.type`)} • {t(`chefsTablePage.wine.items.${wine.id}.year`)}</p>
                  <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t(`chefsTablePage.wine.items.${wine.id}.description`)}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-red-500">${wine.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Table Experiences Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('chefsTablePage.experiences.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
                {t('chefsTablePage.experiences.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('chefsTablePage.experiences.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chefsTableExperiences.map((experience, index) => (
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
                      <h3 className="text-2xl font-bold mb-1">{t(`chefsTablePage.experiences.items.${experience.id}.name`)}</h3>
                      <p className="text-sm opacity-90">{t(`chefsTablePage.experiences.items.${experience.id}.duration`)}</p>
                    </div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {t('chefsTablePage.experiences.maxGuests', { count: experience.maxGuests })}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`chefsTablePage.experiences.items.${experience.id}.description`)}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-500">${experience.price}</span>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-bold">
                        {t('chefsTablePage.experiences.bookButton')}
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
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('chefsTablePage.testimonials.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-8 sm:mb-16 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
              {t('chefsTablePage.testimonials.title')}
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
                  "{t(`chefsTablePage.testimonials.items.${testimonials[currentTestimonial].id}.content`)}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={t(`chefsTablePage.testimonials.items.${testimonials[currentTestimonial].id}.name`)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                  />
                  <div>
                    <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {t(`chefsTablePage.testimonials.items.${testimonials[currentTestimonial].id}.name`)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {t(`chefsTablePage.testimonials.items.${testimonials[currentTestimonial].id}.role`)}
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

      {/* Reservation Section */}
      <section className={`relative py-10 sm:py-16 md:py-20`}>
        <div className="absolute inset-0 z-0 bg-center bg-cover bg-fixed" style={{ backgroundImage: 'url(/images/RECEPCTA.jpg)' }}>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('chefsTablePage.reservation.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 text-white`} style={{ fontFamily: 'serif' }}>
              {t('chefsTablePage.reservation.title')}
            </h2>
            <p className={`text-lg sm:text-xl mb-8 sm:mb-12 px-4 text-gray-200`}>
              {t('chefsTablePage.reservation.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur shadow-lg`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('chefsTablePage.reservation.form.date')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('chefsTablePage.reservation.form.time')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('chefsTablePage.reservation.form.options.time.t600')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.time.t630')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.time.t700')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.time.t730')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.time.t800')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.time.t830')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('chefsTablePage.reservation.form.partySize')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('chefsTablePage.reservation.form.options.party.two')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.party.four')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.party.six')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.party.eight')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.party.ten')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.party.twelve')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('chefsTablePage.reservation.form.experienceType')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('chefsTablePage.reservation.form.options.experience.chefsTable')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.experience.wineJourney')}</option>
                    <option>{t('chefsTablePage.reservation.form.options.experience.privateKitchen')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('chefsTablePage.reservation.form.submit')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
