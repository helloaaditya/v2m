import React, { useState, useEffect } from 'react';
import { FaCheck, FaAward, FaShieldAlt, FaUsers, FaTruck, FaHandshake, FaStar } from 'react-icons/fa';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const credentials = [
    {
      icon: <FaAward />,
      title: 'Authorized Dealer',
      description: 'Official authorization from Fosroc ensures you receive 100% genuine products with full warranty and technical support.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Technical Expertise',
      description: 'Our team possesses extensive knowledge of construction chemicals and provides expert guidance for product selection and application.'
    },
    {
      icon: <FaStar />,
      title: 'Quality Assurance',
      description: 'Every product we supply is backed by Fosroc\'s quality standards and our commitment to excellence.'
    }
  ];

  const values = [
    {
      icon: <FaCheck />,
      title: 'Authenticity',
      description: '100% genuine Fosroc products with proper documentation and warranty'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Expertise',
      description: 'Deep technical knowledge to guide you in product selection and application'
    },
    {
      icon: <FaTruck />,
      title: 'Reliability',
      description: 'Consistent product availability and timely delivery to keep your projects on schedule'
    },
    {
      icon: <FaUsers />,
      title: 'Customer Focus',
      description: 'Your success is our priority - we go the extra mile to ensure satisfaction'
    },
    {
      icon: <FaHandshake />,
      title: 'Service Excellence',
      description: 'Comprehensive support from inquiry to delivery and beyond'
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
      {/* Hero Section with Parallax */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden bg-blue-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2000&auto=format&fit=crop')",
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 2.0
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/95" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About V2 Marketing</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your Trusted Partner for Quality Construction Chemicals
          </p>
        </div>
      </section>

      {/* Introduction Section with Image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Who We Are</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                V2 Marketing is an authorized Fosroc dealer based in KR Puram, Bangalore, 
                specializing in providing high-quality construction chemical solutions to builders, 
                contractors, and construction professionals across East Bangalore.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With our deep understanding of construction challenges and technical expertise, 
                we help our clients achieve superior results through genuine Fosroc products 
                and expert consultation.
              </p>
              <div className="flex gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Genuine Products</div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop"
                  alt="V2 Marketing Team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                        <FaAward />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Authorized Dealer</h3>
                        <p className="text-sm text-gray-600">Official Fosroc Partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Credentials</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-3xl mb-6">
                  {credential.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{credential.title}</h3>
                <p className="text-gray-600 leading-relaxed">{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision with Images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop"
                alt="Our Mission"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 text-blue-900">Our Mission</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the most trusted and reliable partner for construction professionals by 
                providing genuine Fosroc products, expert technical consultation, and exceptional 
                customer service that helps build stronger, more durable structures.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-4 text-blue-900">Our Vision</h2>
              <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To establish V2 Marketing as the go-to destination for quality construction 
                chemicals in East Bangalore, recognized for our technical expertise, product 
                authenticity, and unwavering commitment to customer success.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop"
                alt="Our Vision"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Core Values</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop"
                  alt="Why Choose Us"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose V2 Marketing?</h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              
              <div className="space-y-4">
                {whyChoose.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      <FaCheck className="text-xs" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2000&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 to-blue-800/95" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner With Us</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the difference of working with an authorized Fosroc dealer
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get in Touch
            </a>
            <a
              href="/products"
              className="px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg border-2 border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              View Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;