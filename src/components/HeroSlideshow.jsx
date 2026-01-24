import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaWhatsapp, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaAward, FaShieldAlt, FaClock } from 'react-icons/fa';
import { stats } from '../config/stats';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Animated counters for stats
  const projectsCount = useAnimatedCounter(stats.projectsCompleted, 2000);
  const yearsCount = useAnimatedCounter(stats.yearsExperience, 2000);
  const genuineCount = useAnimatedCounter(stats.genuineProducts, 2000);

  const slides = [
    {
      id: 1,
      headline: 'World Leaders in Construction Chemicals',
      subheadline: 'Trusted Partner Since 1994',
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
    },
    {
      id: 5,
      headline: '30 Years of Excellence',
      subheadline: 'Proven Track Record',
      description: 'Three decades of delivering quality construction chemical solutions. Trusted by builders, contractors, and construction professionals across Bangalore.',
      cta: 'Learn More',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      headline: 'Expert Consultation Services',
      subheadline: 'Technical Support',
      description: 'Our experienced team provides on-site consultation, product selection guidance, and application support to ensure optimal results for your projects.',
      cta: 'Contact Us',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=80'
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

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (!touchStart) return;
    const currentTouch = e.targetTouches[0].clientX;
    const distance = touchStart - currentTouch;
    setSwipeOffset(distance);
  };

  const onTouchEnd = (e) => {
    if (!touchStart) {
      setTouchStart(null);
      setSwipeOffset(0);
      return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const distance = touchStart - endX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setSwipeOffset(0);
  };

  // Trust badges with animated counters
  const trustBadges = [
    { icon: <FaAward className="w-5 h-5" />, label: `${yearsCount.count}+ Years`, sublabel: 'Experience' },
    { icon: <FaShieldAlt className="w-5 h-5" />, label: `${genuineCount.count}%`, sublabel: 'Genuine' },
    { icon: <FaClock className="w-5 h-5" />, label: stats.supportHours, sublabel: 'Support' }
  ];

  return (
    <div 
      className="relative w-full h-auto min-h-[85vh] sm:h-screen bg-slate-900 overflow-hidden touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {/* Background Images with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
          style={{
            transform: index === currentSlide && swipeOffset !== 0 
              ? `translateX(${-swipeOffset * 0.3}px)` 
              : undefined
          }}
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
      <div className="relative h-auto min-h-[90vh] sm:h-screen max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-start sm:items-center pt-8 sm:pt-6 lg:pt-12 pb-6 sm:pb-8 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-12 items-center w-full py-4 sm:py-6 lg:py-0">
          
          {/* Left Content Section */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-7 z-10 w-full">
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
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mb-2 sm:mb-3 lg:mb-5">
                  <div className="w-6 sm:w-8 lg:w-12 h-0.5 bg-fosroc-orange" />
                  <span className="text-fosroc-orange font-semibold tracking-wider uppercase text-[10px] sm:text-xs lg:text-sm">
                    {slide.subheadline}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight mb-2 sm:mb-3 lg:mb-6 break-words">
                  {slide.headline}
                </h1>

                {/* Description */}
                <p className="text-[11px] sm:text-xs md:text-sm lg:text-lg text-slate-300 leading-relaxed max-w-2xl mb-3 sm:mb-4 lg:mb-7 break-words">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-7 relative z-20">
                  <Link
                    to="/contact"
                    className="group px-4 sm:px-5 lg:px-6 xl:px-8 py-2.5 sm:py-3 lg:py-4 bg-fosroc-orange text-white font-semibold text-xs sm:text-sm lg:text-base rounded-lg hover:shadow-2xl hover:shadow-orange-500/50 active:scale-95 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 relative z-20 touch-manipulation"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {slide.cta}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <a
                    href="tel:+917829531999"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-white/10 backdrop-blur-xl text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl border-2 border-white/20 hover:bg-white hover:text-slate-900 active:scale-95 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative z-20 touch-manipulation"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaPhone className="group-hover:rotate-12 transition-transform text-sm sm:text-base" />
                    <span className="hidden sm:inline">Call:</span>
                    <span className="text-xs sm:text-sm lg:text-base">78295 31999</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-6 pt-3 sm:pt-4 lg:pt-7 border-t border-white/10">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                      <div className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full bg-fosroc-orange/10 border border-fosroc-orange/30 flex items-center justify-center text-fosroc-orange flex-shrink-0">
                        <span className="text-xs sm:text-sm lg:text-base">{badge.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">{badge.label}</div>
                        <div className="text-slate-400 text-[10px] sm:text-xs lg:text-sm leading-tight">{badge.sublabel}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Content Section - Stats Card */}
          <div className="w-full lg:w-auto">
            <div className="relative">
              {/* Floating Stats Card - Mobile Optimized */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-8 shadow-2xl">
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30" />
                
                <div className="relative space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 lg:pb-5 xl:pb-6 border-b border-white/10">
                    <FaQuoteLeft className="text-fosroc-orange text-base sm:text-lg lg:text-xl xl:text-2xl" />
                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">Our Impact</h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
                    <div className="text-center p-2 sm:p-3 lg:p-4 xl:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-fosroc-orange mb-1 sm:mb-2 leading-tight">{projectsCount.count}+</div>
                      <div className="text-slate-300 text-[10px] sm:text-xs lg:text-xs xl:text-sm font-medium leading-tight break-words">Projects</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 lg:p-4 xl:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-fosroc-orange mb-1 sm:mb-2 leading-tight">{yearsCount.count}+</div>
                      <div className="text-slate-300 text-[10px] sm:text-xs lg:text-xs xl:text-sm font-medium leading-tight break-words">Years</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 lg:p-4 xl:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-fosroc-orange mb-1 sm:mb-2 leading-tight">{genuineCount.count}%</div>
                      <div className="text-slate-300 text-[10px] sm:text-xs lg:text-xs xl:text-sm font-medium leading-tight break-words">Genuine</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 lg:p-4 xl:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-fosroc-orange mb-1 sm:mb-2 leading-tight">{stats.supportHours}</div>
                      <div className="text-slate-300 text-[10px] sm:text-xs lg:text-xs xl:text-sm font-medium leading-tight break-words">Support</div>
                    </div>
                  </div>

                  {/* Contact Card */}
                  <div className="mt-3 sm:mt-4 lg:mt-6 xl:mt-8 p-3 sm:p-4 lg:p-5 xl:p-6 bg-gradient-to-br from-fosroc-orange/20 to-fosroc-orange-dark/10 rounded-lg sm:rounded-xl border border-fosroc-orange/30 relative z-20">
                    <p className="text-white font-semibold mb-2 sm:mb-3 lg:mb-4 text-center text-xs sm:text-sm lg:text-sm xl:text-base">Get Expert Consultation</p>
                    <div className="flex gap-2 sm:gap-3">
                      <a 
                        href="tel:+917829531999" 
                        className="flex-1 py-2 sm:py-2.5 xl:py-3 bg-white/90 hover:bg-white text-slate-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:scale-105 text-xs sm:text-sm lg:text-sm xl:text-base relative z-20 touch-manipulation"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPhone className="text-xs sm:text-sm" />
                        <span className="hidden sm:inline">Call</span>
                      </a>
                      <a 
                        href="https://wa.me/917829531999" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 sm:py-2.5 xl:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:scale-105 text-xs sm:text-sm lg:text-sm xl:text-base relative z-20 touch-manipulation"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaWhatsapp className="text-xs sm:text-sm" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="lg:hidden absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md rounded-full">
          <span className="text-white text-[10px] sm:text-xs font-medium">Swipe to navigate</span>
          <div className="flex gap-0.5 sm:gap-1">
            <div className="w-1 h-1 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-2 sm:bottom-3 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-full px-3 sm:px-4">
        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3">
          {/* Navigation Arrows - Mobile */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="lg:hidden bg-white/20 active:bg-white/40 text-white p-2.5 rounded-full transition-all duration-300 disabled:opacity-50 touch-manipulation"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-base" />
          </button>

          {/* Slide Indicators with Progress */}
          <div className="flex gap-1.5 sm:gap-2 lg:gap-3 flex-1 justify-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className="relative group flex-1 max-w-12 sm:max-w-16 touch-manipulation"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 w-full ${
                    index === currentSlide
                      ? 'bg-fosroc-orange'
                      : 'bg-white/30 group-active:bg-white/50'
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
            className="lg:hidden bg-white/20 active:bg-white/40 text-white p-2.5 rounded-full transition-all duration-300 disabled:opacity-50 touch-manipulation"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-base" />
          </button>
        </div>
      </div>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 xl:p-4 rounded-full hover:bg-white/30 active:scale-95 transition-all duration-300 hover:scale-110 disabled:opacity-50 touch-manipulation"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-lg xl:text-xl" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md text-white p-3 xl:p-4 rounded-full hover:bg-white/30 active:scale-95 transition-all duration-300 hover:scale-110 disabled:opacity-50 touch-manipulation"
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