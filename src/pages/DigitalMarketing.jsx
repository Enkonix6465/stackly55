import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function DigitalMarketing() {
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
    <source src="/vedio11.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
        {t('digitalMarketing.title')}
      </h1>
      <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
        {t('digitalMarketing.description')}
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/contact"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('digitalMarketing.connectButton')}
        </a>

        
      </div>
    </ScrollAnimation>
  </div>
</section>
      
     
{/* 2 Services - Digital Marketing Hero */}
<section
  id="hero"
  className={
    'relative overflow-hidden border-t border-black/10 dark:border-gray-700 ' +
    (isDark ? 'bg-gray-900 text-white' : 'bg-white text-black')
  }
>
  <div className="mx-auto max-w-6xl px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
    <ScrollAnimation animation="fade-in-left" threshold={0.2} triggerOnce={true}>
      <div>
        <p className={isDark ? 'text-sm tracking-widest text-white' : 'text-sm tracking-widest text-black'}>
          {t('digitalMarketing.servicesTitle')}
        </p>
        
        <h1 className={isDark ? 'mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-white' : 'mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-black'}>
          {t('digitalMarketing.strategiesTitle')}
        </h1>
        
        <p className={isDark ? 'mt-4 text-gray-300' : 'mt-4 text-black'}>
          {t('digitalMarketing.strategiesDescription')}
        </p>
      </div>
    </ScrollAnimation>

    <ScrollAnimation animation="fade-in-right" threshold={0.2} triggerOnce={true} stagger="delay-200">
      <div className="justify-self-center relative">
        {/* image */}
        <img
          src="/images/digital-marketing.jpg"
          alt="Digital Marketing illustration"
          className="h-56 w-56 md:h-72 md:w-72 object-cover shadow-lg"
        />
      </div>
    </ScrollAnimation>
  </div>
</section>




      {/* 3Service Overview */}
      <section className={isDark ? 'py-20 bg-black' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fade-in-left" threshold={0.2} triggerOnce={true}>
              <div>
                <h2 className={isDark ? 'text-4xl font-bold text-white mb-6' : 'text-4xl font-bold text-black mb-6'}>
                  {t('digitalMarketing.strategicTitle')}
                </h2>
                <p className={isDark ? 'text-lg text-gray-400 mb-6 leading-relaxed' : 'text-lg text-black mb-6 leading-relaxed'}>
                  {t('digitalMarketing.strategicDescription')}
                </p>
                <div className="space-y-4">
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-100">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('digitalMarketing.dataDriven')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('digitalMarketing.multiChannel')}</span>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className={isDark ? 'text-gray-300' : 'text-black'}>{t('digitalMarketing.roiFocused')}</span>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in-right" threshold={0.2} triggerOnce={true} stagger="delay-200">
              <div className={isDark ? 'bg-gray-900 rounded-2xl shadow-xl p-8' : 'bg-white rounded-2xl shadow-xl p-8'}>
                <h3 className={isDark ? 'text-2xl font-bold text-white mb-4' : 'text-2xl font-bold text-gray-900 mb-4'}>
                  {t('digitalMarketing.marketingServicesTitle')}
                </h3>
                <ul className="space-y-3">
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-100">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('digitalMarketing.socialMediaManagement')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('digitalMarketing.ppcGoogleAds')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('digitalMarketing.emailMarketing')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('digitalMarketing.contentMarketing')}</span>
                    </li>
                  </ScrollAnimation>
                  <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-500">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t('digitalMarketing.analyticsReporting')}</span>
                    </li>
                  </ScrollAnimation>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>


      {/* 4 Process Section - Digital Marketing */}
      <section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Heading */}
          <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
            <div className="text-center mb-16">
              <h2 className={isDark ? 'text-4xl font-bold text-white mb-4' : 'text-4xl font-bold text-gray-900 mb-4'}>
                {t('digitalMarketing.marketingProcessTitle')}
              </h2>
              <p className={isDark ? 'text-lg text-gray-300 max-w-2xl mx-auto' : 'text-lg text-gray-600 max-w-2xl mx-auto'}>
                {t('digitalMarketing.marketingProcessDescription')}
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
                <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>
                  {t('digitalMarketing.researchStrategyTitle')}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {t('digitalMarketing.researchStrategyDescription')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Step 2 */}
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>
                  {t('digitalMarketing.contentCreationTitle')}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {t('digitalMarketing.contentCreationDescription')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Step 3 */}
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>
                  {t('digitalMarketing.campaignExecutionTitle')}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {t('digitalMarketing.campaignExecutionDescription')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Step 4 */}
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className={isDark ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>
                  {t('digitalMarketing.optimizeScaleTitle')}
                </h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {t('digitalMarketing.optimizeScaleDescription')}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Digital Marketing Solutions */}
      <section className={isDark ? 'py-20 bg-black text-white' : 'py-20 bg-gray-100 text-gray-900'}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
            <div className="text-center mb-16">
              <h2 className={isDark ? 'text-4xl font-bold text-white mb-4' : 'text-4xl font-bold text-gray-900 mb-4'}>
                {t('digitalMarketing.digitalMarketingSolutionsTitle')}
              </h2>
              <p className={isDark ? 'text-lg text-gray-400 max-w-2xl mx-auto' : 'text-lg text-gray-600 max-w-2xl mx-auto'}>
                {t('digitalMarketing.digitalMarketingSolutionsDescription')}
              </p>
            </div>
          </ScrollAnimation>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { name: t('digitalMarketing.seoOptimization'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24"><g fill="none"><path fill="#020202" d="M16.195 8.05a5.74 5.74 0 0 0-1.248-2.655c-.19-.23-.39-.5-.62-.73a2.1 2.1 0 0 0-.578-.429a.34.34 0 0 0-.44.12h-.13a36 36 0 0 0-2.915 1.858c-.47.329-.94.659-1.398.998L7.527 8.341c-.689.609-1.418 1.228-2.087 1.897c-.31.31-.599.629-.878.998a4.2 4.2 0 0 1-.14-1.647a8.3 8.3 0 0 1 2.277-4.424a3.7 3.7 0 0 1 1.138-.759a5.4 5.4 0 0 1 1.867-.33a12.8 12.8 0 0 1 2.996.35a.3.3 0 0 0 .31-.22a.31.31 0 0 0-.22-.37a14.2 14.2 0 0 0-3.106-.478a6.1 6.1 0 0 0-2.147.31c-2.127.748-3.924 3.794-4.204 5.79a5.8 5.8 0 0 0 .49 3.107A6.36 6.36 0 0 0 5.78 14.98a4.8 4.8 0 0 0 1.588.75a7 7 0 0 0 1.647.249a7.44 7.44 0 0 0 4.364-1.308a6.47 6.47 0 0 0 2.627-3.685a7 7 0 0 0 .19-2.936M4.881 12.046a1 1 0 0 1-.07-.17q.57-.549 1.209-1.018c.729-.58 1.497-1.098 2.236-1.628s1.259-.998 1.868-1.488a78 78 0 0 0 1.827-1.527c.62-.53 1.059-.84 1.598-1.219q.127.096.24.21c.2.22.38.48.549.699c.48.582.82 1.265.999 1.997c-1.06.65-2.138 1.238-3.196 1.877q-1.177.696-2.277 1.508A21 21 0 0 0 6.7 14.282l-.22-.13a5.26 5.26 0 0 1-1.598-2.067zm10.266-1.348a5.48 5.48 0 0 1-2.327 3.086a6.4 6.4 0 0 1-3.745.998a5.5 5.5 0 0 1-1.398-.2c-.13 0-.25-.09-.37-.13c.45-.389.9-.748 1.369-1.098c.47-.35.998-.659 1.468-.998l1.478-.999q1.937-1.328 3.804-2.736a6.1 6.1 0 0 1-.28 2.117z"></path><path fill="#0c6fff" d="M23.245 20.553a3.6 3.6 0 0 0-.18-.639a4.4 4.4 0 0 0-.539-.998a11.5 11.5 0 0 0-.998-1.249a17 17 0 0 0-1.698-1.607c-.829-.68-1.698-1.298-2.576-1.997q.395-.76.649-1.578q.373-1.228.559-2.497c.157-.812.23-1.639.22-2.466a5.6 5.6 0 0 0-.29-1.698a12 12 0 0 0-.57-1.448a5.2 5.2 0 0 0-.568-.939a6.7 6.7 0 0 0-1.318-1.288c-.736-.52-1.53-.953-2.367-1.288a13 13 0 0 0-1.797-.629a7.2 7.2 0 0 0-1.998-.23a8.6 8.6 0 0 0-2.426.49C6.58.77 5.84 1.122 5.14 1.54c-.6.34-1.166.738-1.688 1.188C1.216 4.696.757 8.99.727 9.458a8.4 8.4 0 0 0 .54 3.736q.18.452.419.878c.23.4.489.79.759 1.179a9 9 0 0 0 1.837 2.047a5.4 5.4 0 0 0 1.668.899q1.037.338 2.117.499c.491.082.99.112 1.488.09a9.2 9.2 0 0 0 2.276-.44q1.075-.376 2.077-.918q.204.24.38.499c.43.66.769 1.368 1.168 1.997q.422.652.919 1.248q.47.586.999 1.119a6.53 6.53 0 0 0 3.505 1.678a2 2 0 0 0 2.326-1.658q.06-.262.09-.53q.015-.264 0-.529a4 4 0 0 0-.05-.699m-1.158 1.468a1 1 0 0 1-1.139.79a5.4 5.4 0 0 1-2.836-1.25a12 12 0 0 1-.998-.998a10 10 0 0 1-.919-1.088c-.44-.62-.839-1.308-1.298-1.937a6 6 0 0 0-.39-.46l.13-.09a6 6 0 0 0 .63-.519a.36.36 0 0 0 0-.49a.34.34 0 0 0-.48 0q-.256.238-.549.43q-.288.204-.6.37q-.967.491-1.996.838a8.3 8.3 0 0 1-2.137.36a6.4 6.4 0 0 1-1.638-.17a11 11 0 0 1-1.638-.45a4.7 4.7 0 0 1-1.677-1.048a8.8 8.8 0 0 1-1.299-1.607c-.23-.36-.469-.72-.679-1.119q-.195-.37-.35-.759a7.4 7.4 0 0 1-.409-3.285c.46-5.293 3.146-6.55 3.915-6.99A11.3 11.3 0 0 1 7.727 1.6a7.2 7.2 0 0 1 2.107-.45a6.2 6.2 0 0 1 1.668.18q.847.206 1.657.53c.64.247 1.259.547 1.848.898a5.5 5.5 0 0 1 1.498 1.239q.285.354.49.759q.33.643.568 1.328c.163.463.26.947.29 1.438c.024.778-.026 1.557-.15 2.326a18 18 0 0 1-.37 1.998c-.16.66-.395 1.3-.698 1.907q-.242.523-.57.998a6.4 6.4 0 0 1-.719.85a.304.304 0 0 0 .42.439q.44-.428.809-.919c.11-.15.2-.31.3-.47c.808.68 1.617 1.319 2.386 1.998q.815.744 1.518 1.598q.47.562.869 1.178q.238.381.379.809q.075.245.12.499q.015.24 0 .48z"></path></g></svg> }, 
        { name: t('digitalMarketing.socialMediaMarketing'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#424242" d="M87.4 124H40.6c-4.7 0-8.6-3.8-8.6-8.6V12.6C32 7.9 35.9 4 40.6 4h46.8c4.7 0 8.6 3.8 8.6 8.6v102.9c0 4.7-3.9 8.5-8.6 8.5"></path><path d="M86.77 120.11H39.93c-2.15 0-3.89-1.74-3.89-3.89V19.65c0-2.14 1.74-3.88 3.88-3.88h48.15c2.15 0 3.89 1.74 3.89 3.89v95.93c0 .93-1.4 4.52-5.19 4.52"></path><path fill="#212121" d="M73.65 11.59h-19.2c-.7 0-1.2-.6-1.2-1.2s.6-1.2 1.2-1.2h19.1c.7 0 1.2.6 1.2 1.2s-.5 1.2-1.1 1.2"></path><path fill="#757575" d="M87.4 6c3.64 0 6.6 2.96 6.6 6.6v102.9c0 3.58-2.96 6.5-6.6 6.5H40.6c-3.64 0-6.6-2.96-6.6-6.6V12.6C34 9.02 37.02 6 40.6 6zm0-2H40.6C35.9 4 32 7.9 32 12.6v102.8c0 4.8 3.9 8.6 8.6 8.6h46.8c4.7 0 8.6-3.8 8.6-8.5V12.6C96 7.8 92.1 4 87.4 4"></path><path fill="#eab56e" d="M48.35 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M60.9 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#ff80ab" d="M73.45 29.96H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#0288d1" d="M86.01 29.96h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M48.35 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#81d4fa" d="M60.9 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M73.45 44.12H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#eab56e" d="M86.01 44.12h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#fb8c00" d="M48.35 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#ff80ab" d="M60.9 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M73.45 58.28H67.1c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.33 1.32"></path><path fill="#0288d1" d="M86.01 58.28h-6.36c-.73 0-1.32-.59-1.32-1.32V50.6c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32M48.35 72.44h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32"></path><path fill="#81d4fa" d="M60.9 72.44h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .73-.59 1.32-1.32 1.32m-12.55 42.48h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path><path fill="#0288d1" d="M60.9 114.92h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path><path fill="#00bfa5" d="M73.45 114.92H67.1c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.33 1.32"></path><path fill="#ff80ab" d="M86.01 114.92h-6.36c-.73 0-1.32-.59-1.32-1.32v-6.36c0-.73.59-1.32 1.32-1.32h6.36c.73 0 1.32.59 1.32 1.32v6.36c0 .72-.59 1.32-1.32 1.32"></path></svg>}, 
        { name: t('digitalMarketing.contentMarketing'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 32 32"><g fill="none"><path fill="#d67d00" d="M9.995 15.583a2.5 2.5 0 0 1 5 0v8.42h6.95v-4h8.04v8.76c0 .68-.55 1.24-1.24 1.24h-9.24c-2.49 0-4.51-2.02-4.51-4.51v2.01a2.5 2.5 0 0 1-5 0z"></path><path fill="#ffc83d" d="m13.045 9.653l15.85 6.88c.67.29 1.1.94 1.1 1.67v9.81h-6.81c-1.88 0-3.57-.86-4.62-2.3c-.49-.67-1.4-.85-2.12-.45l-3.26 1.82A3.005 3.005 0 0 1 9.095 26H8v-3.5l-1.325.013a2.52 2.52 0 0 1-2.17 1.25c-.43 0-.86-.11-1.25-.34c-1.2-.7-1.61-2.22-.92-3.42l5.2-8.68a4.42 4.42 0 0 1 5.51-1.67M8.125 20h4.125v.69l2.265-1.307q.228-.131.465-.218a3.487 3.487 0 0 0-3.475-3.162c-.67 0-1.29 1.36-1.62 1.95z"></path><path fill="#f95725" d="m19.185 2.083l2.38 1.38c.3.17.4.55.23.85l-9.401 16.294l-2.21 1.276a3.005 3.005 0 0 0-.991 4.272l-.558.968c-.16.28-.39.53-.66.72l-2.75 2.08a.468.468 0 0 1-.73-.42l.38-3.44c.03-.34.13-.67.3-.96l13.16-22.79c.17-.3.55-.4.85-.23"></path><path fill="#fbb8ab" d="m8.552 27.256l-3.43-2.058a2.3 2.3 0 0 0-.247.865L4.61 28.46l1.469.816l1.896-1.433c.226-.16.424-.361.577-.587"></path><path fill="#000" d="m4.685 27.723l-.19 1.78c-.03.39.41.64.73.42l1.4-1.07z"></path><path fill="#d3d3d3" d="m16.395 5.673l3.46 2l1.04-1.8l-3.46-2z"></path></g></svg>}, 
        { name: t('digitalMarketing.emailCampaigns'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 48 48"><path fill="#45413c" d="M1.18 38.19a22.63 1.66 0 1 0 45.26 0a22.63 1.66 0 1 0-45.26 0" opacity={0.15}></path><path fill="#fff" d="M2.48 10.94h42.67v26.12H2.48Z"></path><path fill="#f0f0f0" d="M44 34.37H3.58a1.1 1.1 0 0 1-1.1-1.1V36a1.1 1.1 0 0 0 1.1 1.1H44a1.1 1.1 0 0 0 1.1-1.1v-2.73a1.1 1.1 0 0 1-1.1 1.1"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M2.48 10.94h42.67v26.12H2.48Z" strokeWidth={1}></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="m2.79 11.27l21.02 15.58l21.02-15.58M27.7 23.97l17.13 12.7m-42.04 0l17.13-12.7" strokeWidth={1}></path><path fill="#00b8f0" d="M14.16 23.75a9.84 9.84 0 1 0 19.68 0a9.84 9.84 0 1 0-19.68 0"></path><path fill="#4acfff" d="M24 16.33A9.84 9.84 0 0 1 33.77 25a12 12 0 0 0 .07-1.21a9.84 9.84 0 0 0-19.68 0a12 12 0 0 0 .07 1.21A9.84 9.84 0 0 1 24 16.33"></path><path fill="none" stroke="#45413c" strokeLinecap="round" strokeLinejoin="round" d="M14.16 23.75a9.84 9.84 0 1 0 19.68 0a9.84 9.84 0 1 0-19.68 0" strokeWidth={1}></path><path fill="#fff" d="M23.83 16.9a7.4 7.4 0 0 1 2.56.45a7.3 7.3 0 0 1 2.2 1.25a6.4 6.4 0 0 1 1.52 1.9a5 5 0 0 1 .58 2.38a4.06 4.06 0 0 1-.57 2.19a4.8 4.8 0 0 1-1.4 1.47a6.7 6.7 0 0 1-1.61.8a4.5 4.5 0 0 1-1.2.24c-.86 0-1.29-.3-1.29-.91a2.4 2.4 0 0 1-.86.66a2.45 2.45 0 0 1-1.09.25a2.3 2.3 0 0 1-1.09-.27a3 3 0 0 1-.88-.74a3.7 3.7 0 0 1-.58-1.05a3.5 3.5 0 0 1-.21-1.18a4.8 4.8 0 0 1 .26-1.54a4.3 4.3 0 0 1 .74-1.34a3.4 3.4 0 0 1 1.09-.92a3.2 3.2 0 0 1 1.48-.35a2.43 2.43 0 0 1 2.18 1.12v-.23c0-.59.34-.89 1-.89a1.25 1.25 0 0 1 .61.14a.42.42 0 0 1 .24.38a3 3 0 0 1-.07.6l-.74 3.38a2.6 2.6 0 0 0-.08.62c0 .26.15.39.43.39a1.37 1.37 0 0 0 .76-.31a2.56 2.56 0 0 0 .78-1a3.4 3.4 0 0 0 .41-1.52a3.8 3.8 0 0 0-.41-1.78a4.1 4.1 0 0 0-1.15-1.37a5.6 5.6 0 0 0-1.66-.86a6.5 6.5 0 0 0-2-.29a5.05 5.05 0 0 0-2 .4a5.1 5.1 0 0 0-1.66 1.1a5.5 5.5 0 0 0-1.11 1.66a5.1 5.1 0 0 0-.41 2a5.3 5.3 0 0 0 .4 2a5.25 5.25 0 0 0 2.78 2.78a5.2 5.2 0 0 0 2 .4a8.14 8.14 0 0 0 3.88-.88a6 6 0 0 0 .56-.43a1.4 1.4 0 0 1 .68-.37a.61.61 0 0 1 .69.69a1 1 0 0 1-.12.46a3.5 3.5 0 0 1-.38.55a5.66 5.66 0 0 1-2.35 1.29a11.2 11.2 0 0 1-3 .36a6.7 6.7 0 0 1-3.43-.92a6.86 6.86 0 0 1-2.49-2.5a6.85 6.85 0 0 1 2.49-9.36a6.6 6.6 0 0 1 3.52-.9m-.76 8.78a1.7 1.7 0 0 0 .93-.28a1.9 1.9 0 0 0 .67-.74a2.1 2.1 0 0 0 .24-1a1.72 1.72 0 0 0-.37-1.12a1.29 1.29 0 0 0-1-.46a1.44 1.44 0 0 0-.88.3a2.15 2.15 0 0 0-.64.76a2.06 2.06 0 0 0-.23.93a1.87 1.87 0 0 0 .35 1.12a1.11 1.11 0 0 0 .93.49"></path></svg> }, 
        { name: t('digitalMarketing.payPerClick'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#ffca28" d="M93.46 39.45c6.71-1.49 15.45-8.15 16.78-11.43c.78-1.92-3.11-4.92-4.15-6.13c-2.38-2.76-1.42-4.12-.5-7.41c1.05-3.74-1.44-7.87-4.97-9.49s-7.75-1.11-11.3.47s-6.58 4.12-9.55 6.62c-2.17-1.37-5.63-7.42-11.23-3.49c-3.87 2.71-4.22 8.61-3.72 13.32c1.17 10.87 3.85 16.51 8.9 18.03c6.38 1.92 13.44.91 19.74-.49"></path><path fill="#e2a610" d="M104.36 8.18c-.85 14.65-15.14 24.37-21.92 28.65l4.4 3.78s2.79.06 6.61-1.16c6.55-2.08 16.12-7.96 16.78-11.43c.97-5.05-4.21-3.95-5.38-7.94c-.61-2.11 2.97-6.1-.49-11.9m-24.58 3.91s-2.55-2.61-4.44-3.8c-.94 1.77-1.61 3.69-1.94 5.67c-.59 3.48 0 8.42 1.39 12.1c.22.57 1.04.48 1.13-.12c1.2-7.91 3.86-13.85 3.86-13.85"></path><path fill="#ffca28" d="M61.96 38.16S30.77 41.53 16.7 68.61s-2.11 43.5 10.55 49.48s44.56 8.09 65.31 3.17s25.94-15.12 24.97-24.97c-1.41-14.38-14.77-23.22-14.77-23.22s.53-17.76-13.25-29.29c-12.23-10.24-27.55-5.62-27.55-5.62"></path><path fill="#6b4b46" d="M74.76 83.73c-6.69-8.44-14.59-9.57-17.12-12.6c-1.38-1.65-2.19-3.32-1.88-5.39c.33-2.2 2.88-3.72 4.86-4.09c2.31-.44 7.82-.21 12.45 4.2c1.1 1.04.7 2.66.67 4.11c-.08 3.11 4.37 6.13 7.97 3.53c3.61-2.61.84-8.42-1.49-11.24c-1.76-2.13-8.14-6.82-16.07-7.56c-2.23-.21-11.2-1.54-16.38 8.31c-1.49 2.83-2.04 9.67 5.76 15.45c1.63 1.21 10.09 5.51 12.44 8.3c4.07 4.83 1.28 9.08-1.9 9.64c-8.67 1.52-13.58-3.17-14.49-5.74c-.65-1.83.03-3.81-.81-5.53c-.86-1.77-2.62-2.47-4.48-1.88c-6.1 1.94-4.16 8.61-1.46 12.28c2.89 3.93 6.44 6.3 10.43 7.6c14.89 4.85 22.05-2.81 23.3-8.42c.92-4.11.82-7.67-1.8-10.97"></path><path fill="none" stroke="#6b4b46" strokeMiterlimit={10} strokeWidth={5} d="M71.16 48.99c-12.67 27.06-14.85 61.23-14.85 61.23"></path><path fill="#6d4c41" d="M81.67 31.96c8.44 2.75 10.31 10.38 9.7 12.46c-.73 2.44-10.08-7.06-23.98-6.49c-4.86.2-3.45-2.78-1.2-4.5c2.97-2.27 7.96-3.91 15.48-1.47"></path><path fill="#6b4b46" d="M81.67 31.96c8.44 2.75 10.31 10.38 9.7 12.46c-.73 2.44-10.08-7.06-23.98-6.49c-4.86.2-3.45-2.78-1.2-4.5c2.97-2.27 7.96-3.91 15.48-1.47"></path><path fill="#e2a610" d="M96.49 58.86c1.06-.73 4.62.53 5.62 7.5c.49 3.41.64 6.71.64 6.71s-4.2-3.77-5.59-6.42c-1.75-3.35-2.43-6.59-.67-7.79"></path></svg> }, 
        { name: t('digitalMarketing.analyticsReporting'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 64 64"><path fill="#e6e7e8" d="M63.6 56.737a6.856 6.856 0 0 1-6.854 6.86H6.857c-3.784.001-6.853-3.071-6.853-6.86V6.856A6.856 6.856 0 0 1 6.857 0h49.889A6.855 6.855 0 0 1 63.6 6.856z"></path><path fill="none" stroke="#005" strokeLinecap="round" strokeOpacity={0.221} strokeWidth={0.4} d="M9.429 4.424v55.15zm6.451 0v55.15zm6.451 0v55.15zm6.451 0v55.15zm6.448 0v55.15zm6.454 0v55.15zm6.446 0v55.15zm6.46 0v55.15zM4.185 54.775h55.15zm0-6.455h55.15zm0-6.447h55.15zm0-6.451h55.15z"></path><path fill="#f05a28" d="M36.725 63.65V36.99c0-2.06-2.669-3.62-4.728-3.62s-4.729 1.561-4.729 3.62v26.66z"></path><path fill="#d04427" d="M33.778 33.718c-.594-.217-1.211-.348-1.781-.348c-2.059 0-4.729 1.561-4.729 3.62v26.66h3.565V36.99c0-1.488 1.397-2.706 2.945-3.272"></path><path fill="none" stroke="#005" strokeLinecap="round" strokeOpacity={0.221} strokeWidth={0.4} d="M4.185 28.971h55.15zm0-6.451h55.15z"></path><path fill="#208d55" d="M19.11 63.65V24.988c0-2.059-3.668-3.727-5.728-3.727s-5.729 1.668-5.729 3.727V63.65z"></path><path fill="#1b8049" d="M15.551 21.789c-.771-.27-1.542-.438-2.163-.438c-2.059 0-5.729 1.668-5.729 3.727V63.74h4.325V25.078c0-1.438 1.788-2.668 3.567-3.289"></path><path fill="none" stroke="#005" strokeLinecap="round" strokeOpacity={0.221} strokeWidth={0.4} d="M4.185 16.07h55.15zm0-6.451h55.15z"></path><path fill="#0867a3" d="M55.942 63.65V6.985c0-2.059-3.669-3.727-5.728-3.727s-5.729 1.668-5.729 3.727V63.65z"></path><path fill="#055e8c" d="M52.35 3.684c-.762-.262-1.52-.426-2.135-.426c-2.059 0-5.729 1.668-5.729 3.727V63.65h4.271V6.985c0-1.443 1.804-2.682 3.593-3.301"></path></svg> }, 
        { name: t('digitalMarketing.brandStrategy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 50 50"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path stroke="#344054" d="m31.25 18.75l-5.208 5.208zm0-6.25v6.25h6.25l6.25-6.25H37.5V6.25z"></path><path stroke="#306cfe" d="M25.688 6.25H25A18.75 18.75 0 1 0 43.75 25v-.687"></path><path stroke="#306cfe" d="M35.208 27.083a10.417 10.417 0 1 1-12.291-12.291"></path></g></svg> }, 
        { name: t('digitalMarketing.influencerMarketing'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 36 36"><path fill="#ef9645" d="M16.428 30.331a2.31 2.31 0 0 0 3.217-.568a.8.8 0 0 0-.197-1.114l-1.85-1.949l4.222 2.955a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-3.596-3.305l5.375 3.763a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-4.766-4.073l5.864 4.105a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089L4.733 11.194l-3.467 5.521c-.389.6-.283 1.413.276 1.891l7.786 6.671q.533.456 1.107.859z"></path><path fill="#ffdc5d" d="M29.802 21.752L18.5 13.601l-.059-.08l.053-.08l.053-.053l.854.469c.958.62 3.147 1.536 4.806 1.536c1.135 0 1.815-.425 2.018-1.257a1.41 1.41 0 0 0-1.152-1.622a6.8 6.8 0 0 1-2.801-1.091l-.555-.373c-.624-.421-1.331-.898-1.853-1.206c-.65-.394-1.357-.585-2.163-.585c-1.196 0-2.411.422-3.585.83l-1.266.436a5.2 5.2 0 0 1-1.696.271c-1.544 0-3.055-.586-4.516-1.152l-.147-.058a1.39 1.39 0 0 0-1.674.56L1.35 15.669a1.36 1.36 0 0 0 .257 1.761l7.785 6.672c.352.301.722.588 1.1.852l6.165 4.316a2 2 0 0 0 2.786-.491a.803.803 0 0 0-.196-1.115l-1.833-1.283a.424.424 0 0 1-.082-.618a.42.42 0 0 1 .567-.075l3.979 2.785a1.4 1.4 0 0 0 1.606-2.294l-3.724-2.606a.424.424 0 0 1-.082-.618a.423.423 0 0 1 .567-.075l5.132 3.593a1.4 1.4 0 0 0 1.606-2.294l-4.868-3.407a.42.42 0 0 1-.081-.618a.377.377 0 0 1 .506-.066l5.656 3.959a1.4 1.4 0 0 0 1.606-2.295"></path><path fill="#ef9645" d="M16.536 27.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 23.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.495 1.495 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 23.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 25.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm16.555-4.137l.627-.542l-6.913-10.85l-12.27 1.985a1.507 1.507 0 0 0-1.235 1.737c.658 2.695 6.003.693 8.355-.601z"></path><path fill="#ffcc4d" d="M16.536 26.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 22.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.5 1.5 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 22.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 24.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm21.557-7.456a1.45 1.45 0 0 0 .269-1.885l-.003-.005l-3.467-6.521a1.49 1.49 0 0 0-1.794-.6c-1.992.771-4.174 1.657-6.292.937l-1.098-.377c-1.948-.675-4.066-1.466-6-.294c-.695.409-1.738 1.133-2.411 1.58a6.9 6.9 0 0 1-2.762 1.076a1.5 1.5 0 0 0-1.235 1.737c.613 2.512 5.3.908 7.838-.369a.97.97 0 0 1 1.002.081l11.584 8.416z"></path></svg>} 
      ].map((service, index) => {
        const animations = ['fade-in-up', 'scale-in', 'bounce-in', 'zoom-in', 'slide-in-up', 'fade-in-left', 'fade-in-right', 'rotate-in']
        const animation = animations[index % animations.length]
        return (
        <ScrollAnimation 
          key={service.name} 
          animation={animation} 
          threshold={0.2} 
          triggerOnce={true} 
          stagger={`delay-${(index + 1) * 100}`}
        >
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-3 flex justify-center items-center">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {service.name}
            </h3>
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
        {t('digitalMarketing.ctaTitle')}
      </h2>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
      <p className="text-lg max-w-2xl mx-auto mb-10 text-white">
        {t('digitalMarketing.ctaDescription')}
      </p>
    </ScrollAnimation>

    {/* Buttons */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('digitalMarketing.startProjectButton')}
        </button>
        <button
          onClick={() => navigate('/services')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
          {t('digitalMarketing.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>

      <Footer />
    </div>
  )
}
