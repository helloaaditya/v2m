import React from 'react';
import { FaPhone, FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/95"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Get expert consultation and competitive quotes for your construction chemical needs. Our team is ready to help you choose the right Fosroc products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>Request Quote</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+917829531999"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg border-2 border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FaPhone />
              <span>Call: 78295 31999</span>
            </a>
            <a
              href="https://wa.me/917829531999?text=Hello, I'm interested in Fosroc products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-blue-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">24/7</div>
              <p className="text-blue-200">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">100%</div>
              <p className="text-blue-200">Genuine Products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">Fast</div>
              <p className="text-blue-200">Delivery Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;