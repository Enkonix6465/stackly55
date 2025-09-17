import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function OngoingSupport() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } else {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  if (!user) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Navbar user={user} />



{/*1 Showcase */}
<section
  id="showcase"
  className="relative overflow-hidden h-screen flex items-center justify-center text-center"
>
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/vedio12.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
        {t('ongoingSupport.showcase.title')}
      </h1>
      <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
        {t('ongoingSupport.showcase.subtitle')}
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/contact"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('ongoingSupport.showcase.connectButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>   


{/* 2 Services - Ongoing Support Hero */}
<section
  id="hero"
  className={`relative overflow-hidden border-t transition-colors duration-500 ${
    isDark
      ? 'bg-gray-900 border-gray-700'
      : 'bg-white border-black/10'
  }`}
>  <div className="mx-auto max-w-6xl px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
    <ScrollAnimation animation="fade-in-left" threshold={0.2} triggerOnce={true}>
      <div>
        <p className={`text-sm tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>
          {t('ongoingSupport.hero.tagline')}
        </p>

        <h1 className={`mt-2 text-4xl md:text-5xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
          {t('ongoingSupport.hero.title')}
        </h1>

        <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-black'}`}>
          We don't just deliver and disappear—we stay with you every step of the way. 
          Our ongoing support services ensure your systems, websites, and digital tools 
          continue to perform at their best. From regular updates and troubleshooting 
          to proactive monitoring and quick assistance, we've got you covered so you can 
          focus on growing your business with confidence.
        </p>
      </div>
    </ScrollAnimation>

    <ScrollAnimation animation="fade-in-right" threshold={0.2} triggerOnce={true} stagger="delay-200">
      <div className="justify-self-center relative">
        {/* image */}
        <img
          src="/images/Support.jpg" 
          alt="Ongoing Support illustration"
          className="h-56 w-56 md:h-72 md:w-72 object-cover shadow-lg"
        />
      </div>
    </ScrollAnimation>
  </div>
</section>

      
      


      {/* Service Overview */}
      <section
      className={`py-20 transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >         <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fade-in-left" threshold={0.2} triggerOnce={true}>
              <div>
                <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
                  {t('ongoingSupport.serviceOverview.title')}
                </h2>
                <p className={`text-lg mb-6 leading-relaxed ${isDark ? "text-gray-400" : "text-black/70"}`}>
                  {t('ongoingSupport.serviceOverview.description')}
                </p>
                <div className="space-y-4">
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-100">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ongoingSupport.serviceOverview.features.emergencySupport')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ongoingSupport.serviceOverview.features.securityUpdates')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ongoingSupport.serviceOverview.features.performanceMonitoring')}</span>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in-right" threshold={0.2} triggerOnce={true} stagger="delay-200">
              <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('ongoingSupport.serviceOverview.supportServices.title')}
                </h3>
                <ul className="space-y-3">
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-100">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ongoingSupport.serviceOverview.supportServices.websiteMaintenance')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ongoingSupport.serviceOverview.supportServices.securityUpdates')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ongoingSupport.serviceOverview.supportServices.contentUpdates')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ongoingSupport.serviceOverview.supportServices.performanceOptimization')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-500">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ongoingSupport.serviceOverview.supportServices.technicalSupport')}</span>
                    </li>
                  </ScrollAnimation>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 4 Process Section */}
<section
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >  <div className="mx-auto max-w-7xl px-4">
    {/* Heading */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('ongoingSupport.process.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {t('ongoingSupport.process.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Step 1 */}
      <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('ongoingSupport.process.steps.discovery.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ongoingSupport.process.steps.discovery.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 2 */}
      <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('ongoingSupport.process.steps.design.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ongoingSupport.process.steps.design.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 3 */}
      <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('ongoingSupport.process.steps.development.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ongoingSupport.process.steps.development.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 4 - Ongoing Support */}
      <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">4</span>
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('ongoingSupport.process.steps.ongoingSupport.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ongoingSupport.process.steps.ongoingSupport.description')}
          </p>
        </div>
      </ScrollAnimation>
    </div>
  </div>
</section>
{/* Ongoing Support */}
<section
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-white"
      }`}
    >   <div className="mx-auto max-w-7xl px-4">
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('ongoingSupport.solutions.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {t('ongoingSupport.solutions.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { name: t('ongoingSupport.solutions.services.regularUpdates'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 50 50"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path stroke="#306cfe" d="M29.167 37.5H18.75a12.5 12.5 0 0 1-7.208-22.687m9.291-2.313H31.25a12.5 12.5 0 0 1 7.208 22.688"></path><path stroke="#344054" d="m25 33.333l4.167 4.167L25 41.667m0-25L20.833 12.5L25 8.333"></path></g></svg>, desc: t('ongoingSupport.solutions.serviceDescriptions.regularUpdatesDesc') }, 
        { name: t('ongoingSupport.solutions.services.securityMonitoring'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#b0bec5" d="M16.77 19.75c-1 0-1.7.8-1.7 1.8v.1c-1.5 25.91 3.03 59.27 24.01 83.52c12.1 14.7 23.91 18.53 24.51 18.73c0 0 .28.09.54.09s.57-.1.57-.1c.5-.2 12.48-4.02 24.49-18.72c19.91-24.21 24.01-58.82 24.01-83.52v-.1c0-1-.8-1.8-1.7-1.8c-.3 0-29.11-1-46.01-15.3c-.7-.6-1.7-.6-2.4 0c-17.11 14.2-46.02 15.2-46.32 15.3"></path><path fill="#84b0c1" d="M111.49 19.75c-.3 0-29.11-1-46.01-15.3c-.4-.35-.83-.45-1.24-.45h-.11v120c.27-.01.62-.11.62-.12c.6-.25 12.44-4 24.44-18.7c19.91-24.21 24.01-58.82 24.01-83.52v-.1c0-1.01-.8-1.81-1.71-1.81"></path><path fill="#2f7889" d="M26.33 28.31c-.82 0-1.02 1.02-1.02 1.74v.1c0 19.72 3.06 47.4 19 66.71c9.6 11.75 19 14.81 19.41 14.91l.41.1l.41-.1c.41-.1 9.81-3.17 19.41-14.91c15.94-19.31 19-46.89 19-66.71v-.1c0-.82-.41-1.43-1.23-1.43h.1c-.2 0-23.19-.82-36.67-12.16c-1.19-.98-1.94-.2-1.94-.2C49.63 27.6 26.64 28.31 26.33 28.31"></path><path fill="#c9e3e6" d="M29.18 30.07c-.76 0-.94.96-.94 1.64v.1c0 18.57 2.83 44.65 17.57 62.84c8.88 11.07 17.57 13.95 17.95 14.05l.38.1l.38-.1c.38-.1 9.07-2.98 17.95-14.05c14.73-18.19 17.57-44.17 17.57-62.84v-.1c0-.77-.38-1.35-1.13-1.35H99c-.19 0-21.44-.77-33.91-11.45c-.94-.95-1.79-.19-1.79-.19C50.72 29.4 29.47 30.07 29.18 30.07"></path><path fill="#b0bec5" d="M98.89 30.36h.09c-.19 0-21.44-.77-33.91-11.45c-.34-.34-.66-.46-.94-.47v90.35l.38-.1c.38-.1 9.07-2.98 17.95-14.05c14.73-18.19 17.57-44.17 17.57-62.84v-.1c-.01-.76-.38-1.34-1.14-1.34"></path><circle cx={70.63} cy={14.44} r={1.93} fill="#37474f"></circle><circle cx={82.21} cy={19.67} r={1.93} fill="#37474f"></circle><circle cx={95.01} cy={23.21} r={1.93} fill="#37474f"></circle><circle cx={108.15} cy={25.14} r={1.93} fill="#37474f"></circle><circle cx={108.57} cy={36.94} r={1.93} fill="#37474f"></circle><circle cx={107.02} cy={50.76} r={1.93} fill="#37474f"></circle><circle cx={64.08} cy={118.11} r={1.93} fill="#37474f"></circle><circle cx={75.4} cy={112.71} r={1.93} fill="#37474f"></circle><circle cx={85.74} cy={102.71} r={1.93} fill="#37474f"></circle><circle cx={93.81} cy={91.27} r={1.93} fill="#37474f"></circle><circle cx={99.67} cy={79} r={1.93} fill="#37474f"></circle><circle cx={104.27} cy={64.65} r={1.93} fill="#37474f"></circle><circle cx={70.15} cy={13.8} r={1.93} fill="#b9e4ea"></circle><circle cx={81.73} cy={19.03} r={1.93} fill="#b9e4ea"></circle><circle cx={94.53} cy={22.57} r={1.93} fill="#b9e4ea"></circle><circle cx={107.66} cy={24.5} r={1.93} fill="#b9e4ea"></circle><circle cx={108.09} cy={36.3} r={1.93} fill="#b9e4ea"></circle><circle cx={106.53} cy={50.12} r={1.93} fill="#b9e4ea"></circle><circle cx={63.6} cy={117.47} r={1.93} fill="#eee"></circle><circle cx={74.92} cy={112.07} r={1.93} fill="#b9e4ea"></circle><circle cx={85.26} cy={102.07} r={1.93} fill="#b9e4ea"></circle><circle cx={93.33} cy={90.63} r={1.93} fill="#b9e4ea"></circle><circle cx={99.19} cy={78.36} r={1.93} fill="#b9e4ea"></circle><circle cx={103.79} cy={64.01} r={1.93} fill="#b9e4ea"></circle><circle cx={57.97} cy={14.44} r={1.93} fill="#2f7889"></circle><circle cx={46.39} cy={19.67} r={1.93} fill="#2f7889"></circle><circle cx={33.59} cy={23.21} r={1.93} fill="#2f7889"></circle><circle cx={20.45} cy={25.14} r={1.93} fill="#2f7889"></circle><circle cx={20.02} cy={36.94} r={1.93} fill="#2f7889"></circle><circle cx={21.58} cy={50.76} r={1.93} fill="#2f7889"></circle><circle cx={53.19} cy={112.71} r={1.93} fill="#2f7889"></circle><circle cx={42.86} cy={102.71} r={1.93} fill="#2f7889"></circle><circle cx={34.79} cy={91.27} r={1.93} fill="#2f7889"></circle><circle cx={28.92} cy={79} r={1.93} fill="#2f7889"></circle><circle cx={24.33} cy={64.65} r={1.93} fill="#2f7889"></circle><circle cx={57.54} cy={13.8} r={1.93} fill="#eee"></circle><circle cx={45.95} cy={19.03} r={1.93} fill="#eee"></circle><circle cx={33.16} cy={22.57} r={1.93} fill="#eee"></circle><circle cx={20.02} cy={24.5} r={1.93} fill="#eee"></circle><circle cx={19.59} cy={36.3} r={1.93} fill="#eee"></circle><circle cx={21.15} cy={50.12} r={1.93} fill="#eee"></circle><circle cx={52.76} cy={112.07} r={1.93} fill="#eee"></circle><circle cx={42.42} cy={102.07} r={1.93} fill="#eee"></circle><circle cx={34.36} cy={90.63} r={1.93} fill="#eee"></circle><circle cx={28.49} cy={78.36} r={1.93} fill="#eee"></circle><circle cx={23.89} cy={64.01} r={1.93} fill="#eee"></circle></svg>, desc: t('ongoingSupport.solutions.serviceDescriptions.securityMonitoringDesc') }, 
        { name: t('ongoingSupport.solutions.services.performanceOptimization'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 16 16"><path fill="none" stroke="#eed49f" strokeLinecap="round" strokeLinejoin="round" d="M2.85 9.301a.644.65 0 0 1-.502-1.06L8.72 1.605a.322.325 0 0 1 .554.3L8.039 5.82a.644.65 0 0 0 .605.878h4.506a.644.65 0 0 1 .502 1.06L7.28 14.395a.322.325 0 0 1-.554-.3l1.236-3.916a.644.65 0 0 0-.605-.878Z" strokeWidth={1}></path></svg>, desc: t('ongoingSupport.solutions.serviceDescriptions.performanceOptimizationDesc') }, 
        { name: t('ongoingSupport.solutions.services.technicalSupport'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 48 48"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path fill="#2f88ff" stroke="#000" d="M44.0001 24C44.0001 35.0457 35.0458 44 24.0001 44C18.0266 44 4.00006 44 4.00006 44C4.00006 44 4.00006 29.0722 4.00006 24C4.00006 12.9543 12.9544 4 24.0001 4C35.0458 4 44.0001 12.9543 44.0001 24Z"></path><path stroke="#fff" d="M14 18L32 18"></path><path stroke="#fff" d="M14 26H32"></path><path stroke="#fff" d="M14 34H24"></path></g></svg>, desc: t('ongoingSupport.solutions.serviceDescriptions.technicalSupportDesc') } 
      ].map((service, index) => {
        const animations = ['fade-in-up', 'scale-in', 'bounce-in', 'zoom-in']
        const animation = animations[index % animations.length]
        return (
        <ScrollAnimation 
          key={service.name} 
          animation={animation} 
          threshold={0.2} 
          triggerOnce={true} 
          stagger={`delay-${(index + 1) * 100}`}
        >
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-3 flex justify-center">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{service.desc}</p>
          </div>
        </ScrollAnimation>
        )
      })}
    </div>
  </div>
</section>


      
      {/* Call to Action */}
<section
      className={`relative py-24 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url('/images/CTAc.jpg')`
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    {/* Heading */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">
        {t('ongoingSupport.cta.title')}
      </h2>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
      <p className="text-lg max-w-2xl mx-auto mb-10 text-white">
        {t('ongoingSupport.cta.subtitle')}
      </p>
    </ScrollAnimation>

    {/* Buttons */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('ongoingSupport.cta.startProjectButton')}
        </button>
        <button
          onClick={() => navigate('/services')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
          {t('ongoingSupport.cta.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>


      <Footer />
    </div>
  )
}
