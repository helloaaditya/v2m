import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex flex-col gap-1" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-primary">V2 Marketing</h1>
            <span className="text-xs text-gray-500 font-medium">Authorized Fosroc Dealer</span>
          </Link>
          <button 
            className="md:hidden text-gray-800 text-2xl p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul className={`hidden md:flex gap-8 items-center`}>
            <li>
              <Link 
                to="/" 
                className={`font-medium transition-colors relative py-2 ${
                  isActive('/') 
                    ? 'text-primary' 
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                Home
                {isActive('/') && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`font-medium transition-colors relative py-2 ${
                  isActive('/about') 
                    ? 'text-primary' 
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                About Us
                {isActive('/about') && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`font-medium transition-colors relative py-2 ${
                  isActive('/products') 
                    ? 'text-primary' 
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                Products
                {isActive('/products') && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors relative py-2 ${
                  isActive('/contact') 
                    ? 'text-primary' 
                    : 'text-gray-800 hover:text-primary'
                }`}
                onClick={closeMenu}
              >
                Contact
                {isActive('/contact') && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <ul className="flex flex-col p-4 gap-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/products', label: 'Products' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <motion.li
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`block py-2 font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-gray-800 hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
