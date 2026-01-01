import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { getProductBySlug, getCategoryBySlug, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-20 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Ürün Bulunamadı</h1>
        <p className="text-[#8A9A8B] mb-8">Aradığınız ürün mevcut değil.</p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-6 py-3 rounded-full font-medium"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const category = getCategoryBySlug(product.categoryId);
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    if (isFavorite(product.id)) {
      toast.info(`${product.name} favorilerden çıkarıldı`);
    } else {
      toast.success(`${product.name} favorilere eklendi!`);
    }
  };

  return (
    <div data-testid="product-detail-page" className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#F5F8F2] py-4">
        <div className="container mx-auto px-4 md:px-20">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-[#8A9A8B] hover:text-[#4A7C4E] transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
            {category && (
              <>
                <Link 
                  to={`/kategori/${category.slug}`} 
                  className="text-[#8A9A8B] hover:text-[#4A7C4E] transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
              </>
            )}
            <span className="text-[#2C3E2D] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Görsel Galerisi */}
          <div className="space-y-4">
            {/* Ana Görsel */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F8F2]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                data-testid="product-main-image"
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#4A7C4E] text-white text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    %{discountPercent} İndirim
                  </span>
                )}
              </div>
            </div>

            {/* Küçük Görseller */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    data-testid={`product-thumbnail-${index}`}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-[#4A7C4E]'
                        : 'border-transparent hover:border-[#D4D4D4]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-[#D4D4D4]'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[#2C3E2D]">{product.rating}</span>
              <span className="text-sm text-[#8A9A8B]">({product.reviews} değerlendirme)</span>
            </div>

            {/* Başlık */}
            <h1 
              data-testid="product-title"
              className="text-2xl md:text-3xl font-bold text-[#2C3E2D]"
            >
              {product.name}
            </h1>

            {/* Fiyat */}
            <div className="flex items-end gap-3">
              <span 
                data-testid="product-price"
                className="text-3xl font-bold text-[#4A7C4E]"
              >
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-[#8A9A8B] line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-[#8A9A8B]">/ {product.unit}</span>
            </div>

            {/* Açıklama */}
            <p className="text-[#5C6B5D] leading-relaxed">{product.description}</p>

            {/* Özellikler */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#4A7C4E]" />
                  <span className="text-sm text-[#2C3E2D]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stok Durumu */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm font-medium text-[#2C3E2D]">
                {product.stock > 0 ? `Stokta (${product.stock} adet)` : 'Stokta Yok'}
              </span>
            </div>

            {/* Miktar ve Sepete Ekle */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Miktar Seçici */}
              <div className="flex items-center border border-[#D4D4D4] rounded-full">
                <button
                  data-testid="quantity-decrease"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F5F8F2] rounded-l-full transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#2C3E2D]" />
                </button>
                <span 
                  data-testid="quantity-value"
                  className="w-12 text-center font-semibold text-[#2C3E2D]"
                >
                  {quantity}
                </span>
                <button
                  data-testid="quantity-increase"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F5F8F2] rounded-r-full transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#2C3E2D]" />
                </button>
              </div>

              {/* Sepete Ekle Butonu */}
              <button
                data-testid="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isInCart(product.id)}
                className={`flex-1 py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 
                          transition-all duration-300 ${
                            isInCart(product.id)
                              ? 'bg-[#C8D96F] text-[#2C3E2D]'
                              : product.stock === 0
                                ? 'bg-[#D4D4D4] text-[#8A9A8B] cursor-not-allowed'
                                : 'bg-[#4A7C4E] text-white hover:bg-[#3A633D] shadow-lg hover:shadow-xl'
                          }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart(product.id) ? 'Sepette' : 'Sepete Ekle'}
              </button>

              {/* Favori Butonu */}
              <button
                data-testid="add-to-favorites-btn"
                onClick={handleToggleFavorite}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  isFavorite(product.id)
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-[#D4D4D4] text-[#2C3E2D] hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Özellik Kartları */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E8E8]">
              <div className="text-center p-4 bg-[#F5F8F2] rounded-xl">
                <Truck className="w-6 h-6 text-[#4A7C4E] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#2C3E2D]">Ücretsiz Kargo</p>
                <p className="text-xs text-[#8A9A8B]">1000 ₺ üzeri</p>
              </div>
              <div className="text-center p-4 bg-[#F5F8F2] rounded-xl">
                <ShieldCheck className="w-6 h-6 text-[#4A7C4E] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#2C3E2D]">Garanti</p>
                <p className="text-xs text-[#8A9A8B]">10 yıla kadar</p>
              </div>
              <div className="text-center p-4 bg-[#F5F8F2] rounded-xl">
                <RotateCcw className="w-6 h-6 text-[#4A7C4E] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#2C3E2D]">Kolay İade</p>
                <p className="text-xs text-[#8A9A8B]">14 gün</p>
              </div>
            </div>
          </div>
        </div>

        {/* İlgili Ürünler */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-[#E8E8E8]">
            <h2 className="text-2xl font-bold text-[#2C3E2D] mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
