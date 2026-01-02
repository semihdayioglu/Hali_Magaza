import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const messages = [
  "1000 ₺ üzeri Ücretsiz Kargo",
  "%100 Müşteri Memnuniyeti",
  "0 532 577 89 27 WhatsApp Sipariş"
];

const Topbar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const nextMessage = useCallback(() => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  }, []);

  const previousMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextMessage, 3000);
    return () => clearInterval(interval);
  }, [nextMessage]);

  return (
    <div 
      data-testid="topbar"
      className="bg-gradient-to-r from-lime-400 to-lime-500 py-3 relative"
    >
      <div className="flex items-center justify-center gap-2">
        {/* SOL OK */}
        <button 
          onClick={previousMessage}
          data-testid="topbar-prev"
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Önceki mesaj"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* MESAJ */}
        <div className="min-w-[280px] text-center">
          <p className="text-gray-800 font-semibold text-sm transition-all duration-300">
            {messages[currentMessage]}
          </p>
        </div>

        {/* SAĞ OK */}
        <button 
          onClick={nextMessage}
          data-testid="topbar-next"
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Sonraki mesaj"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
