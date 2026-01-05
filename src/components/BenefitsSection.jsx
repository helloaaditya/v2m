import React from 'react';
import { FaAward, FaShieldAlt, FaTruck, FaDollarSign, FaUsers, FaBox } from 'react-icons/fa';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaAward />,
      title: 'Authorized Dealer',
      description: 'Official Fosroc dealer with 100% genuine products and warranty support',
      image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&auto=format&fit=crop'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Technical Expertise',
      description: 'Expert consultation and guidance for your construction chemical needs',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop'
    },
    {
      icon: <FaBox />,
      title: 'Wide Stock',
      description: 'Comprehensive inventory of Fosroc products ready for immediate delivery',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop'
    },
    {
      icon: <FaTruck />,
      title: 'Reliable Delivery',
      description: 'Timely delivery across KR Puram, Whitefield, Hoodi, and surrounding areas',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&auto=format&fit=crop'
    },
    {
      icon: <FaDollarSign />,
      title: 'Competitive Pricing',
      description: 'Best prices for quality Fosroc construction chemicals',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop'
    },
    {
      icon: <FaUsers />,
      title: 'Customer First',
      description: 'Dedicated service and support throughout your project lifecycle',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose V2 Marketing?
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Your trusted partner for authentic Fosroc construction chemicals
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-14 h-14 bg-white rounded-lg flex items-center justify-center text-blue-600 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;