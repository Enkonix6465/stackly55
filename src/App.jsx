import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import { ThemeProvider } from './components/theme-provider'
import ScrollToTop from './components/ScrollToTop'
import { debugRoute } from './utils/debug'

// Lazy load all page components for code splitting
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Home = lazy(() => import('./pages/Home'))
const Home2 = lazy(() => import('./pages/Home2'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost1 = lazy(() => import('./pages/BlogPost1'))
const BlogPost2 = lazy(() => import('./pages/BlogPost2'))
const BlogPost3 = lazy(() => import('./pages/BlogPost3'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminDashboard = lazy(() => import('./pages/admin-dashboard'))
const FineDining = lazy(() => import('./pages/FineDining'))
const TakeawayDelivery = lazy(() => import('./pages/TakeawayDelivery'))
const ChefsTable = lazy(() => import('./pages/ChefsTable'))
const PrivateEvents = lazy(() => import('./pages/PrivateEvents'))
const WinePairing = lazy(() => import('./pages/WinePairing'))
const Reservations = lazy(() => import('./pages/Reservations'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
  </div>
)

// Component to handle route debugging
function RouteDebugger() {
  const location = useLocation();
  
  React.useEffect(() => {
    console.log('🛣️ Route changed to:', location.pathname);
    debugRoute(location.pathname);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RouteDebugger />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home2"
              element={
                <ProtectedRoute>
                  <Home2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/1"
              element={
                <ProtectedRoute>
                  <BlogPost1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/2"
              element={
                <ProtectedRoute>
                  <BlogPost2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/3"
              element={
                <ProtectedRoute>
                  <BlogPost3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/italian"
              element={
                <ProtectedRoute>
                  <BlogPost1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/wine"
              element={
                <ProtectedRoute>
                  <BlogPost2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/desserts"
              element={
                <ProtectedRoute>
                  <BlogPost3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/fine-dining"
              element={
                <ProtectedRoute>
                  <FineDining />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/takeaway-delivery"
              element={
                <ProtectedRoute>
                  <TakeawayDelivery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/chefs-table"
              element={
                <ProtectedRoute>
                  <ChefsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/private-events"
              element={
                <ProtectedRoute>
                  <PrivateEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/wine-pairing"
              element={
                <ProtectedRoute>
                  <WinePairing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services/reservations"
              element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
