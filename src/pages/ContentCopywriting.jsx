import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function ContentCopywriting() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(false)
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

    // Theme detection
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [navigate])

  if (!user) {
    return null
  }
  const features = [
    t('contentCopywriting.serviceOverview.features.seoOptimized'),
    t('contentCopywriting.serviceOverview.features.engagingCopy'),
    t('contentCopywriting.serviceOverview.features.consistentBrand'),
  ];
   const steps = [
    {
      number: 1,
      title: t('contentCopywriting.process.steps.research.title'),
      description: t('contentCopywriting.process.steps.research.description'),
    },
    {
      number: 2,
      title: t('contentCopywriting.process.steps.strategy.title'),
      description: t('contentCopywriting.process.steps.strategy.description'),
    },
    {
      number: 3,
      title: t('contentCopywriting.process.steps.writing.title'),
      description: t('contentCopywriting.process.steps.writing.description'),
    },
    {
      number: 4,
      title: t('contentCopywriting.process.steps.refinement.title'),
      description: t('contentCopywriting.process.steps.refinement.description'),
    },
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} transition-colors`}>
      <Navbar user={user} />

      {/*1 Showcase */}
<ScrollAnimation animation="fade-in" threshold={0.1} className="delay-100">
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
    <source src="/vedio10.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-100">
    <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
      {t('contentCopywriting.showcase.title')}
    </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-200">
    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
      {t('contentCopywriting.showcase.subtitle')}
    </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-300">
    <div className="mt-8 flex gap-4 justify-center">
      {/* Primary Button */}
      <a
        href="/contact"
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
      >
        {t('contentCopywriting.showcase.connectButton')}
      </a>
    </div>
    </ScrollAnimation>
  </div>
</section>
</ScrollAnimation>
      
      

{/* 2 Services - Content Copywriting Hero */}
<ScrollAnimation animation="fade-in-up" threshold={0.2} className="delay-200">
 <section
      id="hero"
      className={`relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? "border-gray-700 bg-gray-900 text-white" : "border-black/10 bg-white text-black"
      }`}
    >  <div className="mx-auto max-w-6xl px-4 py-28 grid md:grid-cols-2 gap-10 items-center">
    <ScrollAnimation animation="slide-in-left" threshold={0.3} className="delay-100">
      <div>
      <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-200">
        <p className={`text-sm tracking-widest ${isDark ? "text-white" : "text-black"}`}>
          {t('contentCopywriting.hero.tagline')}
        </p>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-300">
        <h1 className={`mt-2 text-4xl md:text-5xl font-extrabold leading-tight ${isDark ? "text-white" : "text-black"}`}>
          {t('contentCopywriting.hero.title')}
        </h1>
      </ScrollAnimation>
      
      <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-400">
        <p className={`mt-4 ${isDark ? "text-gray-300" : "text-black"}`}>
          {t('contentCopywriting.hero.description')}
        </p>
      </ScrollAnimation>
    </div>
    </ScrollAnimation>

    <ScrollAnimation animation="slide-in-right" threshold={0.3} className="delay-200">
    <div className="justify-self-center relative">
      {/* image */}
      <img
        src="/images/Organization.jpg" 
        alt="Content Copywriting illustration"
        className="h-56 w-56 md:h-72 md:w-72 object-cover shadow-lg"
      />
    </div>
    </ScrollAnimation>
  </div>
</section>
</ScrollAnimation>



      {/* 3 Service Overview */}
<ScrollAnimation animation="fade-in-up" threshold={0.2} className="delay-300">
<section
      className={`py-20 transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-in-left" threshold={0.3} className="delay-100">
              <div>
                <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-200">
                  <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
                    {t('contentCopywriting.serviceOverview.title')}
                  </h2>
                </ScrollAnimation>
                <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-300">
                  <p className={`text-lg mb-6 leading-relaxed ${isDark ? "text-gray-400" : "text-black/70"}`}>
                    {t('contentCopywriting.serviceOverview.description')}
                  </p>
                </ScrollAnimation>
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <ScrollAnimation 
                      key={idx} 
                      animation="fade-in-up" 
                      threshold={0.3} 
                      className={`delay-${(idx + 4) * 100}`}
                    >
                      <div className="flex items-center gap-3">
                        <ScrollAnimation 
                          animation="scale-in" 
                          threshold={0.3} 
                          className={`delay-${(idx + 5) * 100}`}
                        >
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </ScrollAnimation>
                        <span className={isDark ? "text-gray-300" : "text-black   "}>{feature}</span>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="scale-in" threshold={0.3} className="delay-200">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('contentCopywriting.serviceOverview.contentFeatures.title')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                    <span className="text-gray-600 dark:text-gray-400">{t('contentCopywriting.serviceOverview.contentFeatures.blogPosts')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                    <span className="text-gray-600 dark:text-gray-400">{t('contentCopywriting.serviceOverview.contentFeatures.productDescriptions')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                    <span className="text-gray-600 dark:text-gray-400">{t('contentCopywriting.serviceOverview.contentFeatures.websiteCopy')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                    <span className="text-gray-600 dark:text-gray-400">{t('contentCopywriting.serviceOverview.contentFeatures.emailMarketing')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                    <span className="text-gray-600 dark:text-gray-400">{t('contentCopywriting.serviceOverview.contentFeatures.socialMedia')}</span>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
</ScrollAnimation>
      {/* 4 Process Section - Content Copywriting */}
<ScrollAnimation animation="fade-in-up" threshold={0.2} className="delay-400">
 <section
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >  <div className="mx-auto max-w-7xl px-4">
    {/* Heading */}
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-100">
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          {t('contentCopywriting.process.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {t('contentCopywriting.process.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <ScrollAnimation 
          key={step.number} 
          animation="zoom-in" 
          threshold={0.3} 
          className={`delay-${(index + 2) * 100}`}
        >
          <div className="text-center">
            <ScrollAnimation 
              animation="bounce-in" 
              threshold={0.3} 
              className={`delay-${(index + 3) * 100}`}
            >
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-300/40">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation 
              animation="fade-in-up" 
              threshold={0.3} 
              className={`delay-${(index + 4) * 100}`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {step.title}
              </h3>
            </ScrollAnimation>
            <ScrollAnimation 
              animation="fade-in-up" 
              threshold={0.3} 
              className={`delay-${(index + 5) * 100}`}
            >
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {step.description}
              </p>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  </div>
</section>
</ScrollAnimation>
{/* Tools & Skills - Copywriting */}
<ScrollAnimation animation="fade-in-up" threshold={0.2} className="delay-500">
<section
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-white"
      }`}
    >  <div className="mx-auto max-w-7xl px-4">
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-100">
      <div className="text-center mb-16">
         <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
          {t('contentCopywriting.tools.title')}
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          {t('contentCopywriting.tools.subtitle')}
        </p>
      </div>
    </ScrollAnimation>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { name: t('contentCopywriting.tools.skills.seoWriting'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 48 48"><g fill="#3f51b5"><circle cx={8} cy={38} r={3}></circle><circle cx={16} cy={40} r={3}></circle><circle cx={24} cy={33} r={3}></circle><circle cx={32} cy={35} r={3}></circle><circle cx={40} cy={31} r={3}></circle><path d="m39.1 29.2l-7.3 3.7l-8.3-2.1l-8 7l-7-1.7l-1 3.8l9 2.3l8-7l7.7 1.9l8.7-4.3z"></path></g><g fill="#00bcd4"><circle cx={8} cy={20} r={3}></circle><circle cx={16} cy={22} r={3}></circle><circle cx={24} cy={15} r={3}></circle><circle cx={32} cy={20} r={3}></circle><circle cx={40} cy={8} r={3}></circle><path d="M38.3 6.9c-2.1 3.2-5.3 8-6.9 10.4c-1.2-.7-3.1-2-6.4-4l-1.3-.8l-8.3 7.3l-7-1.7l-1 3.9l9 2.3l7.7-6.7c2.6 1.6 5.8 3.6 6.5 4.1l.5.5l.9-.1c1.1-.1 1.1-.1 9.5-12.9z"></path></g></svg> },  
                  { name: t('contentCopywriting.tools.skills.contentStrategy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24"><g fill="none"><path fill="#e3e3e3" d="M16.224 1H2.02a.947.947 0 0 0-.947.947v14.975c0 .523.424.947.947.947h14.204a.947.947 0 0 0 .947-.947V1.947A.947.947 0 0 0 16.224 1"></path><path fill="#fff" d="M16.337 1.227c-.014 0-.025-.007-.04-.007H2.093a.947.947 0 0 0-.947.947v14.252z"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M11.09 18.265H2.092a.947.947 0 0 1-.947-.947V2.167c0-.523.424-.947.947-.947h14.205c.523 0 .947.424.947.947v9.47" strokeWidth={1}></path><path fill="#ffef5e" d="m18.646 13.076l-5.947 5.947l2.84 2.842l5.948-5.947z"></path><path fill="#ffbc44" d="m12.699 19.023l2.84 2.84L11.564 23z"></path><path fill="#ff808c" d="m22.339 15.064l-.853.853l-2.84-2.841l.852-.853c1.093-1.093 2.96-.593 3.36.901a2.01 2.01 0 0 1-.52 1.94"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.354 5.008h6.63M4.46 7.849h8.523M4.46 10.69h8.523M4.46 13.53h6.156m8.03-.454l-5.947 5.947l2.84 2.842l5.948-5.947z" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m12.699 19.023l2.84 2.84L11.564 23zm9.64-3.959l-.853.853l-2.84-2.841l.852-.853c1.093-1.093 2.96-.593 3.36.901a2.01 2.01 0 0 1-.52 1.94" strokeWidth={1}></path></g></svg> },
                  { name: t('contentCopywriting.tools.skills.storytelling'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 36 36"><path fill="#269" d="M32 7H4a4 4 0 0 0-4 4v15a4 4 0 0 0 4 4h11.416c.52.596 1.477 1 2.584 1s2.065-.404 2.584-1H32a4 4 0 0 0 4-4V11a4 4 0 0 0-4-4"></path><path fill="#292f33" d="M20 27a2 2 0 0 1-4 0V9a2 2 0 0 1 4 0z"></path><path fill="#99aab5" d="M18 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path><path fill="#e1e8ed" d="M18 26c-.999-1.998-3.657-2-4-2c-2 0-5 2-8 2c-1 0-2-.896-2-2V8c0-1.104 1-2 2-2c3.255 0 6-2 8-2c3 0 4 1.896 4 3z"></path><path fill="#99aab5" d="M34 26a2 2 0 0 1-2 2H20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path><path fill="#ccd6dd" d="M18 26c.999-1.998 3.657-2 4-2c2 0 5 2 8 2c1 0 2-.896 2-2V8c0-1.104-1-2-2-2c-3.256 0-6-2-8-2c-3 0-4 1.896-4 3z"></path></svg> }, 
                  { name: t('contentCopywriting.tools.skills.brandVoice'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 16 16"><path fill="#000" fillRule="evenodd" d="m3.75 15.7l7.61-6.79c1.2.046 2.41-.389 3.33-1.3a4.466 4.466 0 0 0 0-6.31a4.466 4.466 0 0 0-6.31 0a4.43 4.43 0 0 0-1.3 3.33L.29 12.24a1.113 1.113 0 0 0 .044 1.53l1.89 1.89c.418.418 1.09.438 1.53.044zm6.83-7.43L7.71 5.4L6.49 6.77l2.72 2.72zm-2.11 1.89L5.83 7.52l-4.8 5.38a.117.117 0 0 0 .005.16l1.89 1.89a.117.117 0 0 0 .16.005l5.38-4.8zm-.395-5.81c.025-.854.363-1.7 1.01-2.35a3.47 3.47 0 0 1 4.9 0a3.47 3.47 0 0 1 0 4.9a3.42 3.42 0 0 1-2.35 1.01l-3.57-3.57z" clipRule="evenodd"></path></svg>}, 
                  { name: t('contentCopywriting.tools.skills.marketResearch'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24"><g fill="none"><path fill="#020202" d="M16.195 8.05a5.74 5.74 0 0 0-1.248-2.655c-.19-.23-.39-.5-.62-.73a2.1 2.1 0 0 0-.578-.429a.34.34 0 0 0-.44.12h-.13a36 36 0 0 0-2.915 1.858c-.47.329-.94.659-1.398.998L7.527 8.341c-.689.609-1.418 1.228-2.087 1.897c-.31.31-.599.629-.878.998a4.2 4.2 0 0 1-.14-1.647a8.3 8.3 0 0 1 2.277-4.424a3.7 3.7 0 0 1 1.138-.759a5.4 5.4 0 0 1 1.867-.33a12.8 12.8 0 0 1 2.996.35a.3.3 0 0 0 .31-.22a.31.31 0 0 0-.22-.37a14.2 14.2 0 0 0-3.106-.478a6.1 6.1 0 0 0-2.147.31c-2.127.748-3.924 3.794-4.204 5.79a5.8 5.8 0 0 0 .49 3.107A6.36 6.36 0 0 0 5.78 14.98a4.8 4.8 0 0 0 1.588.75a7 7 0 0 0 1.647.249a7.44 7.44 0 0 0 4.364-1.308a6.47 6.47 0 0 0 2.627-3.685a7 7 0 0 0 .19-2.936M4.881 12.046a1 1 0 0 1-.07-.17q.57-.549 1.209-1.018c.729-.58 1.497-1.098 2.236-1.628s1.259-.998 1.868-1.488a78 78 0 0 0 1.827-1.527c.62-.53 1.059-.84 1.598-1.219q.127.096.24.21c.2.22.38.48.549.699c.48.582.82 1.265.999 1.997c-1.06.65-2.138 1.238-3.196 1.877q-1.177.696-2.277 1.508A21 21 0 0 0 6.7 14.282l-.22-.13a5.26 5.26 0 0 1-1.598-2.067zm10.266-1.348a5.48 5.48 0 0 1-2.327 3.086a6.4 6.4 0 0 1-3.745.998a5.5 5.5 0 0 1-1.398-.2c-.13 0-.25-.09-.37-.13c.45-.389.9-.748 1.369-1.098c.47-.35.998-.659 1.468-.998l1.478-.999q1.937-1.328 3.804-2.736a6.1 6.1 0 0 1-.28 2.117z"></path><path fill="#0c6fff" d="M23.245 20.553a3.6 3.6 0 0 0-.18-.639a4.4 4.4 0 0 0-.539-.998a11.5 11.5 0 0 0-.998-1.249a17 17 0 0 0-1.698-1.607c-.829-.68-1.698-1.298-2.576-1.997q.395-.76.649-1.578q.373-1.228.559-2.497c.157-.812.23-1.639.22-2.466a5.6 5.6 0 0 0-.29-1.698a12 12 0 0 0-.57-1.448a5.2 5.2 0 0 0-.568-.939a6.7 6.7 0 0 0-1.318-1.288c-.736-.52-1.53-.953-2.367-1.288a13 13 0 0 0-1.797-.629a7.2 7.2 0 0 0-1.998-.23a8.6 8.6 0 0 0-2.426.49C6.58.77 5.84 1.122 5.14 1.54c-.6.34-1.166.738-1.688 1.188C1.216 4.696.757 8.99.727 9.458a8.4 8.4 0 0 0 .54 3.736q.18.452.419.878c.23.4.489.79.759 1.179a9 9 0 0 0 1.837 2.047a5.4 5.4 0 0 0 1.668.899q1.037.338 2.117.499c.491.082.99.112 1.488.09a9.2 9.2 0 0 0 2.276-.44q1.075-.376 2.077-.918q.204.24.38.499c.43.66.769 1.368 1.168 1.997q.422.652.919 1.248q.47.586.999 1.119a6.53 6.53 0 0 0 3.505 1.678a2 2 0 0 0 2.326-1.658q.06-.262.09-.53q.015-.264 0-.529a4 4 0 0 0-.05-.699m-1.158 1.468a1 1 0 0 1-1.139.79a5.4 5.4 0 0 1-2.836-1.25a12 12 0 0 1-.998-.998a10 10 0 0 1-.919-1.088c-.44-.62-.839-1.308-1.298-1.937a6 6 0 0 0-.39-.46l.13-.09a6 6 0 0 0 .63-.519a.36.36 0 0 0 0-.49a.34.34 0 0 0-.48 0q-.256.238-.549.43q-.288.204-.6.37q-.967.491-1.996.838a8.3 8.3 0 0 1-2.137.36a6.4 6.4 0 0 1-1.638-.17a11 11 0 0 1-1.638-.45a4.7 4.7 0 0 0 1.677-1.048a8.8 8.8 0 0 1-1.299-1.607c-.23-.36-.469-.72-.679-1.119q-.195-.37-.35-.759a7.4 7.4 0 0 1-.409-3.285c.46-5.293 3.146-6.55 3.915-6.99A11.3 11.3 0 0 1 7.727 1.6a7.2 7.2 0 0 1 2.107-.45a6.2 6.2 0 0 1 1.668.18q.847.206 1.657.53c.64.247 1.259.547 1.848.898a5.5 5.5 0 0 1 1.498 1.239q.285.354.49.759q.33.643.568 1.328c.163.463.26.947.29 1.438c.024.778-.026 1.557-.15 2.326a18 18 0 0 1-.37 1.998c-.16.66-.395 1.3-.698 1.907q-.242.523-.57.998a6.4 6.4 0 0 1-.719.85a.304.304 0 0 0 .42.439q.44-.428.809-.919c.11-.15.2-.31.3-.47c.808.68 1.617 1.319 2.386 1.998q.815.744 1.518 1.598q.47.562.869 1.178q.238.381.379.809q.075.245.12.499q.015.24 0 .48z"></path></g></svg> }, 
                  { name: t('contentCopywriting.tools.skills.editingProofreading'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#bcaaa4" d="M64.83 46.3L27.29 92.55c-.23.28-.41.6-.54.94l-4.88 12.81c-1.08 2.84 1.62 5.65 4.2 4.34l12.02-6.11c.34-.17.66-.42.92-.71l41.08-46.2c.71-.79 1.01-1.91.81-2.99c-.73-3.96-3.62-12.77-14.65-9.33c-.55.17-1.04.53-1.42 1"></path><path fill="#bdbdbd" d="m38.09 104.54l-12.02 6.11c-2.57 1.31-5.28-1.5-4.2-4.34l4.88-12.81z"></path><path d="M64 46.33c5.14-5.64 24.93-26.62 36.73-31.78c4.47-1.96 10.09 1.47 8.66 7.04c-1.98 7.67-29.63 39.24-29.63 39.24c-.57.73-2.73 1.24-3.38.97c-.22-.09.6-.56.44-.82l-.12-.49c-.1-.4-.26-.79-.48-1.14c-2.76-4.35-6.61-7.27-11.7-9.6c-.56-.26-2.44-.25-2.44-.25c0-1.42 1.12-2.29 1.92-3.17"></path><path fill="#212121" d="m22.77 104.24l-1.34 3.32c-.94 2.32 1.41 4.61 3.63 3.54l3.48-1.66z"></path><path fill="#fafafa" d="m52.09 82.05l-.51-.47a.877.877 0 0 1-.07-1.22l19.41-22.13a.84.84 0 0 1 1.19-.07l.51.47c.35.32.38.87.07 1.22L53.28 81.99a.83.83 0 0 1-1.19.06"></path><path fill="#795548" d="M64.34 45.76c5.14-5.56 25.57-27.55 37.37-32.65c4.47-1.93 10.09 1.43 8.66 6.91c-1.98 7.55-29.31 39.18-29.31 39.18c-.76.96-2.3.88-2.93-.16c-2.8-4.63-7.12-8.23-12.29-10.26l-.85-.33c-1.13-.45-1.46-1.82-.65-2.69"></path><path d="M90.71 49.78c6.71-8.09 12.17-13.75 18.36-23.41c.56-.88 1.94.4 1.4 1.33c-4.53 8-15.33 20.27-18.1 23.43c-.7.79-2.25-.64-1.66-1.35"></path><path d="M110.21 28.27c-.5.69-1.48.84-2.17.34l-1.5-1.09a1.56 1.56 0 0 1-.34-2.17c.5-.69 1.48-.84 2.17-.34l1.5 1.09c.7.5.85 1.48.34 2.17"></path><path fill="#fff" d="M26.75 93.49s.17-.39.25-.51c.06-.11.29-.43.29-.43l11.72 11.27s-.32.32-.46.42c-.13.1-.46.29-.46.29z"></path></svg> }, 
                  { name: t('contentCopywriting.tools.skills.socialMediaCopy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v-.5m4 .5v-.5M8 11v-.5m-4.536 6.328C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"></path></svg> }, 
                  { name: t('contentCopywriting.tools.skills.emailMarketing'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 32 32"><g fill="none"><rect width={30} height={22} x={1} y={5} fill="#b4acbc" rx={1.5}></rect><rect width={28} height={18} x={2} y={7} fill="#cdc4d6" rx={1}></rect><path fill="#e1d8ec" d="m30 23.4l-12.971-7.782a2 2 0 0 0-2.058 0L2 23.4V25a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1z"></path><path fill="#998ea4" d="M2 9.766V8h28v1.766L17.544 17.24a3 3 0 0 1-3.088 0z"></path><path fill="#f3eef8" d="M2 8.6V7a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v1.6l-12.971 7.783a2 2 0 0 1-2.058 0z"></path><path fill="#00a6ed" d="M16 23a7 7 0 1 0 0-14a7 7 0 0 0 0 14"></path><path fill="#f4f4f4" d="M16 11.5c-1.21-.02-2.36.44-3.22 1.3c-.87.85-1.34 1.99-1.34 3.2c0 2.48 2.02 4.5 4.5 4.5a.47.47 0 1 0 0-.94c-1.96 0-3.56-1.6-3.56-3.56c0-.96.38-1.86 1.06-2.53s1.59-1.03 2.55-1.03c1.93.03 3.51 1.65 3.51 3.62v.81a.67.67 0 0 1-1.34 0v-3.08a.47.47 0 0 0-.47-.47c-.26 0-.49.21-.49.47v.09c-.44-.35-.99-.57-1.6-.57c-1.4 0-2.54 1.14-2.54 2.54s1.14 2.54 2.54 2.54c.7 0 1.34-.29 1.8-.75c.28.5.81.84 1.42.84c.89 0 1.62-.73 1.62-1.62v-.81c0-2.47-1.99-4.52-4.44-4.55m-.39 5.96c-.88 0-1.6-.72-1.6-1.6s.72-1.6 1.6-1.6s1.6.72 1.6 1.6s-.72 1.6-1.6 1.6"></path></g></svg> },   
      ].map((skill, index) => (
        <ScrollAnimation 
          key={skill.name} 
          animation="bounce-in" 
          threshold={0.3} 
          className={`delay-${(index + 2) * 100}`}
        >
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-3 flex justify-center items-center">{skill.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  </div>
</section>
</ScrollAnimation>




       {/* Call to Action */}
<ScrollAnimation animation="fade-in-up" threshold={0.2} className="delay-600">
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
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-100">
      <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">
          {t('contentCopywriting.cta.title')}
        </h2>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-200">
      <p className="text-lg max-w-2xl mx-auto mb-10 text-white">
        {t('contentCopywriting.cta.subtitle')}
      </p>
    </ScrollAnimation>

    {/* Buttons */}
    <ScrollAnimation animation="fade-in-up" threshold={0.3} className="delay-300">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
          {t('contentCopywriting.cta.startProjectButton')}
        </button>
        <button
          onClick={() => navigate('/services')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
          {t('contentCopywriting.cta.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>
</ScrollAnimation>


      <Footer />
    </div>
  )
}
