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
    <footer className="bg-fosroc-blue-dark text-gray-300 pt-12 sm:pt-12 pb-6 mt-0 sm:mt-0">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Company Info */}
          <div className="footer-section">
            <img 
              src={logo} 
              alt="V2 Marketing" 
              className="h-10 sm:h-12 w-auto mb-3 sm:mb-4 object-contain"
              onError={(e) => {
                console.error('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
            <p className="text-gray-400 mb-2 text-xs sm:text-sm">Authorized Fosroc Dealer</p>
            <p className="text-gray-400 flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
              <FaMapMarkerAlt className="text-fosroc-orange text-xs" /> 
              <span>KR Puram, Bangalore</span>
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-fosroc-orange transition-colors text-xs sm:text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-fosroc-orange transition-colors text-xs sm:text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-fosroc-orange transition-colors text-xs sm:text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-fosroc-orange transition-colors text-xs sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              {phoneNumbers.map((phone, index) => (
                <li key={index}>
                  <a 
                    href={`tel:${phone.tel}`}
                    className="text-gray-400 hover:text-fosroc-orange transition-colors flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <FaPhone className="text-fosroc-orange text-xs" /> 
                    <span>{phone.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="mailto:info@v2marketing.com"
                  className="text-gray-400 hover:text-fosroc-orange transition-colors flex items-center gap-2 text-xs sm:text-sm break-all"
                >
                  <FaEnvelope className="text-fosroc-orange text-xs" />
                  <span>info@v2marketing.com</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Location & Service Areas */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Location</h4>
            <p className="text-gray-400 mb-2 text-xs sm:text-sm">KR Puram, Bangalore</p>
            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">Karnataka, India</p>
            <div className="mb-3 sm:mb-4">
              <p className="text-white font-semibold mb-2 text-xs sm:text-sm">Service Areas:</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                KR Puram, Whitefield, Hoodi, Hoskote, Old Madras Road, Surrounding Areas
              </p>
            </div>
            <a
              href="https://wa.me/917829531999?text=Hello, I'm interested in Fosroc products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium min-h-[44px]"
            >
              <FaWhatsapp /> <span className="hidden sm:inline">WhatsApp Us</span><span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              &copy; 2024 V2 Marketing. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
              Designed and Developed by <a href="https://quantum-solutions-indol.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-fosroc-orange hover:text-fosroc-orange transition-colors">Quantum Solutions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
