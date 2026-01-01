import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleRemove = (product) => {
    removeFromFavorites(product.id);
    toast.info(`${product.name} favorilerden çıkarıldı`);
  };

  if (favorites.length === 0) {
    return (
      <div data-testid="favorites-empty" className="container mx-auto px-4 md:px-20 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="w-24 h-24 text-[#D4D4D4] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Favorileriniz Boş</h1>
          <p className="text-[#8A9A8B] mb-8">
            Henüz favori ürün eklemediniz. Beğendiğiniz ürünleri favorilere ekleyin!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-8 py-4 
                     rounded-full font-medium hover:bg-[#3A633D] transition-all"
          >
            Ürünleri Keşfet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="favorites-page" className="bg-[#F5F8F2] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E2D]">Favorilerim ({favorites.length} ürün)</h1>
          <button
            data-testid="clear-favorites"
            onClick={() => {
              clearFavorites();
              toast.info('Favoriler temizlendi');
            }}
            className="text-red-500 hover:text-red-600 font-medium text-sm"
          >
            Tümünü Temizle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              data-testid={`favorite-item-${product.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Görsel */}
              <Link to={`/urun/${product.slug}`} className="relative block aspect-square">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#4A7C4E] text-white text-xs font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
              </Link>

              {/* İçerik */}
              <div className="p-4">
                <Link 
                  to={`/urun/${product.slug}`}
                  className="font-semibold text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-[#4A7C4E]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#8A9A8B] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Butonlar */}
                <div className="flex gap-2 mt-4">
                  <button
                    data-testid={`add-to-cart-fav-${product.id}`}
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`flex-1 py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2
                              transition-colors ${
                                isInCart(product.id)
                                  ? 'bg-[#C8D96F] text-[#2C3E2D]'
                                  : 'bg-[#4A7C4E] text-white hover:bg-[#3A633D]'
                              }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart(product.id) ? 'Sepette' : 'Sepete Ekle'}
                  </button>
                  <button
                    data-testid={`remove-fav-${product.id}`}
                    onClick={() => handleRemove(product)}
                    className="p-2.5 border border-[#D4D4D4] rounded-full text-[#8A9A8B] 
                             hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
