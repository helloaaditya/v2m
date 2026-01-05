import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Quality Construction Chemicals for Your Projects',
      subtitle: 'Advanced Solutions',
      description: '100% Genuine Fosroc Products | Expert Consultation | Reliable Delivery | Competitive Pricing',
      features: [
        '100% Genuine Products',
        'Technical Expertise',
        'Wide Stock Availability',
        'Timely Delivery'
      ]
    },
    {
      id: 2,
      backgroundImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Waterproofing Solutions for Lasting Protection',
      subtitle: 'Complete Systems',
      description: 'Advanced waterproofing products for basements, terraces, and structures',
      features: [
        'Superior Protection',
        'Long-lasting Results',
        'Expert Installation',
        'Warranty Support'
      ]
    },
    {
      id: 3,
      backgroundImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Concrete Admixtures for Superior Performance',
      subtitle: 'High-Performance',
      description: 'Superplasticizers, accelerators, and retarders for exceptional concrete quality',
      features: [
        'Enhanced Strength',
        'Improved Workability',
        'Reduced Water Content',
        'Faster Construction'
      ]
    },
    {
      id: 4,
      backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Industrial Flooring & Coatings',
      subtitle: 'Durable Solutions',
      description: 'Premium flooring solutions for industrial applications with exceptional durability',
      features: [
        'Heavy-duty Performance',
        'Chemical Resistance',
        'Easy Maintenance',
        'Long-term Value'
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              zIndex: index === currentSlide ? 1 : 0
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out"
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Animated Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float-slow"
                style={{
                  animation: 'float 8s ease-in-out infinite'
                }}
              />
              <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slower"
                style={{
                  animation: 'float 10s ease-in-out infinite reverse'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Content Slides */}
      <div className="container relative z-10 text-center text-white px-4 max-w-7xl mx-auto">
        {slides.map((slide, index) => (
          <div
            key={`content-${slide.id}`}
            className="transition-all duration-[800ms] ease-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              position: index === currentSlide ? 'relative' : 'absolute',
              inset: index === currentSlide ? 'auto' : 0,
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            {/* Badge */}
            <div 
              className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 transition-all duration-700 delay-100"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <span className="text-sm font-semibold">Authorized Fosroc Dealer</span>
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight transition-all duration-700 delay-200"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              {slide.title.split(' ').map((word, i) => (
                <span key={i} className={i === 2 ? 'text-orange-400' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              {slide.description}
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 justify-center mb-12 transition-all duration-700 delay-400"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              <button className="group relative px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-orange-600">
                <span className="relative z-10">Get Quote</span>
              </button>
              <a
                href="tel:+917829531999"
                className="group px-8 py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white transition-all duration-300 hover:bg-white hover:text-blue-900 hover:scale-105 flex items-center gap-2"
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
            </div>
            
            {/* Features */}
            <div 
              className="flex flex-wrap gap-6 justify-center max-w-3xl mx-auto"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transition: 'all 700ms ease-out 500ms',
                transform: index === currentSlide ? 'translateY(0)' : 'translateY(-10px)'
              }}
            >
              {slide.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                  style={{
                    opacity: index === currentSlide ? 1 : 0,
                    transform: index === currentSlide ? 'scale(1)' : 'scale(0.9)',
                    transition: `all 400ms ease-out ${600 + featureIndex * 50}ms`
                  }}
                >
                  <span className="text-orange-400"><FaCheck /></span>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white w-12 shadow-lg' 
                : 'bg-white/50 w-2 hover:bg-white/70 hover:w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.1);
          }
          50% {
            transform: translate(50px, 10px) scale(1.05);
          }
          75% {
            transform: translate(20px, 30px) scale(1.15);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlideshow;