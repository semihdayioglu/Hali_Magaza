import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    if (isFavorite(product.id)) {
      toast.info(`${product.name} favorilerden çıkarıldı`);
    } else {
      toast.success(`${product.name} favorilere eklendi!`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <Link 
      to={`/urun/${product.slug}`}
      data-testid={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden 
                hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Görsel Alanı */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F8F2]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span 
              data-testid={`badge-${product.id}`}
              className="px-3 py-1 bg-[#4A7C4E] text-white text-xs font-semibold rounded-full"
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              %{discountPercent} İndirim
            </span>
          )}
        </div>

        {/* Favori Butonu */}
        <button
          data-testid={`favorite-btn-${product.id}`}
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 ${
                      isFavorite(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-[#2C3E2D] hover:bg-white hover:text-red-500'
                    }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
        </button>

        {/* Sepete Ekle Butonu - Hover'da görünür */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            data-testid={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
            className={`w-full py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2
                      transition-all duration-300 ${
                        isInCart(product.id)
                          ? 'bg-[#C8D96F] text-[#2C3E2D]'
                          : 'bg-[#4A7C4E] text-white hover:bg-[#3A633D]'
                      }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart(product.id) ? 'Sepette' : 'Sepete Ekle'}
          </button>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-[#2C3E2D]">{product.rating}</span>
          <span className="text-sm text-[#8A9A8B]">({product.reviews} değerlendirme)</span>
        </div>

        {/* Ürün Adı */}
        <h3 className="font-semibold text-[#2C3E2D] mb-2 line-clamp-2 group-hover:text-[#4A7C4E] transition-colors">
          {product.name}
        </h3>

        {/* Fiyat */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#4A7C4E]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-[#8A9A8B] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-xs text-[#8A9A8B]">/ {product.unit}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
