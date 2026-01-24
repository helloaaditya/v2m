import React, { useState } from 'react';
import { FaPhone, FaArrowRight, FaWhatsapp, FaCheckCircle, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';
import { stats } from '../config/stats';

const CTASection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <FaHeadset className="w-8 h-8" />,
      value: '24/7',
      label: 'Expert Support',
      description: 'Round-the-clock technical assistance'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      value: '100%',
      label: 'Genuine Products',
      description: 'Certified Fosroc quality guaranteed'
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      value: 'Fast',
      label: 'Delivery Service',
      description: 'Quick turnaround on all orders'
    }
  ];

  return (
    <section className="relative py-8 lg:py-12 bg-gradient-to-br from-white overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Main Content Container */}
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Subtitle with decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-fosroc-orange" />
              <span className="text-fosroc-orange font-semibold tracking-wider uppercase text-sm">
                Get Started Today
              </span>
                  <div className="h-px w-12 bg-fosroc-orange" />
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Ready to Start Your{' '}
              <span className="text-transparent bg-clip-text bg-fosroc-orange">
                Project?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
              Get expert consultation and competitive quotes for your construction chemical needs. Our team is ready to help you choose the right Fosroc products.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-fosroc-orange text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <span className="relative z-10">Request Quote</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-fosroc-orange" />
            </a>

            <a
              href="tel:+917829531999"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-fosroc-white backdrop-blur-xl text-fosroc-orange font-bold text-lg rounded-xl border-2 border-white/20 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <FaPhone className="group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Call:</span>
              <span>78295 31999</span>
            </a>

            <a
              href="https://wa.me/917829531999?text=Hello, I'm interested in Fosroc products"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-green-500 to-green-600 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
            >
              <FaWhatsapp className="group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-fosroc-orange transition-all duration-500 hover:bg-white/10 hover:border-fosroc-orange/50 hover:scale-105 ${
                  hoveredCard === index ? 'shadow-2xl shadow-orange-500/20' : ''
                }`}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-fosroc-orange/20 to-fosroc-orange/10 border border-fosroc-orange/30 text-fosroc-orange mb-4 transition-all duration-500 ${
                  hoveredCard === index ? 'scale-110 rotate-6' : ''
                }`}>
                  {feature.icon}
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-black mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {feature.value}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-black mb-2">
                  {feature.label} 
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-orange-600/0 transition-all duration-500 -z-10 ${
                  hoveredCard === index ? 'from-orange-500/10 to-orange-600/5 blur-xl' : ''
                }`} />
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm font-medium">{stats.yearsExperience}+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm font-medium">{stats.projectsCompleted}+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm font-medium">Trusted by Industry Leaders</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;