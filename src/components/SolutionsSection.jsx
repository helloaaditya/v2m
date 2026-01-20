import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const SolutionsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const solutions = [
    {
      id: 1,
      title: 'Protective Coatings',
      description: 'Superior protective coating technology including world-class brands like Dekguard for long-lasting surface protection.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80',
      category: 'Coatings',
      features: ['Dekguard Technology', 'UV Resistant', 'Long-lasting'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 2,
      title: 'Waterproofing',
      description: 'Complete waterproofing systems from basement to roof, including membranes, liquid systems, and injection grouts.',
      image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&auto=format&fit=crop&q=80',
      category: 'Waterproofing',
      features: ['Basement to Roof', 'Membrane Systems', 'Injection Grouts'],
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Joint Sealants',
      description: 'Expert joint design and sealant technology for movement joints, expansion joints, and structural connections.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
      category: 'Sealants',
      features: ['Movement Joints', 'Expansion Joints', 'Structural Grade'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Concrete Admixtures',
      description: 'Comprehensive admixtures including plasticizers, superplasticizers, accelerators, and retarders for optimal concrete performance.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop&q=80',
      category: 'Admixtures',
      features: ['Superplasticizers', 'Accelerators', 'Air Entraining'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Repair & Strengthening',
      description: 'Structural repair mortars, injection systems, and strengthening solutions to restore concrete integrity.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      category: 'Repair',
      features: ['Structural Repair', 'Injection Systems', 'Strengthening'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      title: 'Industrial Flooring',
      description: 'Durable flooring systems including epoxy, polyurethane, and self-leveling compounds for heavy-duty environments.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      category: 'Flooring',
      features: ['Epoxy Systems', 'Polyurethane', 'Heavy Duty'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 7,
      title: 'Grouts & Anchoring',
      description: 'High-strength grouting and anchoring systems for machinery installation and structural connections.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      category: 'Grouts',
      features: ['High Strength', 'Precision Grouts', 'Load Transfer'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 8,
      title: 'Surface Treatments',
      description: 'Advanced surface treatment solutions for concrete protection, hardening, and aesthetic enhancement.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      category: 'Treatments',
      features: ['Surface Hardening', 'Dust Proofing', 'Aesthetic Finish'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 9,
      title: 'Specialty Chemicals',
      description: 'Customized specialty chemical solutions for unique construction challenges and specialized applications.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      category: 'Specialty',
      features: ['Custom Solutions', 'Technical Support', 'Quality Assured'],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  // Calculate max slides - slide one card at a time, but account for visible cards
  const maxSlides = Math.max(0, solutions.length - 1);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
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

  useEffect(() => {
    if (isTransitioning) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isTransitioning, maxSlides]);

  return (
    <section className="relative py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
      </div>

      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          {/* Subtitle badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 border border-orange-200 rounded-full mb-4 sm:mb-6">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Our Solutions
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2">
            Constructive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange">
              Solutions
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-orange-500" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-500" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-orange-500" />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            Fosroc's tailored solutions combine our extensive product range with expertise and experience to meet the construction industry's needs.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Swipe Indicator for Mobile */}
          <div className="sm:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-slate-600 text-xs font-medium">Swipe to explore</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-fosroc-orange/50 animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 rounded-full bg-fosroc-orange/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 rounded-full bg-fosroc-orange/50 animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 sm:left-2 lg:-left-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white active:bg-orange-500 hover:bg-orange-500 text-slate-900 hover:text-white active:text-white rounded-full shadow-lg active:shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group border border-slate-200 touch-manipulation"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm sm:text-base group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 sm:right-2 lg:-right-6 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white active:bg-fosroc-orange hover:bg-fosroc-orange text-slate-900 hover:text-white active:text-white rounded-full shadow-lg active:shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group border border-slate-200 touch-manipulation"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm sm:text-base group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Carousel */}
          <div 
            className="overflow-hidden mx-2 sm:mx-4 lg:mx-12 touch-pan-x"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(calc(-${currentSlide * (100 / cardsPerView)}% + ${swipeOffset * 0.3}px))` 
              }}
            >
              {solutions.map((solution, index) => (
                <div
                  key={solution.id}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-2 sm:px-3 flex-shrink-0"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl active:scale-[0.98] transition-all duration-500 border border-slate-200 h-full flex flex-col touch-manipulation ${
                    hoveredCard === index ? 'scale-105' : ''
                  }`}>
                    {/* Image Container */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className={`inline-block px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 bg-gradient-to-r ${solution.color} text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg backdrop-blur-sm`}>
                          {solution.category}
                        </span>
                      </div>

                      {/* Quick Features on Hover */}
                      <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 transition-all duration-500 ${
                        hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {solution.features.map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] sm:text-xs font-medium rounded-full">
                              <FaCheckCircle className="text-green-500 text-[8px] sm:text-[10px]" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-fosroc-orange transition-colors duration-300">
                        {solution.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4 flex-1">
                        {solution.description}
                      </p>

                      {/* Learn More Link */}
                      <div className="flex items-center gap-2 text-fosroc-orange font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Explore Solution</span>
                        <FaArrowRight className="text-[10px] sm:text-xs group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Decorative corner element */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Pagination */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8 lg:mt-10">
            <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg border border-slate-200">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`relative h-2 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-fosroc-orange to-fosroc-orange w-8 sm:w-12'
                      : 'bg-slate-300 w-2 sm:w-2.5 active:bg-slate-400 active:w-4 sm:hover:bg-slate-400 sm:hover:w-6'
                  } ${isTransitioning ? 'cursor-wait' : 'cursor-pointer'}`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-fosroc-orange rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center px-4">
          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
            Can't find what you're looking for?
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-fosroc-orange to-fosroc-orange text-white font-bold text-sm sm:text-base rounded-xl active:scale-95 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 touch-manipulation"
          >
            <span>View All Solutions</span>
            <FaArrowRight className="text-xs sm:text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;