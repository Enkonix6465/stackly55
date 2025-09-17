import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function TakeawayDelivery() {
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

  // Takeaway/Delivery menu items
  const takeawayMenu = [
    {
      id: 1,
      key: 'gourmetBurger',
      price: 18,
      image: "/images/Prime Beef Tenderloin.jpg",
      categoryKey: 'mainCourse',
      isPopular: true,
      deliveryTimeKey: 'm25_30'
    },
    {
      id: 2,
      key: 'mediterraneanBowl',
      price: 16,
      image: "/images/Garden Fresh Bowl.jpg",
      categoryKey: 'healthy',
      isHealthy: true,
      deliveryTimeKey: 'm20_25'
    },
    {
      id: 3,
      key: 'chickenTikkaWrap',
      price: 14,
      image: "/images/Chicken Tikka Wrap.jpg",
      categoryKey: 'wrap',
      isSpicy: true,
      deliveryTimeKey: 'm15_20'
    },
    {
      id: 4,
      key: 'seafoodPasta',
      price: 22,
      image: "/images/Mediterranean Seafood Pasta.jpg",
      categoryKey: 'pasta',
      isPremium: true,
      deliveryTimeKey: 'm30_35'
    },
    {
      id: 5,
      key: 'chocolateLavaCake',
      price: 12,
      image: "/images/Chocolate Lava Cak.jpg",
      categoryKey: 'dessert',
      isSignature: true,
      deliveryTimeKey: 'm10_15'
    },
    {
      id: 6,
      key: 'greekSalad',
      price: 13,
      image: "/images/Greekrecipe.jpg",
      categoryKey: 'salad',
      isFresh: true,
      deliveryTimeKey: 'm10_15'
    }
  ]

  // Delivery options
  const deliveryOptions = [
    {
      key: 'express',
      price: 5
    },
    {
      key: 'standard',
      price: 3
    },
    {
      key: 'scheduled',
      price: 2
    }
  ]

  // Special offers
  const specialOffers = [
    {
      key: 'familyFeast',
      price: 65,
      originalPrice: 85,
      image: "/images/RS1.jpg"
    },
    {
      key: 'lunchCombo',
      price: 18,
      originalPrice: 25,
      image: "/images/lunchcombo.jpg"
    },
    {
      key: 'weekendSpecial',
      price: 35,
      originalPrice: 45,
      image: "/images/RS3.jpg"
    }
  ]

  // Testimonials
  const testimonials = [
    {
      key: 't1',
      rating: 5,
      image: "/images/RS2Tetimonal1.jpg"
    },
    {
      key: 't2',
      rating: 5,
      image: "/images/RS2Testimonal2.jpg"
    },
    {
      key: 't3',
      rating: 5,
      image: "/images/RS2Testimonal3.jpg"
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
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Takeaway%20%26%20Delivery.mp4" type="video/mp4" />
            <source src="/Takeaway & Delivery.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white whitespace-nowrap">
              {t('takeawayPage.hero.title')} {t('takeawayPage.hero.subtitle')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('takeawayPage.hero.description')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('takeawayPage.hero.ctaOrder')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Menu Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('takeawayPage.menu.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('takeawayPage.menu.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('takeawayPage.menu.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {takeawayMenu.map((item, index) => (
              <ScrollAnimation key={item.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={t(`takeawayPage.menu.items.${item.key}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {item.isPopular && (
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.popular')}
                        </span>
                      )}
                      {item.isHealthy && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.healthy')}
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.spicy')}
                        </span>
                      )}
                      {item.isPremium && (
                        <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.premium')}
                        </span>
                      )}
                      {item.isSignature && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.signature')}
                        </span>
                      )}
                      {item.isFresh && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('takeawayPage.badges.fresh')}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {t(`takeawayPage.menu.deliveryTimes.${item.deliveryTimeKey}`)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {t(`takeawayPage.menu.items.${item.key}.name`)}
                      </h3>
                      <span className="text-red-500 font-bold text-lg">${item.price}</span>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`takeawayPage.menu.items.${item.key}.description`)}
                    </p>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {t(`takeawayPage.menu.categories.${item.categoryKey}`)}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('takeawayPage.deliveryOptions.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('takeawayPage.deliveryOptions.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('takeawayPage.deliveryOptions.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryOptions.map((option, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">🚚</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t(`takeawayPage.deliveryOptions.options.${option.key}.name`)}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2">{t(`takeawayPage.deliveryOptions.options.${option.key}.type`)} • {t(`takeawayPage.deliveryOptions.options.${option.key}.time`)}</p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t(`takeawayPage.deliveryOptions.options.${option.key}.description`)}
                  </p>
                  <p className="text-2xl font-bold text-red-500">${option.price}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('takeawayPage.offers.badge')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('takeawayPage.offers.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('takeawayPage.offers.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={t(`takeawayPage.offers.items.${offer.key}.name`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{t(`takeawayPage.offers.items.${offer.key}.name`)}</h3>
                      <p className="text-sm opacity-90">{t(`takeawayPage.offers.items.${offer.key}.duration`)}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {t('takeawayPage.offers.save', { amount: offer.originalPrice - offer.price })}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t(`takeawayPage.offers.items.${offer.key}.description`)}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg text-gray-500 line-through">${offer.originalPrice}</span>
                        <span className="text-2xl font-bold text-red-500 ml-2">${offer.price}</span>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                        {t('takeawayPage.cta.orderNow')}
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
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('takeawayPage.testimonials.badge')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('takeawayPage.testimonials.title')}
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
                  "{t(`takeawayPage.testimonials.items.${testimonials[currentTestimonial].key}.content`)}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={t(`takeawayPage.testimonials.items.${testimonials[currentTestimonial].key}.name`)}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{t(`takeawayPage.testimonials.items.${testimonials[currentTestimonial].key}.name`)}</p>
                    <p className="text-sm text-gray-500">
                      {t(`takeawayPage.testimonials.items.${testimonials[currentTestimonial].key}.role`)}
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

      {/* Order Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('takeawayPage.order.badge')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('takeawayPage.order.title')}
            </h2>
            <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('takeawayPage.order.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t('takeawayPage.order.form.address')}</label>
                  <input
                    type="text"
                    placeholder={t('takeawayPage.order.form.addressPlaceholder')}
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t('takeawayPage.order.form.phone')}</label>
                  <input
                    type="tel"
                    placeholder={t('takeawayPage.order.form.phonePlaceholder')}
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t('takeawayPage.order.form.deliveryTime')}</label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('takeawayPage.order.form.options.asap')}</option>
                    <option>{t('takeawayPage.order.form.options.express')}</option>
                    <option>{t('takeawayPage.order.form.options.schedule')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{t('takeawayPage.order.form.paymentMethod')}</label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('takeawayPage.order.form.paymentOptions.cod')}</option>
                    <option>{t('takeawayPage.order.form.paymentOptions.card')}</option>
                    <option>{t('takeawayPage.order.form.paymentOptions.wallet')}</option>
                    <option>{t('takeawayPage.order.form.paymentOptions.online')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('takeawayPage.order.form.submit')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
