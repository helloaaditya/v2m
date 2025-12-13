import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const About = () => {
  const credentials = [
    {
      icon: '✅',
      title: 'Authorized Dealer',
      description: 'Official authorization from Fosroc ensures you receive 100% genuine products with full warranty and technical support.'
    },
    {
      icon: '🎓',
      title: 'Technical Expertise',
      description: 'Our team possesses extensive knowledge of construction chemicals and provides expert guidance for product selection and application.'
    },
    {
      icon: '🏆',
      title: 'Quality Assurance',
      description: 'Every product we supply is backed by Fosroc\'s quality standards and our commitment to excellence.'
    }
  ]

  const values = [
    {
      title: 'Authenticity',
      description: '100% genuine Fosroc products with proper documentation and warranty'
    },
    {
      title: 'Expertise',
      description: 'Deep technical knowledge to guide you in product selection and application'
    },
    {
      title: 'Reliability',
      description: 'Consistent product availability and timely delivery to keep your projects on schedule'
    },
    {
      title: 'Customer Focus',
      description: 'Your success is our priority - we go the extra mile to ensure satisfaction'
    },
    {
      title: 'Competitive Pricing',
      description: 'Fair and transparent pricing without compromising on quality'
    },
    {
      title: 'Service Excellence',
      description: 'Comprehensive support from inquiry to delivery and beyond'
    }
  ]

  const whyChoose = [
    {
      title: 'Authorized Fosroc Dealer',
      description: 'Official authorization ensures product authenticity and warranty coverage'
    },
    {
      title: 'Wide Product Range',
      description: 'Comprehensive inventory covering all major construction chemical categories'
    },
    {
      title: 'Technical Consultation',
      description: 'Expert advice on product selection, application methods, and troubleshooting'
    },
    {
      title: 'Stock Availability',
      description: 'Well-maintained inventory ensuring products are available when you need them'
    },
    {
      title: 'Timely Delivery',
      description: 'Efficient logistics ensuring your materials reach you on schedule'
    },
    {
      title: 'Local Presence',
      description: 'Based in KR Puram, serving East Bangalore with quick response times'
    }
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
    <div className="about">
      <SEO
        title="About Us - V2 Marketing | Authorized Fosroc Dealer"
        description="Learn about V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Our mission, vision, and commitment to quality construction chemicals and expert service."
        keywords="V2 Marketing about, Fosroc dealer Bangalore, authorized dealer, construction chemical expertise, KR Puram"
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
            About V2 Marketing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Your Trusted Partner for Quality Construction Chemicals
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Who We Are</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              V2 Marketing is an authorized Fosroc dealer based in KR Puram, Bangalore, 
              specializing in providing high-quality construction chemical solutions to builders, 
              contractors, and construction professionals across East Bangalore and surrounding areas.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With our deep understanding of construction challenges and technical expertise, 
              we help our clients achieve superior results in their projects through genuine 
              Fosroc products and expert consultation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gray-50 p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div
                  className="text-5xl mb-4 inline-block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {credential.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{credential.title}</h3>
                <p className="text-gray-600 leading-relaxed">{credential.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border-l-4 border-primary">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be the most trusted and reliable partner for construction professionals by 
                providing genuine Fosroc products, expert technical consultation, and exceptional 
                customer service that helps build stronger, more durable structures.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-2xl border-l-4 border-secondary">
              <h2 className="text-3xl font-bold mb-4 text-secondary-dark">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To establish V2 Marketing as the go-to destination for quality construction 
                chemicals in East Bangalore, recognized for our technical expertise, product 
                authenticity, and unwavering commitment to customer success.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Our Core Values</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-secondary"
                >
                  <h4 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 md:p-12 rounded-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">Why Choose V2 Marketing?</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-4"
            >
              {whyChoose.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span className="text-green-500 text-2xl flex-shrink-0 mt-1">
                    <FaCheck />
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
            Partner With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-gray-200"
          >
            Experience the difference of working with an authorized Fosroc dealer
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
              Get in Touch
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              View Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
