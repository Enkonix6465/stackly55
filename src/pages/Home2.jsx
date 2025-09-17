import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home2() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Category mapping for filtering
  const categoryMap = {
    [t('home2.menu.categories.all')]: 'All',
    [t('home2.menu.categories.appetizers')]: 'Appetizers',
    [t('home2.menu.categories.mainCourse')]: 'Main Course',
    [t('home2.menu.categories.desserts')]: 'Desserts',
    [t('home2.menu.categories.beverages')]: 'Beverages'
  }

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

  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <Navbar user={user} />

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Rhome2.mp4" type="video/mp4" />
          {t('common.videoNotSupported')}
        </video>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Centered Content */}
          <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-7xl font-light leading-tight text-white">
                {t('home2.hero.title')}
              </h1>
              
              <p className="text-lg leading-relaxed max-w-3xl mx-auto text-white">
                {t('home2.hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="/contact" className="group relative px-8 py-4 bg-red-500 text-white font-semibold transition-all duration-300 hover:bg-red-600 transform hover:scale-105 inline-block text-center">
                <span className="relative z-10">{t('home2.hero.reservationButton')}</span>
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Modern Menu Showcase */}
      <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-red-500 font-medium tracking-wider uppercase text-sm">{t('home2.menu.title')}</span>
            </motion.div>
            
            <motion.h2 
              className={`text-4xl lg:text-5xl font-light mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
{t('home2.menu.subtitle')}
            </motion.h2>
            
            <motion.p 
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('home2.menu.description')}
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[t('home2.menu.categories.all'), t('home2.menu.categories.appetizers'), t('home2.menu.categories.mainCourse'), t('home2.menu.categories.desserts'), t('home2.menu.categories.beverages')].map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(categoryMap[category])}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === categoryMap[category]
                    ? 'bg-red-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Modern Menu Cards */}
          <AnimatePresence mode="wait">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
              { 
                title: t('home2.menu.cards.dishes.tandooriDelights.title'), 
                price: '$24', 
                image: '/images/RB1.jpg',
                description: t('home2.menu.cards.dishes.tandooriDelights.description'),
                category: t('home2.menu.cards.dishes.tandooriDelights.category'),
                featured: true
              },
              { 
                title: t('home2.menu.cards.dishes.royalThali.title'), 
                price: '$45', 
                image: '/images/Indian thali.jpeg',
                description: t('home2.menu.cards.dishes.royalThali.description'),
                category: t('home2.menu.cards.dishes.royalThali.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.mangoKulfi.title'), 
                price: '$12', 
                image: '/images/RB2.jpg',
                description: t('home2.menu.cards.dishes.mangoKulfi.description'),
                category: t('home2.menu.cards.dishes.mangoKulfi.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.masalaChai.title'), 
                price: '$8', 
                image: '/images/RB3.jpg',
                description: t('home2.menu.cards.dishes.masalaChai.description'),
                category: t('home2.menu.cards.dishes.masalaChai.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.chefsSpecial.title'), 
                price: '$38', 
                image: '/images/RB4.jpg',
                description: t('home2.menu.cards.dishes.chefsSpecial.description'),
                category: t('home2.menu.cards.dishes.chefsSpecial.category'),
                featured: true
              },
              { 
                title: t('home2.menu.cards.dishes.familyFeast.title'), 
                price: '$65', 
                image: '/images/RCTAB.jpg',
                description: t('home2.menu.cards.dishes.familyFeast.description'),
                category: t('home2.menu.cards.dishes.familyFeast.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.signatureGrilledSalmon.title'), 
                price: '$32', 
                image: '/images/Signature Grilled Salmon.jpg',
                description: t('home2.menu.cards.dishes.signatureGrilledSalmon.description'),
                category: t('home2.menu.cards.dishes.signatureGrilledSalmon.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.primeBeefTenderloin.title'), 
                price: '$48', 
                image: '/images/Prime Beef Tenderloin.jpg',
                description: t('home2.menu.cards.dishes.primeBeefTenderloin.description'),
                category: t('home2.menu.cards.dishes.primeBeefTenderloin.category'),
                featured: true
              },
              { 
                title: t('home2.menu.cards.dishes.chocolateLavaCake.title'), 
                price: '$14', 
                image: '/images/Chocolate Lava Cak.jpg',
                description: t('home2.menu.cards.dishes.chocolateLavaCake.description'),
                category: t('home2.menu.cards.dishes.chocolateLavaCake.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.mediterraneanSeafoodPasta.title'), 
                price: '$28', 
                image: '/images/Mediterranean Seafood Pasta.jpg',
                description: t('home2.menu.cards.dishes.mediterraneanSeafoodPasta.description'),
                category: t('home2.menu.cards.dishes.mediterraneanSeafoodPasta.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.gardenFreshBowl.title'), 
                price: '$18', 
                image: '/images/Garden Fresh Bowl.jpg',
                description: t('home2.menu.cards.dishes.gardenFreshBowl.description'),
                category: t('home2.menu.cards.dishes.gardenFreshBowl.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.greekRecipeSpecial.title'), 
                price: '$22', 
                image: '/images/Greekrecipe.jpg',
                description: t('home2.menu.cards.dishes.greekRecipeSpecial.description'),
                category: t('home2.menu.cards.dishes.greekRecipeSpecial.category'),
                featured: false
              },
              { 
                title: t('home2.menu.cards.dishes.lobsterRisotto.title'), 
                price: '$42', 
                image: '/images/Lobster Risotto.jpg',
                description: t('home2.menu.cards.dishes.lobsterRisotto.description'),
                category: t('home2.menu.cards.dishes.lobsterRisotto.category'),
                featured: true
              },
            ]
            .filter(dish => selectedCategory === 'All' || dish.category === selectedCategory)
            .map((dish, idx) => (
              <motion.div 
                key={`${dish.title}-${selectedCategory}`} 
                className="group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                layout
              >
                {/* Modern Dish Card */}
                <div className={`relative rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl overflow-hidden ${
                  isDark ? 'bg-gray-700' : 'bg-white'
                } ${dish.featured ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}>
                  {/* Featured Badge */}
                  {dish.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {t('home2.menu.cards.featured')}
                      </span>
                    </div>
                  )}

                  {/* Dish Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dish.title}
                        </h3>
                        <span className="text-sm text-red-500 font-medium">
                          {dish.category}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-red-500">
                        {dish.price}
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {dish.description}
                    </p>

                    {/* Action Button */}
                    <button 
                      onClick={() => navigate('/contact')}
                      className={`w-full py-3 font-medium rounded-lg transition-all duration-300 group-hover:bg-red-500 group-hover:text-white ${
                        isDark 
                          ? 'bg-gray-600 text-gray-200 hover:bg-red-500 hover:text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      {t('home2.menu.cards.addToOrder')}
                    </button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {t('home2.cta.viewMenu')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Yummy Section */}
      <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - Red Background */}
            <motion.div
              className="bg-red-500 p-8 text-white text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-left">
                {t('home2.whyChoose.title')}
              </h2>
              <p className="text-lg leading-relaxed mb-8 opacity-90 text-left">
                {t('home2.whyChoose.description')}
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                {t('home2.whyChoose.learnMore')} <span className="text-lg">→</span>
              </button>
            </motion.div>

            {/* Right Columns - White Background */}
            <motion.div
              className={`bg-white p-8 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 48 48">
                    <g fill="none" strokeWidth={3}>
                      <path fill="#8fbffa" d="M31.568 7.127A9 9 0 0 0 24 3a9 9 0 0 0-7.568 4.127A8 8 0 1 0 8.72 20.67a479 479 0 0 0 2.18 21.55c.17 1.36 1.251 2.4 2.62 2.488C15.606 44.842 19.1 45 24 45s8.394-.158 10.48-.293c1.369-.088 2.45-1.128 2.62-2.488a479 479 0 0 0 2.18-21.549a8 8 0 1 0-7.712-13.543"></path>
                      <path fill="#fff" d="m37.676 37.4l-.03-.043c-2.568-.131-6.824-.26-13.647-.26c-6.837 0-11.096.13-13.663.261l-.012.035c.226 1.996.425 3.629.576 4.826c.171 1.36 1.252 2.4 2.62 2.488C15.606 44.842 19.1 45 24 45s8.395-.158 10.48-.293c1.369-.088 2.45-1.128 2.62-2.488c.151-1.196.35-2.826.576-4.819"></path>
                      <path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M31.568 7.127A9 9 0 0 0 24 3a9 9 0 0 0-7.568 4.127A8 8 0 1 0 8.72 20.67a479 479 0 0 0 2.18 21.55c.17 1.36 1.251 2.4 2.62 2.488C15.606 44.842 19.1 45 24 45s8.394-.158 10.48-.293c1.369-.088 2.45-1.128 2.62-2.488a479 479 0 0 0 2.18-21.549a8 8 0 1 0-7.712-13.543"></path>
                      <path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M10.337 37.358c2.566-.131 6.826-.26 13.663-.26c6.823 0 11.079.128 13.647.26M19 21l1 8m9-8l-1 8"></path>
                    </g>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('home2.whyChoose.qualityYouCanTaste')}
                </h3>
                <p className={`text-sm leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home2.whyChoose.qualityDescription')}
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`bg-white p-8 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 128 128">
                    <path fill="#d1ebed" d="m70 96.5l-11 .7c-.7.6-.2 1.8-.2 2.6v2.8c0 1.5-.5 2.8-1.4 4c-2.3 3.2-6.4 4.6-9.9 6.1c-2.4 1.1-8.1 3.5-7.8 6.8c.4 4 7.3 5.6 10.3 6.3c3.7.8 7.4 1.1 11.2 1.1c3.3 0 6.7-.2 10-.5c3-.2 6-.7 8.9-1.4c2.1-.5 7.2-1.8 7.9-4.3c1.3-4.6-7.9-7.2-10.7-8.4c-3.9-1.7-8.2-4-8.2-8.8c0-1.3 0-2.6.2-3.9c.2-.9-.2-2.6.7-3.1"></path>
                    <path fill="#d1ebed" d="M90.6 8.4s14.8 24.5 14.8 52.3c0 39-41.4 38.4-41.4 38.4s-41.4.5-41.4-38.4c0-27.8 14.9-52.3 14.9-52.3z"></path>
                    <defs>
                      <path id="SVGf7V9qwYc" d="M99.6 53.6c-1.5-1.1-2.9.1-4.6.7c-7.5 2.6-15 2.2-22.5-.1c-7.3-2.3-14.2-5.2-21.8-6c-4.9-.5-9.9 0-14.5 1.8c-3.4 1.3-6.7 3-8.6 6.3c-1.6 2.7-.9 6.6-.5 9.6c.8 5.7 2.9 11.1 6.5 15.6c5.6 6.8 14.1 10.5 22.7 12.1c2.6.5 5.2.8 7.9.8c2.2 0 4.5-.2 6.7-.6C79 92.4 87.3 89.2 93.2 83c3.8-4 6.3-8.9 7.4-14.3c.8-3.5 1-7.1.8-10.7c-.1-1.6-.3-2.9-1.5-4.1z"></path>
                    </defs>
                    <use fill="#ad1457" href="#SVGf7V9qwYc"></use>
                    <clipPath id="SVG8smD4oeJ">
                      <use href="#SVGf7V9qwYc"></use>
                    </clipPath>
                    <path fill="#720845" d="M92.2 55.2c-26.4 4.6-48.7 12.3-61 6.3c-8.8-4.3-1-10.9 7-13.1c19.3-5.3 26.7 3.6 37.7 5c6.5.8 9.6 2.3 16.3 1.8" clipPath="url(#SVG8smD4oeJ)"></path>
                    <path fill="#fff" d="M36.1 54.7c2.1.6 5.1 1.4 7.6 1.7c1.3.2 2-.7 2.1-1.6c1.7-15 4-25.7 7.3-34.2c-2.3-.5-9.7-2.7-9.8-2.4c-4.9 10.7-8.4 27.2-8.8 34.1c0 0-.1 1.9 1.6 2.4"></path>
                    <path fill="#aecece" d="M91.4 11.5C91.4 18.3 79.1 22 64 22s-27.4-3.8-27.4-10.5S48.9 1 64 1s27.4 3.8 27.4 10.5"></path>
                    <path fill="#d1ebed" d="M88.2 11.5c0 5.2-10.8 8.1-24.2 8.1s-24.2-2.9-24.2-8.1S50.6 3.4 64 3.4s24.2 2.9 24.2 8.1"></path>
                    <path fill="#fff" d="M49.5 117.7c-.9-.2-2 .4-2 1.3c0 .7.8 1.2 1.5 1.5c2.7 1.2 5.9 1.7 10.6 1.8c.6 0 1.9-.2 2.2-.8c.4-.6.1-1.4-.5-1.8s-1.3-.5-2-.5c-5.7-.3-5.4-.4-9.8-1.5"></path>
                  </svg>
              </div>
                <h3 className={`text-xl font-semibold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('home2.menu.uniqueDining')}
                </h3>
                <p className={`text-sm leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home2.menu.uniqueDiningDesc')}
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`bg-white p-8 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 128 128">
                    <path fill="#f19534" d="M94.52 21.81c2.44-1.18 4.13-3.67 4.13-6.56a7.28 7.28 0 0 0-14.56 0c0 2.93 1.73 5.44 4.22 6.6c-2.88 15.6-7.3 27.21-23.75 29.69c0 0 4.43 22.15 25.15 22.15s22.82-21.93 22.82-21.93c-16.81.86-18.23-20.27-18.01-29.95"></path>
                    <path fill="#f19534" d="M34.74 21.81c-2.44-1.18-4.13-3.67-4.13-6.56a7.28 7.28 0 0 1 14.56 0c0 2.93-1.73 5.44-4.22 6.6c2.88 15.6 7.3 27.21 23.75 29.69c0 0-4.43 22.15-25.15 22.15S16.74 51.77 16.74 51.77c16.8.85 18.22-20.28 18-29.96"></path>
                    <path fill="#ffca28" d="M89.43 73.69c.09 0 .18.01.27.01c5.71 0 10-1.67 13.22-4.08z"></path>
                    <path fill="#ffca28" d="M119.24 16.86c-3.33-.45-6.51 2.72-7.09 7.06c-.36 2.71.37 5.24 1.78 6.87l-2.4 9.95s-3.67 23.51-22.21 28.15C74.5 72.6 69.13 45.47 67.83 37.09c2.82-1.4 4.77-4.3 4.77-7.67c0-4.73-3.83-8.56-8.56-8.56s-8.56 3.83-8.56 8.56c0 3.39 1.98 6.32 4.85 7.7c-1.03 8.27-5.57 34.5-21.57 31.76c-16.24-2.79-23.33-30.14-24.97-37.58c1.95-1.6 3.04-4.42 2.64-7.45c-.58-4.35-4.02-7.47-7.68-6.98s-6.15 4.41-5.57 8.75c.42 3.16 2.36 5.67 4.79 6.62l12.72 79.03s11.1 8.77 43.35 8.77s43.35-8.77 43.35-8.77l12.75-79.24c2.06-1.08 3.68-3.51 4.08-6.49c.59-4.35-1.64-8.23-4.98-8.68"></path>
                    <ellipse cx={64.44} cy={88.3} fill="#26a69a" rx={9.74} ry={11.61}></ellipse>
                    <path fill="#69f0ae" d="M64.44 79.56c.38.42.72 1.19 0 2.69s-4.6 3.53-5.31 3.94c-.71.42-1.18.23-1.4.06c-1.05-.84-.65-2.74.03-3.9c1.46-2.51 4.55-5.1 6.68-2.79"></path>
                    <path fill="#00796b" d="M63.72 92.63c-1.1.53-4.71 2.14-3.52 4.05c.7 1.13 2.15 1.61 3.48 1.67s2.64-.36 3.82-.97c5.6-2.9 6.05-10.52 4.96-11.1c-1.12-.6-1.88.95-2.46 1.61a20.3 20.3 0 0 1-6.28 4.74"></path>
                    <path fill="#26a69a" d="M118.09 78.8c1.56-8.63-4.24-10.79-4.24-10.79s-3.74-.68-5.5 9.03c-1.76 9.7 1.98 10.38 1.98 10.38s6.19.01 7.76-8.62"></path>
                    <path fill="#69f0ae" d="M115.51 70.96c1.36 1.82-.25 4.51-2.86 6.3c-.77.53-1.79.33-1.94-.11c-.42-1.26-.24-2.69.32-3.9c1.66-3.63 3.79-3.21 4.48-2.29"></path>
                    <path fill="#26a69a" d="M9.76 79.06C8.19 70.44 14 68.27 14 68.27s3.74-.68 5.5 9.03c1.76 9.7-1.98 10.38-1.98 10.38s-6.2.01-7.76-8.62"></path>
                    <path fill="#69f0ae" d="M15.78 71.2c1.34 1 .79 2.31-.22 3.22c-1.15 1.05-2.03 2.2-3.01 3.39c-.15.18-.32.38-.56.43c-.46.1-.83-.37-.98-.82c-.43-1.26-.35-2.74.29-3.9c1.82-3.31 3.96-2.71 4.48-2.32"></path>
                    <path fill="#f44336" d="M99.99 87.16c-.69 3.93-3.84 6.66-7.05 6.1s-3.65-3.91-2.96-7.84s2.24-6.94 5.44-6.38c3.21.56 5.26 4.2 4.57 8.12m-69.56 0c.69 3.93 3.84 6.66 7.05 6.1s3.65-3.91 2.96-7.84s-2.24-6.94-5.44-6.38s-5.25 4.2-4.57 8.12"></path>
                    <path fill="#ffa8a4" d="M35.08 84.54c-.73.82-2.51 2.47-3.14 1.21c-.86-1.72.33-4.32 1.69-5.18s2.47-.18 2.66.59c.23.98-.56 2.64-1.21 3.38m56.9 2.51c-.99-.15-1.1-3.56 1.56-6.24c1.27-1.28 3.09.24 2.63 2.29c-.44 1.95-2.38 4.23-4.19 3.95"></path>
                    <path fill="#ffca28" d="M109.15 98.21c-5.99 3-19.73 10.99-45.1 10.99s-39.11-7.99-45.1-10.99c0 0-2.15 1.15-2.15 2.35v9.21c0 1.23.65 2.36 1.71 2.99c4.68 2.76 18.94 9.28 45.55 9.28s40.87-6.52 45.55-9.28a3.48 3.48 0 0 0 1.71-2.99v-9.21c-.02-1.2-2.17-2.35-2.17-2.35"></path>
                    <path fill="#fff59d" d="M39.6 110.84c2.8.55 3.65.79 3.46 2.35c-.39 3.07-6.76 2.34-10.53 1.35c-7.79-2.05-9.37-4.21-9.37-6.14c0-1.77 1.36-1.98 3.46-1.24c2.51.89 6.39 2.39 12.98 3.68"></path>
                    <path fill="none" stroke="#f19534" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4} d="M109.15 100.23s-16.57 9.38-45.1 9.38s-45.1-9.38-45.1-9.38"></path>
                    <path fill="#ffca28" d="M26.97 49.57c5.32-3.8 8.18-10.61 8.43-21.45c.02-.98.3-1.27.83-1.33c.85-.09.99.68.98 1.23c-.24 11.7-1.73 19.01-7.63 23.13c-.29.2-2.36 1.46-3.24.59c-1.05-1.02.29-1.93.63-2.17m4.87-34.03c-.17-1.81.25-5.07 5-6.55c1.39-.43 2.25.25 2.41.78c.4 1.32-.76 1.84-1.29 2.01c-3.65 1.18-3.83 3-4.58 4.16s-1.48.15-1.54-.4m46.38 31.63c4.81-4.27 8-9.04 10.1-19.9c.19-.96.47-1.22.99-1.2c.85.02.89.81.8 1.35c-1.78 11.58-3.47 14.88-9.4 21.45c-.67.74-2.3 1.41-3.22.64c-.83-.69.13-1.8.73-2.34m7.08-31.54c-.17-1.81.25-5.07 5-6.55c1.39-.43 2.25.25 2.41.78c.4 1.32-.76 1.84-1.29 2.01c-3.65 1.18-3.83 3-4.58 4.16c-.74 1.16-1.48.15-1.54-.4"></path>
                    <path fill="#fff59d" d="M31.59 71.62C19.97 66.35 16.55 52.6 14.73 46.63c-.24-.79-.12-1.54.67-1.78s1.26.27 1.51 1.06c1.32 4.33 6.45 18.79 17.04 22.9c.77.3 1.97 1.03 1.32 2.28c-.43.81-1.81 1.38-3.68.53M12.68 24.63c-.56-1.16-.79-2.26-3.84-3.53c-.77-.32-1.28-1.03-1.07-1.83s1.01-1.4 2.17-1.2c3.77.65 4.59 4.48 4.75 5.81c.15 1.28-1.44 1.91-2.01.75m84.19 46.99c11.62-5.27 15.04-19.02 16.86-24.99c.24-.79.12-1.54-.67-1.78s-1.26.27-1.51 1.06c-1.32 4.33-6.45 18.79-17.04 22.9c-.77.3-1.97 1.03-1.32 2.28c.43.81 1.81 1.38 3.68.53m18.91-46.99c.56-1.16.79-2.26 3.84-3.53c.77-.32 1.28-1.03 1.07-1.83s-1.01-1.4-2.17-1.2c-3.77.65-4.59 4.48-4.75 5.81c-.15 1.28 1.45 1.91 2.01.75m-56.4 4.92c.61-1.25 1.68-2.96 5.17-3.68c1.34-.28 1.73-.86 1.61-1.74c-.24-1.83-2.52-1.7-3.75-1.41c-4.1.96-5.01 4.6-5.18 6.04c-.17 1.37 1.55 2.04 2.15.79"></path>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('home2.menu.affordableLuxury')}
                </h3>
                <p className={`text-sm leading-relaxed text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home2.menu.affordableLuxuryDesc')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Chef - New Template */}
      <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 font-medium tracking-wider uppercase text-sm">{t('home2.chef.title')}</span>
            <h2 className={`text-4xl lg:text-5xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home2.chef.subtitle')}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home2.chef.description')}
            </p>
          </motion.div>

          {/* Chef Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Main Chef Card */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={`relative overflow-hidden shadow-2xl w-full flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="relative h-80">
                  <img
                    src="/images/Chefmaster.jpg"
                    alt="Master Chef Rajesh Kumar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-sm opacity-80 mb-2">{t('home2.chef.masterChef')}</div>
                    <div className="text-3xl font-bold">{t('home2.chef.chefName')}</div>
                    <div className="text-lg opacity-90 mt-2">15+ {t('home2.chef.yearsExperience')}</div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {t('home2.chef.headChef')}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t('home2.chef.chefBio')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home2.chef.specialties.indianCuisine')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home2.chef.specialties.awardWinner')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home2.chef.specialties.fiveStarRating')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chef Stats Card */}
            <motion.div
              className="flex flex-col gap-6 h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Experience Card */}
              <div className={`p-6 shadow-lg flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">15+</div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('home2.chef.yearsExperience')}</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.chef.culinaryExcellence')}</div>
                </div>
              </div>

              {/* Signature Dishes Card */}
              <div className={`p-6 shadow-lg flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('home2.chef.signatureDishes')}</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.chef.uniqueCreations')}</div>
                </div>
              </div>

              {/* Awards Card */}
              <div className={`p-6 shadow-lg flex-1 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">3</div>
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('home2.chef.awardsWon')}</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.chef.recognition')}</div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {t('home2.cta.meetChef')}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 font-medium tracking-wider uppercase text-sm">{t('home2.testimonials.title')}</span>
            <h2 className={`text-4xl lg:text-5xl font-light mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home2.testimonials.subtitle')}
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mt-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home2.testimonials.description')}
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className={`p-8 shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "{t('home2.testimonials.testimonial1.content')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/images/H2t1.jpg"
                    alt="Sarah Mitchell"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home2.testimonials.testimonial1.name')}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.testimonials.testimonial1.role')}</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
              <motion.div
              className={`p-8 shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "{t('home2.testimonials.testimonial2.content')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/images/H2t2.jpg"
                    alt="David Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home2.testimonials.testimonial2.name')}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.testimonials.testimonial2.role')}</div>
                </div>
              </div>
              </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className={`p-8 shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                "{t('home2.testimonials.testimonial3.content')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/images/H2t3.jpg"
                    alt="Emily Williams"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home2.testimonials.testimonial3.name')}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home2.testimonials.testimonial3.role')}</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Modern Reservation Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/H2CTA.jpg"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <span className="text-red-500 font-medium tracking-wider uppercase text-sm">{t('home2.contact.title')}</span>
                <h2 className="text-4xl lg:text-5xl font-light mt-4 text-white">
                  {t('home2.contact.subtitle')}
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-200 max-w-2xl mx-auto">
                  {t('home2.contact.description')}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-red-500 mb-2">5:00 PM</div>
                    <div className="text-sm text-gray-300">{t('home2.contact.openingTime')}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-red-500 mb-2">11:00 PM</div>
                    <div className="text-sm text-gray-300">{t('home2.contact.closingTime')}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-red-500 mb-2">(555) 123-4567</div>
                    <div className="text-sm text-gray-300">{t('home2.contact.phoneNumber')}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-red-500 mb-2">7 Days</div>
                    <div className="text-sm text-gray-300">{t('home2.contact.openWeekly')}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                >
{t('home2.contact.bookOnline')}
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 border-2 border-white text-white font-semibold transition-all duration-300 hover:border-red-500 hover:text-red-500 rounded-lg"
                >
{t('home2.contact.callNow')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}