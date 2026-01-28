import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaAward, FaCheckCircle, FaTimes } from 'react-icons/fa';

const AwardsSection = () => {
  // Awards data - update with your actual awards
  const awards = [
    {
      id: 1,
      title: "Award 1",
      image: "/assets/Award 1.jpg",
      year: "2023"
    },
    {
      id: 2,
      title: "Award 2",
      image: "/assets/Award 2.jpg",
      year: "2023"
    },
    {
      id: 3,
      title: "Award 3",
      image: "/assets/Award 3.jpg",
      year: "2023"
    },
    {
      id: 4,
      title: "Award 4",
      image: "/assets/Award 4.jpg",
      year: "2023"
    },
    {
      id: 5,
      title: "Award 5",
      image: "/assets/Award 5.jpg",
      year: "2023"
    },
    {
      id: 6,
      title: "Award 6",
      image: "/assets/Award 6.jpg",
      year: "2023"
    },
    {
      id: 7,
      title: "Award 7",
      image: "/assets/Award 7.jpg",
      year: "2023"
    },
    {
      id: 8,
      title: "Award 8",
      image: "/assets/Award 8.jpg",
      year: "2023"
    },
    {
      id: 9,
      title: "Award 9",
      image: "/assets/Award 9.jpg",
      year: "2023"
    },
    {
      id: 10,
      title: "Award 10",
      image: "/assets/Award 10.jpg",
      year: "2023"
    },
    {
      id: 11,
      title: "Award 11",
      image: "/assets/Award 11.jpg",
      year: "2023"
    },
    {
      id: 12,
      title: "Award 12",
      image: "/assets/Award 12.jpg",
      year: "2023"
    },
    {
      id: 13,
      title: "Award 13",
      image: "/assets/Award 13.jpg",
      year: "2023"
    },
    {
      id: 14,
      title: "Award 14",
      image: "/assets/Award 14.jpg",
      year: "2023"
    },
    {
      id: 15,
      title: "Award 15",
      image: "/assets/Award 15.jpg",
      year: "2023"
    },
    {
      id: 16,
      title: "Award 16",
      image: "/assets/Award 16.jpg",
      year: "2023"
    },
    {
      id: 17,
      title: "Award 17",
      image: "/assets/Award 17.jpg",
      year: "2023"
    },
    {
      id: 18,
      title: "Award 18",
      image: "/assets/Award 18.jpg",
      year: "2023"
    },
    {
      id: 19,
      title: "Award 19",
      image: "/assets/Award 19.jpg",
      year: "2023"
    },
    {
      id: 20,
      title: "Award 20",
      image: "/assets/Award 20.jpg",
      year: "2023"
    },
    {
      id: 21,
      title: "Award 21",
      image: "/assets/Award 21.jpg",
      year: "2023"
    },
    {
      id: 22,
      title: "Award 22",
      image: "/assets/Award 22.jpg",
      year: "2023"
    },
    {
      id: 23,
      title: "Award 23",
      image: "/assets/Award 23.jpg",
      year: "2023"
    },
    {
      id: 24,
      title: "Award 24",
      image: "/assets/Award 24.jpg",
      year: "2023"
    }
  ];

  // Duplicate awards for seamless loop
  const duplicatedAwards = [...awards, ...awards];
  const [preview, setPreview] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Touch gesture state
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (preview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [preview]);
  const animationOffsetRef = useRef(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  
  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 30;
  
  // Touch handlers
  const onTouchStart = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    const touch = e.targetTouches[0];
    setTouchStart(touch.clientX);
    setIsDragging(true);
    
    if (marqueeRef.current) {
      // Pause animation
      marqueeRef.current.style.animationPlayState = 'paused';
      
      // Get current transform value from animation
      const computedStyle = window.getComputedStyle(marqueeRef.current);
      const transform = computedStyle.transform;
      let offset = 0;
      if (transform && transform !== 'none') {
        const matrix = transform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
          const values = matrix[1].split(', ');
          offset = parseFloat(values[4]) || 0;
        }
      }
      animationOffsetRef.current = offset;
      setCurrentTranslate(offset);
    }
  };
  
  const onTouchMove = (e) => {
    if (!touchStart) return;
    e.preventDefault();
    const touch = e.targetTouches[0];
    const currentX = touch.clientX;
    setTouchEnd(currentX);
    
    const diff = touchStart - currentX;
    
    if (marqueeRef.current) {
      const newTranslate = animationOffsetRef.current - diff;
      setCurrentTranslate(newTranslate);
      marqueeRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };
  
  const onTouchEnd = () => {
    if (!touchStart || touchEnd === null) {
      // Reset if no movement
      setIsDragging(false);
      setTouchStart(null);
      setTouchEnd(null);
      setCurrentTranslate(0);
      animationOffsetRef.current = 0;
      if (marqueeRef.current) {
        marqueeRef.current.style.animationPlayState = 'running';
        marqueeRef.current.style.transform = '';
      }
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      // Swipe detected - apply momentum
      const swipeDistance = isLeftSwipe ? -300 : 300;
      const targetTranslate = currentTranslate + swipeDistance;
      
      if (marqueeRef.current) {
        marqueeRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        marqueeRef.current.style.transform = `translateX(${targetTranslate}px)`;
        
        // Resume animation after transition
        setTimeout(() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.transition = '';
            marqueeRef.current.style.animationPlayState = 'running';
            marqueeRef.current.style.transform = '';
            animationOffsetRef.current = 0;
          }
        }, 400);
      }
    } else {
      // No significant swipe - resume animation
      if (marqueeRef.current) {
        marqueeRef.current.style.transition = 'transform 0.2s ease-out';
        marqueeRef.current.style.transform = '';
        setTimeout(() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.transition = '';
            marqueeRef.current.style.animationPlayState = 'running';
          }
        }, 200);
      }
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
    setCurrentTranslate(0);
    animationOffsetRef.current = 0;
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
      </div>

      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          {/* Subtitle badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 border border-orange-200 rounded-full mb-4 sm:mb-6">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Our Achievements
            </span>
          </div>

          {/* Main headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2">
            Awards &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fosroc-orange to-fosroc-orange">
              Certifications
            </span>
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-orange-500" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-500" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-orange-500" />
          </div>

          {/* ISO badge and stats */}
          <div className="flex flex-col items-center justify-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <FaCheckCircle className="text-fosroc-orange text-base sm:text-lg" />
              <span className="text-sm sm:text-base font-semibold text-gray-800">ISO 9001 Certified</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {awards.length}+ Awards & Certificates
            </div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
          {/* Gradient overlays for smooth fade effect - hidden on mobile */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Mobile: Scrollable Container */}
          <div className="lg:hidden overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex items-center space-x-4 sm:space-x-6 py-2" style={{ width: 'max-content' }}>
              {awards.map((award, index) => (
                <div
                  key={`${award.id}-${index}`}
                  className="flex-shrink-0 group cursor-pointer relative"
                >
                  <div
                    className="relative transition-all duration-300 transform active:scale-105 cursor-pointer"
                    onClick={() => setPreview(award)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPreview(award); }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      className="h-32 sm:h-40 w-auto object-contain rounded-lg shadow-md active:shadow-xl transition-all duration-300 bg-white p-2 sm:p-3"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Marquee Animation */}
          <div 
            ref={marqueeRef}
            className="hidden lg:flex animate-marquee items-center px-2 sm:px-0 space-x-6 lg:space-x-12 touch-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-x', userSelect: 'none' }}
          >
            {duplicatedAwards.map((award, index) => (
              <div
                key={`${award.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer relative"
              >
                <div
                  className="relative transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 hover:z-50 cursor-pointer"
                  onClick={() => setPreview(award)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPreview(award); }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className="h-40 lg:h-48 xl:h-56 w-auto object-contain rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white p-3 lg:p-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Small Preview Grid */}
        <div className="hidden lg:block mt-8 lg:mt-12">
          <div className="grid grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-5">
            {awards.map((award, index) => (
              <div
                key={`preview-${award.id}-${index}`}
                className="group cursor-pointer relative"
                onClick={() => setPreview(award)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPreview(award); }}
              >
                <div className="relative transition-all duration-300 transform hover:scale-110 hover:z-50">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-auto object-contain rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white p-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modal - Rendered via Portal */}
        {preview && mounted && typeof document !== 'undefined' && createPortal(
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
            style={{ 
              zIndex: 99999,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                zIndex: 100000,
                position: 'relative'
              }}
            >
              <button
                aria-label="Close"
                className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 shadow-lg transition-all duration-300 hover:scale-110 z-10"
                onClick={() => setPreview(null)}
                style={{ zIndex: 100001 }}
              >
                <FaTimes className="text-gray-700 text-lg" />
              </button>
              <div className="w-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="max-h-[70vh] sm:max-h-[80vh] w-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/logo.png'; // Fallback to logo
                  }}
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{preview.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">Year: {preview.year}</p>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Custom CSS for marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          
          /* Touch gesture support */
          .animate-marquee {
            will-change: transform;
          }
          
          /* Prevent text selection during drag */
          .touch-none {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
          }
          
          /* Hide scrollbar on mobile */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Ensure modal appears above everything */
          [style*="z-index: 9999"] {
            position: fixed !important;
            z-index: 9999 !important;
          }
          
          [style*="z-index: 10000"] {
            position: relative !important;
            z-index: 10000 !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default AwardsSection;
