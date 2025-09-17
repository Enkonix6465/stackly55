import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import { ThemeDebug } from '../components/theme-debug'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const user = getCurrentUser()

  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Restaurant dummy data
  const featuredDishes = [
    {
      id: 1,
      name: t('home1.signatureDishes.dishes.grilledSalmon.name'),
      description: t('home1.signatureDishes.dishes.grilledSalmon.description'),
      price: 28,
      image: "/images/Signature Grilled Salmon.jpg",
      category: "Main Course",
      rating: 4.9,
      isChefSpecial: true
    },
    {
      id: 2,
      name: t('home1.signatureDishes.dishes.beefTenderloin.name'),
      description: t('home1.signatureDishes.dishes.beefTenderloin.description'),
      price: 42,
      image: "/images/Prime Beef Tenderloin.jpg",
      category: "Main Course",
      rating: 4.8,
      isPopular: true
    },
    {
      id: 3,
      name: t('home1.signatureDishes.dishes.lobsterRisotto.name'),
      description: t('home1.signatureDishes.dishes.lobsterRisotto.description'),
      price: 38,
      image: "/images/Lobster Risotto.jpg",
      category: "Main Course",
      rating: 4.9,
      isPremium: true
    },
    {
      id: 4,
      name: t('home1.signatureDishes.dishes.gardenBowl.name'),
      description: t('home1.signatureDishes.dishes.gardenBowl.description'),
      price: 22,
      image: "/images/Garden Fresh Bowl.jpg",
      category: "Healthy",
      rating: 4.2,
      isHealthy: true
    },
    {
      id: 5,
      name: t('home1.signatureDishes.dishes.seafoodPasta.name'),
      description: t('home1.signatureDishes.dishes.seafoodPasta.description'),
      price: 32,
      image: "/images/Mediterranean Seafood Pasta.jpg",
      category: "Pasta",
      rating: 4.7,
      isFreshCatch: true
    },
    {
      id: 6,
      name: t('home1.signatureDishes.dishes.lavaCake.name'),
      description: t('home1.signatureDishes.dishes.lavaCake.description'),
      price: 16,
      image: "/images/Chocolate Lava Cak.jpg",
      category: "Dessert",
      rating: 4.9,
      isDessert: true
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: t('home1.testimonials.guests.sarah.name'),
      role: t('home1.testimonials.guests.sarah.role'),
      content: t('home1.testimonials.guests.sarah.content'),
      rating: 5,
      image: "/images/RHT1.jpg"
    },
    {
      id: 2,
      name: t('home1.testimonials.guests.michael.name'),
      role: t('home1.testimonials.guests.michael.role'),
      content: t('home1.testimonials.guests.michael.content'),
      rating: 5,
      image: "/images/RHT2.jpg"
    },
    {
      id: 3,
      name: t('home1.testimonials.guests.emily.name'),
      role: t('home1.testimonials.guests.emily.role'),
      content: t('home1.testimonials.guests.emily.content'),
      rating: 5,
      image: "/images/RHT3.jpg"
    }
  ]

  const restaurantStats = [
    { number: "5+", label: t('home1.culinaryJourney.stats.yearsExcellence') },
    { number: "10K+", label: t('home1.culinaryJourney.stats.happyCustomers') },
    { number: "50+", label: t('home1.culinaryJourney.stats.signatureDishes') },
    { number: "98%", label: t('home1.culinaryJourney.stats.customerSatisfaction') }
  ]

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />
      <ThemeDebug />

      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen flex items-center justify-center text-center bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Restarent.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dynamic Overlay */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/60'}`}></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6 whitespace-nowrap" style={{ fontFamily: 'serif' }}>
              {t('home1.hero.title')}
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto mb-8 whitespace-nowrap">
              {t('home1.hero.subtitle')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-8 flex gap-6 justify-center items-center flex-wrap">
              <a
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
{t('home1.hero.reserveTable')}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <div className="space-y-4">
                  <h2 className={`text-3xl md:text-4xl font-bold uppercase whitespace-nowrap ${isDark ? 'text-white' : 'text-black'}`}>
{t('home1.welcome.title')}
                  </h2>
                  <h3 className="text-xl md:text-2xl text-red-600 font-semibold whitespace-nowrap">
{t('home1.welcome.subtitle')}
                  </h3>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-black'}`}>
{t('home1.welcome.description')}
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <a
                  href="/services"
                  className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl mt-8 inline-block"
                >
                  {t('home1.welcome.viewButton')}
                </a>
              </ScrollAnimation>
            </div>

            {/* Right Side - Image */}
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/images/RWELCOME.jpg"
                    alt="Welcome to our restaurant"
                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section id="menu" className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
{t('home1.signatureDishes.title')}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-lg whitespace-nowrap mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
{t('home1.signatureDishes.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          {/* Dishes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <ScrollAnimation key={dish.id} animation="fade-in" stagger={`scroll-stagger-${(index % 6) + 1}`}>
                <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border hover:border-red-200 group ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      {dish.isChefSpecial && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.chefSpecial')}
                        </span>
                      )}
                      {dish.isPopular && (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.popular')}
                        </span>
                      )}
                      {dish.isPremium && (
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.premium')}
                        </span>
                      )}
                      {dish.isHealthy && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.healthy')}
                        </span>
                      )}
                      {dish.isFreshCatch && (
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.freshCatch')}
                        </span>
                      )}
                      {dish.isDessert && (
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
{t('home1.signatureDishes.badges.dessert')}
                        </span>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white text-2xl font-bold">${dish.price}</div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h3 className="text-2xl font-bold mb-3">{dish.name}</h3>
                        <p className="text-gray-200 mb-4 leading-relaxed">{dish.description}</p>
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-300">({dish.rating})</span>
                        </div>
                        <div className="text-3xl font-bold text-red-400 mb-4">${dish.price}</div>
                        <a
                          href="/contact"
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold inline-block"
                        >
{t('home1.signatureDishes.orderNow')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-black text-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center space-y-8 h-[500px]">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
{t('home1.culinaryJourney.title')}
                  </h2>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
{t('home1.culinaryJourney.description')}
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-2 gap-6">
                  {restaurantStats.map((stat, index) => (
                    <div key={index} className={`text-center p-6 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/10'}`}>
                      <div className="text-3xl font-bold text-red-500 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
              
            </div>

            {/* Right Side - Image */}
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
              <div className="relative h-[500px]">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-full">
                  <img
                    src="/images/Our Culinary Journey.jpg"
                    alt="Our Culinary Journey"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
{t('home1.testimonials.title')}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
{t('home1.testimonials.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={testimonial.id} animation="fade-in" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border hover:border-red-200 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <p className={`leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{testimonial.content}"
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>






      {/* Contact Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('/images/RHCTA.jpg')`
          }}
        ></div>
        
        {/* Dynamic Overlay for better text readability */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/50'}`}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
{t('home1.contact.title')}
                  </h2>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className="text-lg text-gray-300 leading-relaxed">
{t('home1.contact.subtitle')}
                </p>
              </ScrollAnimation>
              
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex gap-4 justify-center">
                  <a
                    href="/contact"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
{t('home1.contact.bookNow')}
                  </a>
                  <a
                    href="/services"
                    className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300"
                  >
{t('home1.contact.viewMenu')}
                  </a>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 