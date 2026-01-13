import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/logo.png';

const Footer = () => {
  const phoneNumbers = [
    { number: '78295 31999', tel: '+917829531999' },
    { number: '99168 00900', tel: '+919916800900' },
    { number: '99162 90799', tel: '+919916290799' }
  ]

  return (
    <footer className="bg-white border-t border-gray-200 pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 mt-0 sm:mt-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <div className="footer-section">
            <img 
              src={logo} 
              alt="V2 Marketing" 
              className="h-10 sm:h-12 lg:h-14 w-auto mb-4 sm:mb-5 object-contain transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                console.error('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
            <p className="text-gray-600 mb-3 text-xs sm:text-sm font-medium">Authorized Fosroc Dealer</p>
            <p className="text-gray-600 flex items-start sm:items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              <FaMapMarkerAlt className="text-fosroc-red text-sm sm:text-base flex-shrink-0 mt-0.5 sm:mt-0" /> 
              <span>KR Puram, Bangalore, Karnataka, India</span>
            </p>
            <p className="text-gray-500 text-xs italic">constructive solutions</p>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-gray-900 font-bold mb-4 sm:mb-5 text-base sm:text-lg lg:text-xl">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              <li>
                <Link 
                  to="/" 
                  className="group inline-flex items-center gap-2 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fosroc-red transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="group inline-flex items-center gap-2 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fosroc-red transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="group inline-flex items-center gap-2 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fosroc-red transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Products</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center gap-2 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fosroc-red transition-all duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="footer-section">
            <h4 className="text-gray-900 font-bold mb-4 sm:mb-5 text-base sm:text-lg lg:text-xl">Contact</h4>
            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {phoneNumbers.map((phone, index) => (
                <li key={index}>
                  <a 
                    href={`tel:${phone.tel}`}
                    className="group flex items-center gap-2.5 sm:gap-3 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:bg-fosroc-red-lightest"
                  >
                    <FaPhone className="text-fosroc-red text-sm sm:text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-300" /> 
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{phone.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="mailto:info@v2marketing.in"
                  className="group flex items-center gap-2.5 sm:gap-3 text-gray-600 hover:text-fosroc-red transition-all duration-300 text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:bg-fosroc-red-lightest break-all"
                >
                  <FaEnvelope className="text-fosroc-red text-sm sm:text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">info@v2marketing.in</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Location & Service Areas */}
          <div className="footer-section">
            <h4 className="text-gray-900 font-bold mb-4 sm:mb-5 text-base sm:text-lg lg:text-xl">Location</h4>
            <p className="text-gray-600 mb-2 text-xs sm:text-sm font-medium">KR Puram, Bangalore</p>
            <p className="text-gray-600 mb-4 sm:mb-5 text-xs sm:text-sm">Karnataka, India</p>
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-900 font-semibold mb-2.5 sm:mb-3 text-xs sm:text-sm">Service Areas:</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                KR Puram, Whitefield, Hoodi, Hoskote, Old Madras Road, Surrounding Areas
              </p>
            </div>
            <a
              href="https://wa.me/917829531999?text=Hello, I'm interested in Fosroc products"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-semibold min-h-[44px] shadow-md hover:shadow-lg hover:scale-105"
            >
              <FaWhatsapp className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" /> 
              <span className="hidden sm:inline">WhatsApp Us</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              &copy; 2024 V2 Marketing. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
              Designed and Developed by{' '}
              <a 
                href="https://quantum-solutions-indol.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-fosroc-red hover:text-fosroc-red-dark font-semibold transition-colors duration-300 hover:underline"
              >
                Quantum Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
