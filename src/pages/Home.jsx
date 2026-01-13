import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaCheck, FaArrowRight, FaStar, FaAward, FaShieldAlt } from 'react-icons/fa';
import HeroSlideshow from '../components/HeroSlideshow';
import SolutionsSection from '../components/SolutionsSection';
import BenefitsSection from '../components/BenefitsSection';
import CTASection from '../components/CTASection';
import SEO from '../components/SEO';


const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const serviceAreas = ['KR Puram', 'Whitefield', 'Hoodi', 'Hoskote', 'Old Madras Road', 'Surrounding Areas'];

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: '🏆' },
    { number: '15+', label: 'Years Experience', icon: '📅' },
    { number: '100%', label: 'Genuine Products', icon: '✓' },
    { number: '24/7', label: 'Support Available', icon: '📞' }
  ];

  return (
    <div className="home bg-white">
      <SEO
        title="Home"
        description="V2 Marketing - Authorized Fosroc Dealer in KR Puram, Bangalore. Premium construction chemicals, waterproofing solutions, protective coatings, and expert consultation. Serving Whitefield, Hoodi, Hoskote and surrounding areas since 2010."
        keywords="Fosroc dealer Bangalore, construction chemicals, waterproofing solutions, concrete admixtures, protective coatings, joint sealants, KR Puram, Whitefield, V2 Marketing, Fosroc products Bangalore, construction chemicals dealer, authorized Fosroc dealer"
        canonicalUrl="https://v2marketing.in/"
      />
      <HeroSlideshow/>
      <SolutionsSection/>
      <BenefitsSection/>
      <CTASection/>
      

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>
    </div>
  );
};

export default Home;