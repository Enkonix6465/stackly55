import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Reservations() {
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

  // Reservation options
  const reservationOptions = [
    {
      id: 1,
      name: t('reservations.diningOptions.fineDiningTable.name'),
      description: t('reservations.diningOptions.fineDiningTable.description'),
      price: 0,
      image: "/images/Lobster Risotto.jpg",
      category: t('reservations.diningOptions.fineDiningTable.category'),
      isPremium: true,
      capacity: t('reservations.diningOptions.fineDiningTable.capacity')
    },
    {
      id: 2,
      name: t('reservations.diningOptions.chefsTable.name'),
      description: t('reservations.diningOptions.chefsTable.description'),
      price: 50,
      image: "/images/Prime Beef Tenderloin.jpg",
      category: t('reservations.diningOptions.chefsTable.category'),
      isExclusive: true,
      capacity: t('reservations.diningOptions.chefsTable.capacity')
    },
    {
      id: 3,
      name: t('reservations.diningOptions.privateDiningRoom.name'),
      description: t('reservations.diningOptions.privateDiningRoom.description'),
      price: 100,
      image: "/images/Mediterranean Seafood Pasta.jpg",
      category: t('reservations.diningOptions.privateDiningRoom.category'),
      isPrivate: true,
      capacity: t('reservations.diningOptions.privateDiningRoom.capacity')
    },
    {
      id: 4,
      name: t('reservations.diningOptions.outdoorTerrace.name'),
      description: t('reservations.diningOptions.outdoorTerrace.description'),
      price: 0,
      image: "/images/Signature Grilled Salmon.jpg",
      category: t('reservations.diningOptions.outdoorTerrace.category'),
      isOutdoor: true,
      capacity: t('reservations.diningOptions.outdoorTerrace.capacity')
    },
    {
      id: 5,
      name: t('reservations.diningOptions.wineBarSeating.name'),
      description: t('reservations.diningOptions.wineBarSeating.description'),
      price: 0,
      image: "/images/Chocolate Lava Cak.jpg",
      category: t('reservations.diningOptions.wineBarSeating.category'),
      isCasual: true,
      capacity: t('reservations.diningOptions.wineBarSeating.capacity')
    },
    {
      id: 6,
      name: t('reservations.diningOptions.eventSpace.name'),
      description: t('reservations.diningOptions.eventSpace.description'),
      price: 200,
      image: "/images/Garden Fresh Bowl.jpg",
      category: t('reservations.diningOptions.eventSpace.category'),
      isEvent: true,
      capacity: t('reservations.diningOptions.eventSpace.capacity')
    }
  ]

  // Time slots
  const timeSlots = [
    {
      name: t('reservations.timeSlots.earlyEvening.name'),
      time: t('reservations.timeSlots.earlyEvening.time'),
      description: t('reservations.timeSlots.earlyEvening.description'),
      price: 0,
      availability: "High"
    },
    {
      name: t('reservations.timeSlots.primeTime.name'),
      time: t('reservations.timeSlots.primeTime.time'),
      description: t('reservations.timeSlots.primeTime.description'),
      price: 0,
      availability: "Limited"
    },
    {
      name: t('reservations.timeSlots.lateEvening.name'),
      time: t('reservations.timeSlots.lateEvening.time'),
      description: t('reservations.timeSlots.lateEvening.description'),
      price: 0,
      availability: "Available"
    }
  ]

  // Special packages
  const specialPackages = [
    {
      name: t('reservations.specialPackages.romanticDinner.name'),
      description: t('reservations.specialPackages.romanticDinner.description'),
      duration: t('reservations.specialPackages.romanticDinner.duration'),
      price: 150,
      image: "/images/RS1.jpg",
      includes: t('reservations.specialPackages.romanticDinner.includes')
    },
    {
      name: t('reservations.specialPackages.businessDinner.name'),
      description: t('reservations.specialPackages.businessDinner.description'),
      duration: t('reservations.specialPackages.businessDinner.duration'),
      price: 200,
      image: "/images/RS2.jpg",
      includes: t('reservations.specialPackages.businessDinner.includes')
    },
    {
      name: t('reservations.specialPackages.celebration.name'),
      description: t('reservations.specialPackages.celebration.description'),
      duration: t('reservations.specialPackages.celebration.duration'),
      price: 300,
      image: "/images/RS3.jpg",
      includes: t('reservations.specialPackages.celebration.includes')
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: t('reservations.testimonials.emmaJames.name'),
      role: t('reservations.testimonials.emmaJames.role'),
      content: t('reservations.testimonials.emmaJames.content'),
      rating: 5,
      image: "/images/RS6Testimonal1.jpg"
    },
    {
      name: t('reservations.testimonials.michaelRodriguez.name'),
      role: t('reservations.testimonials.michaelRodriguez.role'),
      content: t('reservations.testimonials.michaelRodriguez.content'),
      rating: 5,
      image: "/images/RS6Testimonal2.jpg"
    },
    {
      name: t('reservations.testimonials.sarahThompson.name'),
      role: t('reservations.testimonials.sarahThompson.role'),
      content: t('reservations.testimonials.sarahThompson.content'),
      rating: 5,
      image: "/images/RS6Testimonal3.jpg"
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
            <source src="/Reservations Excellence.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white whitespace-nowrap">
              {t('reservations.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto whitespace-nowrap">
              {t('reservations.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('reservations.makeReservation')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Dining Options Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('reservations.diningOptions.title')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('reservations.diningOptions.subtitle')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('reservations.diningOptions.description')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reservationOptions.map((option, index) => (
              <ScrollAnimation key={option.id} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      {option.isPremium && (
                        <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.premium')}
                        </span>
                      )}
                      {option.isExclusive && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.exclusive')}
                        </span>
                      )}
                      {option.isPrivate && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.private')}
                        </span>
                      )}
                      {option.isOutdoor && (
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.outdoor')}
                        </span>
                      )}
                      {option.isCasual && (
                        <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.casual')}
                        </span>
                      )}
                      {option.isEvent && (
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('reservations.diningOptions.events')}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {option.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {option.name}
                      </h3>
                      <span className="text-red-500 font-bold text-lg">
                        {option.price === 0 ? t('reservations.diningOptions.free') : `$${option.price}`}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {option.category}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Time Slots Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('reservations.timeSlots.title')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('reservations.timeSlots.subtitle')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('reservations.timeSlots.description')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timeSlots.map((slot, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`text-center p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">🕐</span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {slot.name}
                  </h3>
                  <p className="text-red-500 font-semibold mb-2">{slot.time}</p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {slot.description}
                  </p>
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      slot.availability === 'High' ? 'bg-green-100 text-green-800' :
                      slot.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {slot.availability === 'High' ? t('reservations.timeSlots.availability.high') :
                       slot.availability === 'Limited' ? t('reservations.timeSlots.availability.limited') :
                       t('reservations.timeSlots.availability.available')}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Special Packages Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('reservations.specialPackages.title')}</span>
              <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('reservations.specialPackages.subtitle')}
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('reservations.specialPackages.description')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialPackages.map((pkg, index) => (
              <ScrollAnimation key={index} animation="slide-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                      <p className="text-sm opacity-90">{pkg.duration}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.description}
                    </p>
                    <div className="mb-4">
                      <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('reservations.specialPackages.includes')}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {pkg.includes}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-500">${pkg.price}</span>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                        {t('reservations.specialPackages.bookPackage')}
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
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('reservations.testimonials.title')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('reservations.testimonials.subtitle')}
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

      {/* Reservation Form Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">{t('reservations.reservationForm.title')}</span>
            <h2 className={`text-5xl font-bold mt-4 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {t('reservations.reservationForm.subtitle')}
            </h2>
            <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('reservations.reservationForm.description')}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-up" stagger="scroll-stagger-2">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.date')}
                  </label>
                  <input
                    type="date"
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.time')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('reservations.reservationForm.times.5:00PM')}</option>
                    <option>{t('reservations.reservationForm.times.5:30PM')}</option>
                    <option>{t('reservations.reservationForm.times.6:00PM')}</option>
                    <option>{t('reservations.reservationForm.times.6:30PM')}</option>
                    <option>{t('reservations.reservationForm.times.7:00PM')}</option>
                    <option>{t('reservations.reservationForm.times.7:30PM')}</option>
                    <option>{t('reservations.reservationForm.times.8:00PM')}</option>
                    <option>{t('reservations.reservationForm.times.8:30PM')}</option>
                    <option>{t('reservations.reservationForm.times.9:00PM')}</option>
                    <option>{t('reservations.reservationForm.times.9:30PM')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.partySize')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('reservations.reservationForm.guests.2')}</option>
                    <option>{t('reservations.reservationForm.guests.4')}</option>
                    <option>{t('reservations.reservationForm.guests.6')}</option>
                    <option>{t('reservations.reservationForm.guests.8')}</option>
                    <option>{t('reservations.reservationForm.guests.10')}</option>
                    <option>{t('reservations.reservationForm.guests.12+')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.diningOption')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('reservations.diningOptions.fineDiningTable.name')}</option>
                    <option>{t('reservations.diningOptions.chefsTable.name')}</option>
                    <option>{t('reservations.diningOptions.privateDiningRoom.name')}</option>
                    <option>{t('reservations.diningOptions.outdoorTerrace.name')}</option>
                    <option>{t('reservations.diningOptions.wineBarSeating.name')}</option>
                    <option>{t('reservations.diningOptions.eventSpace.name')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.specialOccasion')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('reservations.reservationForm.occasions.anniversary')}</option>
                    <option>{t('reservations.reservationForm.occasions.birthday')}</option>
                    <option>{t('reservations.reservationForm.occasions.businessDinner')}</option>
                    <option>{t('reservations.reservationForm.occasions.dateNight')}</option>
                    <option>{t('reservations.reservationForm.occasions.celebration')}</option>
                    <option>{t('reservations.reservationForm.occasions.other')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {t('reservations.reservationForm.specialPackage')}
                  </label>
                  <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                    <option>{t('reservations.reservationForm.packages.none')}</option>
                    <option>{t('reservations.reservationForm.packages.romanticDinner')}</option>
                    <option>{t('reservations.reservationForm.packages.businessDinner')}</option>
                    <option>{t('reservations.reservationForm.packages.celebration')}</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
                {t('reservations.reservationForm.confirmReservation')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
