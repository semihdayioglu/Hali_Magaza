import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div data-testid="not-found-page" className="min-h-[60vh] flex items-center justify-center bg-[#F5F8F2]">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 
            className="text-8xl md:text-9xl font-bold text-[#4A7C4E] opacity-20"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E2D] -mt-8 md:-mt-12">
            Sayfa Bulunamadı
          </h2>
        </div>
        
        <p className="text-[#8A9A8B] mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek alışverişe devam edebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            data-testid="go-home"
            className="inline-flex items-center justify-center gap-2 bg-[#4A7C4E] text-white 
                     px-6 py-3 rounded-full font-medium hover:bg-[#3A633D] transition-all"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
          
          <button
            onClick={() => window.history.back()}
            data-testid="go-back"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#4A7C4E] 
                     text-[#4A7C4E] px-6 py-3 rounded-full font-medium 
                     hover:bg-[#4A7C4E] hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri Dön
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D4D4D4]">
          <p className="text-sm text-[#8A9A8B] mb-4">Belki bunları arıyordunuz?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/kategori/cim-hali"
              className="px-4 py-2 bg-white rounded-full text-sm text-[#2C3E2D] hover:bg-[#C8D96F] transition-colors"
            >
              Çim Halı
            </Link>
            <Link 
              to="/kategori/karo-hali"
              className="px-4 py-2 bg-white rounded-full text-sm text-[#2C3E2D] hover:bg-[#C8D96F] transition-colors"
            >
              Karo Halı
            </Link>
            <Link 
              to="/kategori/pvc-zemin"
              className="px-4 py-2 bg-white rounded-full text-sm text-[#2C3E2D] hover:bg-[#C8D96F] transition-colors"
            >
              PVC Zemin
            </Link>
            <Link 
              to="/kategori/paspas"
              className="px-4 py-2 bg-white rounded-full text-sm text-[#2C3E2D] hover:bg-[#C8D96F] transition-colors"
            >
              Paspas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
