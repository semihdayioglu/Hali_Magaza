import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

// Kategori verileri - Her kategorinin alt ürün grupları
const categoryData = {
  'cim-hali': {
    id: 'cim-hali',
    name: 'Çim Halı',
    slug: 'cim-hali',
    items: [
      {
        title: 'Premium Çim Halı',
        image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300',
        links: [
          { name: '35mm Premium', slug: 'premium-cim-hali-35mm' },
          { name: '50mm Profesyonel', slug: 'futbol-sahasi-cim-hali-50mm' },
          { name: 'UV Dayanımlı', slug: 'premium-cim-hali-35mm' }
        ]
      },
      {
        title: 'Bahçe Çim Halı',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300',
        links: [
          { name: '25mm Ekonomik', slug: 'bahce-cim-hali-25mm' },
          { name: 'Balkon İçin', slug: 'bahce-cim-hali-25mm' },
          { name: 'Teras İçin', slug: 'bahce-cim-hali-25mm' }
        ]
      },
      {
        title: 'Dekoratif Çim',
        image: 'https://images.unsplash.com/photo-1703432043433-3bb86c844968?w=300',
        links: [
          { name: '20mm İnce', slug: 'dekoratif-cim-hali-20mm' },
          { name: 'İç Mekan', slug: 'dekoratif-cim-hali-20mm' },
          { name: 'Duvar Kaplama', slug: 'dekoratif-cim-hali-20mm' }
        ]
      },
      {
        title: 'Spor Sahası',
        image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=300',
        links: [
          { name: 'Futbol Sahası', slug: 'futbol-sahasi-cim-hali-50mm' },
          { name: 'Tenis Kortu', slug: 'futbol-sahasi-cim-hali-50mm' },
          { name: 'Çocuk Parkı', slug: 'premium-cim-hali-35mm' }
        ]
      }
    ]
  },
  'karo-hali': {
    id: 'karo-hali',
    name: 'Karo Halı',
    slug: 'karo-hali',
    items: [
      {
        title: 'Ofis Karo Halı',
        image: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=300',
        links: [
          { name: 'Antrasit 50x50', slug: 'ofis-karo-hali-antrasit' },
          { name: 'Gri Tonları', slug: 'premium-karo-hali-gri' },
          { name: 'Ses Yalıtımlı', slug: 'ofis-karo-hali-antrasit' }
        ]
      },
      {
        title: 'Ev Tipi Karo',
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=300',
        links: [
          { name: 'Bej Tonları', slug: 'ev-tipi-karo-hali-bej' },
          { name: 'Yumuşak Doku', slug: 'ev-tipi-karo-hali-bej' },
          { name: 'Leke Tutmaz', slug: 'ev-tipi-karo-hali-bej' }
        ]
      },
      {
        title: 'Premium Karo',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        links: [
          { name: 'Premium Gri', slug: 'premium-karo-hali-gri' },
          { name: 'Yüksek Trafik', slug: 'premium-karo-hali-gri' },
          { name: 'Modern Tasarım', slug: 'premium-karo-hali-gri' }
        ]
      },
      {
        title: 'Endüstriyel',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300',
        links: [
          { name: 'Fabrika İçin', slug: 'ofis-karo-hali-antrasit' },
          { name: 'Depo İçin', slug: 'ofis-karo-hali-antrasit' },
          { name: 'Showroom', slug: 'premium-karo-hali-gri' }
        ]
      }
    ]
  },
  'pvc-zemin': {
    id: 'pvc-zemin',
    name: 'PVC Zemin',
    slug: 'pvc-zemin',
    items: [
      {
        title: 'Ahşap Desenli',
        image: 'https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=300',
        links: [
          { name: 'Meşe Desen', slug: 'ahsap-desenli-pvc-zemin' },
          { name: 'Ceviz Desen', slug: 'ahsap-desenli-pvc-zemin' },
          { name: 'Kayın Desen', slug: 'ahsap-desenli-pvc-zemin' }
        ]
      },
      {
        title: 'Taş Desenli',
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300',
        links: [
          { name: 'Mermer Görünüm', slug: 'tas-desenli-pvc-zemin' },
          { name: 'Granit Desen', slug: 'tas-desenli-pvc-zemin' },
          { name: 'Traverten', slug: 'tas-desenli-pvc-zemin' }
        ]
      },
      {
        title: 'Spor Salonu',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300',
        links: [
          { name: 'Darbe Emici', slug: 'spor-salonu-pvc-zemin' },
          { name: 'Kaymaz Yüzey', slug: 'spor-salonu-pvc-zemin' },
          { name: 'Profesyonel', slug: 'spor-salonu-pvc-zemin' }
        ]
      },
      {
        title: 'Mutfak & Banyo',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300',
        links: [
          { name: 'Su Geçirmez', slug: 'tas-desenli-pvc-zemin' },
          { name: 'Hijyenik', slug: 'tas-desenli-pvc-zemin' },
          { name: 'Kolay Temizlik', slug: 'tas-desenli-pvc-zemin' }
        ]
      }
    ]
  },
  'paspas': {
    id: 'paspas',
    name: 'Paspas',
    slug: 'paspas',
    items: [
      {
        title: 'Kapı Önü',
        image: 'https://images.unsplash.com/photo-1681258356422-e9d9531deb63?w=300',
        links: [
          { name: 'Kauçuk 60x90', slug: 'kaucuk-paspas-60x90' },
          { name: 'Toz Tutucu', slug: 'kaucuk-paspas-60x90' },
          { name: 'Kaymaz Taban', slug: 'kaucuk-paspas-60x90' }
        ]
      },
      {
        title: 'Dekoratif',
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=300',
        links: [
          { name: 'Şık Tasarım', slug: 'dekoratif-kapi-paspasi' },
          { name: 'Renkli', slug: 'dekoratif-kapi-paspasi' },
          { name: 'Yazılı', slug: 'dekoratif-kapi-paspasi' }
        ]
      },
      {
        title: 'Endüstriyel',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
        links: [
          { name: '90x150 Büyük', slug: 'endustriyel-paspas-90x150' },
          { name: 'Ağır Hizmet', slug: 'endustriyel-paspas-90x150' },
          { name: 'Fabrika Girişi', slug: 'endustriyel-paspas-90x150' }
        ]
      },
      {
        title: 'Banyo Paspası',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300',
        links: [
          { name: 'Emici', slug: 'dekoratif-kapi-paspasi' },
          { name: 'Antibakteriyel', slug: 'dekoratif-kapi-paspasi' },
          { name: 'Yumuşak', slug: 'dekoratif-kapi-paspasi' }
        ]
      }
    ]
  },
  'aksesuar': {
    id: 'aksesuar',
    name: 'Aksesuar',
    slug: 'aksesuar',
    items: [
      {
        title: 'Yapıştırıcılar',
        image: 'https://images.unsplash.com/photo-1581166418878-11f0dde922c2?w=300',
        links: [
          { name: 'Bant 10m', slug: 'cim-hali-yapistirici-bant' },
          { name: 'Silikon', slug: 'cim-hali-yapistirici-bant' },
          { name: 'Tutkal', slug: 'cim-hali-yapistirici-bant' }
        ]
      },
      {
        title: 'Montaj Araçları',
        image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f9b7e?w=300',
        links: [
          { name: 'Montaj Kiti', slug: 'zemin-montaj-kiti' },
          { name: 'Maket Bıçağı', slug: 'zemin-montaj-kiti' },
          { name: 'Cetvel', slug: 'zemin-montaj-kiti' }
        ]
      },
      {
        title: 'Temizlik',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300',
        links: [
          { name: 'Temizleyici 5L', slug: 'pvc-zemin-temizleyici-5l' },
          { name: 'Parlatıcı', slug: 'pvc-zemin-temizleyici-5l' },
          { name: 'Leke Çıkarıcı', slug: 'pvc-zemin-temizleyici-5l' }
        ]
      },
      {
        title: 'Yedek Parça',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300',
        links: [
          { name: 'Birleştirici', slug: 'cim-hali-yapistirici-bant' },
          { name: 'Kenar Bandı', slug: 'cim-hali-yapistirici-bant' },
          { name: 'Çivi & Vida', slug: 'zemin-montaj-kiti' }
        ]
      }
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
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Mobil menüyü kapat route değişince
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <nav 
      data-testid="navbar"
      className="bg-white border-b border-gray-100 sticky top-[100px] md:top-[100px] z-40"
    >
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3 px-6 lg:px-16 py-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Kategori Butonu */}
              <button
                data-testid={`nav-btn-${category.slug}`}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer 
                          flex items-center gap-2 border
                          ${isActive(category.slug) || activeDropdown === category.id
                            ? 'bg-[#4A7C4E] text-white border-[#4A7C4E] ring-2 ring-[#4A7C4E]/30'
                            : 'bg-white text-[#2C3E2D] border-gray-200 hover:shadow-md hover:scale-105'
                          }`}
              >
                {category.name}
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 
                            ${activeDropdown === category.id ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === category.id && categoryData[category.id] && (
                <div 
                  data-testid={`dropdown-${category.slug}`}
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl p-8 
                           w-[900px] z-50 border border-gray-100
                           animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Grid İçerik */}
                  <div className="grid grid-cols-4 gap-8">
                    {categoryData[category.id].items.map((item, index) => (
                      <div key={index} className="space-y-3">
                        {/* Görsel */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F5F8F2]">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Başlık */}
                        <h3 className="font-semibold text-[#2C3E2D] text-center">
                          {item.title}
                        </h3>
                        
                        {/* Alt Linkler */}
                        <div className="space-y-1">
                          {item.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={`/urun/${link.slug}`}
                              className="block text-sm text-gray-600 hover:text-[#4A7C4E] 
                                       transition-colors text-center"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Alt Buton */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link
                      to={`/kategori/${category.slug}`}
                      data-testid={`view-all-${category.slug}`}
                      className="w-full py-3 bg-[#4A7C4E] text-white rounded-full font-semibold 
                               hover:bg-[#3A633D] transition-colors flex items-center justify-center gap-2"
                    >
                      Tüm {category.name} Ürünlerini Gör
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
                {activeDropdown === category.id && categoryData[category.id] && (
                  <div className="bg-[#F5F8F2] px-4 py-3">
                    <div className="grid grid-cols-2 gap-4">
                      {categoryData[category.id].items.map((item, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-[#2C3E2D] text-sm mb-2">{item.title}</h4>
                          <div className="space-y-1">
                            {item.links.slice(0, 2).map((link, linkIndex) => (
                              <Link
                                key={linkIndex}
                                to={`/urun/${link.slug}`}
                                className="block text-xs text-gray-600 hover:text-[#4A7C4E]"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/kategori/${category.slug}`}
                      className="mt-3 block w-full py-2 bg-[#4A7C4E] text-white text-center 
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
