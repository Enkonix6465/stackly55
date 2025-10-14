import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Blog() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [isDark, setIsDark] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const user = getCurrentUser()

  // Restaurant-themed blog posts
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Perfect Pasta: Traditional Italian Techniques",
      excerpt: "Discover the secrets behind crafting authentic Italian pasta from scratch. Learn about traditional methods, flour types, and the importance of timing in creating the perfect al dente texture.",
      image: "/images/Indian thali.jpeg",
      category: "Italian Cuisine",
      author: "Chef Marco Rossi",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Seafood: Building an Eco-Friendly Menu",
      excerpt: "Explore how top restaurants are incorporating sustainable seafood practices. From sourcing to preparation, learn how to create delicious dishes while protecting our oceans.",
      image: "/images/contact-side.jpg",
      category: "Sustainability",
      author: "Chef Sarah Chen",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      featured: true
    },
    {
      id: 3,
      title: "Wine Pairing Masterclass: Red Wines for Every Occasion",
      excerpt: "Master the art of wine pairing with our comprehensive guide. From bold Cabernets to elegant Pinot Noirs, discover which wines complement different dishes and occasions.",
      image: "/images/contact 1.jpg",
      category: "Wine & Beverages",
      author: "Sommelier James Wilson",
      date: "Dec 10, 2024",
      readTime: "10 min read",
      featured: true
    }
  ]

  const categories = [
    { name: 'all', label: 'All Articles', count: 12 },
    { name: 'italian', label: 'Italian Cuisine', count: 4 },
    { name: 'sustainability', label: 'Sustainability', count: 3 },
    { name: 'wine', label: 'Wine & Beverages', count: 5 }
  ]

  const trendingTopics = [
    "Farm-to-Table",
    "Molecular Gastronomy", 
    "Plant-Based Menus",
    "Craft Cocktails",
    "Seasonal Ingredients"
  ]

  const testimonials = [
    {
      id: 1,
      quote: t('blog.testimonials.testimonial1.quote'),
      author: t('blog.testimonials.testimonial1.author'),
      title: t('blog.testimonials.testimonial1.title'),
      image: "/images/RB1.jpg",
      rating: 5
    },
    {
      id: 2,
      quote: t('blog.testimonials.testimonial2.quote'),
      author: t('blog.testimonials.testimonial2.author'),
      title: t('blog.testimonials.testimonial2.title'),
      image: "/images/RB2C.jpg",
      rating: 5
    },
    {
      id: 3,
      quote: t('blog.testimonials.testimonial3.quote'),
      author: t('blog.testimonials.testimonial3.author'),
      title: t('blog.testimonials.testimonial3.title'),
      image: "/images/RB3C.jpg",
      rating: 5
    }
  ]

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'} style={{ minHeight: '100vh' }}>
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center text-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/RBlog.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl w-full">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <p className="text-xs sm:text-sm tracking-widest text-red-400 font-medium uppercase px-4">
              {t('blog.hero.tagline')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6 px-4" style={{ fontFamily: 'serif' }}>
              {t('blog.hero.title')}
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 px-4">
              {t('blog.hero.subtitle')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
            <div className="mt-6 sm:mt-8 flex justify-center px-4">
              <a
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
              >
                Connect
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Culinary Categories Section */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'serif' }}>{t('blog.categories.title')}</h2>
            </ScrollAnimation>
          </div>
          
          {/* Category Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: t('blog.categories.italianCuisine.title'),
                description: t('blog.categories.italianCuisine.description'),
                image: "/images/RB!.jpg",
                link: "/blog/italian"
              },
              {
                title: t('blog.categories.wineBeverages.title'), 
                description: t('blog.categories.wineBeverages.description'),
                image: "/images/RB2.jpg",
                link: "/blog/wine"
              },
              {
                title: t('blog.categories.dessertsPastries.title'),
                description: t('blog.categories.dessertsPastries.description'),
                image: "/images/RB3.jpg", 
                link: "/blog/desserts"
              }
            ].map((category, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5'];
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3';
              
              return (
                <ScrollAnimation key={index} animation="fade-in" stagger={staggerClass}>
                  <div 
                    className="group relative h-[250px] sm:h-[300px] lg:h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    onClick={() => navigate(category.link)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Navigation Icon */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-300 border-2 border-white/50 group-hover:border-red-500">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700 group-hover:text-red-600 transform rotate-45 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-red-300 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800'} text-white relative overflow-hidden`}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 border border-red-500 rounded-full"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-12 sm:w-24 h-12 sm:h-24 border border-red-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-8 sm:w-16 h-8 sm:h-16 border border-red-500 rounded-full"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-red-500 text-sm sm:text-lg font-medium tracking-widest uppercase">
                    {t('blog.whyChooseUs.tagline')}
                  </h3>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight px-4 sm:px-0" style={{ fontFamily: 'serif' }}>
                    {t('blog.whyChooseUs.title')}
                  </h2>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                  {t('blog.whyChooseUs.description1')}
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-4 sm:px-0">
                  {t('blog.whyChooseUs.description2')}
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="px-4 sm:px-0">
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center">
                    {t('blog.whyChooseUs.bookTableButton')}
                  </button>
                </div>
              </ScrollAnimation>

              {/* Small Restaurant Image */}
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-5">
                <div className="px-4 sm:px-0">
                  <div className="relative w-48 sm:w-56 lg:w-64 h-36 sm:h-40 lg:h-48 rounded-lg overflow-hidden border-2 border-red-500">
                    <img
                      src="/images/TEAshop.jpg"
                      alt="Tea shop interior"
                      className="w-full h-full object-cover"
                    />
                    {/* Curved decorative line */}
                    <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-red-500 rounded-tl-lg"></div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Content - Main Restaurant Image */}
            <div className="relative">
              <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
                <div className="relative px-4 sm:px-0">
                  {/* Main Restaurant Image */}
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
                    <img
                      src="/images/spacious rustic coffee shop with high ceiling.jpg"
                      alt="Elegant restaurant dining"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Red curved decorative elements */}
                    <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-t-2 border-r-2 border-red-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 border-b-2 border-l-2 border-red-500 rounded-bl-lg"></div>
                  </div>

                </div>
              </ScrollAnimation>
            </div>
          </div>

        </div>
      </section>

      {/* Restaurant Statistics */}
      <section className="py-10 sm:py-16 md:py-20 relative" style={{
        backgroundImage: 'url(/images/RB4.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dynamic overlay for better text readability */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/50'}`}></div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white px-4" style={{ fontFamily: 'serif' }}>
                {t('blog.achievements.title')}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className="text-gray-200 max-w-2xl mx-auto text-base sm:text-lg px-4">
                {t('blog.achievements.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 gap-4 sm:gap-8">
              {[
                { number: "7+", label: t('blog.achievements.yearsExcellence'), icon: "⭐" },
                { number: "500+", label: t('blog.achievements.menuItems'), icon: "🍽️" },
                { number: "15+", label: t('blog.achievements.awardsWon'), icon: "🏆" },
                { number: "50K+", label: t('blog.achievements.happyCustomers'), icon: "😊" }
              ].map((stat, index) => {
                const staggerClasses = ['scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5'];
                const staggerClass = staggerClasses[index] || 'scroll-stagger-2';
                
                return (
                  <ScrollAnimation key={index} animation="fade-in" stagger={staggerClass}>
                    <div className={`text-center p-4 sm:p-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${isDark ? 'border-gray-600/30 hover:border-red-500' : 'border-white/30 hover:border-red-500'} hover:scale-105`}>
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1 sm:mb-2">{stat.number}</div>
                      <div className={`text-xs sm:text-sm lg:text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{stat.label}</div>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-10 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h3 className={`text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('blog.testimonials.tagline')}
              </h3>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'serif' }}>
                {t('blog.testimonials.title')}
              </h2>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className={`rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {/* Red vertical line */}
              <div className="absolute left-4 sm:left-8 top-8 bottom-8 w-1 bg-red-500 rounded-full"></div>
              
              
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Left Content */}
                <div className="relative pl-6 sm:pl-8">
                  {/* Opening quote */}
                  <div className="absolute -top-2 sm:-top-4 -left-1 sm:-left-2 text-red-300 text-3xl sm:text-4xl lg:text-6xl font-bold">❝</div>
                  
                  <blockquote className={`italic text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 relative ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{testimonials[currentTestimonial].quote}"
                    
                    {/* Closing quote */}
                    <span className="absolute -bottom-1 sm:-bottom-2 text-red-300 text-2xl sm:text-3xl lg:text-4xl font-bold">❞</span>
                  </blockquote>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className={`font-bold text-base sm:text-lg uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonials[currentTestimonial].author}</h4>
                    <p className={`text-xs sm:text-sm uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{testimonials[currentTestimonial].title}</p>
                    <div className="flex space-x-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm sm:text-lg">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="flex justify-center md:justify-end">
                  <div className="relative">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 sm:border-4 border-white shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Pagination Dots */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-red-500' : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-10 sm:py-16 md:py-24 text-white overflow-hidden" style={{
        backgroundImage: 'url(/images/RCTAB.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dynamic overlay for better text readability */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/60'}`}></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover"></div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center z-10">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4" style={{ fontFamily: 'serif' }}>
              {t('blog.cta.title')}
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 px-4">
              {t('blog.cta.subtitle')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <a
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg w-full sm:w-auto inline-flex items-center justify-center"
              >
                {t('blog.cta.makeReservationButton')}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}