
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function EcommerceSolutions() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
  const navigate = useNavigate()
  const { t } = useTranslation()

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

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />


      {/*1 Showcase */}
<section
  id="showcase"
  className={
    'relative overflow-hidden h-screen flex items-center justify-center text-center ' +
    (isDark ? '' : '')
  }
>
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/vedio8.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
        {t('ecommerceSolutions.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
        {t('ecommerceSolutions.showcase.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/contact"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('ecommerceSolutions.showcase.connectButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>
      
     
{/* 2 Services - E-Commerce Solutions Hero */}
<section
  id="hero"
  className={
    'relative overflow-hidden border-t border-black/10 dark:border-gray-700 ' +
    (isDark ? 'bg-gray-900 text-white' : 'bg-white text-black')
  }
>
  <div className="mx-auto max-w-6xl px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
    <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
      <div>
        <p className={isDark ? 'text-sm tracking-widest text-white' : 'text-sm tracking-widest text-black'}>
          {t('ecommerceSolutions.hero.tagline')}
        </p>
        
        <h1 className={isDark ? 'mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-white' : 'mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-black'}>
          {t('ecommerceSolutions.hero.title')}
        </h1>
        
        <p className={isDark ? 'mt-4 text-gray-300' : 'mt-4 text-black'}>
          {t('ecommerceSolutions.hero.description')}
        </p>
      </div>
    </ScrollAnimation>

    <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
      <div className="justify-self-center relative">
        {/* image */}
        <img
          src="/images/ecommerce-solutions.jpg" 
          alt="E-Commerce Solutions illustration"
          className="h-56 w-56 md:h-72 md:w-72 object-cover shadow-lg"
        />
      </div>
    </ScrollAnimation>
  </div>
</section>



      {/* 3 Service Overview */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
              <div>
                <h2 className={isDark ? 'text-4xl font-bold text-white mb-6' : 'text-4xl font-bold text-black mb-6'}>
                  {t('ecommerceSolutions.serviceOverview.title')}
                </h2>
                <p className={isDark ? 'text-lg text-gray-400 mb-6 leading-relaxed' : 'text-lg text-black mb-6 leading-relaxed'}>
                  {t('ecommerceSolutions.serviceOverview.description')}
                </p>
                <div className="space-y-4">
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ecommerceSolutions.serviceOverview.features.securePayment')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ecommerceSolutions.serviceOverview.features.inventoryManagement')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('ecommerceSolutions.serviceOverview.features.customizableDesign')}</span>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
              <div className={`${isDark ? 'bg-gray-900 rounded-2xl shadow-xl p-8' : 'bg-white rounded-2xl shadow-xl p-8'}`}>
                <h3 className={isDark ? 'text-2xl font-bold text-white mb-4' : 'text-2xl font-bold text-gray-900 mb-4'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.title')}</h3>
                <ul className="space-y-3">
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.productCatalog')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.shoppingCart')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.secureCheckout')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.orderTracking')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('ecommerceSolutions.serviceOverview.ecommerceFeatures.adminDashboard')}</span>
                    </li>
                  </ScrollAnimation>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

{/* 4 Process Section */}
<section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
  <div className="mx-auto max-w-7xl px-4">
    {/* Heading */}
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <div className="text-center mb-16">
        <h2 className={isDark ? 'text-4xl font-bold text-white mb-4' : 'text-4xl font-bold text-gray-900 mb-4'}>
          {t('ecommerceSolutions.process.title')}
        </h2>
        <p className={isDark ? 'text-lg text-gray-300 max-w-2xl mx-auto' : 'text-lg text-gray-600 max-w-2xl mx-auto'}>
          {t('ecommerceSolutions.process.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Step 1 */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>{t('ecommerceSolutions.process.steps.strategy.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ecommerceSolutions.process.steps.strategy.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 2 */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>{t('ecommerceSolutions.process.steps.storeDesign.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ecommerceSolutions.process.steps.storeDesign.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 3 */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>{t('ecommerceSolutions.process.steps.development.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ecommerceSolutions.process.steps.development.description')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Step 4 */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
            <span className="text-2xl font-bold text-white">4</span>
          </div>
          <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>{t('ecommerceSolutions.process.steps.launchSupport.title')}</h3>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            {t('ecommerceSolutions.process.steps.launchSupport.description')}
          </p>
        </div>
      </ScrollAnimation>
    </div>
  </div>
</section>

      {/* E-Commerce Solutions */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Heading */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={isDark ? 'text-4xl font-bold text-white mb-4' : 'text-4xl font-bold text-black mb-4'}>
                {t('ecommerceSolutions.solutions.title')}
              </h2>
              <p className={isDark ? 'text-lg text-gray-400 max-w-2xl mx-auto' : 'text-lg text-black max-w-2xl mx-auto'}>
                {t('ecommerceSolutions.solutions.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

    {/* Services Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
         { name: t('ecommerceSolutions.solutions.services.customStorefronts'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="none" stroke="#00796b" strokeMiterlimit={10} strokeWidth={3} d="M26.96 39.45c-.75-5.68-2.02-15.69-1.18-21.2s3.04-10.59 7.63-12.6c3.97-1.73 8.92.1 11.78 4.38c1.63 2.44 2.56 5.45 3.35 8.43c1.35 5.12 2.64 12.12 3.29 17.39"></path><path fill="#26a69a" d="M30.71 116.64L6.54 106.57l5.61-24.74l-1.2-56.38l61.16-7.18v5.34l14.55 1.84z"></path><path fill="#61de9f" d="M91.85 107.44L30.7 116.7l-5.2-32.38V34.7l61.16-9.25v49.61z"></path><path fill="#263238" d="M25.5 34.7v-5.58l-14.55-3.67l61.28-6.8l1.96 4.34l12.47 2.46z"></path><path fill="#00796b" d="M6.54 106.57c.42 0 14.48-11.15 14.48-11.15l9.68 21.28l-2.08-33.93l-3.15-48.07l-4.09 51.95z"></path><path fill="#26a69a" d="m72.05 19.29l1.48 3.42l.19.45l.47.12l7.45 1.91l-55.14 8.35v-5.2l-.76-.19l-9.28-2.34zm.63-1.08l-61.72 7.24l14.55 3.67v5.59l61.15-9.26l-12.21-3.14z"></path><path fill="none" stroke="#61de9f" strokeMiterlimit={10} strokeWidth={3} d="M43.95 38.45C43.2 32.78 35.39 11 50.34 8.22c11.3-2.1 16.29 21.97 16.95 27.25"></path><path fill="#26a69a" d="M45.81 40.03c-.87-2.93-1.78-8.85-1.82-9.11l2.96-.45c.01.06 1.07 6.1 2.23 8.93zm23.32-3.55c-.87-2.93-1.78-8.85-1.82-9.11l2.96-.45c.01.06 1.24 6.2 2.27 8.94zm-22.29 77.78l8.4-14.55l-4.01-38.79l33.57-6.53l-18 56.89z"></path><path fill="none" stroke="#d7578a" strokeMiterlimit={10} strokeWidth={3} d="M73.07 57.05s-3.78-20.07 8.81-18.74c6.85.72 6.57 16.65 6.57 16.65"></path><path fill="#d7578a" d="m74.46 123.99l-18.57-7.77l4.32-19.02l-.92-43.34l47-5.52v4.11l11.18 1.41z"></path><path fill="#ff9f9f" d="m121.46 116.88l-47 7.12l-3.99-24.89V60.98l47-7.12V92z"></path><path fill="#263238" d="m70.47 60.98l-3.76-2.88l-7.42-4.24l47-5.52l4.27 2.69l6.91 2.83z"></path><path fill="#d7578a" d="m106.11 49.37l8.05 3.97l-43.48 6.58l-8.49-5.4zm.18-1.03l-47 5.52l11.18 7.12l47-7.12z"></path><path fill="#d7578a" d="M86.36 64.81c-.67-2.24-1.36-6.79-1.39-6.98l2.64-.34c.01.05.68 4.63 1.3 6.74zm17.89-2.75c-.67-2.24-1.36-6.79-1.39-6.98l2.61-.33c.01.05.55 4.77 1.17 6.88z"></path><path fill="none" stroke="#ff9f9f" strokeMiterlimit={10} strokeWidth={3} d="M84.88 64.91c-.58-4.36-6.52-22.74 4.68-24.29c8.75-1.21 12.52 16.89 13.03 20.94"></path><path fill="#ab2c5e" d="m55.89 116.22l9.49-8.04L74.46 124l-3.97-24.74l.04-38.16l-1.12-.46l-3.54 38.79z"></path></svg> },
          { name: t('ecommerceSolutions.solutions.services.paymentIntegration'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 32 32"><g fill="none"><path fill="#00a6ed" d="M27.752 30H4.248A2.25 2.25 0 0 1 2 27.751V14.25A2.25 2.25 0 0 1 4.248 12h23.504A2.25 2.25 0 0 1 30 14.249V27.75A2.245 2.245 0 0 1 27.752 30"></path><path fill="#f4f4f4" d="M23.386 24H5.614A.617.617 0 0 1 5 23.384v-2.768c0-.333.272-.616.614-.616h17.772c.332 0 .614.273.614.616v2.778a.61.61 0 0 1-.614.606"></path><path fill="#fff478" d="M25.353 28h1.794a.85.85 0 0 0 .853-.853v-1.794a.85.85 0 0 0-.853-.853h-1.794a.85.85 0 0 0-.853.853v1.794a.86.86 0 0 0 .853.853"></path><path fill="#321b41" d="M30 15H2v3h28z"></path><path fill="#9b9b9b" d="M6 22a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 6 22"></path></g></svg>},
          { name: t('ecommerceSolutions.solutions.services.shoppingCart'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><circle cx={117.33} cy={9.69} r={5.69} fill="#f44336"></circle><path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="M80.09 78.38s9.51 12.8 9.51 17.85s-4.1 9.15-9.15 9.15c-4.31 0-58.2-.11-64.15-.11s-9.32 3.49-9.32 3.49"></path><path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="M58.83 77.13s10.6 14.05 10.6 19.11s-4.64 9.12-9.69 9.12"></path><path fill="#2f7889" d="M82.77 86.73c-2.01-3.44-3.64-5.44-6.26-9.02c0 0 .69.15 2.55.15s3.2-.59 3.2-.59c2.64 3.73 3.43 4.68 4.84 7.18c0 0-.05 1.63-1.35 2.49s-2.98-.21-2.98-.21m-20.21.17c-2.79-4.26-5.02-7.51-5.02-7.51l6 .14s2.69 3.61 4.23 6.47c0 0 .23 1.3-1.49 1.98c-1.72.66-3.72-1.08-3.72-1.08"></path><path fill="none" stroke="#84b0c1" strokeMiterlimit={10} strokeWidth={4.913} d="m80.11 78.64l-69.94-4.66c-.23-.02-.4-.2-.4-.43V34.5c0-.37.29-.68.66-.7l88.63-5.64c.86-.06 1.48.8 1.17 1.6L81.41 77.82c-.21.53-.73.86-1.3.82z"></path><path fill="none" stroke="#84b0c1" strokeMiterlimit={10} strokeWidth={2.948} d="M23.67 33.06L21.83 74.5m17.71-42.52l-5.75 43.41M55.42 30.9l-9.67 45.38M71.3 29.82L57.71 77.17m29.46-48.43l-17.5 49.32M8.29 48.48l85.56-2.94M9.08 62.11h79.4"></path><circle cx={80.41} cy={116.46} r={7.54} fill="#424242"></circle><path fill="#84b0c1" d="M75.55 106.08h9.73l-2.32 10.09c-.22 1.57-1.29 2.71-2.54 2.71s-2.33-1.14-2.54-2.71z"></path><path fill="#a8e3f0" d="M81.97 116.53c-.18.66-.51 1.41-1.18 1.58c-2.42.62-2.76-5.33-1.54-6.35c.74-.62 2.28-.73 2.93.04c.83.98.1 3.64-.21 4.73"></path><path fill="#2f7889" d="M80.53 109.65c-1.61 0-2.75-.95-3.31-1.54a.283.283 0 0 1 .19-.48c1.04-.05 2.08-.04 3.11-.07c1.04.03 2.08.02 3.11.07c.24.01.36.31.19.48c-.53.59-1.68 1.54-3.29 1.54"></path><path fill="#757575" d="M78.04 119.02c.65.75 1.69 1.1 2.68.98c.98-.12 1.88-.7 2.47-1.5c.34-.47.58-1.01.97-1.44s1.01-.73 1.55-.51c.76.3.86 1.36.6 2.13a6.08 6.08 0 0 1-3.09 3.56c-.99.49-2.37.69-3.47.58c-2.11-.22-4.38-2.13-5.12-4.09c-.4-1.05-.75-3.16 1.34-2.68c.97.23 1.29 2.07 2.07 2.97"></path><path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="m99.82 30.71l4.61-11.27c1.88-4.6 3.27-5.63 6.06-6.88l6.53-2.65"></path><circle cx={19.6} cy={116.46} r={7.54} fill="#424242"></circle><path fill="#84b0c1" d="M14.73 106.08h9.73l-2.32 10.09c-.22 1.57-1.29 2.71-2.54 2.71s-2.33-1.14-2.54-2.71z"></path><path fill="#a8e3f0" d="M21.16 116.53c-.18.66-.51 1.41-1.18 1.58c-2.42.62-2.76-5.33-1.54-6.35c.74-.62 2.28-.73 2.93.04c.83.98.09 3.64-.21 4.73"></path><path fill="#2f7889" d="M19.72 109.65c-1.61 0-2.75-.95-3.31-1.54a.283.283 0 0 1 .19-.48c1.04-.05 2.08-.04 3.11-.07c1.04.03 2.08.02 3.11.07c.24.01.36.31.19.48c-.54.59-1.69 1.54-3.29 1.54"></path><path fill="#757575" d="M17.22 119.02c.65.75 1.69 1.1 2.68.98c.98-.12 1.88-.7 2.47-1.5c.34-.47.58-1.01.97-1.44s1.01-.73 1.55-.51c.76.3.86 1.36.6 2.13a6.08 6.08 0 0 1-3.09 3.56c-.99.49-2.37.69-3.47.58c-2.11-.22-4.38-2.13-5.12-4.09c-.4-1.05-.75-3.16 1.34-2.68c.97.23 1.29 2.07 2.07 2.97"></path></svg> },
          { name: t('ecommerceSolutions.solutions.services.inventoryManagement'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="none" d="m15.73 105.38l13.1-26.6V41.2l-13.1 26.61z"></path><path fill="#513118" d="M31.4 32.91h-1.95L12.81 66.77c-.1.21-.16.44-.16.68V112a1.53 1.53 0 0 0 1.54 1.54c.58 0 1.12-.33 1.38-.86l15.82-32.14h87.47V32.91zm-2.57 45.87l-13.1 26.61V67.81l13.1-26.61z"></path><path fill="#513118" d="m14.58 69.12l16.17-32.87V80.8l-16.17 32.87z"></path><path fill="#904427" d="M106.58 39.01H87.41c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c0-1.03-.83-1.86-1.86-1.86"></path><path fill="#ffd393" d="M32.95 45.79h75.49v44.55H32.95z"></path><path fill="#64758b" d="M84.29 43.99H65.11c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.02-.82-1.86-1.85-1.86"></path><path fill="#ffd393" d="M29.03 51.24h75.49v44.55H29.03z"></path><path fill="#eeba73" d="M104.08 67.26s0-1.97-.01-4.93c0-1.48-.01-3.2-.01-5.05v-1.41c-.01-.47.02-.98-.06-1.36c-.15-.82-.64-1.61-1.33-2.11c-.35-.25-.74-.44-1.15-.54c-.42-.11-.8-.12-1.32-.11c-.97.01-1.93.02-2.85.04c-1.85.04-3.57.03-5.05 0s-2.71-.02-3.57-.06c-.86-.03-1.36-.05-1.36-.05a.45.45 0 0 1-.43-.47c.01-.24.2-.42.43-.43c0 0 .49-.02 1.36-.05c.86-.04 2.09-.04 3.57-.06c1.48-.03 3.2-.04 5.05 0c.92.01 1.88.02 2.85.04c.45 0 1.06.01 1.59.16c.54.15 1.05.4 1.49.74c.89.67 1.5 1.68 1.68 2.78c.09.57.05 1.04.06 1.51v1.41c0 1.85-.01 3.57-.01 4.93c-.01 2.96-.01 4.93-.01 4.93c0 .25-.2.45-.45.45s-.47-.23-.47-.48M39.4 51.66s-.37.04-.94.08c-.56.04-1.31.06-2.06.06s-1.5-.02-2.06-.06s-.94-.09-.94-.09a.46.46 0 0 1-.4-.51c.03-.21.19-.37.4-.4c0 0 .37-.05.94-.09c.56-.04 1.31-.06 2.06-.06c.75.01 1.5.03 2.06.06c.56.04.94.08.94.08c.25.03.43.25.4.5c-.02.25-.19.41-.4.43"></path><path fill="#855731" d="M62.62 48.83H43.44c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.03-.82-1.86-1.85-1.86"></path><path fill="#ffd393" d="M25.28 56.54h75.49v44.55H25.28z"></path><path fill="#eeba73" d="M41.57 56.98s-.73.06-1.83.1c-1.1.05-2.56.07-4.02.08c-1.46-.01-2.93-.02-4.02-.08c-1.1-.04-1.83-.11-1.83-.11a.576.576 0 0 1-.52-.61c.02-.28.25-.49.52-.52c0 0 .73-.06 1.83-.11s2.56-.07 4.02-.08c1.46.01 2.93.03 4.02.08c1.1.05 1.83.1 1.83.1c.31.02.55.3.52.61a.57.57 0 0 1-.52.54m59.04 16.25s-.01-3.15-.02-7.87c0-1.18 0-2.46-.01-3.81c-.02-.66.04-1.42-.09-1.97c-.14-.6-.45-1.18-.91-1.64c-.45-.46-1.04-.79-1.69-.92c-.6-.13-1.41-.06-2.18-.07c-1.55.01-3.12.02-4.7.02c-3.15.01-6.29.05-9.24.03s-5.7-.03-8.06-.05c-2.36-.01-4.33-.03-5.7-.06c-1.38-.02-2.16-.04-2.16-.04c-.25 0-.45-.21-.44-.46c0-.24.2-.44.44-.44c0 0 .79-.01 2.16-.04c1.38-.03 3.34-.05 5.7-.06s5.11-.03 8.06-.05s6.1.02 9.24.03c1.57.01 3.15.02 4.7.02c.39 0 .77 0 1.16.01c.36-.01.85.02 1.25.11c.84.2 1.6.64 2.18 1.24s.97 1.35 1.13 2.14c.16.85.07 1.49.09 2.18c0 1.35-.01 2.63-.01 3.81c-.01 4.72-.02 7.87-.02 7.87c0 .25-.2.45-.45.45c-.22.02-.43-.18-.43-.43"></path><path fill="#dc7f27" d="M41.44 54.69H22.26c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.03-.83-1.86-1.85-1.86"></path><path fill="#ffd393" d="M20.4 62.96h75.49v44.55H20.4z"></path><path fill="#eeba73" d="M95.83 69.66s-.01-.89-.02-2.44c0-.4-.01-.79-.11-1.17a3.39 3.39 0 0 0-3.27-2.57c-5.33.02-12.43.04-19.54.07c-7.11-.02-14.21-.04-19.54-.06c-5.33-.05-8.88-.08-8.88-.08c-.25 0-.45-.21-.45-.46s.2-.45.45-.45c0 0 3.55-.03 8.88-.08c5.33-.02 12.44-.04 19.54-.06c7.11.02 14.22.05 19.55.07c1.54.02 2.82.86 3.51 1.85c.73.97.85 2.18.81 2.94c-.01 1.55-.02 2.44-.02 2.44c0 .25-.21.45-.46.45s-.45-.2-.45-.45"></path><path fill="#855731" d="M102.12 67.2H12.65v46.48c0 1.06.86 1.93 1.93 1.93h88.75c.73 0 1.4-.42 1.73-1.08l13.82-28.46V32.79z"></path><path fill="#513118" d="M104.29 70.72s.04.65.1 1.78c.04 1.13.15 2.75.2 4.68c.05 1.94.14 4.2.17 6.62c.05 2.42.05 5.01.06 7.59c-.01 2.58-.02 5.17-.06 7.59c-.03 2.42-.12 4.68-.17 6.62s-.15 3.55-.19 4.68c-.07 1.13-.1 1.78-.1 1.78c-.03.54-.49.94-1.03.91a.963.963 0 0 1-.91-.91s-.04-.65-.1-1.78c-.04-1.13-.15-2.75-.19-4.68c-.05-1.94-.13-4.2-.17-6.62s-.05-5.01-.06-7.59c.01-2.58.02-5.17.06-7.59c.03-2.42.12-4.68.17-6.62s.15-3.55.2-4.68c.07-1.13.1-1.78.1-1.78c.03-.54.49-.94 1.03-.91c.47.03.86.43.89.91"></path><path fill="#fff2d4" d="M41.83 85.51h28.83v16.07H41.83z"></path><path fill="#f7b618" d="M66.76 85.51v12.38H45.73V85.51h-3.9v16.07h28.83V85.51z"></path><path fill="#513118" d="M29.18 20.91H119v12.52H29.18z"></path><path fill="#6e451d" d="m118.99 33.42l-16.75-5.58V15.32l16.75 5.59zm-89.62 0l-16.69-5.58V15.32l16.69 5.59z"></path><path fill="#855731" d="M12.42 15.32h89.82v12.52H12.42z"></path><path fill="#f7b618" d="M56.25 23.73a4.11 4.11 0 0 0-4.11 4.11h8.22a4.11 4.11 0 0 0-4.11-4.11m0 47.6a4.11 4.11 0 0 0 4.11-4.11h-8.22a4.11 4.11 0 0 0 4.11 4.11"></path><path fill="#60371a" d="m115.01 34.65l-13 .2c-3.9.03-8.45.07-13.33.11c-4.88.01-10.08.03-15.28.05c-5.2-.02-10.4-.03-15.28-.05c-4.88-.04-9.43-.08-13.33-.11l-13-.2a.655.655 0 0 1-.64-.66c.01-.35.29-.63.64-.64l13-.2c3.9-.03 8.45-.07 13.33-.11c4.88 0 10.09-.02 15.29-.04c5.2.02 10.4.03 15.28.05c4.88.04 9.43.08 13.33.11l13 .2c.36.01.64.3.64.66c-.02.34-.3.62-.65.63"></path></svg> },
          { name: t('ecommerceSolutions.solutions.services.orderTracking'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 48 48"><path fill="#45413c" d="M4.96 42.05a19.54 1.95 0 1 0 39.08 0a19.54 1.95 0 1 0-39.08 0" opacity={0.15}></path><path fill="#fffce5" d="M19.8 30.66H2.54v-7.19a9 9 0 0 1 1.14-4.37l4.43-7.86a4.81 4.81 0 0 1 4.2-2.46h7.49Z"></path><path fill="#fff" d="M12.31 8.78a4.81 4.81 0 0 0-4.2 2.46L3.69 19.1a8.94 8.94 0 0 0-1.15 4.37v3.29a8.9 8.9 0 0 1 1.15-4.36l4.42-7.87a4.82 4.82 0 0 1 4.2-2.45h7.49v-3.3Z"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M19.8 30.66H2.54v-7.19a9 9 0 0 1 1.14-4.37l4.43-7.86a4.81 4.81 0 0 1 4.2-2.46h7.49Z" strokeWidth={1}></path><path fill="#ff6242" d="M1.66 30.66h44.33v6.62H1.66Z"></path><path fill="#ff866e" d="M44.71 30.66H2.94a1.28 1.28 0 0 0-1.28 1.28v2.66a1.28 1.28 0 0 1 1.28-1.28h41.77A1.28 1.28 0 0 1 46 34.6v-2.66a1.28 1.28 0 0 0-1.29-1.28"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M1.66 30.66h44.33v6.62H1.66Z" strokeWidth={1}></path><path fill="#fff48c" d="M21.1 5.1h23a1.3 1.3 0 0 1 1.3 1.3v24.26H19.8V6.4a1.3 1.3 0 0 1 1.3-1.3"></path><path fill="#fffacf" d="M44.05 5.1H21.1a1.3 1.3 0 0 0-1.3 1.3v3.31a1.3 1.3 0 0 1 1.3-1.3h22.95a1.31 1.31 0 0 1 1.31 1.3V6.4a1.31 1.31 0 0 0-1.31-1.3"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M21.1 5.1h23a1.3 1.3 0 0 1 1.3 1.3v24.26h0h-25.6h0V6.4a1.3 1.3 0 0 1 1.3-1.3" strokeWidth={1}></path><path fill="#656769" d="M6.45 37.28a4.72 4.72 0 1 0 9.44 0a4.72 4.72 0 1 0-9.44 0m24.34 0a4.72 4.72 0 1 0 9.44 0a4.72 4.72 0 1 0-9.44 0"></path><path fill="#525252" d="M11.17 34.43a4.73 4.73 0 0 1 4.63 3.78a4.72 4.72 0 1 0-9.26 0a4.73 4.73 0 0 1 4.63-3.78m24.34 0a4.73 4.73 0 0 1 4.63 3.78a4.72 4.72 0 1 0-9.26 0a4.73 4.73 0 0 1 4.63-3.78"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M6.45 37.28a4.72 4.72 0 1 0 9.44 0a4.72 4.72 0 1 0-9.44 0m24.34 0a4.72 4.72 0 1 0 9.44 0a4.72 4.72 0 1 0-9.44 0" strokeWidth={1}></path><path fill="#ff6242" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M2.54 23.98H19.8v6.67H2.54z" strokeWidth={1}></path><path fill="#00b8f0" d="M14.63 12.26h-7.1L3.68 19.1c-.11.2-.21.41-.31.62h9.35a1.32 1.32 0 0 0 1-.47l1.91-2.31a1.28 1.28 0 0 0 .3-.83v-2.54a1.31 1.31 0 0 0-1.3-1.31"></path><path fill="#4acfff" d="M14.63 12.26h-3.05l-4 7.46h5.12a1.31 1.31 0 0 0 1-.47l1.91-2.31a1.28 1.28 0 0 0 .3-.83v-2.54a1.31 1.31 0 0 0-1.28-1.31"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M14.63 12.26h-7.1L3.68 19.1c-.11.2-.21.41-.31.62h9.35a1.32 1.32 0 0 0 1-.47l1.91-2.31a1.28 1.28 0 0 0 .3-.83v-2.54a1.31 1.31 0 0 0-1.3-1.31" strokeWidth={1}></path><path fill="#ff8a14" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M4.82 25.14A1.81 1.81 0 0 0 3 23.33H1.93V27H3a1.81 1.81 0 0 0 1.82-1.86" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M19.8 11.37h25.56M19.8 17.88h25.56M19.8 24.55h25.56" strokeWidth={1}></path><path fill="#daedf7" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M9.62 37.28a1.55 1.55 0 1 0 3.1 0a1.55 1.55 0 1 0-3.1 0m24.34 0a1.55 1.55 0 1 0 3.1 0a1.55 1.55 0 1 0-3.1 0" strokeWidth={1}></path></svg> },
          { name: t('ecommerceSolutions.solutions.services.customerAccounts'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1}><path d="m20.5 23.5l-2-7L12 15l-6.5 1.5l-2 7zM8.625 5.812L12 7.5h4.5"></path><path d="M16.5 12.25L12 14l-4.5-1.75v-6L12 4.5l4.5 1.75zm-6-2.25v-.5m3 .5v-.5m.953 6.066L12 19.5l-2.453-3.934"></path></g></svg> },
          { name: t('ecommerceSolutions.solutions.services.analyticsReports'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 40 40"><g fill="none" strokeMiterlimit={10}><path fill="#ff52a1" stroke="#231f20" d="M10.23 22.33c-.45-1-2.78-1-4.53-1s-4.08 0-4.53 1C.72 22.84.5 25.55.5 27.8s.22 5 .67 5.47c.45 1 2.78 1 4.53 1s4.08 0 4.53-1c.45-.51.67-3.22.67-5.47s-.22-4.96-.67-5.47Zm14.3-7.19c-.45-1.63-2.78-1.64-4.53-1.64s-4.08 0-4.53 1.64c-.47.86-.67 5.16-.67 8.76s.22 7.94.67 8.76c.45 1.63 2.78 1.64 4.53 1.64s4.08 0 4.53-1.64c.45-.82.67-5.16.67-8.76s-.2-7.9-.67-8.76Z" strokeWidth={1}></path><path fill="#ffe236" stroke="#231f20" d="M38.83 8c-.45-2.28-2.78-2.3-4.53-2.3s-4.08 0-4.53 2.26c-.45 1.12-.67 7.09-.67 12s.22 10.92.67 12c.45 2.24 2.78 2.26 4.53 2.26s4.08 0 4.53-2.26c.45-1.12.67-7.09.67-12S39.28 9.08 38.83 8Z" strokeWidth={1}></path><path stroke="#fff" strokeLinecap="round" d="M35.7 8c.83 0 1 .19 1.2 1.82M21.66 16c.82 0 1.05.19 1.2 1.82M7.1 23.63c.82 0 1.05.19 1.2 1.82" strokeWidth={1}></path></g></svg> },
          { name: t('ecommerceSolutions.solutions.services.marketingTools'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#c62828" d="M41.01 114.68L30.84 83.46l15.02.89l.74 8.78c.92 1.73 3.09 2.52 4.01 4.25c.47.89.55 1.94.42 2.94c-.27 2.07-1.36 4.31-.3 6.12c1.25 2.13 4.37 2.74 4.27 5.67c-.1 2.68-12.69 6.32-13.99 2.57"></path><path fill="#f44336" d="m39.49 121.41l-.95.33a7.18 7.18 0 0 1-9.14-4.43L17.6 83.28h16.26c.58 1.66.78 2.27 1.37 3.93c.54 1.51 1.28 2.26.8 3.86c-.48 1.58-.88 3.38-.06 4.92c.92 1.73 3.09 2.52 4.01 4.25c.47.89.55 1.94.42 2.94c-.27 2.07-1.36 4.31-.3 6.12c1.25 2.13 4.37 2.74 4.27 5.67c-.09 2.68-2.36 5.57-4.88 6.44"></path><path fill="#a12524" d="M39.78 106.18c-.38 1.56.55 1.77 1.49 1.79c2.29.06 5.31-.86 6.8-1.53c.57-.25 1.1-.58 1.58-.95c.36-.28.6-.69.63-1.14c.07-1.31.57-2.7.74-4.03c.07-.55.07-1.12-.02-1.66c-.07-.43-.57-.65-.95-.44c-.96.53-2.67 1.41-3.81 1.64c-2.26.46-3.65.42-4.63.44c-.73.01-1.31.66-1.21 1.38c.07.5.06 1.01 0 1.5c-.13.98-.38 2.01-.62 3m4.59 8.78c-1.34 4.26-4.68 5.74-8.17 5.97c-3.38.23-5.72-1.66-5.72-1.66c4.84 7.28 17.26 2.75 19.78 1.37c3.85-2.11 4.49-4.25 4.74-8.28c.02-.25-.4-1.1-1.19-.46c-1.2.96-2.56 1.31-4.08 1.62c-1.87.38-2.87.27-3.63.32c-.98.06-1.47.28-1.73 1.12"></path><path fill="#c62828" d="m17.6 83.28l3.13 9.08s1.91-4.25 9.51-3.47c5.15.53 6.69 2.33 6.69 2.33l.33-7.68z"></path><path fill="#e0e0e0" d="M103.16 110.64S69.35 85.61 41.24 84.86c-12.09-.32-20.86-.35-22.97-.35C11.65 84.52 4 75.11 4 58.55s8.61-27.73 15.23-27.73c.98 0 11.45.62 24.11.26c29.78-.84 59.82-24.62 59.82-24.62z"></path><path fill="#bdbdbd" d="M80.14 73.46c-1.13 2.02-1.15 6.62-.85 10.88c.22 3.05-2.83 5.31-5.68 4.19c-19.44-7.58-35.4-6.9-35.4-6.9l.77 3.17l2.25.06c16.98.45 36.04 9.76 48.47 17.07c0 0-3.84-5.52-5.8-13.06c-2.03-7.86-3.76-15.41-3.76-15.41"></path><path fill="#f44336" d="M34.27 58.55c0-9.45 3.09-20.05 6.96-27.42c-11.69.24-21.07-.31-22-.31C12.61 30.82 4 41.99 4 58.55s7.65 25.96 14.28 25.96c2.11 0 10.88.03 22.97.35c.07 0 .15.01.22.01c-4.48-8.04-7.2-16.9-7.2-26.32"></path><ellipse cx={103.16} cy={58.55} fill="#2f7889" rx={20.84} ry={52.09}></ellipse><linearGradient id="SVGrgFX4xUo" x1={103.164} x2={103.164} y1={103.827} y2={45.222} gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#353738"></stop><stop offset={1} stopColor="#353738" stopOpacity={0}></stop></linearGradient><path fill="url(#SVGrgFX4xUo)" d="M83.24 43.31c-.59 4.82-.91 9.94-.91 15.25c0 28.77 9.33 52.09 20.84 52.09s20.84-23.32 20.84-52.09c0-5.31-.32-10.42-.91-15.25z"></path><path fill="#e0e0e0" d="M103.16 113.64c-13.59 0-23.84-23.68-23.84-55.09S89.57 3.46 103.16 3.46S124 27.15 124 58.55c0 31.41-7.25 55.09-20.84 55.09m0-104.18c-8.44 0-17.84 20.16-17.84 49.09s9.4 49.09 17.84 49.09S121 87.48 121 58.55s-9.4-49.09-17.84-49.09"></path><path fill="#fff" d="M89.56 23.24c-.9 2.44-4.15 7.85-5.65 25.65c-.05.6-.38 3.24-1.85 3.24c-.98 0-1.27-1.48-1.27-3.52c0-7.95 1.32-16.72 4.39-25.38c1.74-4.89 5.63-3.35 4.38.01"></path><radialGradient id="SVGtseHPeoE" cx={101.207} cy={60.248} r={20.918} gradientTransform="matrix(1 0 0 1.7015 0 -42.264)" gradientUnits="userSpaceOnUse"><stop offset={0.416} stopColor="#82aec0"></stop><stop offset={1} stopColor="#7fa9bb" stopOpacity={0}></stop></radialGradient><path fill="url(#SVGtseHPeoE)" d="m85.9 46.49l18.9 2.2v19.9l-18.76 3.38c-1.24-15.73-.14-25.48-.14-25.48"></path><ellipse cx={104.8} cy={58.65} fill="#e0e0e0" rx={4.72} ry={9.95}></ellipse><path fill="#353738" d="m38.23 87.4l-.75 1.3l3.21 6.27c.39.76 1.23 1.18 2.07 1.02l5.42-1.09s1.51-2.15 1.8-2.64s.18-.78.18-.78L44 92.66c-.01 0-5.57-5.2-5.77-5.26"></path><path fill="#616161" d="m42.33 91.96l-4.16-4.53l7.49-.03l4.24 3.67c.51.54.18 1.21-.55 1.33l-4.21.66c-1.06.16-2.13-.25-2.81-1.1"></path><path fill="#fff" d="M57.51 37.53c6.34-.84 12.6-2.77 17.96-6.26c-3.11 8.35-4.59 18.41-3.44 27.26c-2.96-1.46-5.95-2.92-9.11-3.86c-2.64-.78-5.37-1.19-8.1-1.51c-6.87-.83-13.23-.96-20.14-.83c.2 0 .75-4.67 1.59-8.15s1.7-5.5 1.7-5.5s13.53-.35 19.54-1.15"></path><path fill="#ff7555" d="M35.28 38.25c-9.7.29-20.53.42-20.53.42s-4.89 4.26-5.76 13.65c0 0 11.55 0 22.04.19c.74-6.76 2.92-11.75 4.25-14.26"></path></svg> }
      ].map((service, index) => {
        const staggerClasses = ['scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3'];
        const staggerClass = staggerClasses[index] || 'scroll-stagger-2';
        
        return (
          <ScrollAnimation key={service.name} animation="fade-in" stagger={staggerClass}>
            <div 
              className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}
            >
              <div className="text-4xl mb-3 flex justify-center items-center">{service.icon}</div>
              <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{service.name}</h3>
            </div>
          </ScrollAnimation>
        );
      })}
    </div>
  </div>
</section>


      
{/* Call to Action */}
<section className={isDark ? 'relative py-24 bg-gray-900' : 'relative py-24 bg-white'}>
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
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
        {t('ecommerceSolutions.cta.title')}
      </h2>
    </ScrollAnimation>

    {/* Subtext */}
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="text-lg text-white max-w-2xl mx-auto mb-10">
        {t('ecommerceSolutions.cta.subtitle')}
      </p>
    </ScrollAnimation>

    {/* Buttons */}
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('ecommerceSolutions.cta.startProjectButton')}
        </button>
        <button
          onClick={() => navigate('/services')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
          {t('ecommerceSolutions.cta.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>

      <Footer />
    </div>
  )
}
