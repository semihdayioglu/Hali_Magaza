import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { categories } from '../../data/products';

const Navbar = () => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isActive = (slug) => {
    return location.pathname === `/kategori/${slug}`;
  };

  return (
    <nav 
      data-testid="navbar"
      className="h-auto md:h-[56px] bg-white border-b border-[#E8E8E8]"
    >
      <div className="h-full px-4 md:px-20 flex items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setActiveDropdown(category.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={`/kategori/${category.slug}`}
                data-testid={`nav-${category.slug}`}
                className={`flex items-center gap-1.5 px-5 py-3 rounded-full text-[15px] font-semibold
                          transition-all duration-300 ${
                            isActive(category.slug)
                              ? 'bg-[#4A7C4E] text-white'
                              : 'text-[#2C3E2D] hover:bg-[#F5F8F2] hover:text-[#4A7C4E]'
                          }`}
              >
                {category.name}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                  activeDropdown === category.id ? 'rotate-180' : ''
                }`} />
              </Link>

              {/* Dropdown Menu */}
              {activeDropdown === category.id && (
                <div 
                  data-testid={`dropdown-${category.slug}`}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl 
                           shadow-lg border border-[#E8E8E8] py-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-4 py-2 border-b border-[#E8E8E8]">
                    <p className="text-xs text-[#8A9A8B] uppercase tracking-wider">Alt Kategoriler</p>
                  </div>
                  <Link
                    to={`/kategori/${category.slug}`}
                    className="block px-4 py-2.5 text-sm text-[#2C3E2D] hover:bg-[#F5F8F2] 
                             hover:text-[#4A7C4E] transition-colors"
                  >
                    Tümünü Gör
                  </Link>
                  <Link
                    to={`/kategori/${category.slug}?sort=popular`}
                    className="block px-4 py-2.5 text-sm text-[#2C3E2D] hover:bg-[#F5F8F2] 
                             hover:text-[#4A7C4E] transition-colors"
                  >
                    En Popüler
                  </Link>
                  <Link
                    to={`/kategori/${category.slug}?sort=new`}
                    className="block px-4 py-2.5 text-sm text-[#2C3E2D] hover:bg-[#F5F8F2] 
                             hover:text-[#4A7C4E] transition-colors"
                  >
                    En Yeni
                  </Link>
                  <Link
                    to={`/kategori/${category.slug}?sort=price-asc`}
                    className="block px-4 py-2.5 text-sm text-[#2C3E2D] hover:bg-[#F5F8F2] 
                             hover:text-[#4A7C4E] transition-colors"
                  >
                    Fiyata Göre (Artan)
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          data-testid="mobile-nav-toggle"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="md:hidden flex items-center gap-2 py-3 text-[#2C3E2D]"
        >
          {mobileNavOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
          <span className="font-medium">Kategoriler</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div 
          data-testid="mobile-nav-menu"
          className="md:hidden bg-white border-t border-[#E8E8E8] px-4 py-2"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/kategori/${category.slug}`}
              onClick={() => setMobileNavOpen(false)}
              className={`block py-3 px-4 rounded-lg text-[15px] font-medium
                        transition-colors ${
                          isActive(category.slug)
                            ? 'bg-[#4A7C4E] text-white'
                            : 'text-[#2C3E2D] hover:bg-[#F5F8F2]'
                        }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
