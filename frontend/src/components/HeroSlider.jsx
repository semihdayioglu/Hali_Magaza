import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    subtitle: "Bahçenize Tazelik",
    title: "Premium Çim Halı",
    description: "Doğal görünümlü, dayanıklı ve UV korumalı çim halılar",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&h=800&fit=crop",
    card2Image: "https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=400&h=300&fit=crop",
    card2Title: "PVC Zemin",
    link: "/kategori/cim-hali"
  },
  {
    id: 2,
    subtitle: "Profesyonel Çözümler",
    title: "Karo Halı Koleksiyonu",
    description: "Ofis ve ev için modern, ses yalıtımlı karo halılar",
    image: "https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=1200&h=800&fit=crop",
    card2Image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    card2Title: "Premium Karo",
    link: "/kategori/karo-hali"
  },
  {
    id: 3,
    subtitle: "Evinize Şıklık",
    title: "PVC Zemin Kaplama",
    description: "Su geçirmez, dayanıklı ve şık PVC zemin seçenekleri",
    image: "https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=1200&h=800&fit=crop",
    card2Image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop",
    card2Title: "Taş Desenli",
    link: "/kategori/pvc-zemin"
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
      className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden bg-white"
      onMouseEnter={() => clearInterval(intervalRef.current)}
      onMouseLeave={startAutoPlay}
    >
      {/* SLIDER WRAPPER */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
              
              {/* SOL TARAF - TEXT + ORGANİK SHAPE */}
              <div className="lg:col-span-5 relative flex items-center">
                {/* Organik Yeşil Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-transparent">
                  {/* Organik Shape SVG */}
                  <svg 
                    className="absolute right-0 top-0 h-full w-auto opacity-30"
                    viewBox="0 0 200 600"
                    preserveAspectRatio="none"
                  >
                    <path 
                      fill="#81C784" 
                      d="M0,0 Q100,100 80,200 Q60,300 100,400 Q140,500 80,600 L0,600 Z"
                    />
                  </svg>
                </div>

                {/* Text Content */}
                <div className="relative z-10 px-8 lg:px-16 py-12 lg:py-20 space-y-6">
                  {/* İtalik Subtitle */}
                  <h2 
                    className="text-2xl lg:text-4xl text-[#2C3E2D] font-light"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    {slide.subtitle}
                  </h2>

                  {/* Ana Başlık */}
                  <h1 className="text-3xl lg:text-5xl font-bold text-[#1B5E20] leading-tight">
                    {slide.title}
                  </h1>

                  {/* Açıklama */}
                  <p className="text-[#5C6B5D] text-base lg:text-lg max-w-md">
                    {slide.description}
                  </p>

                  {/* CTA Buton */}
                  <Link
                    to={slide.link}
                    data-testid="hero-cta"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#2C3E2D] text-[#2C3E2D] 
                             rounded-full font-semibold hover:bg-[#2C3E2D] hover:text-white transition-all duration-300"
                  >
                    Hemen Keşfet
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* SAĞ TARAF - GÖRSEL + KARTLAR */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full">
                {/* Ana Görsel - Sol tarafı yuvarlak */}
                <div className="absolute inset-0 lg:rounded-l-[80px] overflow-hidden">
                  <img 
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Sağ Üst Kartlar */}
                <div className="absolute top-4 lg:top-8 right-4 lg:right-8 space-y-4 w-56 lg:w-64 hidden md:block">
                  
                  {/* Kart 1: Ücretsiz Kargo */}
                  <div className="bg-[#E8F5E9] p-5 rounded-2xl shadow-lg backdrop-blur-sm">
                    <Truck className="w-8 h-8 text-[#4A7C4E] mb-3" />
                    <h3 className="font-bold text-[#2C3E2D] text-base mb-1">Ücretsiz Kargo</h3>
                    <p className="text-sm text-[#5C6B5D]">1000 ₺ ve üzeri alışverişlerde</p>
                  </div>

                  {/* Kart 2: Yeni Koleksiyon */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img 
                      src={slide.card2Image}
                      alt={slide.card2Title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs text-[#8A9A8B] uppercase tracking-wide">Yeni Koleksiyon</p>
                      <h4 className="font-bold text-[#2C3E2D]">{slide.card2Title}</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* OK BUTONLARI */}
      <button 
        onClick={prevSlide}
        data-testid="slider-prev"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 
                 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg 
                 hover:scale-110 transition-all duration-300"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-6 h-6 text-[#2C3E2D]" />
      </button>

      <button 
        onClick={nextSlide}
        data-testid="slider-next"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 
                 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg 
                 hover:scale-110 transition-all duration-300"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-6 h-6 text-[#2C3E2D]" />
      </button>

      {/* DOTS INDICATOR */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            data-testid={`slider-dot-${index}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index 
                ? 'w-8 h-2 bg-[#2C3E2D]' 
                : 'w-2 h-2 bg-[#D4D4D4] hover:bg-[#8A9A8B]'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
