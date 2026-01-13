import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    // Update active link when route changes
    setActiveLink(location.pathname);
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const handleLinkClick = () => {
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
      <div className={`hidden lg:block bg-fosroc-blue text-white py-2 fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a 
                href="tel:+917829531999" 
                className="flex items-center gap-2 hover:text-fosroc-orange-light transition-colors duration-300"
              >
                <FaPhone className="text-xs" />
                <span>+91 78295 31999</span>
              </a>
              <a 
                href="mailto:info@v2marketing.com" 
                className="flex items-center gap-2 hover:text-fosroc-orange-light transition-colors duration-300"
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
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-white/95 backdrop-blur-lg shadow-lg' 
            : 'lg:top-10 top-0 bg-white shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="flex items-center transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={logo} 
                alt="V2 Marketing" 
                className="h-14 sm:h-16 lg:h-14 w-auto object-contain"
                onError={(e) => {
                  console.error('Logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`relative px-4 xl:px-6 py-2 font-medium text-base transition-all duration-300 group ${
                      activeLink === link.path
                        ? 'text-fosroc-blue'
                        : 'text-gray-700 hover:text-fosroc-blue'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Animated underline */}
                    <span 
                      className={`absolute bottom-0 left-1/2 h-0.5 bg-fosroc-orange transition-all duration-300 ${
                        activeLink === link.path
                          ? 'w-full -translate-x-1/2'
                          : 'w-0 group-hover:w-full -translate-x-1/2'
                      }`}
                    />
                    
                    {/* Hover background */}
                    <span className="absolute inset-0 bg-fosroc-blue-lightest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="px-6 py-2.5 bg-fosroc-orange hover:bg-fosroc-orange-dark text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2.5 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-200 bg-white">
            <ul className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeLink === link.path
                        ? 'bg-fosroc-orange text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-fosroc-blue-lightest hover:text-fosroc-blue'
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
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Contact Info */}
            <div className="container mx-auto px-4 pb-6 space-y-3">
              <a
                href="tel:+917829531999"
                className="flex items-center gap-3 px-4 py-3 bg-fosroc-orange hover:bg-fosroc-orange-dark text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaPhone />
                <span>Call: +91 78295 31999</span>
              </a>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-fosroc-blue text-fosroc-blue hover:bg-fosroc-blue hover:text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Get Free Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar - Reduced to minimize gap */}
      <div className={`${isScrolled ? 'h-16 lg:h-20' : 'h-16 lg:h-20'} transition-all duration-300`} />
    </>
  );
};

export default Navbar;
