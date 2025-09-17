import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ThemeToggle } from '../components/theme-toggle'
import { useTranslation } from 'react-i18next'

export default function BlogPost3() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const user = getCurrentUser()

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />

      {/* Theme Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section 
        className="relative text-white"
        style={{
          backgroundImage: "url('/images/Chocolate Lava Cak.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/60'}`}></div>

        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{t('blogPost3.hero.category')}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{t('blogPost3.hero.readTime')}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{t('blogPost3.hero.date')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('blogPost3.hero.title')}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 font-bold">
                SC
              </div>
              <div>
                <p className="font-semibold">{t('blogPost3.hero.author')}</p>
                <p className="text-white/80 text-sm">{t('blogPost3.hero.authorRole')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <img
                  src="/images/Chocolate Lava Cak.jpg"
                  alt="French Pastry Techniques"
                  className="w-full h-64 object-cover rounded-xl mb-8"
                />
                
                <p className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('blogPost3.content.intro')}
                </p>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section1.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section1.description')}
                </p>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {t('blogPost3.content.section1.subtitle')}
                </h3>
                <ul className="mb-6 space-y-2">
                  {t('blogPost3.content.section1.techniques', { returnObjects: true }).map((technique, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 text-lg">✓</span>
                      <span><strong>{technique.name}:</strong> {technique.description}</span>
                    </li>
                  ))}
                </ul>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section2.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section2.description')}
                </p>

                <div className={`p-6 rounded-xl mb-8 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <h4 className={`font-semibold mb-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {t('blogPost3.content.section2.subtitle')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {t('blogPost3.content.section2.desserts', { returnObjects: true }).map((dessert, index) => (
                      <div key={index}>
                        <h5 className={`font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{dessert.name}</h5>
                        <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                          {dessert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Key Success Factors
                </h3>
                <ol className="mb-8 space-y-3 list-decimal list-inside">
                  {t('blogPost3.content.section2.successFactors', { returnObjects: true }).map((factor, index) => (
                    <li key={index}>
                      <strong>{factor.split(':')[0]}:</strong> {factor.split(':')[1]}
                    </li>
                  ))}
                </ol>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section3.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section3.description')}
                </p>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {t('blogPost3.content.section3.subtitle')}
                </h3>
                <ul className="mb-8 space-y-3">
                  {t('blogPost3.content.section3.skills', { returnObjects: true }).map((skill, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 text-lg">•</span>
                      <span><strong>{skill.name}:</strong> {skill.description}</span>
                    </li>
                  ))}
                </ul>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section4.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section4.description')}
                </p>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {t('blogPost3.content.section4.subtitle')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {t('blogPost3.content.section4.tools', { returnObjects: true }).map((tool, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h4 className="font-semibold mb-2">{tool.name}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section5.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section5.description')}
                </p>

                <div className={`p-6 rounded-xl mb-8 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <h4 className={`font-semibold mb-3 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {t('blogPost3.content.section5.subtitle')}
                  </h4>
                  <ul className={`space-y-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {t('blogPost3.content.section5.trends', { returnObjects: true }).map((trend, index) => (
                      <li key={index}>• {trend}</li>
                    ))}
                  </ul>
                </div>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Seasonal Menu Planning
                </h3>
                <p className="mb-6">
                  {t('blogPost3.content.section5.menuPlanning')}
                </p>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.section6.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost3.content.section6.description')}
                </p>

                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {t('blogPost3.content.section6.subtitle')}
                </h3>
                <ul className="mb-8 space-y-3">
                  {t('blogPost3.content.section6.checklist', { returnObjects: true }).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 text-lg">•</span>
                      <span><strong>{item.name}:</strong> {item.description}</span>
                    </li>
                  ))}
                </ul>

                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('blogPost3.content.conclusion.title')}
                </h2>
                <p className="mb-8">
                  {t('blogPost3.content.conclusion.mainText')}
                </p>

                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t('blogPost3.content.conclusion.finalText')}
                </p>
              </article>

              {/* Author Bio */}
              <div className={`mt-12 p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    SC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('blogPost3.author.name')}</h3>
                    <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('blogPost3.author.bio')}
                    </p>
                    <div className="flex gap-2">
                      {t('blogPost3.author.expertise', { returnObjects: true }).map((skill, index) => (
                        <span key={index} className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Posts */}
              <div className={`p-6 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-bold text-lg mb-4">{t('blogPost3.sidebar.relatedPosts')}</h3>
                <div className="space-y-4">
                  <div 
                    className="cursor-pointer group"
                    onClick={() => navigate('/blog/italian')}
                  >
                    <h4 className="font-semibold group-hover:text-red-600 transition-colors">
                      {t('blogPost3.sidebar.post1.title')}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('blogPost3.sidebar.post1.description')}
                    </p>
                  </div>
                  <div 
                    className="cursor-pointer group"
                    onClick={() => navigate('/blog/wine')}
                  >
                    <h4 className="font-semibold group-hover:text-red-600 transition-colors">
                      {t('blogPost3.sidebar.post2.title')}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('blogPost3.sidebar.post2.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pastry Tips */}
              <div className={`p-6 rounded-xl border mt-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-bold text-lg mb-4">{t('blogPost3.sidebar.chefTips')}</h3>
                <div className="space-y-3">
                  {t('blogPost3.sidebar.tips', { returnObjects: true }).map((tip, index) => (
                    <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                      <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{tip.title}</h4>
                      <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classic Desserts Quick Reference */}
              <div className={`p-6 rounded-xl border mt-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-bold text-lg mb-4">{t('blogPost3.sidebar.classicDesserts')}</h3>
                <div className="space-y-2">
                  {t('blogPost3.sidebar.dessertsList', { returnObjects: true }).map((dessert, index) => (
                    <div key={index} className={`flex justify-between items-center py-2 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <span className="text-sm font-medium">{dessert.name}</span>
                      <span className="text-xs text-gray-500">{dessert.origin}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
