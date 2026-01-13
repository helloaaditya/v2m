import React, { useState } from 'react'
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheckCircle, FaEnvelope, FaArrowRight } from 'react-icons/fa'
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

  return (
    <div className="contact min-h-screen bg-white">
      <SEO
        title="Contact Us"
        description="Contact V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Call 78295 31999, 99168 00900, or 99162 90799. Get expert consultation, product quotes, and technical support. Serving Whitefield, Hoodi, Hoskote and surrounding areas. Business hours: Monday-Saturday 9 AM - 7 PM."
        keywords="contact V2 Marketing, Fosroc dealer contact, KR Puram construction chemicals, Bangalore Fosroc dealer phone number, construction chemicals consultation, Fosroc dealer Bangalore contact, V2 Marketing phone number, get quote construction chemicals"
        canonicalUrl="https://v2marketing.in/contact"
      />
      
      {/* Page Header */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaEnvelope className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Contact Us
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              Touch
            </span>
          </motion.h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-fosroc-orange" />
            <div className="w-2 h-2 rounded-full bg-fosroc-orange" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-fosroc-orange" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto"
          >
            Your Trusted Fosroc Dealer - We're Here to Help
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                  <FaCheckCircle className="text-fosroc-orange text-sm" />
                  <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                    Contact Information
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 leading-tight">
                  Let's{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                    Connect
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                  We're here to help you with all your construction chemical needs. 
                  Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-xl flex items-center justify-center text-white">
                    <FaPhone className="text-sm" />
                  </div>
                  Phone Numbers
                </h3>
                <div className="space-y-3">
                  {phoneNumbers.map((phone, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl hover:shadow-md transition-all border border-slate-100"
                    >
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-lg font-semibold text-fosroc-red hover:text-fosroc-orange transition-colors"
                      >
                        {phone.number}
                      </a>
                      <a
                        href={`https://wa.me/${phone.tel.replace('+', '')}?text=Hello, I'm interested in Fosroc products`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-[#25d366] to-[#20ba5a] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold hover:scale-105"
                      >
                        <FaWhatsapp /> WhatsApp
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-fosroc-red to-fosroc-red-dark rounded-xl flex items-center justify-center text-white">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  Location
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  KR Puram, Bangalore<br />
                  Karnataka, India
                </p>
                <a
                  href="https://www.google.com/maps/search/KR+Puram,+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fosroc-orange font-semibold hover:text-fosroc-orange-dark transition-colors group"
                >
                  <span>View on Google Maps</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-xl flex items-center justify-center text-white">
                    <FaClock className="text-sm" />
                  </div>
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-900">Monday - Saturday</span>
                    <span className="text-slate-600 font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-900">Sunday</span>
                    <span className="text-slate-600 font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4 text-slate-900">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-slate-50 to-white rounded-lg text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-fosroc-orange hover:to-fosroc-orange-dark hover:text-white transition-all cursor-pointer border border-slate-200 hover:border-fosroc-orange"
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
              className="contact-form-wrapper bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <FaEnvelope className="text-fosroc-orange text-sm" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Send Message
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-900 leading-tight">
                Send Us a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  Message
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:border-fosroc-orange focus:outline-none transition-all min-h-[44px] hover:border-slate-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:border-fosroc-orange focus:outline-none transition-all min-h-[44px] hover:border-slate-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:border-fosroc-orange focus:outline-none transition-all min-h-[44px] hover:border-slate-300"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:border-fosroc-orange focus:outline-none transition-all min-h-[44px] hover:border-slate-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quote-request">Quote Request</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2 text-sm sm:text-base text-slate-900">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg focus:border-fosroc-orange focus:outline-none transition-all resize-y hover:border-slate-300"
                  ></textarea>
                </div>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-green-800"
                  >
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span className="font-semibold">Thank you! We'll get back to you soon.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-dark text-white font-semibold text-sm sm:text-base rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <FaArrowRight className="text-sm" />
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <FaMapMarkerAlt className="text-fosroc-orange text-sm" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Find Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 leading-tight">
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  Location
                </span>
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
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
            <p className="text-center text-slate-600 mt-4 flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaMapMarkerAlt className="text-fosroc-orange" />
              KR Puram, Bangalore - Easily accessible from Whitefield, Hoodi, and surrounding areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaCheckCircle className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Quick Contact
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Need{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              Immediate Assistance?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
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
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-fosroc-orange text-white font-bold text-sm sm:text-base rounded-xl hover:bg-fosroc-orange-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <FaPhone /> <span>Call: 78295 31999</span>
            </a>
            <a
              href="https://wa.me/917829531999?text=Hello, I need immediate assistance with Fosroc products."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#25d366] to-[#20ba5a] text-white font-bold text-sm sm:text-base rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp /> <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
