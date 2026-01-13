import React, { useState } from 'react';
import { FaAward, FaShieldAlt, FaTruck, FaDollarSign, FaUsers, FaBox, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      icon: <FaAward />,
      title: 'Authorized Dealer',
      description: 'Official Fosroc dealer with 100% genuine products and comprehensive warranty support',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/10 to-blue-600/5',
      glowColor: 'shadow-blue-500/20'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Technical Expertise',
      description: 'Expert consultation and guidance for your construction chemical needs with certified engineers',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/10 to-orange-600/5',
      glowColor: 'shadow-orange-500/20'
    },
    {
      icon: <FaBox />,
      title: 'Wide Stock Availability',
      description: 'Comprehensive inventory of Fosroc products ready for immediate delivery to your site',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/10 to-purple-600/5',
      glowColor: 'shadow-purple-500/20'
    },
    {
      icon: <FaTruck />,
      title: 'Reliable Delivery',
      description: 'Timely delivery across KR Puram, Whitefield, Hoodi, and surrounding areas in Bangalore',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/10 to-green-600/5',
      glowColor: 'shadow-green-500/20'
    },
    {
      icon: <FaDollarSign />,
      title: 'Competitive Pricing',
      description: 'Best market rates for quality Fosroc construction chemicals without compromising on authenticity',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-500/10 to-emerald-600/5',
      glowColor: 'shadow-emerald-500/20'
    },
    {
      icon: <FaUsers />,
      title: 'Customer First Approach',
      description: 'Dedicated service and support throughout your project lifecycle with 24/7 assistance',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'from-rose-500/10 to-rose-600/5',
      glowColor: 'shadow-rose-500/20'
    }
  ];

  return (
    <section className="relative py-4 lg:py-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Subtitle */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
            <FaCheckCircle className="text-orange-500 text-sm" />
            <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
              Our Advantages
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-fosroc-orange">
              V2 Marketing?
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500" />
          </div>

          {/* Description */}
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for authentic Fosroc construction chemicals. Experience excellence in every aspect of our service.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative bg-white rounded-2xl p-8 transition-all duration-500 border border-slate-200 hover:border-transparent ${
                hoveredIndex === index ? `shadow-2xl ${benefit.glowColor}` : 'shadow-md'
              }`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Card content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-5 bg-gradient-to-br ${benefit.color} rounded-2xl text-white text-3xl shadow-lg transform transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                  }`}>
                    {benefit.icon}
                  </div>
                  
                  {/* Animated ring on hover */}
                  {hoveredIndex === index && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl opacity-20 animate-ping`} />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-4 text-sm lg:text-base">
                  {benefit.description}
                </p>
                
                {/* Learn More Link */}
                <div className={`flex items-center gap-2 text-orange-600 font-semibold text-sm transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  <span>Learn More</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-10 mb-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Experience the Difference?
              </h3>
              <p className="text-slate-300 text-sm">
                Join 500+ satisfied customers who trust V2 Marketing for their construction needs
              </p>
            </div>
            <a
              href="/contact"
              className="group flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-fosroc-orange text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <span>Get Started</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;