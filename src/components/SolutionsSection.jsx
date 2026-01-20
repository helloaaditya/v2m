import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const SolutionsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const maxSlides = Math.max(0, solutions.length - cardsPerView);

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

  useEffect(() => {
    if (isTransitioning) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isTransitioning, maxSlides]);

  return (
    <section className="relative py-4 lg:py-12 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
      </div>

      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Subtitle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
              Our Solutions
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Constructive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange">
              Solutions
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500" />
          </div>

          {/* Description */}
          <p className="text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Fosroc's tailored solutions combine our extensive product range with expertise and experience to meet the construction industry's needs.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 lg:-left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white hover:bg-orange-500 text-slate-900 hover:text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group border border-slate-200"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 lg:-right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 bg-white hover:bg-fosroc-orange text-slate-900 hover:text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group border border-slate-200"
            aria-label="Next slide"
          >
            <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden mx-4 lg:mx-12">
            <div 
              className="flex transition-transform duration-600 ease-out"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)` 
              }}
            >
              {solutions.map((solution, index) => (
                <div
                  key={solution.id}
                  className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-3 flex-shrink-0"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 h-full flex flex-col ${
                    hoveredCard === index ? 'scale-105' : ''
                  }`}>
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block px-4 py-1.5 bg-gradient-to-r ${solution.color} text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm`}>
                          {solution.category}
                        </span>
                      </div>

                      {/* Quick Features on Hover */}
                      <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
                        hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <div className="flex flex-wrap gap-2">
                          {solution.features.map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-medium rounded-full">
                              <FaCheckCircle className="text-green-500 text-[10px]" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-fosroc-orange transition-colors duration-300">
                        {solution.title}
                      </h3>
                      
                      <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-4 flex-1">
                        {solution.description}
                      </p>

                      {/* Learn More Link */}
                      <div className="flex items-center gap-2 text-fosroc-orange font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Explore Solution</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
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
          <div className="flex justify-center items-center gap-3 mt-10">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-200">
              {Array.from({ length: Math.max(1, maxSlides + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`relative h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-fosroc-orange to-fosroc-orange w-12'
                      : 'bg-slate-300 w-2.5 hover:bg-slate-400 hover:w-6'
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
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for?
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fosroc-orange to-fosroc-orange text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50"
          >
            <span>View All Solutions</span>
            <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;