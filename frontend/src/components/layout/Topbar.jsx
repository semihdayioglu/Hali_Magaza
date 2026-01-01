import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Topbar = () => {
  return (
    <div 
      data-testid="topbar"
      className="h-[40px] bg-[#C8D96F] flex items-center justify-between px-4 md:px-20"
    >
      <button 
        data-testid="topbar-prev"
        className="p-1 hover:bg-[#B8C95F] rounded-full transition-colors"
        aria-label="Önceki"
      >
        <ChevronLeft className="w-5 h-5 text-[#2C3E2D]" />
      </button>
      
      <p className="text-[#2C3E2D] text-sm font-semibold">
        1000 ₺ üzeri <span className="font-bold">Ücretsiz Kargo</span>
      </p>
      
      <button 
        data-testid="topbar-next"
        className="p-1 hover:bg-[#B8C95F] rounded-full transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5 text-[#2C3E2D]" />
      </button>
    </div>
  );
};

export default Topbar;
