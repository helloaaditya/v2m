import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaAward, FaShieldAlt, FaClock } from 'react-icons/fa';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 1,
      headline: 'World Leaders in Construction Chemicals',
      subheadline: 'Trusted Partner Since 2009',
      description: 'A world leader in tailored constructive solutions for the construction industry backed by excellent technical support and expert customer service.',
      cta: 'Explore Solutions',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      headline: 'Premium Construction Chemicals',
      subheadline: 'Authenticity Guaranteed',
      description: '100% Genuine Fosroc Products with expert consultation, reliable delivery, and competitive pricing. Your trusted partner for authentic construction chemical solutions that deliver superior results.',
      cta: 'View Products',
      image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      headline: 'Technical Excellence Meets Quality',
      subheadline: 'Engineering Innovation',
      description: 'Deep technical expertise and comprehensive product knowledge help construction professionals achieve exceptional results through genuine Fosroc solutions and dedicated support.',
      cta: 'Technical Support',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      headline: 'Complete Construction Solutions',
      subheadline: 'Comprehensive Range',
      description: 'From waterproofing to concrete admixtures, industrial flooring to repair solutions. We provide the complete range of Fosroc products for your construction needs.',
      cta: 'Get Started',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1600&auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          return 0;
        }
        return prev + 1.67;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setProgress(0);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const trustBadges = [
    { icon: <FaAward className="w-5 h-5" />, label: '15+ Years', sublabel: 'Experience' },
    { icon: <FaShieldAlt className="w-5 h-5" />, label: '100%', sublabel: 'Genuine' },
    { icon: <FaClock className="w-5 h-5" />, label: '24/7', sublabel: 'Support' }
  ];

  return (
    <div className="relative w-full min-h-screen sm:h-screen bg-slate-900 overflow-hidden">
      {/* Background Images with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-[20000ms] ease-linear"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          {/* Sophisticated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative h-full min-h-screen sm:h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Content Section */}
          <div className="space-y-6 sm:space-y-8 z-10 w-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-300 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0 relative z-10'
                    : 'opacity-0 -translate-x-12 absolute inset-0 pointer-events-none hidden'
                }`}
              >
                {/* Subheadline with Icon */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 bg-fosroc-orange" />
                  <span className="text-fosroc-orange font-semibold tracking-wider uppercase text-xs sm:text-sm">
                    {slide.subheadline}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  {slide.headline}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 relative z-20">
                  <Link
                    to="/contact"
                    className="group px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-fosroc-orange text-white font-semibold text-sm sm:text-base rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {slide.cta}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <a
                    href="tel:+917829531999"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-fosroc-white backdrop-blur-xl text-fosroc-orange font-bold text-lg rounded-xl border-2 border-white/20 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaPhone className="group-hover:rotate-12 transition-transform" />
                    <span className="hidden sm:inline">Call:</span>
                    <span>78295 31999</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-fosroc-orange/10 border border-fosroc-orange/30 flex items-center justify-center text-fosroc-orange flex-shrink-0">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="text-white font-bold text-base sm:text-lg">{badge.label}</div>
                        <div className="text-slate-400 text-xs sm:text-sm">{badge.sublabel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Content Section - Stats Card */}
          <div className="block">
            <div className="relative">
              {/* Floating Stats Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 xl:p-8 shadow-2xl">
                <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30" />
                
                <div className="relative space-y-5 xl:space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-5 xl:pb-6 border-b border-white/10">
                    <FaQuoteLeft className="text-fosroc-orange text-xl xl:text-2xl" />
                    <h3 className="text-xl xl:text-2xl font-bold text-white">Our Impact</h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 xl:gap-6">
                    <div className="text-center p-4 xl:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl xl:text-4xl font-bold text-fosroc-orange mb-2">500+</div>
                      <div className="text-slate-300 text-xs xl:text-sm font-medium">Projects Delivered</div>
                    </div>
                    <div className="text-center p-4 xl:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl xl:text-4xl font-bold text-fosroc-orange mb-2">15+</div>
                      <div className="text-slate-300 text-xs xl:text-sm font-medium">Years Excellence</div>
                    </div>
                    <div className="text-center p-4 xl:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl xl:text-4xl font-bold text-fosroc-orange mb-2">100%</div>
                      <div className="text-slate-300 text-xs xl:text-sm font-medium">Genuine Products</div>
                    </div>
                    <div className="text-center p-4 xl:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-3xl xl:text-4xl font-bold text-fosroc-orange mb-2">24/7</div>
                      <div className="text-slate-300 text-xs xl:text-sm font-medium">Expert Support</div>
                    </div>
                  </div>

                  {/* Contact Card */}
                  <div className="mt-6 xl:mt-8 p-5 xl:p-6 bg-gradient-to-br from-fosroc-orange/20 to-fosroc-orange-dark/10 rounded-xl border border-fosroc-orange/30 relative z-20">
                    <p className="text-white font-semibold mb-4 text-center text-sm xl:text-base">Get Expert Consultation</p>
                    <div className="flex gap-3">
                      <a 
                        href="tel:+917829531999" 
                        className="flex-1 py-2.5 xl:py-3 bg-white/90 hover:bg-white text-slate-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm xl:text-base relative z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPhone className="text-sm" />
                        Call
                      </a>
                      <a 
                        href="https://wa.me/917829531999" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 xl:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm xl:text-base relative z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaWhatsapp />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-6 max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3">
          {/* Navigation Arrows - Mobile */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="lg:hidden bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {/* Slide Indicators with Progress */}
          <div className="flex gap-2 sm:gap-3 flex-1 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className="relative group flex-1 max-w-16"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 w-full ${
                    index === currentSlide
                      ? 'bg-fosroc-orange'
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`}
                />
                {index === currentSlide && (
                  <div
                    className="absolute top-0 left-0 h-1.5 sm:h-2 bg-fosroc-orange-dark rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Arrows - Mobile */}
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="lg:hidden bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 disabled:opacity-50"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 xl:p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-lg xl:text-xl" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 xl:p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-lg xl:text-xl" />
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroSlideshow;