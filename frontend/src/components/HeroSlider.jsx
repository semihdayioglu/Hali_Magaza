import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&h=800&fit=crop',
    alt: 'Premium Çim Halı'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=1920&h=800&fit=crop',
    alt: 'Karo Halı Koleksiyonu'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=1920&h=800&fit=crop',
    alt: 'PVC Zemin Çeşitleri'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const totalSlides = slides.length;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoPlay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoPlay();
  };

  return (
    <div 
      data-testid="hero-slider"
      className="relative w-full h-[400px] lg:h-[600px] overflow-hidden bg-gray-100"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startAutoPlay}
    >
      {/* SLIDER WRAPPER */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full">
            <img 
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* SOL OK BUTONU */}
      <button 
        onClick={prevSlide}
        data-testid="slider-prev"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 
                 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg 
                 hover:bg-white hover:scale-110 transition-all"
        aria-label="Önceki slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* SAĞ OK BUTONU */}
      <button 
        onClick={nextSlide}
        data-testid="slider-next"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 
                 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg 
                 hover:bg-white hover:scale-110 transition-all"
        aria-label="Sonraki slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* DOTS INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            data-testid={`slider-dot-${index}`}
            className={`transition-all rounded-full ${
              currentSlide === index 
                ? 'w-8 h-2 bg-white' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
