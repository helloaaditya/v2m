import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    closeMenu();
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on desktop, hides on scroll */}
      <div className={`hidden lg:block bg-blue-900 text-white py-2 fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a 
                href="tel:+917829531999" 
                className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300"
              >
                <FaPhone className="text-xs" />
                <span>+91 78295 31999</span>
              </a>
              <a 
                href="mailto:info@v2marketing.com" 
                className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300"
              >
                <FaEnvelope className="text-xs" />
                <span>info@v2marketing.com</span>
              </a>
            </div>
            <div className="text-xs">
              <span className="font-semibold">Authorized Fosroc Dealer</span> - Serving Since 2010
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'top-0 bg-white/95 backdrop-blur-lg shadow-xl' 
            : 'lg:top-10 top-0 bg-white shadow-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <a 
              href="/" 
              onClick={() => handleLinkClick('/')}
              className="flex items-center transition-transform duration-300 hover:scale-105"
            >
              <img 
                src="https://i.ibb.co/7N6rZCjY/logo-com.png" 
                alt="V2 Marketing" 
                className="h-10 w-auto sm:h-12 lg:h-14"
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`relative px-4 xl:px-6 py-2 font-medium text-base transition-all duration-300 group ${
                      activeLink === link.path
                        ? 'text-blue-900'
                        : 'text-gray-700 hover:text-blue-900'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Animated underline */}
                    <span 
                      className={`absolute bottom-0 left-1/2 h-0.5 bg-blue-600 transition-all duration-300 ${
                        activeLink === link.path
                          ? 'w-full -translate-x-1/2'
                          : 'w-0 group-hover:w-full -translate-x-1/2'
                      }`}
                    />
                    
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Get Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute top-1.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current -translate-y-1/2 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span 
                  className={`absolute bottom-1.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
            <ul className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <li 
                  key={link.path}
                  style={{
                    animation: isMenuOpen ? `slideIn 0.4s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <a
                    href={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeLink === link.path
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-900 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeLink === link.path ? 'translate-x-1' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Contact Info */}
            <div className="container mx-auto px-4 pb-6 space-y-3">
              <a
                href="tel:+917829531999"
                className="flex items-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FaPhone />
                <span>Call: +91 78295 31999</span>
              </a>
              <a
                href="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Get Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className={`${isScrolled ? 'h-16 lg:h-20' : 'h-16 lg:h-28'} transition-all duration-500`} />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;