import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const phoneNumbers = [
    { number: '78295 31999', tel: '+917829531999' },
    { number: '99168 00900', tel: '+919916800900' },
    { number: '99162 90799', tel: '+919916290799' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-4 mt-16">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          <motion.div variants={itemVariants} className="footer-section">
            <h3 className="text-white text-xl font-bold mb-4">V2 Marketing</h3>
            <p className="text-gray-400 mb-2">Authorized Fosroc Dealer</p>
            <p className="text-gray-400 flex items-center gap-2">
              <FaMapMarkerAlt /> KR Puram, Bangalore
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              {phoneNumbers.map((phone, index) => (
                <li key={index}>
                  <a 
                    href={`tel:${phone.tel}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <FaPhone /> {phone.number}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-section">
            <h4 className="text-white font-semibold mb-4">Location</h4>
            <p className="text-gray-400 mb-2">KR Puram, Bangalore</p>
            <p className="text-gray-400 mb-2">Karnataka, India</p>
            <p className="text-gray-400 text-sm mt-4">
              <strong className="text-white">Service Areas:</strong> KR Puram, Whitefield, Hoodi, Hoskote, Old Madras Road
            </p>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 V2 Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
