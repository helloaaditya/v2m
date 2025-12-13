import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaWhatsapp, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const Home = () => {
  const benefits = [
    {
      icon: '🏆',
      title: 'Authorized Dealer',
      description: 'Official Fosroc dealer with 100% genuine products and warranty support'
    },
    {
      icon: '🔧',
      title: 'Technical Expertise',
      description: 'Expert consultation and guidance for your construction chemical needs'
    },
    {
      icon: '📦',
      title: 'Wide Stock',
      description: 'Comprehensive inventory of Fosroc products ready for immediate delivery'
    },
    {
      icon: '🚚',
      title: 'Reliable Delivery',
      description: 'Timely delivery across KR Puram, Whitefield, Hoodi, and surrounding areas'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Best prices for quality Fosroc construction chemicals'
    },
    {
      icon: '👥',
      title: 'Customer First',
      description: 'Dedicated service and support throughout your project lifecycle'
    }
  ]

  const categories = [
    {
      icon: '💧',
      title: 'Advanced Waterproofing Solutions',
      description: 'Complete waterproofing systems for basements, terraces, and structures',
      id: 'waterproofing'
    },
    {
      icon: '🏗️',
      title: 'High-Performance Concrete Admixtures',
      description: 'Superplasticizers, accelerators, and retarders for superior concrete performance',
      id: 'admixtures'
    },
    {
      icon: '🔩',
      title: 'Grouts, Anchors & Precision Repair',
      description: 'High-strength grouts, anchor systems, and precision repair materials',
      id: 'grouts'
    },
    {
      icon: '🔗',
      title: 'Sealants, Adhesives & Jointing',
      description: 'Sealants, adhesives, and jointing compounds for durable construction',
      id: 'sealants'
    },
    {
      icon: '🛡️',
      title: 'Concrete Protection & Restoration',
      description: 'Protective coatings and restoration systems for concrete structures',
      id: 'protection'
    },
    {
      icon: '🏭',
      title: 'Industrial Flooring & Coatings',
      description: 'Durable flooring solutions and protective coatings for industrial applications',
      id: 'flooring'
    }
  ]

  const serviceAreas = ['KR Puram', 'Whitefield', 'Hoodi', 'Hoskote', 'Old Madras Road', 'Surrounding Areas']

  const features = [
    '100% Genuine Products',
    'Technical Expertise',
    'Wide Stock Availability',
    'Timely Delivery'
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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="home">
      <SEO
        title="V2 Marketing - Authorized Fosroc Dealer | KR Puram, Bangalore"
        description="V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Quality construction chemicals, waterproofing solutions, concrete admixtures, and expert consultation. Serving Whitefield, Hoodi, Hoskote and surrounding areas."
        keywords="Fosroc dealer Bangalore, construction chemicals, waterproofing solutions, concrete admixtures, KR Puram, V2 Marketing, Fosroc products Bangalore, construction chemical dealer"
      />
      
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/85 to-primary-dark/90"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/30"
            >
              <span className="text-sm font-semibold">Authorized Fosroc Dealer</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Quality Construction Chemicals
              <br />
              <span className="text-secondary">for Your Projects</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              100% Genuine Fosroc Products | Expert Consultation | Reliable Delivery | Competitive Pricing
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <Link
                to="/contact"
                className="group relative px-8 py-4 bg-secondary text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Get Quote</span>
                <motion.div
                  className="absolute inset-0 bg-secondary-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <a
                href="tel:+917829531999"
                className="group px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105 flex items-center gap-2"
              >
                <FaPhone /> Call Now
              </a>
              <a
                href="https://wa.me/917829531999?text=Hello, I'm interested in Fosroc products"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[#25d366] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 flex items-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                >
                  <span className="text-secondary"><FaCheck /></span>
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Why Choose V2 Marketing?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <motion.div
                  className="text-5xl mb-4 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Our Product Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-center text-gray-600 mb-12"
          >
            Comprehensive Fosroc construction chemical solutions
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary group cursor-pointer"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                <Link
                  to={`/products#${category.id}`}
                  className="text-primary font-semibold flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  View Products →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Service Areas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-center mb-12 text-gray-200"
          >
            Serving East Bangalore and surrounding regions
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {serviceAreas.map((area, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-semibold border border-white/30 hover:bg-white hover:text-primary transition-all cursor-pointer"
              >
                {area}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
          >
            Get expert consultation and competitive quotes for your construction chemical needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Request Quote
            </Link>
            <a
              href="tel:+917829531999"
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <FaPhone /> Call: 78295 31999
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
