import React, { useState } from 'react'
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('success')
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    })
    
    setTimeout(() => {
      setFormStatus(null)
    }, 5000)
  }

  const phoneNumbers = [
    { number: '78295 31999', tel: '+917829531999' },
    { number: '99168 00900', tel: '+919916800900' },
    { number: '99162 90799', tel: '+919916290799' }
  ]

  const serviceAreas = [
    'KR Puram',
    'Whitefield',
    'Hoodi',
    'Hoskote',
    'Old Madras Road',
    'Surrounding Areas'
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
    <div className="contact min-h-screen bg-gray-50">
      <SEO
        title="Contact Us - V2 Marketing | Fosroc Dealer KR Puram, Bangalore"
        description="Contact V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Call 78295 31999, 99168 00900, or 99162 90799. Serving Whitefield, Hoodi, Hoskote and surrounding areas."
        keywords="contact V2 Marketing, Fosroc dealer contact, KR Puram construction chemicals, Bangalore Fosroc dealer phone number"
      />
      
      {/* Page Header */}
      <section className="relative py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Get in Touch with V2 Marketing - Your Trusted Fosroc Dealer
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-info"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're here to help you with all your construction chemical needs. 
                Reach out to us through any of the following channels.
              </p>

              {/* Phone Numbers */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <FaPhone className="text-primary" /> Phone Numbers
                </h3>
                <div className="space-y-3">
                  {phoneNumbers.map((phone, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    >
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-lg font-semibold text-primary hover:text-primary-dark transition-colors"
                      >
                        {phone.number}
                      </a>
                      <a
                        href={`https://wa.me/${phone.tel.replace('+', '')}?text=Hello, I'm interested in Fosroc products`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#25d366] text-white rounded-lg hover:bg-[#20ba5a] transition-all flex items-center gap-2 text-sm font-semibold"
                      >
                        <FaWhatsapp /> WhatsApp
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> Location
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  KR Puram, Bangalore<br />
                  Karnataka, India
                </p>
                <a
                  href="https://www.google.com/maps/search/KR+Puram,+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-2"
                >
                  View on Google Maps →
                </a>
              </div>

              {/* Business Hours */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                  <FaClock className="text-primary" /> Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Monday - Saturday</span>
                    <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      {area}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-form-wrapper bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2 text-gray-900">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-semibold mb-2 text-gray-900">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2 text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-semibold mb-2 text-gray-900">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quote-request">Quote Request</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2 text-gray-900">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-all resize-y"
                  ></textarea>
                </div>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                  >
                    <FaCheckCircle className="text-green-500" />
                    <span className="font-semibold">Thank you! We'll get back to you soon.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Find Us</h2>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="V2 Marketing Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d77.7!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              KR Puram, Bangalore - Easily accessible from Whitefield, Hoodi, and surrounding areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Need Immediate Assistance?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-gray-200"
          >
            Call us now or reach out via WhatsApp for instant support
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="tel:+917829531999"
              className="px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              <FaPhone /> Call: 78295 31999
            </a>
            <a
              href="https://wa.me/917829531999?text=Hello, I need immediate assistance with Fosroc products."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
