import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes - With Navbar/Footer */}
          <Route path="/" element={
            <div className="App min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="App min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/products" element={
            <div className="App min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Products />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="App min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

