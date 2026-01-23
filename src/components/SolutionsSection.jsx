import React, { useState } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const SolutionsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
  ];


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

        {/* Grid Container */}
        <div className="relative">
          {/* Solutions Grid - 1 column on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className="w-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl active:scale-[0.98] transition-all duration-500 border border-slate-200 h-full flex flex-col touch-manipulation ${
                  hoveredCard === index ? 'scale-[1.02]' : ''
                }`}>
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r ${solution.color} text-white text-[9px] sm:text-[10px] font-bold rounded-full shadow-lg backdrop-blur-sm`}>
                        {solution.category}
                      </span>
                    </div>

                    {/* Quick Features on Hover */}
                    <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 transition-all duration-500 ${
                      hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {solution.features.map((feature, idx) => (
                          <span key={idx} className="inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] sm:text-[10px] font-medium rounded-full">
                            <FaCheckCircle className="text-green-500 text-[7px] sm:text-[8px]" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-fosroc-orange transition-colors duration-300 line-clamp-2">
                      {solution.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2 sm:mb-3 flex-1 line-clamp-3">
                      {solution.description}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-fosroc-orange font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300">
                      <span>Explore</span>
                      <FaArrowRight className="text-[9px] sm:text-[10px] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className={`absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />
                </div>
              </div>
            ))}
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