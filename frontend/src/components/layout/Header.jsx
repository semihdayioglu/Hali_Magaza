import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Search, 
  Truck, 
  Heart, 
  User, 
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header 
      data-testid="header"
      className="h-auto md:h-[100px] bg-white border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="h-full px-4 md:px-20 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo */}
        <Link 
          to="/" 
          data-testid="logo"
          className="flex items-center gap-2"
        >
          <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">YD</span>
          </div>
          <span className="text-xl font-bold text-[#2C3E2D]">YER DÖŞEME</span>
        </Link>

        {/* Müşteri Hizmetleri - Desktop */}
        <div className="hidden lg:flex items-center gap-3 ml-8">
          <div className="w-10 h-10 bg-[#F5F8F2] rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-[#4A7C4E]" />
          </div>
          <div>
            <p className="text-xs text-[#4A7C4E] font-medium">24 Müşteri Hizmetleri</p>
            <p className="text-base font-bold text-[#2C3E2D]">+90 532 539 84 29</p>
          </div>
        </div>

        {/* Arama Kutusu */}
        <form 
          onSubmit={handleSearch}
          className="w-full md:w-[380px] relative"
        >
          <input
            type="text"
            data-testid="search-input"
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-full border border-[#D4D4D4] bg-white px-6 pr-12 
                     focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent 
                     transition-all text-sm text-[#2C3E2D] placeholder:text-[#999]"
          />
          <button 
            type="submit"
            data-testid="search-button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#4A7C4E] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Sağ Menü İkonları - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/kargo-takip" 
            data-testid="track-order-link"
            className="flex items-center gap-2 text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors"
          >
            <Truck className="w-5 h-5" />
            <span className="text-sm font-medium">Kargo Takip</span>
          </Link>

          <Link 
            to="/favoriler" 
            data-testid="favorites-link"
            className="flex items-center gap-2 text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Favorilerim</span>
            {getFavoritesCount() > 0 && (
              <span 
                data-testid="favorites-count"
                className="absolute -top-2 -right-2 w-5 h-5 bg-[#4A7C4E] text-white text-xs 
                         rounded-full flex items-center justify-center font-medium"
              >
                {getFavoritesCount()}
              </span>
            )}
          </Link>

          <Link 
            to="/hesabim" 
            data-testid="account-link"
            className="flex items-center gap-2 text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Hesabım</span>
          </Link>

          <Link 
            to="/sepet" 
            data-testid="cart-link"
            className="flex items-center gap-2 text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-medium">Sepetim</span>
            {getCartCount() > 0 && (
              <span 
                data-testid="cart-count"
                className="absolute -top-2 -right-2 w-5 h-5 bg-[#4A7C4E] text-white text-xs 
                         rounded-full flex items-center justify-center font-medium"
              >
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          data-testid="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden absolute right-4 top-4"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[#2C3E2D]" />
          ) : (
            <Menu className="w-6 h-6 text-[#2C3E2D]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          data-testid="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 px-4 py-4"
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <Phone className="w-5 h-5 text-[#4A7C4E]" />
            <div>
              <p className="text-xs text-[#4A7C4E]">Müşteri Hizmetleri</p>
              <p className="text-sm font-bold text-[#2C3E2D]">+90 532 539 84 29</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              to="/kargo-takip" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-[#2C3E2D]"
            >
              <Truck className="w-5 h-5" />
              <span>Kargo Takip</span>
            </Link>
            <Link 
              to="/favoriler" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-[#2C3E2D]"
            >
              <Heart className="w-5 h-5" />
              <span>Favorilerim ({getFavoritesCount()})</span>
            </Link>
            <Link 
              to="/hesabim" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-[#2C3E2D]"
            >
              <User className="w-5 h-5" />
              <span>Hesabım</span>
            </Link>
            <Link 
              to="/sepet" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-[#2C3E2D]"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Sepetim ({getCartCount()})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
