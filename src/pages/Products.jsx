import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaSearch, FaPhone, FaWhatsapp, FaTimes, FaCheck } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { products, productCategories } from '../data/products'
import SEO from '../components/SEO'

const Products = () => {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) {
      setSelectedCategory(hash)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
  }

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
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="products min-h-screen bg-gray-50">
      <SEO
        title="Products - Fosroc Construction Chemicals | V2 Marketing"
        description="Browse our comprehensive range of Fosroc construction chemicals including waterproofing solutions, concrete admixtures, grouts, sealants, and industrial flooring. Authorized dealer in KR Puram, Bangalore."
        keywords="Fosroc products, construction chemicals, waterproofing, concrete admixtures, grouts, sealants, industrial flooring, Fosroc catalog"
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
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Comprehensive Range of Fosroc Construction Chemicals
          </motion.p>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-12">
        <div className="container">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto mb-6">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                }`}
              >
                All Products
              </motion.button>
              {productCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Category Info */}
          <AnimatePresence mode="wait">
            {selectedCategory !== 'all' && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8 rounded-2xl mb-8 border-l-4 border-primary"
              >
                {productCategories
                  .filter(cat => cat.id === selectedCategory)
                  .map(category => (
                    <div key={category.id} className="flex items-center gap-4">
                      <span className="text-5xl">{category.icon}</span>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h2>
                        <p className="text-gray-600 text-lg">{category.description}</p>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex-1 pr-2">
                      {product.name}
                    </h3>
                    <span className="text-3xl flex-shrink-0">
                      {productCategories.find(cat => cat.id === product.category)?.icon}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <strong className="text-sm text-gray-900 block mb-2">Applications:</strong>
                    <ul className="space-y-1">
                      {product.applications.slice(0, 2).map((app, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <FaCheck className="text-primary mt-1 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                      {product.applications.length > 2 && (
                        <li className="text-sm text-primary font-semibold">
                          +{product.applications.length - 2} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-1 px-4 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      View Details
                    </button>
                    <a
                      href={`https://wa.me/917829531999?text=Hello, I'm interested in ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all flex items-center gap-2"
                    >
                      <FaWhatsapp /> Inquiry
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-600 mb-6">No products found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Product Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProductModal}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                      {productCategories.find(cat => cat.id === selectedProduct.category)?.icon}
                      {productCategories.find(cat => cat.id === selectedProduct.category)?.name}
                    </span>
                  </div>
                  <button
                    onClick={closeProductModal}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Applications</h3>
                    <ul className="space-y-2">
                      {selectedProduct.applications.map((app, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start gap-2">
                          <FaCheck className="text-primary mt-1 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Specifications</h3>
                    <p className="text-gray-600">{selectedProduct.specifications}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Packaging</h3>
                    <p className="text-gray-600">{selectedProduct.packaging}</p>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-4">
                  <a
                    href={`tel:+917829531999`}
                    className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-center flex items-center justify-center gap-2"
                  >
                    <FaPhone /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/917829531999?text=Hello, I'm interested in ${selectedProduct.name}. Please provide more details and pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all text-center flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> WhatsApp Inquiry
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
            Need Help Choosing the Right Product?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
          >
            Our technical experts are ready to assist you with product selection and application guidance
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
              href="https://wa.me/917829531999?text=Hello, I need help choosing the right construction chemical product."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products
