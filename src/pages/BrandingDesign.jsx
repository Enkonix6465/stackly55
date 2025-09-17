import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'

export default function BrandingDesign() {
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
    <source src="/vedio9.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
       {t('brandingDesign.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-2">
      <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
        {t('brandingDesign.showcase.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/contact"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('brandingDesign.showcase.connectButton')}
        </a>

        {/* Secondary Button */}
        <a
          href="/services"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
          {t('brandingDesign.showcase.exploreServicesButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>
      
      
{/* 2 Services - Branding & Design Hero */}
<section
  id="hero"
  className={`relative overflow-hidden border-t ${
    isDark ? 'border-gray-700 bg-gray-900' : 'border-black/10 bg-white'
  }`}
> 
  <div className="mx-auto max-w-6xl px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
    <div className={`transition-colors duration-500 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
        <p className={`text-sm tracking-widest ${
          isDark ? "text-white" : "text-indigo-600 font-semibold"
        }`}>
          {t('brandingDesign.hero.tagline')}
        </p>
      </ScrollAnimation>

      <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
        <h1 className={`mt-2 text-4xl md:text-5xl font-extrabold leading-tight ${
          isDark ? "text-white" : "text-black"
        }`}>
          {t('brandingDesign.hero.title')}
        </h1>
      </ScrollAnimation>

      <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
        <p className={`mt-4 text-lg ${
          isDark ? "text-gray-300" : "text-gray-700 font-medium"
        }`}>
          {t('brandingDesign.hero.description')}
        </p>
      </ScrollAnimation>

      <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
        <div className="mt-6 flex gap-4">
          <a
            href="/contact"
            className={`btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 ${
              isDark 
                ? "bg-indigo-500 text-black hover:bg-white hover:text-indigo-500 hover:border hover:border-black" 
                : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {t('brandingDesign.hero.getStartedButton')}
          </a>

          <a
            href="/services"
            className={`btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 ${
              isDark 
                ? "bg-white text-indigo-500 border border-black hover:bg-indigo-500 hover:text-black hover:border-0" 
                : "bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {t('brandingDesign.hero.viewServicesButton')}
          </a>
        </div>
      </ScrollAnimation>
    </div>

    <ScrollAnimation animation="scale-in" stagger="scroll-stagger-4">
      <div className="justify-self-center relative">
        <img
          src="/images/branding-design.jpg" 
          alt="Branding & Design illustration"
          className={`h-56 w-56 md:h-80 md:w-80 object-cover shadow-2xl hover-lift-strong animate-float-enhanced ${
            isDark ? "shadow-gray-800" : "shadow-indigo-200"
          }`}
        />
      </div>
    </ScrollAnimation>
  </div>
</section>




      {/*3 Service Overview */}
<section
      className={`py-20 transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >         
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
              <div className="space-y-6">
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                  <h2 className={`text-4xl font-bold ${isDark ? "text-white" : "text-black"}`}>
                    {t('brandingDesign.serviceOverview.title')}
                  </h2>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                  <p className={`text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-black/70"}`}>
                    {t('brandingDesign.serviceOverview.description')}
                  </p>
                </ScrollAnimation>
                
                <div className="space-y-4">
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                    <div className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={`${isDark ? "text-white" : "text-black"} group-hover:text-indigo-500 transition-colors duration-300`}>
                        {t('brandingDesign.serviceOverview.features.uniqueLogo')}
                      </span>
                    </div>
                  </ScrollAnimation>
                  
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                    <div className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={`${isDark ? "text-white" : "text-black"} group-hover:text-indigo-500 transition-colors duration-300`}>
                        {t('brandingDesign.serviceOverview.features.colorPalette')}
                      </span>
                    </div>
                  </ScrollAnimation>
                  
                  <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
                    <div className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={`${isDark ? "text-white" : "text-black"} group-hover:text-indigo-500 transition-colors duration-300`}>
                        {t('brandingDesign.serviceOverview.features.brandGuidelines')}
                      </span>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className={`rounded-2xl shadow-xl p-8 hover-lift-strong transition-all duration-300 ${
                isDark ? "bg-gray-900 border border-gray-700" : "bg-white"
              }`}>
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
                    {t('brandingDesign.serviceOverview.brandingFeatures.title')}
                  </h3>
                </ScrollAnimation>
                
                <ul className="space-y-3">
                  {[
                    t('brandingDesign.serviceOverview.brandingFeatures.primaryLogos'),
                    t('brandingDesign.serviceOverview.brandingFeatures.colorPalette'),
                    t('brandingDesign.serviceOverview.brandingFeatures.typography'),
                    t('brandingDesign.serviceOverview.brandingFeatures.brandStyleGuide'),
                    t('brandingDesign.serviceOverview.brandingFeatures.socialTemplates')
                  ].map((feature, index) => (
                    <ScrollAnimation key={index} animation="fade-in" stagger={`scroll-stagger-${index + 4}`}>
                      <li className="flex items-start gap-3 group">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></span>
                        <span className={`${isDark ? "text-gray-300" : "text-black"} group-hover:text-indigo-500 transition-colors duration-300`}>
                          {feature}
                        </span>
                      </li>
                    </ScrollAnimation>
                  ))}
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
    >  
    <div className="mx-auto max-w-7xl px-4">
      {/* Heading */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t('brandingDesign.process.title')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {t('brandingDesign.process.subtitle')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Step 1 */}
        <ScrollAnimation animation="scale-in" stagger="scroll-stagger-2">
          <div className={`text-center p-6 rounded-xl hover-lift-strong transition-all duration-300 ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
          }`}>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40 hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('brandingDesign.process.steps.brandDiscovery.title')}
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('brandingDesign.process.steps.brandDiscovery.description')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Step 2 */}
        <ScrollAnimation animation="scale-in" stagger="scroll-stagger-3">
          <div className={`text-center p-6 rounded-xl hover-lift-strong transition-all duration-300 ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
          }`}>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40 hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('brandingDesign.process.steps.creativeStrategy.title')}
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('brandingDesign.process.steps.creativeStrategy.description')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Step 3 */}
        <ScrollAnimation animation="scale-in" stagger="scroll-stagger-4">
          <div className={`text-center p-6 rounded-xl hover-lift-strong transition-all duration-300 ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
          }`}>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40 hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('brandingDesign.process.steps.designExecution.title')}
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('brandingDesign.process.steps.designExecution.description')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Step 4 */}
        <ScrollAnimation animation="scale-in" stagger="scroll-stagger-5">
          <div className={`text-center p-6 rounded-xl hover-lift-strong transition-all duration-300 ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
          }`}>
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40 hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t('brandingDesign.process.steps.brandLaunch.title')}
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t('brandingDesign.process.steps.brandLaunch.description')}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
</section>


     {/* Branding & Design Solutions */}
<section
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-white"
      }`}
    >   <div className="mx-auto max-w-7xl px-4">
    {/* Heading */}
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <div className="text-center mb-16">
       <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
          {t('brandingDesign.solutions.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          {t('brandingDesign.solutions.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    {/* Services Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { name: t('brandingDesign.solutions.services.logoDesign'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 512 512"><path fill="#e5aa6e" d="M256.295 9.217C120.001 9.217 9.512 119.706 9.512 256c0 43.532 11.693 84.2 31.055 119.939c24.744 45.676 120.236-129.338 171.165-91.196S90.776 447.079 138.533 472.527c35.252 18.784 75.036 30.256 117.762 30.256c136.294 0 246.783-110.488 246.783-246.783S392.59 9.217 256.295 9.217"></path><path fill="#fff" d="M274.829 451.585c-24.167 0-43.758-17.564-43.758-39.23s19.591-39.23 43.758-39.23s43.758 17.564 43.758 39.23s-19.591 39.23-43.758 39.23"></path><path fill="#ffd469" d="M435.954 299.272c12.708 19.521 5.991 46.425-15.003 60.092s-48.315 8.922-61.023-10.599s-5.991-46.425 15.004-60.092c20.993-13.668 48.314-8.922 61.022 10.599"></path><path fill="#0074a8" d="M443.193 159.103c1.598 23.238-17.366 43.469-42.358 45.188s-46.547-15.726-48.145-38.964s17.366-43.469 42.358-45.188s46.547 15.726 48.145 38.964"></path><path fill="#ff473e" d="M287.822 100.348c1.598 23.238-21.619 43.762-51.857 45.841s-56.046-15.073-57.644-38.311s21.619-43.762 51.857-45.841s56.046 15.073 57.644 38.311"></path><path fill="#009b51" d="M155.826 201.296c1.598 23.238-17.366 43.469-42.358 45.188s-46.547-15.726-48.145-38.964s17.366-43.469 42.358-45.188s46.547 15.726 48.145 38.964"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.brandIdentity'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 64 64"><path fill="#edc26e" d="m61.13 23.718l-22.65-.105L31.583.692l-6.898 22.921l-22.651.105L20.423 38.35l-9.297 24.96l20.457-15.86L52.05 63.31l-9.308-24.96z"></path><path fill="#faec78" d="M53.09 26.904L38.48 24.22l-6.897-12.27l-6.898 12.27l-14.08 2.84l9.814 11.891l-2.572 15.85l13.732-6.751l14.11 6.903l-2.955-16z"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.uiuxDesign'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 36 36"><path fill="#ccd6dd" d="M34 29.096c-.417-.963-.896-2.008-2-2.008h-1c1.104 0 2-.899 2-2.008V8.008A2.004 2.004 0 0 0 31 6H5c-1.104 0-2 .899-2 2.008V25.08c0 1.109.896 2.008 2 2.008H4c-1.104 0-1.667 1.004-2 2.008l-2 4.895C0 35.101.896 36 2 36h32c1.104 0 2-.899 2-2.008z"></path><path fill="#9aaab4" d="m.008 34.075l.006.057l.17.692A2 2 0 0 0 2 36h32a2 2 0 0 0 1.992-1.925z"></path><path fill="#5dadec" d="M31 24.075c0 .555-.447 1.004-1 1.004H6c-.552 0-1-.449-1-1.004V9.013c0-.555.448-1.004 1-1.004h24c.553 0 1 .45 1 1.004z"></path><path fill="#aebbc1" d="m32.906 31.042l-.76-2.175c-.239-.46-.635-.837-1.188-.837H5.11c-.552 0-.906.408-1.156 1.036l-.688 1.977c-.219.596.448 1.004 1 1.004h7.578s.937-.047 1.103-.608c.192-.648.415-1.624.463-1.796c.074-.264.388-.531.856-.531h8.578c.5 0 .746.253.811.566c.042.204.312 1.141.438 1.782c.111.571 1.221.586 1.221.586h6.594c.551 0 1.217-.471.998-1.004"></path><path fill="#9aaab4" d="M22.375 33.113h-7.781c-.375 0-.538-.343-.484-.675c.054-.331.359-1.793.383-1.963c.023-.171.274-.375.524-.375h7.015c.297 0 .49.163.55.489c.059.327.302 1.641.321 1.941s-.169.583-.528.583"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.printDigitalMedia'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 36 36"><path fill="#99aab5" d="M33 36H4c4 0 3-9 3-9c0-2.209 1.791-15 4-15h21s4 0 4 4v17s0 3-3 3"></path><path fill="#ccd6dd" d="M30 33c0 3 3 3 3 3H3s-3 0-3-4V4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4z"></path><path fill="#99aab5" d="M27 20a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1m0-4a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1m0-4a1 1 0 0 1-1 1h-8a1 1 0 1 1 0-2h8a1 1 0 0 1 1 1m0 12a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h22a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h22a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h22a1 1 0 0 1 1 1M25 9s2 0 2-2V5s0-2-2-2H5S3 3 3 5v2s0 2 2 2z"></path><path fill="#55acee" d="M13 21s2 0 2-2v-6s0-2-2-2H5s-2 0-2 2v6s0 2 2 2z"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.socialMediaCreatives'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#424242" d="M87.4 124H40.6c-4.7 0-8.6-3.8-8.6-8.6V12.6C32 7.9 35.9 4 40.6 4h46.8c4.7 0 8.6 3.8 8.6 8.6v102.9c0 4.7-3.9 8.5-8.6 8.5"></path><path d="M86.77 120.11H39.93c-2.15 0-3.89-1.74-3.89-3.89V19.65c0-2.14 1.74-3.88 3.88-3.88h48.15c2.15 0 3.89 1.74 3.89 3.89v95.93c0 .93-1.4 4.52-5.19 4.52"></path><path fill="#212121" d="M73.65 11.59h-19.2c-.7 0-1.2-.6-1.2-1.2s.6-1.2 1.2-1.2h19.1c.7 0 1.2.6 1.2 1.2s-.5 1.2-1.1 1.2"></path><path fill="#757575" d="M87.4 6c3.64 0 6.6 2.96 6.6 6.6v102.9c0 3.58-2.96 6.5-6.6 6.5H40.6c-3.64 0-6.6-2.96-6.6-6.6V12.6C34 9.02 37.02 6 40.6 6zm0-2H40.6C35.9 4 32 7.9 32 12.6v102.8c0 4.8 3.9 8.6 8.6 8.6h46.8c4.7 0 8.6-3.8 8.6-8.5V12.6C96 7.8 92.1 4 87.4 4"></path><path fill="#eab56e" d="M48.35 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M60.9 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#ff80ab" d="M73.45 29.96H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#0288d1" d="M86.01 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M48.35 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#81d4fa" d="M60.9 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M73.45 44.12H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#eab56e" d="M86.01 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M48.35 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#ff80ab" d="M60.9 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M73.45 58.28H67.1c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#0288d1" d="M86.01 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32M48.35 72.44h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#81d4fa" d="M60.9 72.44h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32m-12.55 42.48h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path><path fill="#0288d1" d="M60.9 114.92h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M73.45 114.92H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.33 1.32"></path><path fill="#ff80ab" d="M86.01 114.92h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.packagingDesign'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="none" d="m15.73 105.38l13.1-26.6V41.2l-13.1 26.61z"></path><path fill="#513118" d="M31.4 32.91h-1.95L12.81 66.77c-.1.21-.16.44-.16.68V112a1.53 1.53 0 0 0 1.54 1.54c.58 0 1.12-.33 1.38-.86l15.82-32.14h87.47V32.91zm-2.57 45.87l-13.1 26.61V67.81l13.1-26.61z"></path><path fill="#513118" d="m14.58 69.12l16.17-32.87V80.8l-16.17 32.87z"></path><path fill="#904427" d="M106.58 39.01H87.41c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c0-1.03-.83-1.86-1.86-1.86"></path><path fill="#ffd393" d="M32.95 45.79h75.49v44.55H32.95z"></path><path fill="#64758b" d="M84.29 43.99H65.11c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.02-.82-1.86-1.85-1.86"></path><path fill="#ffd393" d="M29.03 51.24h75.49v44.55H29.03z"></path><path fill="#eeba73" d="M104.08 67.26s0-1.97-.01-4.93c0-1.48-.01-3.2-.01-5.05v-1.41c-.01-.47.02-.98-.06-1.36c-.15-.82-.64-1.61-1.33-2.11c-.35-.25-.74-.44-1.15-.54c-.42-.11-.8-.12-1.32-.11c-.97.01-1.93.02-2.85.04c-1.85.04-3.57.03-5.05 0s-2.71-.02-3.57-.06c-.86-.03-1.36-.05-1.36-.05a.45.45 0 0 1-.43-.47c.01-.24.2-.42.43-.43c0 0 .49-.02 1.36-.05c.86-.04 2.09-.04 3.57-.06c1.48-.03 3.2-.04 5.05 0c.92.01 1.88.02 2.85.04c.45 0 1.06.01 1.59.16c.54.15 1.05.4 1.49.74c.89.67 1.5 1.68 1.68 2.78c.09.57.05 1.04.06 1.51v1.41c0 1.85-.01 3.57-.01 5.05c-.01 2.96-.01 4.93-.01 4.93c0 .25-.2.45-.45.45s-.47-.23-.47-.48M39.4 51.66s-.37.04-.94.08c-.56.04-1.31.06-2.06.06s-1.5-.02-2.06-.06s-.94-.09-.94-.09a.46.46 0 0 1-.4-.51c.03-.21.19-.37.4-.4c0 0 .37-.05.94-.09c.56-.04 1.31-.06 2.06-.06c.75.01 1.5.03 2.06.06c.56.04.94.08.94.08c.25.03.43.25.4.5c-.02.25-.19.41-.4.43"></path><path fill="#855731" d="M62.62 48.83H43.44c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.03-.82-1.86-1.85-1.86"></path><path fill="#ffd393" d="M25.28 56.54h75.49v44.55H25.28z"></path><path fill="#eeba73" d="M41.57 56.98s-.73.06-1.83.1c-1.1.05-2.56.07-4.02.08c-1.46-.01-2.93-.02-4.02-.08c-1.1-.04-1.83-.11-1.83-.11a.576.576 0 0 1-.52-.61c.02-.28.25-.49.52-.52c0 0 .73-.06 1.83-.11s2.56-.07 4.02-.08c1.46.01 2.93.03 4.02.08c1.1.05 1.83.1 1.83.1c.31.02.55.3.52.61a.57.57 0 0 1-.52.54m59.04 16.25s-.01-3.15-.02-7.87c0-1.18 0-2.46-.01-3.81c-.02-.66.04-1.42-.09-1.97c-.14-.6-.45-1.18-.91-1.64c-.45-.46-1.04-.79-1.69-.92c-.6-.13-1.41-.06-2.18-.07c-1.55.01-3.12.02-4.7.02c-3.15.01-6.29.05-9.24.03s-5.7-.03-8.06-.05c-2.36-.01-4.33-.03-5.7-.06c-1.38-.02-2.16-.04-2.16-.04c-.25 0-.45-.21-.44-.46c0-.24.2-.44.44-.44c0 0 .79-.01 2.16-.04c1.38-.03 3.34-.05 5.7-.06s5.11-.03 8.06-.05s6.1.02 9.24.03c1.57.01 3.15.02 4.7.02c.39 0 .77 0 1.16.01c.36-.01.85.02 1.25.11c.84.2 1.6.64 2.18 1.24s.97 1.35 1.13 2.14c.16.85.07 1.49.09 2.18c0 1.35-.01 2.63-.01 3.81c-.01 4.72-.02 7.87-.02 7.87c0 .25-.2.45-.45.45c-.22.02-.43-.18-.43-.43"></path><path fill="#dc7f27" d="M41.44 54.69H22.26c-1.03 0-1.86.83-1.86 1.86v6.87c0 1.03.83 1.86 1.86 1.86h19.17c1.03 0 1.86-.83 1.86-1.86v-6.87c.01-1.03-.83-1.86-1.85-1.86"></path><path fill="#ffd393" d="M20.4 62.96h75.49v44.55H20.4z"></path><path fill="#eeba73" d="M95.83 69.66s-.01-.89-.02-2.44c0-.4-.01-.79-.11-1.17a3.39 3.39 0 0 0-3.27-2.57c-5.33.02-12.43.04-19.54.07c-7.11-.02-14.21-.04-19.54-.06c-5.33-.05-8.88-.08-8.88-.08c-.25 0-.45-.21-.45-.46s.2-.45.45-.45c0 0 3.55-.03 8.88-.08c5.33-.02 12.44-.04 19.54-.06c7.11.02 14.22.05 19.55.07c1.54.02 2.82.86 3.51 1.85c.73.97.85 2.18.81 2.94c-.01 1.55-.02 2.44-.02 2.44c0 .25-.21.45-.46.45s-.45-.2-.45-.45"></path><path fill="#855731" d="M102.12 67.2H12.65v46.48c0 1.06.86 1.93 1.93 1.93h88.75c.73 0 1.4-.42 1.73-1.08l13.82-28.46V32.79z"></path><path fill="#513118" d="M104.29 70.72s.04.65.1 1.78c.04 1.13.15 2.75.2 4.68c.05 1.94.14 4.2.17 6.62c.05 2.42.05 5.01.06 7.59c-.01 2.58-.02 5.17-.06 7.59c-.03 2.42-.12 4.68-.17 6.62s-.15 3.55-.19 4.68c-.07 1.13-.1 1.78-.1 1.78c-.03.54-.49.94-1.03.91a.963.963 0 0 1-.91-.91s-.04-.65-.1-1.78c-.04-1.13-.15-2.75-.19-4.68c-.05-1.94-.13-4.2-.17-6.62s-.05-5.01-.06-7.59c.01-2.58.02-5.17.06-7.59c.03-2.42.12-4.68.17-6.62s.15-3.55.2-4.68c.07-1.13.1-1.78.1-1.78c.03-.54.49-.94 1.03-.91c.47.03.86.43.89.91"></path><path fill="#fff2d4" d="M41.83 85.51h28.83v16.07H41.83z"></path><path fill="#f7b618" d="M66.76 85.51v12.38H45.73V85.51h-3.9v16.07h28.83V85.51z"></path><path fill="#513118" d="M29.18 20.91H119v12.52H29.18z"></path><path fill="#6e451d" d="m118.99 33.42l-16.75-5.58V15.32l16.75 5.59zm-89.62 0l-16.69-5.58V15.32l16.69 5.59z"></path><path fill="#855731" d="M12.42 15.32h89.82v12.52H12.42z"></path><path fill="#f7b618" d="M56.25 23.73a4.11 4.11 0 0 0-4.11 4.11h8.22a4.11 4.11 0 0 0-4.11-4.11m0 47.6a4.11 4.11 0 0 0 4.11-4.11h-8.22a4.11 4.11 0 0 0 4.11 4.11"></path><path fill="#60371a" d="m115.01 34.65l-13 .2c-3.9.03-8.45.07-13.33.11c-4.88.01-10.08.03-15.28.05c-5.2-.02-10.4-.03-15.28-.05c-4.88-.04-9.43-.08-13.33-.11l-13-.2a.655.655 0 0 1-.64-.66c.01-.35.29-.63.64-.64l13-.2c3.9-.03 8.45-.07 13.33-.11c4.88 0 10.09-.02 15.29-.04c5.2.02 10.4.03 15.28.05c4.88.04 9.43.08 13.33.11l13 .2c.36.01.64.3.64.66c-.02.34-.3.62-.65.63"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.websiteDesign'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 100 100"><path fill="#000" d="M52.5 5.682v20.187h17.676c-.988-2.823-2.13-5.429-3.408-7.75c-3.966-7.2-9-11.541-14.268-12.437m-5 .197c-4.93 1.223-9.61 5.462-13.342 12.24c-1.278 2.321-2.42 4.927-3.408 7.75H47.5zM35.98 7.232C25.985 10.5 17.545 17.163 12.01 25.87h13.455c1.187-3.695 2.633-7.112 4.312-10.162c1.793-3.255 3.88-6.123 6.203-8.475m29.41.463c2.145 2.263 4.082 4.967 5.758 8.012c1.68 3.05 3.123 6.467 4.307 10.162H87.99c-5.28-8.306-13.202-14.761-22.6-18.174M9.257 30.87A44.8 44.8 0 0 0 5.072 47.5h16.79c.194-5.872.957-11.469 2.202-16.63zm19.974 0c-1.32 5.077-2.15 10.696-2.363 16.631H47.5V30.87zm23.27 0V47.5H74.06c-.212-5.935-1.043-11.554-2.364-16.63zm24.355 0c1.243 5.163 2.004 10.76 2.198 16.631h15.875a44.8 44.8 0 0 0-4.184-16.63zM5.072 52.5a44.8 44.8 0 0 0 4.184 16.63h14.572c-1.174-5.176-1.865-10.774-1.994-16.63zm21.762 0c.14 5.915.901 11.53 2.146 16.63H47.5V52.5zm25.666 0v16.63h19.445c1.245-5.1 2.006-10.715 2.147-16.63zm26.576 0c-.129 5.855-.815 11.453-1.986 16.63h13.654a44.8 44.8 0 0 0 4.184-16.63zM12.01 74.13c5.285 8.313 13.214 14.772 22.62 18.183c-1.785-2.05-3.415-4.407-4.853-7.018c-1.83-3.325-3.389-7.08-4.63-11.164zm18.394 0c1.062 3.216 2.326 6.159 3.754 8.753c3.5 6.355 7.834 10.475 12.424 11.974c.306.023.61.054.918.07V74.132zm22.096 0v20.798a46 46 0 0 0 2.127-.162c4.485-1.575 8.713-5.658 12.14-11.883c1.429-2.594 2.693-5.537 3.754-8.752zm23.275 0c-1.239 4.085-2.796 7.84-4.627 11.165c-1.311 2.382-2.782 4.556-4.386 6.476a45.06 45.06 0 0 0 21.228-17.64z" color="#000"></path></svg> }, 
        { name: t('brandingDesign.solutions.services.marketingCollaterals'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><defs><path id="SVGBaWlsbDK" d="M37.4 13.08c0-1.72-1.4-3.13-3.12-3.13H22.65c-1.72 0-3.12 1.41-3.12 3.13v112.17H37.4z"></path></defs><use fill="#ed6c30" href="#SVGBaWlsbDK"></use><defs><path id="SVG59JHnW5y" d="M73.09 50.56c0-1.72-1.4-3.13-3.12-3.13H58.35c-1.72 0-3.13 1.41-3.13 3.13v74.69h17.87z"></path></defs><use fill="#006ca2" href="#SVG59JHnW5y"></use><defs><path id="SVGVrgVYbUm" d="M108.79 30.71c0-1.72-1.41-3.13-3.13-3.13H94.03c-1.71 0-3.12 1.41-3.12 3.13v94.53h17.87V30.71z"></path></defs><use fill="#fcc21b" href="#SVGVrgVYbUm"></use><path fill="#2f2f2f" d="M122.63 128H2.76C1.23 128 0 126.77 0 125.24V6.18a2.76 2.76 0 0 1 2.76-2.76a2.75 2.75 0 0 1 2.75 2.76v116.31h117.12a2.76 2.76 0 0 1 2.76 2.76c0 1.52-1.24 2.75-2.76 2.75"></path></svg> }
      ].map((service, index) => (
        <ScrollAnimation 
          key={service.name} 
          animation="scale-in" 
          stagger={`scroll-stagger-${index + 2}`}
        >
          <div className={`text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift-strong group ${
            isDark ? "bg-gray-900 border border-gray-700" : "bg-white"
          }`}>
            <div className="text-4xl mb-3 flex justify-center items-center group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className={`text-lg font-semibold group-hover:text-indigo-500 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              {service.name}
            </h3>
          </div>
        </ScrollAnimation>
      ))}
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
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-1">
      <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">
          {t('brandingDesign.cta.title')}
        </h2>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-2">
      <p className="text-lg max-w-2xl mx-auto mb-10 text-white">
        {t('brandingDesign.cta.subtitle')}
      </p>
    </ScrollAnimation>
    
    {/* Buttons */}
    <ScrollAnimation animation="fade-in-up" stagger="scroll-stagger-3">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
      <button
        onClick={() => navigate('/contact')}
        className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
      >
        {t('brandingDesign.cta.startProjectButton')}
      </button>
      <button
        onClick={() => navigate('/services')}
        className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
      >
        {t('brandingDesign.cta.viewServicesButton')}
      </button>
      </div>
    </ScrollAnimation>
  </div>
</section>
      <Footer />
    </div>
  )
}
