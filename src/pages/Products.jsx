import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhone, FaWhatsapp, FaTimes, FaCheck } from 'react-icons/fa';
import { products as defaultProducts, productCategories } from '../data/products';
import { api } from '../utils/api';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Try to load products from backend API, fallback to default products
    const loadProducts = async () => {
      try {
        const backendProducts = await api.getProducts();
        if (backendProducts && backendProducts.length > 0) {
          setProducts(backendProducts);
        }
      } catch (error) {
        console.log('Using default products from file');
        // Keep using defaultProducts
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
      {/* Hero Section with Parallax */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-blue-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2000&auto=format&fit=crop')",
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 2.0
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-900/95" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-blue-100">
            Comprehensive Range of Fosroc Construction Chemicals
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-all shadow-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
              }`}
            >
              All Products
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Info Banner */}
      {selectedCategory !== 'all' && (
        <section className="py-8 bg-blue-50 border-y border-blue-100">
          <div className="container mx-auto px-4 max-w-7xl">
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
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
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
                            <FaCheck className="text-blue-600 mt-1 flex-shrink-0" />
                            <span>{app}</span>
                          </li>
                        ))}
                        {product.applications.length > 2 && (
                          <li className="text-sm text-blue-600 font-semibold">
                            +{product.applications.length - 2} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        View Details
                      </button>
                      <a
                        href={`https://wa.me/917829531999?text=Hello, I'm interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all flex items-center gap-2"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-600">
                Showing {filteredProducts.length} products
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
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
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {productCategories.find(cat => cat.id === selectedProduct.category)?.icon}
                  {productCategories.find(cat => cat.id === selectedProduct.category)?.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Applications</h3>
                <ul className="space-y-2">
                  {selectedProduct.applications.map((app, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start gap-2">
                      <FaCheck className="text-blue-600 mt-1 flex-shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Specifications</h3>
                <p className="text-gray-600">{selectedProduct.specifications}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Packaging</h3>
                <p className="text-gray-600">{selectedProduct.packaging}</p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-4">
              <a
                href="tel:+917829531999"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-center flex items-center justify-center gap-2"
              >
                <FaPhone /> Call Now
              </a>
              <a
                href={`https://wa.me/917829531999?text=Hello, I'm interested in ${selectedProduct.name}. Please provide more details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-[#25d366] text-white font-semibold rounded-lg hover:bg-[#20ba5a] transition-all text-center flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2000&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/95" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our technical experts are ready to assist you with product selection and application guidance
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+917829531999"
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              <FaPhone /> Call: 78295 31999
            </a>
            <a
              href="https://wa.me/917829531999?text=Hello, I need help choosing the right construction chemical product."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg border-2 border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;