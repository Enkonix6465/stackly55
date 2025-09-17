import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function About() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [activeTimeline, setActiveTimeline] = useState(0)

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

  const timelineData = [
    {
      year: "1985",
      title: "The Beginning",
      description: "Chef Marco Rossi opened our doors with a dream to bring authentic Italian cuisine to the community.",
      image: "/images/platform.jpg"
    },
    {
      year: "1995",
      title: "First Expansion",
      description: "We expanded our kitchen and added our signature wood-fired pizza oven, becoming a local favorite.",
      image: "/images/platform.jpg"
    },
    {
      year: "2005",
      title: "Second Generation",
      description: "Chef Alessandro joined his father, bringing modern techniques while preserving traditional recipes.",
      image: "/images/platform.jpg"
    },
    {
      year: "2015",
      title: "Award Recognition",
      description: "We received the 'Best Italian Restaurant' award from the local culinary association.",
      image: "/images/platform.jpg"
    },
    {
      year: "2023",
      title: "Today",
      description: "Continuing our legacy with innovative dishes and warm hospitality for our community.",
      image: "/images/platform.jpg"
    }
  ]

  const testimonials = [
    {
      name: t('aboutPage.testimonials.items.sarah.name'),
      role: t('aboutPage.testimonials.items.sarah.role'),
      content: t('aboutPage.testimonials.items.sarah.content'),
      rating: 5
    },
    {
      name: t('aboutPage.testimonials.items.michael.name'),
      role: t('aboutPage.testimonials.items.michael.role'),
      content: t('aboutPage.testimonials.items.michael.content'),
      rating: 5
    },
    {
      name: t('aboutPage.testimonials.items.emma.name'),
      role: t('aboutPage.testimonials.items.emma.role'),
      content: t('aboutPage.testimonials.items.emma.content'),
      rating: 5
    }
  ]

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />
      
      {/* Hero Parallax Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/Rabout.mp4" type="video/mp4" />
          </video>
          <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/50'}`}></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-none">
                {t('aboutPage.hero.title')}
              </h1>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light whitespace-nowrap">
                {t('aboutPage.hero.subtitle')}
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-10 py-5 bg-red-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
                  <span className="relative z-10">{t('aboutPage.hero.exploreButton')}</span>
                  <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
                <button className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105">
                  {t('aboutPage.hero.viewMenu')}
                </button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
        
      </section>


      {/* Our Story Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <div className="text-red-600 text-lg font-semibold tracking-wider mb-4">
                {t('aboutPage.story.tagline')}
              </div>
              <h2 className={`text-6xl font-black mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('aboutPage.story.title')}
              </h2>
            </div>
          </ScrollAnimation>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Left Column - Image */}
            <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
              <div className="relative h-full">
                <div className="relative z-10 h-full">
                  <img
                    src="/images/restaurant chefs group portrai.jpg"
                    alt="Our Chef Team"
                    className="w-full h-full object-cover"
                  />
                  {/* Red Border */}
                  <div className="absolute inset-0 border-8 border-red-500 border-l-0 border-t-0"></div>
          </div>
        </div>
            </ScrollAnimation>
            
            {/* Right Column - Text Sections */}
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-3">
              <div className="flex flex-col justify-center h-full space-y-12">
                {/* Our Family Section */}
                <div className={`border-b pb-8 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <h3 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.story.sections.family.title')}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('aboutPage.story.sections.family.description')}
                  </p>
                </div>
                
                {/* Homemade Food Section */}
                <div className={`border-b pb-8 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <h3 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.story.sections.homemade.title')}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('aboutPage.story.sections.homemade.description')}
                  </p>
                  </div>
                
                {/* Authentic with a Twist Section */}
                <div>
                  <h3 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.story.sections.authentic.title')}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('aboutPage.story.sections.authentic.description')}
                  </p>
                  </div>
                </div>
              </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={`text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.features.title')}</h2>
              <p className={`text-xl max-w-3xl mx-auto font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('aboutPage.features.subtitle')}
              </p>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Delicious Pastries */}
              <div className="text-center group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                        </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.features.items.pastries.title')}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('aboutPage.features.items.pastries.description')}
                </p>
                    </div>
                    
              {/* Fresh Juices */}
              <div className="text-center group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                          </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.features.items.juices.title')}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('aboutPage.features.items.juices.description')}
                </p>
                        </div>
                        
              {/* Natural Food */}
              <div className="text-center group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                        </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.features.items.natural.title')}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('aboutPage.features.items.natural.description')}
                </p>
                    </div>
                    
              {/* Tasty Breakfasts */}
              <div className="text-center group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                        </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{t('aboutPage.features.items.breakfasts.title')}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('aboutPage.features.items.breakfasts.description')}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-800 text-white' : 'bg-black text-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-black text-white mb-6">{t('aboutPage.testimonials.title')}</h2>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                {t('aboutPage.testimonials.subtitle')}
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} animation="fade-in" stagger={`scroll-stagger-${index + 2}`}>
                <div className={`backdrop-blur-sm p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="text-white font-bold text-lg">{testimonial.name}</div>
                    <div className="text-red-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Excellence Section */}
      <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <div className="text-red-600 text-lg font-semibold tracking-wider mb-4">
                {t('aboutPage.excellence.tagline')}
              </div>
              <h2 className={`text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('aboutPage.excellence.title')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('aboutPage.excellence.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Award Recognition */}
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-black'} rounded-2xl p-8 text-center text-white hover:transform hover:scale-105 transition-all duration-300`}>
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('aboutPage.excellence.cards.award.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aboutPage.excellence.cards.award.description')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Fresh Ingredients */}
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-white' : 'bg-white'} rounded-2xl p-8 text-center ${isDark ? 'text-black' : 'text-black'} border-2 border-red-600 hover:transform hover:scale-105 transition-all duration-300`}>
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('aboutPage.excellence.cards.fresh.title')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('aboutPage.excellence.cards.fresh.description')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Family Tradition */}
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-black'} rounded-2xl p-8 text-center text-white hover:transform hover:scale-105 transition-all duration-300`}>
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('aboutPage.excellence.cards.family.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aboutPage.excellence.cards.family.description')}
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Statistics Section */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-red-600'} rounded-3xl p-12 text-center`}>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-white">
                  <div className="text-4xl font-black mb-2">38+</div>
                  <div className="text-lg font-semibold">{t('aboutPage.stats.yearsExcellence')}</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl font-black mb-2">50K+</div>
                  <div className="text-lg font-semibold">{t('aboutPage.stats.happyCustomers')}</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl font-black mb-2">200+</div>
                  <div className="text-lg font-semibold">{t('aboutPage.stats.signatureDishes')}</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl font-black mb-2">15</div>
                  <div className="text-lg font-semibold">{t('aboutPage.stats.awardsWon')}</div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/RACTA.jpg"
            alt="Fresh Food Background"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`}></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center">
            {/* Centered Content */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <div className="text-center space-y-8 max-w-4xl">
                <div className="text-red-400 text-lg font-semibold tracking-wider">
                  {t('aboutPage.weBelieve.tagline')}
                </div>
                <h2 className="text-6xl font-black text-white leading-tight">
                  {t('aboutPage.weBelieve.title')}
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  {t('aboutPage.weBelieve.description')}
                </p>
                <button className="px-8 py-4 bg-red-500 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:bg-red-400 hover:scale-105 shadow-lg mx-auto">
                  {t('aboutPage.weBelieve.button')}
              </button>
            </div>
          </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}