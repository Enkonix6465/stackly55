import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function FineDining() {
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

  // Fine dining menu items (keys used for i18n lookup)
  const fineDiningMenu = [
    {
      id: 1,
      key: 'truffleRisotto',
      price: 45,
      image: "/images/Truffle Risotto.jpg",
      categoryKey: 'Appetizer',
      isSignature: true
    },
    {
      id: 2,
      key: 'wagyuBeef',
      price: 85,
      image: "/images/Wagyu Beef Tenderloin.jpg",
      categoryKey: 'Main Course',
      isPremium: true
    },
    {
      id: 3,
      key: 'foieGras',
      price: 38,
      image: "/images/Pan-Seared Foie Gras.jpg",
      categoryKey: 'Appetizer',
      isDelicacy: true
    },
    {
      id: 4,
      key: 'lobsterThermidor',
      price: 52,
      image: "/images/Lobster Risotto.jpg",
      categoryKey: 'Main Course',
      isClassic: true
    },
    {
      id: 5,
      key: 'chocolateSouffle',
      price: 24,
      image: "/images/Chocolate Soufflé.jpg",
      categoryKey: 'Dessert',
      isSignature: true
    },
    {
      id: 6,
      key: 'caviarSelection',
      price: 120,
      image: "/images/Caviar Selection.jpg",
      categoryKey: 'Appetizer',
      isLuxury: true
    }
  ]

  // Wine pairings (texts localized via i18n)
  const winePairings = [
    {
      key: 'chandonImperial',
      year: '2020',
      price: 85
    },
    {
      key: 'domPerignon',
      year: '2015',
      price: 280
    },
    {
      key: 'chateauMargaux',
      year: '2018',
      price: 450
    },
    {
      key: 'drc',
      year: '2019',
      price: 1200
    }
  ]

  // Chef's specialties
  const chefSpecials = [
    {
      key: 'tastingMenu',
      price: 150,
      image: "/images/Chefs menu.jpg"
    },
    {
      key: 'winePairing',
      price: 200,
      image: "/images/Wine Pairing Experience.jpg"
    },
    {
      key: 'chefsTable',
      price: 250,
      image: "/images/Chef table.jpg"
    }
  ]

  // Testimonials (texts localized via i18n)
  const testimonials = [
    {
      key: 't1',
      rating: 5,
      image: "/images/RSTestimonal1.jpg"
    },
    {
      key: 't2',
      rating: 5,
      image: "/images/RSTestimonal2.jpg"
    },
    {
      key: 't3',
      rating: 5,
      image: "/images/RSTestimonal3.jpg"
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
            <source src="/Fine Dining.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight px-4" style={{ fontFamily: 'serif' }}>
              {t('fineDiningPage.hero.title')} {t('fineDiningPage.hero.subtitle')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto px-4">
              {t('fineDiningPage.hero.description')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="px-4">
              <button onClick={() => navigate('/contact')} className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                {t('fineDiningPage.hero.ctaReserve')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Signature Menu Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('fineDiningPage.menu.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
                {t('fineDiningPage.menu.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('fineDiningPage.menu.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {fineDiningMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={t(`fineDiningPage.menu.items.${item.key}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      {item.isSignature && (
                        <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('home1.signatureDishes.badges.chefSpecial')}
                        </span>
                      )}
                      {item.isPremium && (
                        <span className="bg-gold-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('home1.signatureDishes.badges.premium')}
                        </span>
                      )}
                      {item.isLuxury && (
                        <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {t('home1.signatureDishes.badges.premium')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {t(`fineDiningPage.menu.items.${item.key}.name`)}
                      </h3>
                      <span className="text-red-500 font-bold text-base sm:text-lg">${item.price}</span>
                    </div>
                    <p className={`text-xs sm:text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`fineDiningPage.menu.items.${item.key}.description`)}
                    </p>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {item.categoryKey}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Pairing Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('fineDiningPage.wine.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
                {t('fineDiningPage.wine.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('fineDiningPage.wine.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {winePairings.map((wine, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    {index === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256" className="text-white">
                        <path fill="currentColor" d="m215 217.8l-21.5 5.77l-12.35-46.06a36.06 36.06 0 0 0 21.66-42.84c-12.45-46.43-38.31-87.12-39.4-88.83a4 4 0 0 0-4.41-1.72l-26.94 6.73c.23-11.53-.09-18.84-.09-19a4 4 0 0 0-3-3.7l-32-8a4 4 0 0 0-4.34 1.72c-1.09 1.71-26.95 42.4-39.4 88.83a36.06 36.06 0 0 0 21.66 42.84l-12.35 46.03L41 193.8a4 4 0 0 0-2 7.73l48 12.86a3.8 3.8 0 0 0 1 .14a4 4 0 0 0 1-7.86l-18.77-5l12.35-46.07a35.8 35.8 0 0 0 40.18-26.34c1.2-4.92 2.25-9.87 3.17-14.81a275 275 0 0 0 7.25 38.89A36.06 36.06 0 0 0 168 180a35 35 0 0 0 5.38-.43l12.35 46.07l-18.77 5a4 4 0 0 0 1 7.86a3.8 3.8 0 0 0 1-.14l48-12.86a4 4 0 0 0-1.96-7.7M158.13 52.59c2.79 4.6 9.11 15.4 16.07 29.74l-42 10.5c-.81-14.58-.61-26.31-.4-32.28v-1.39Zm-60.26-24l26.23 6.56c.09 4 .17 11.77-.17 21.87c-.06 1.18-.15 3.09-.22 5.63s-.27 5.26-.45 8L80.94 60.11C88.24 44.88 95 33.38 97.87 28.59M80.76 147A28 28 0 0 1 61 112.75A300 300 0 0 1 77.5 67.5l45.14 11.28a320 320 0 0 1-7.59 48.46A28 28 0 0 1 80.76 147m60.19 4.2a283 283 0 0 1-8.2-50.3l44.93-11.2A302.4 302.4 0 0 1 195 136.75a28 28 0 0 1-54 14.49Zm47.47-109.41a4 4 0 0 1 1.79-5.37l16-8a4 4 0 1 1 3.58 7.16l-16 8a4 4 0 0 1-5.37-1.79M228 72a4 4 0 0 1-4 4h-16a4 4 0 0 1 0-8h16a4 4 0 0 1 4 4M36.42 22.21a4 4 0 0 1 5.37-1.79l16 8a4 4 0 0 1-3.58 7.16l-16-8a4 4 0 0 1-1.79-5.37M40 68H24a4 4 0 0 1 0-8h16a4 4 0 0 1 0 8"></path>
                      </svg>
                    ) : index === 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512" className="text-white">
                        <path fill="currentColor" d="M275.194 294.903v133.242c28.887 13.815 80.361 40.096 80.361 51.97c0 16.505-44.53 29.885-99.46 29.885s-99.46-13.38-99.46-29.885c0-11.873 51.463-38.15 80.352-51.966V294.914C21.068 281.527 124.263 37.383 124.263 37.383h.206a12 12 0 0 0-.206 2.201c0 21.861 58.98 39.583 131.737 39.583s131.737-17.722 131.737-39.583c0-.739-.073-1.472-.206-2.201h.206s103.137 244.008-112.543 257.52"></path>
                        <path fill="currentColor" d="M387.737 39.583c0 21.861-58.98 39.583-131.737 39.583S124.263 61.445 124.263 39.583S183.244 0 256 0s131.737 17.722 131.737 39.583"></path>
                        <path fill="currentColor" d="M372.607 52.914S457.154 272.007 256 272.007S139.393 52.914 139.393 52.914z"></path>
                        <path fill="currentColor" d="M372.607 52.914c0 17.282-52.207 31.291-116.607 31.291s-116.607-14.01-116.607-31.291S191.6 21.622 256 21.622s116.607 14.01 116.607 31.292"></path>
                        <path fill="currentColor" d="M184.917 226.039c-5.028 0-9.925-2.58-12.669-7.221c-23.576-39.861-22.511-81.21-18.95-112.781c.91-8.069 8.186-13.875 16.26-12.963c8.069.911 13.873 8.19 12.963 16.26c-3.237 28.69-3.981 62.355 15.039 94.513c4.134 6.99 1.819 16.007-5.17 20.141a14.64 14.64 0 0 1-7.473 2.051"></path>
                      </svg>
                    ) : (
                      <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">🍷</span>
                    )}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t(`fineDiningPage.wine.items.${wine.key}.name`)}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2 text-sm sm:text-base">{t(`fineDiningPage.wine.items.${wine.key}.type`)} • {wine.year}</p>
                  <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t(`fineDiningPage.wine.items.${wine.key}.description`)}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-red-500">${wine.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Specialties Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('fineDiningPage.chefSpecials.badge')}</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('fineDiningPage.chefSpecials.title')}
              </h2>
              <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('fineDiningPage.chefSpecials.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chefSpecials.map((special, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={special.image}
                      alt={t(`fineDiningPage.chefSpecials.${special.key}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">{t(`fineDiningPage.chefSpecials.${special.key}.name`)}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{t(`fineDiningPage.chefSpecials.${special.key}.duration`)}</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`fineDiningPage.chefSpecials.${special.key}.description`)}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                      <span className="text-xl sm:text-2xl font-bold text-red-500">${special.price}</span>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base font-bold w-full sm:w-auto">
                        {t('home2.whyChoose.learnMore')}
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
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('fineDiningPage.testimonials.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-8 sm:mb-16 px-4 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'serif' }}>
              {t('fineDiningPage.testimonials.title')}
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
                  "{t(`fineDiningPage.testimonials.items.${testimonials[currentTestimonial].key}.content`)}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={t(`fineDiningPage.testimonials.items.${testimonials[currentTestimonial].key}.name`)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                  />
                  <div>
                    <p className={`text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {t(`fineDiningPage.testimonials.items.${testimonials[currentTestimonial].key}.name`)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {t(`fineDiningPage.testimonials.items.${testimonials[currentTestimonial].key}.role`)}
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
            <span className="text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4">{t('fineDiningPage.reservation.badge')}</span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 px-4 text-white`} style={{ fontFamily: 'serif' }}>
              {t('fineDiningPage.reservation.title')}
            </h2>
            <p className={`text-lg sm:text-xl mb-8 sm:mb-12 px-4 text-gray-200`}>
              {t('fineDiningPage.reservation.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-6 sm:p-8 rounded-2xl ${isDark ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur shadow-lg`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('fineDiningPage.reservation.form.date')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 sm:p-3 rounded-lg border text-sm sm:text-base ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('fineDiningPage.reservation.form.time')}
                  </label>
                  <select className={`w-full p-2 sm:p-3 rounded-lg border text-sm sm:text-base ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('fineDiningPage.reservation.form.options.time.t700')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.time.t730')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.time.t800')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.time.t830')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.time.t900')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('fineDiningPage.reservation.form.partySize')}
                  </label>
                  <select className={`w-full p-2 sm:p-3 rounded-lg border text-sm sm:text-base ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('fineDiningPage.reservation.form.options.partySize.two')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.partySize.four')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.partySize.six')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.partySize.eight')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.partySize.tenPlus')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    {t('fineDiningPage.reservation.form.specialOccasion')}
                  </label>
                  <select className={`w-full p-2 sm:p-3 rounded-lg border text-sm sm:text-base ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('fineDiningPage.reservation.form.options.occasion.anniversary')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.occasion.birthday')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.occasion.businessDinner')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.occasion.dateNight')}</option>
                    <option>{t('fineDiningPage.reservation.form.options.occasion.other')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                {t('fineDiningPage.reservation.form.submit')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
