import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

// Kategori dropdown verileri
const dropdownData = {
  'cim-hali': {
    name: 'Çim Halı',
    slug: 'cim-hali',
    items: [
      { name: 'Premium Çim Halı', img: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=300&fit=crop', slug: 'premium-cim-hali-35mm' },
      { name: 'Bahçe Çim Halı', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=300&fit=crop', slug: 'bahce-cim-hali-25mm' },
      { name: 'Dekoratif Çim', img: 'https://images.unsplash.com/photo-1703432043433-3bb86c844968?w=300&h=300&fit=crop', slug: 'dekoratif-cim-hali-20mm' },
      { name: 'Spor Sahası', img: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=300&h=300&fit=crop', slug: 'futbol-sahasi-cim-hali-50mm' },
      { name: 'Balkon İçin', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=300&fit=crop', slug: 'bahce-cim-hali-25mm' },
      { name: 'Teras İçin', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=300&fit=crop', slug: 'premium-cim-hali-35mm' },
      { name: 'UV Dayanımlı', img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=300&h=300&fit=crop', slug: 'premium-cim-hali-35mm' },
      { name: 'Ekonomik', img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=300&h=300&fit=crop', slug: 'bahce-cim-hali-25mm' }
    ]
  },
  'karo-hali': {
    name: 'Karo Halı',
    slug: 'karo-hali',
    items: [
      { name: 'Ofis Karo Halı', img: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=300&h=300&fit=crop', slug: 'ofis-karo-hali-antrasit' },
      { name: 'Ev Tipi Karo', img: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300&h=300&fit=crop', slug: 'ev-tipi-karo-hali-bej' },
      { name: 'Premium Karo', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', slug: 'premium-karo-hali-gri' },
      { name: 'Antrasit Karo', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop', slug: 'ofis-karo-hali-antrasit' },
      { name: 'Gri Tonları', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=300&fit=crop', slug: 'premium-karo-hali-gri' },
      { name: 'Ses Yalıtımlı', img: 'https://images.unsplash.com/photo-1600566753355-35792bedcfea?w=300&h=300&fit=crop', slug: 'ofis-karo-hali-antrasit' },
      { name: 'Yüksek Trafik', img: 'https://images.unsplash.com/photo-1600566753051-f0b06dc7c277?w=300&h=300&fit=crop', slug: 'premium-karo-hali-gri' },
      { name: 'Modern Tasarım', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=300&fit=crop', slug: 'ev-tipi-karo-hali-bej' }
    ]
  },
  'pvc-zemin': {
    name: 'PVC Zemin',
    slug: 'pvc-zemin',
    items: [
      { name: 'Ahşap Desenli', img: 'https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=300&h=300&fit=crop', slug: 'ahsap-desenli-pvc-zemin' },
      { name: 'Taş Desenli', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300&h=300&fit=crop', slug: 'tas-desenli-pvc-zemin' },
      { name: 'Spor Salonu', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop', slug: 'spor-salonu-pvc-zemin' },
      { name: 'Meşe Desen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop', slug: 'ahsap-desenli-pvc-zemin' },
      { name: 'Mermer Görünüm', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=300&fit=crop', slug: 'tas-desenli-pvc-zemin' },
      { name: 'Su Geçirmez', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=300&fit=crop', slug: 'tas-desenli-pvc-zemin' },
      { name: 'Kaymaz Yüzey', img: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=300&h=300&fit=crop', slug: 'spor-salonu-pvc-zemin' },
      { name: 'Hijyenik', img: 'https://images.unsplash.com/photo-1600573472550-29c83a7b2d3d?w=300&h=300&fit=crop', slug: 'tas-desenli-pvc-zemin' }
    ]
  },
  'paspas': {
    name: 'Paspas',
    slug: 'paspas',
    items: [
      { name: 'Kapı Önü', img: 'https://images.unsplash.com/photo-1681258356422-e9d9531deb63?w=300&h=300&fit=crop', slug: 'kaucuk-paspas-60x90' },
      { name: 'Dekoratif', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300&h=300&fit=crop', slug: 'dekoratif-kapi-paspasi' },
      { name: 'Endüstriyel', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', slug: 'endustriyel-paspas-90x150' },
      { name: 'Kauçuk 60x90', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=300&fit=crop', slug: 'kaucuk-paspas-60x90' },
      { name: 'Toz Tutucu', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=300&fit=crop', slug: 'kaucuk-paspas-60x90' },
      { name: 'Kaymaz Taban', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=300&fit=crop', slug: 'kaucuk-paspas-60x90' },
      { name: 'Şık Tasarım', img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=300&h=300&fit=crop', slug: 'dekoratif-kapi-paspasi' },
      { name: 'Büyük Boy', img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=300&h=300&fit=crop', slug: 'endustriyel-paspas-90x150' }
    ]
  },
  'aksesuar': {
    name: 'Aksesuar',
    slug: 'aksesuar',
    items: [
      { name: 'Yapıştırıcı Bant', img: 'https://images.unsplash.com/photo-1581166418878-11f0dde922c2?w=300&h=300&fit=crop', slug: 'cim-hali-yapistirici-bant' },
      { name: 'Montaj Kiti', img: 'https://images.unsplash.com/photo-1581147036324-c17ac41f9b7e?w=300&h=300&fit=crop', slug: 'zemin-montaj-kiti' },
      { name: 'Temizleyici 5L', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop', slug: 'pvc-zemin-temizleyici-5l' },
      { name: 'Silikon', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop', slug: 'cim-hali-yapistirici-bant' },
      { name: 'Maket Bıçağı', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=300&fit=crop', slug: 'zemin-montaj-kiti' },
      { name: 'Parlatıcı', img: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=300&h=300&fit=crop', slug: 'pvc-zemin-temizleyici-5l' },
      { name: 'Birleştirici', img: 'https://images.unsplash.com/photo-1600573472550-29c83a7b2d3d?w=300&h=300&fit=crop', slug: 'cim-hali-yapistirici-bant' },
      { name: 'Kenar Bandı', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&h=300&fit=crop', slug: 'cim-hali-yapistirici-bant' }
    ]
  }
};

const categories = [
  { id: 'cim-hali', name: 'Çim Halı', slug: 'cim-hali' },
  { id: 'karo-hali', name: 'Karo Halı', slug: 'karo-hali' },
  { id: 'pvc-zemin', name: 'PVC Zemin', slug: 'pvc-zemin' },
  { id: 'paspas', name: 'Paspas', slug: 'paspas' },
  { id: 'aksesuar', name: 'Aksesuar', slug: 'aksesuar' },
];

const Navbar = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = (slug) => {
    return location.pathname.includes(`/kategori/${slug}`);
  };

  const handleMouseEnter = (categoryId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Route değişince menüleri kapat
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <nav 
      data-testid="navbar"
      className="relative bg-white border-b border-gray-100 sticky top-[100px] md:top-[100px] z-40"
      onMouseLeave={handleMouseLeave}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        {/* BUTONLAR - İÇERİDE PADDING VAR */}
        <div className="px-6 lg:px-16 py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                data-testid={`nav-btn-${category.slug}`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap border
                  ${activeDropdown === category.id || isActive(category.slug)
                    ? 'bg-[#4A7C4E] text-white border-[#4A7C4E]' 
                    : 'bg-white text-[#2C3E2D] hover:bg-gray-50 border-gray-200 hover:shadow-md hover:scale-105'
                  }`}
              >
                {category.name}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === category.id ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* DROPDOWN - TAM GENİŞLİK, HİÇBİR BOŞLUK YOK */}
        {activeDropdown && dropdownData[activeDropdown] && (
          <div 
            data-testid={`dropdown-${activeDropdown}`}
            className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50"
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
          >
            {/* İÇERİK - BURASI PADDING ALIR */}
            <div className="px-6 lg:px-16 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
                {dropdownData[activeDropdown].items.map((item, index) => (
                  <Link 
                    key={index} 
                    to={`/urun/${item.slug}`}
                    className="space-y-3 cursor-pointer group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F8F2]">
                      <img 
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-semibold text-[#2C3E2D] text-sm text-center group-hover:text-[#4A7C4E] transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* Alt Buton */}
              <div className="mt-8 flex justify-center">
                <Link
                  to={`/kategori/${dropdownData[activeDropdown].slug}`}
                  data-testid={`view-all-${activeDropdown}`}
                  className="px-8 py-3 bg-[#4A7C4E] text-white rounded-full font-semibold 
                           hover:bg-[#3A633D] transition-colors flex items-center gap-2"
                >
                  Tüm {dropdownData[activeDropdown].name} Ürünlerini Gör
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            data-testid="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 py-2 text-[#2C3E2D] font-medium"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            Kategoriler
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            data-testid="mobile-nav-menu"
            className="border-t border-gray-100 bg-white"
          >
            {categories.map((category) => (
              <div key={category.id} className="border-b border-gray-50">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === category.id ? null : category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left
                            ${isActive(category.slug) ? 'bg-[#4A7C4E] text-white' : 'text-[#2C3E2D]'}`}
                >
                  <span className="font-medium">{category.name}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform ${activeDropdown === category.id ? 'rotate-180' : ''}`} 
                  />
                </button>

                {/* Mobile Dropdown */}
                {activeDropdown === category.id && dropdownData[category.id] && (
                  <div className="bg-[#F5F8F2] px-4 py-4">
                    <div className="grid grid-cols-3 gap-3">
                      {dropdownData[category.id].items.slice(0, 6).map((item, index) => (
                        <Link
                          key={index}
                          to={`/urun/${item.slug}`}
                          className="space-y-2 group"
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-white">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-xs text-[#2C3E2D] text-center font-medium line-clamp-1">
                            {item.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/kategori/${category.slug}`}
                      className="mt-4 block w-full py-2.5 bg-[#4A7C4E] text-white text-center 
                               rounded-full text-sm font-medium"
                    >
                      Tümünü Gör
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
