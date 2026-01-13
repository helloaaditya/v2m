import React, { useState } from 'react';
import { FaCheck, FaAward, FaShieldAlt, FaUsers, FaTruck, FaHandshake, FaStar, FaArrowRight, FaCheckCircle, FaRocket, FaBullseye } from 'react-icons/fa';

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const credentials = [
    {
      icon: <FaAward />,
      title: 'Authorized Dealer',
      description: 'Official authorization from Fosroc ensures you receive 100% genuine products with full warranty and technical support.',
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-500/10 to-red-600/5'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Technical Expertise',
      description: 'Our team possesses extensive knowledge of construction chemicals and provides expert guidance for product selection and application.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/10 to-orange-600/5'
    },
    {
      icon: <FaStar />,
      title: 'Quality Assurance',
      description: 'Every product we supply is backed by Fosroc\'s quality standards and our commitment to excellence.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/10 to-purple-600/5'
    }
  ];

  const values = [
    {
      icon: <FaCheck />,
      title: 'Authenticity',
      description: '100% genuine Fosroc products with proper documentation and warranty',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Expertise',
      description: 'Deep technical knowledge to guide you in product selection and application',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <FaTruck />,
      title: 'Reliability',
      description: 'Consistent product availability and timely delivery to keep your projects on schedule',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaUsers />,
      title: 'Customer Focus',
      description: 'Your success is our priority - we go the extra mile to ensure satisfaction',
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: <FaHandshake />,
      title: 'Service Excellence',
      description: 'Comprehensive support from inquiry to delivery and beyond',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const whyChoose = [
    'Official Fosroc authorization ensures product authenticity',
    'Comprehensive inventory covering all major categories',
    'Expert advice on product selection and application',
    'Well-maintained stock for immediate availability',
    'Efficient logistics ensuring on-time delivery',
    'Based in KR Puram with quick response times'
  ];

  return (
    <div className="about bg-white">
      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[40vh] md:h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaCheckCircle className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              About Us
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              V2 Marketing
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-fosroc-orange" />
            <div className="w-2 h-2 rounded-full bg-fosroc-orange" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-fosroc-orange" />
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto px-4">
            Your Trusted Partner for Quality Construction Chemicals
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-fosroc-orange animate-pulse" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                Building Excellence{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  Since 2010
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light mb-6"></div>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                V2 Marketing is an authorized Fosroc dealer based in KR Puram, Bangalore, 
                specializing in providing high-quality construction chemical solutions to builders, 
                contractors, and construction professionals across East Bangalore.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                With our deep understanding of construction challenges and technical expertise, 
                we help our clients achieve superior results through genuine Fosroc products 
                and expert consultation.
              </p>
              <div className="flex gap-4 sm:gap-6 mt-8">
                <div className="text-center flex-1 p-4 bg-white rounded-xl shadow-md border border-slate-200">
                  <div className="text-3xl sm:text-4xl font-bold text-fosroc-orange mb-2">15+</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center flex-1 p-4 bg-white rounded-xl shadow-md border border-slate-200">
                  <div className="text-3xl sm:text-4xl font-bold text-fosroc-orange mb-2">500+</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center flex-1 p-4 bg-white rounded-xl shadow-md border border-slate-200">
                  <div className="text-3xl sm:text-4xl font-bold text-fosroc-orange mb-2">100%</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">Genuine Products</div>
                </div>
              </div>
            </div>

            {/* Right: Info Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark p-8 sm:p-10 lg:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-fosroc-orange/10 to-transparent"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-2xl flex items-center justify-center text-white text-4xl sm:text-5xl mx-auto mb-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                    <FaAward />
                  </div>
                  <h3 className="font-bold text-2xl sm:text-3xl mb-3">Authorized Dealer</h3>
                  <p className="text-gray-200 text-lg mb-6">Official Fosroc Partner</p>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm text-gray-200 font-medium">Serving since 2010</p>
                    <p className="text-xs text-gray-300 mt-2">KR Puram, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
              <FaCheckCircle className="text-fosroc-orange text-sm" />
              <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                Our Credentials
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              Why Trust{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                V2 Marketing?
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-fosroc-orange" />
              <div className="w-2 h-2 rounded-full bg-fosroc-orange" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-fosroc-orange" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {credentials.map((credential, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-500 border border-slate-200 hover:border-transparent ${
                  hoveredIndex === index ? 'shadow-2xl scale-105' : 'shadow-md'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${credential.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-4 sm:p-5 bg-gradient-to-br ${credential.color} rounded-2xl text-white text-2xl sm:text-3xl shadow-lg transform transition-all duration-500 mb-6 ${
                    hoveredIndex === index ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                  }`}>
                    {credential.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 group-hover:text-fosroc-orange transition-colors">
                    {credential.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {credential.description}
                  </p>
                </div>
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${credential.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark h-[350px] sm:h-[400px] flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-fosroc-orange/20 to-transparent"></div>
              <div className="relative z-10 text-center text-white">
                <div className="w-20 h-20 bg-fosroc-orange rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <FaBullseye />
                </div>
                <p className="text-xl sm:text-2xl font-bold">Building Excellence</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <FaCheckCircle className="text-fosroc-orange text-sm" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  Mission
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light mb-6"></div>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                To be the most trusted and reliable partner for construction professionals by 
                providing genuine Fosroc products, expert technical consultation, and exceptional 
                customer service that helps build stronger, more durable structures.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <FaCheckCircle className="text-fosroc-orange text-sm" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Our Vision
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  Vision
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light mb-6"></div>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                To establish V2 Marketing as the go-to destination for quality construction 
                chemicals in East Bangalore, recognized for our technical expertise, product 
                authenticity, and unwavering commitment to customer success.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 bg-gradient-to-br from-fosroc-orange via-fosroc-orange-light to-fosroc-orange-dark h-[350px] sm:h-[400px] flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-fosroc-red/20 to-transparent"></div>
              <div className="relative z-10 text-center text-white">
                <div className="w-20 h-20 bg-fosroc-red rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <FaRocket />
                </div>
                <p className="text-xl sm:text-2xl font-bold">Future Forward</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
              <FaCheckCircle className="text-fosroc-orange text-sm" />
              <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                Core Values
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              What{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                Drives Us
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-fosroc-orange" />
              <div className="w-2 h-2 rounded-full bg-fosroc-orange" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-fosroc-orange" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(`value-${index}`)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-500 border border-slate-200 hover:border-transparent ${
                  hoveredIndex === `value-${index}` ? 'shadow-2xl scale-105' : 'shadow-md'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl mb-4 shadow-lg transform transition-all duration-500 ${
                    hoveredIndex === `value-${index}` ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                  }`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 group-hover:text-fosroc-orange transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Info Card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-fosroc-orange via-fosroc-orange-light to-fosroc-orange-dark h-[400px] sm:h-[500px] flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-fosroc-red/20 to-transparent"></div>
                <div className="relative z-10 text-center text-white p-8">
                  <div className="w-24 h-24 bg-fosroc-red rounded-2xl flex items-center justify-center text-white text-5xl mx-auto mb-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <FaStar />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Why Choose Us?</h3>
                  <p className="text-gray-200 text-lg mb-6">Trusted by 500+ Projects</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                          {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-6">
                <FaCheckCircle className="text-fosroc-orange text-sm" />
                <span className="text-fosroc-orange font-semibold text-sm tracking-wide uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Why Choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
                  V2 Marketing?
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light mb-8"></div>
              
              <div className="space-y-4">
                {whyChoose.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-xl border border-slate-200 hover:border-fosroc-orange/50 transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-fosroc-orange to-fosroc-orange-dark rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaCheck className="text-xs" />
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base group-hover:text-slate-900 transition-colors flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-fosroc-red via-fosroc-red-dark to-fosroc-red-dark text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-fosroc-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <FaCheckCircle className="text-fosroc-orange text-sm" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Partner With Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Experience the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange-light">
              Difference
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 leading-relaxed">
            Experience the difference of working with an authorized Fosroc dealer
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-fosroc-orange text-white font-bold text-sm sm:text-base rounded-xl hover:bg-fosroc-orange-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <span>Get in Touch</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/products"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white font-bold text-sm sm:text-base rounded-xl border-2 border-white/30 hover:bg-white hover:text-fosroc-red transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>View Products</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
