import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhone, FaWhatsapp, FaTimes, FaCheck, FaCheckCircle, FaArrowRight, FaBox } from 'react-icons/fa';
import { products as defaultProducts, productCategories } from '../data/products';
import { api } from '../utils/api';
import SEO from '../components/SEO';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const backendProducts = await api.getProducts();
        if (backendProducts && backendProducts.length > 0) {
          setProducts(backendProducts);
        } else {
          setProducts(defaultProducts);
        }
      } catch (error) {
        console.log('Backend API not available, using default products from file:', error.message);
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.applications && product.applications.some(app => 
                           app.toLowerCase().includes(searchQuery.toLowerCase())
                         ));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
  };

  return (
    <div className="products min-h-screen bg-white">
      <SEO
        title="Products"
        description="Browse comprehensive range of authentic Fosroc construction chemicals. Waterproofing solutions, protective coatings, concrete admixtures, joint sealants, repair mortars, and more. 100% genuine products with expert consultation."
        keywords="Fosroc products, construction chemicals, waterproofing products, concrete admixtures, protective coatings, joint sealants, repair mortars, Fosroc product catalog, construction chemicals Bangalore, Fosroc dealer products"
        canonicalUrl="https://v2marketing.in/products"
        schemaType="Product"
      />
      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaBox className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Our Products
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Comprehensive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              Product Range
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-fosroc-orange" />
            <div className="w-2 h-2 rounded-full bg-fosroc-orange" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-fosroc-orange" />
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 px-4 max-w-3xl mx-auto">
            Authentic Fosroc Construction Chemicals for Every Need
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="relative py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8">
            <FaSearch className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-slate-400 text-base sm:text-lg z-10" />
            <input
              type="text"
              placeholder="Search products by name, description, or application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-slate-200 rounded-xl focus:border-fosroc-orange focus:outline-none transition-all shadow-lg bg-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] shadow-md ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-fosroc-orange to-fosroc-orange-dark text-white shadow-xl scale-105'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-fosroc-orange hover:shadow-lg'
              }`}
            >
              All Products
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 min-h-[44px] shadow-md ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-fosroc-orange to-fosroc-orange-dark text-white shadow-xl scale-105'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-fosroc-orange hover:shadow-lg'
                }`}
              >
                <span className="text-base sm:text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Info Banner */}
      {selectedCategory !== 'all' && (
        <section className="relative py-6 sm:py-8 bg-gradient-to-r from-fosroc-red-lightest via-white to-fosroc-red-lightest border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {productCategories
              .filter(cat => cat.id === selectedCategory)
              .map(category => (
                <div key={category.id} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl shadow-lg">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">
                      {category.name}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-600">{category.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="relative py-8 sm:py-10 lg:py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {loading ? (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-fosroc-orange"></div>
              <p className="mt-4 text-sm sm:text-base text-slate-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className={`group relative bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-fosroc-orange/50 flex flex-col ${
                      hoveredProduct === product.id ? 'scale-105' : ''
                    }`}
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-fosroc-orange/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Product Image */}
                    {product.imageUrl && (
                      <div className="relative w-full h-48 sm:h-56 mb-4 rounded-xl overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden absolute inset-0 bg-gradient-to-br from-fosroc-orange/20 to-transparent items-center justify-center">
                          <span className="text-4xl sm:text-5xl">
                            {productCategories.find(cat => cat.id === product.category)?.icon}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3 sm:mb-4 relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex-1 pr-2 group-hover:text-fosroc-orange transition-colors">
                        {product.name}
                      </h3>
                      {!product.imageUrl && (
                        <span className="text-2xl sm:text-3xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                          {productCategories.find(cat => cat.id === product.category)?.icon}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed flex-1 relative z-10">
                      {product.description}
                    </p>
                    <div className="mb-3 sm:mb-4 relative z-10">
                      <strong className="text-xs sm:text-sm text-slate-900 block mb-2 font-semibold">Applications:</strong>
                      <ul className="space-y-1">
                        {product.applications.slice(0, 2).map((app, idx) => (
                          <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                            <FaCheck className="text-fosroc-orange mt-0.5 sm:mt-1 flex-shrink-0 text-xs" />
                            <span>{app}</span>
                          </li>
                        ))}
                        {product.applications.length > 2 && (
                          <li className="text-xs sm:text-sm text-fosroc-orange font-semibold">
                            +{product.applications.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-2 sm:gap-3 mt-auto relative z-10">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm border-2 border-fosroc-red text-fosroc-red font-semibold rounded-lg hover:bg-fosroc-red hover:text-white transition-all min-h-[44px] hover:scale-105"
                      >
                        View Details
                      </button>
                      <a
                        href={`https://wa.me/917829531999?text=Hello, I'm interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#25d366] to-[#20ba5a] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] hover:scale-105"
                      >
                        <FaWhatsapp className="text-sm sm:text-base" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-slate-600 text-sm sm:text-base">
                Showing <span className="font-bold text-fosroc-orange">{filteredProducts.length}</span> products
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-slate-100 rounded-full mb-6">
                <FaSearch className="text-4xl text-slate-400" />
              </div>
              <p className="text-xl sm:text-2xl text-slate-600 mb-6 font-semibold">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-dark text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-fosroc-red/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-fosroc-red to-fosroc-red-dark text-white border-b border-white/20 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                  {productCategories.find(cat => cat.id === selectedProduct.category)?.icon}
                  {productCategories.find(cat => cat.id === selectedProduct.category)?.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white hover:text-white transition-all"
              >
                <FaTimes />
              </button>
            </div>
            {selectedProduct.imageUrl && (
              <div className="w-full h-64 sm:h-80 bg-gray-100 overflow-hidden">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-fosroc-red mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-fosroc-orange" /> Description
                </h3>
                <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fosroc-red mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-fosroc-orange" /> Applications
                </h3>
                <ul className="space-y-2">
                  {selectedProduct.applications.map((app, idx) => (
                    <li key={idx} className="text-slate-600 flex items-start gap-2">
                      <FaCheck className="text-fosroc-orange mt-1 flex-shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fosroc-red mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-fosroc-orange" /> Specifications
                </h3>
                <p className="text-slate-600">{selectedProduct.specifications}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fosroc-red mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-fosroc-orange" /> Packaging
                </h3>
                <p className="text-slate-600">{selectedProduct.packaging}</p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200 p-6 flex gap-4">
              <a
                href="tel:+917829531999"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-dark text-white font-semibold rounded-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <FaPhone /> Call Now
              </a>
              <a
                href={`https://wa.me/917829531999?text=Hello, I'm interested in ${selectedProduct.name}. Please provide more details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#25d366] to-[#20ba5a] text-white font-semibold rounded-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 hover:scale-105"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaCheckCircle className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Need Help?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Need Help Choosing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              the Right Product?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our technical experts are ready to assist you with product selection and application guidance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+917829531999"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-fosroc-orange text-white font-bold text-sm sm:text-base rounded-xl hover:bg-fosroc-orange-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <FaPhone /> <span>Call: 78295 31999</span>
            </a>
            <a
              href="https://wa.me/917829531999?text=Hello, I need help choosing the right construction chemical product."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white font-bold text-sm sm:text-base rounded-xl border-2 border-white/30 hover:bg-white hover:text-fosroc-red transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FaWhatsapp /> <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
