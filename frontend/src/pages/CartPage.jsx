import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast.info(`${item.name} sepetten çıkarıldı`);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 1000 ? 0 : 49.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div data-testid="cart-empty" className="container mx-auto px-4 md:px-20 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-[#D4D4D4] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Sepetiniz Boş</h1>
          <p className="text-[#8A9A8B] mb-8">
            Henüz sepetinize ürün eklemediniz. Hemen alışverişe başlayın!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-8 py-4 
                     rounded-full font-medium hover:bg-[#3A633D] transition-all"
          >
            Alışverişe Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="cart-page" className="bg-[#F5F8F2] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-20">
        <h1 className="text-3xl font-bold text-[#2C3E2D] mb-8">Sepetim ({cartItems.length} ürün)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sepet Ürünleri */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="bg-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4"
              >
                {/* Ürün Görseli */}
                <Link to={`/urun/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full md:w-32 h-32 object-cover rounded-xl"
                  />
                </Link>

                {/* Ürün Bilgileri */}
                <div className="flex-1">
                  <Link 
                    to={`/urun/${item.slug}`}
                    className="text-lg font-semibold text-[#2C3E2D] hover:text-[#4A7C4E] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-[#8A9A8B] mt-1">Birim: {item.unit}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    {/* Miktar */}
                    <div className="flex items-center border border-[#D4D4D4] rounded-full">
                      <button
                        data-testid={`decrease-${item.id}`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F8F2] rounded-l-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#2C3E2D]" />
                      </button>
                      <span className="w-10 text-center font-semibold text-[#2C3E2D]">
                        {item.quantity}
                      </span>
                      <button
                        data-testid={`increase-${item.id}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F8F2] rounded-r-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#2C3E2D]" />
                      </button>
                    </div>

                    {/* Fiyat */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#4A7C4E]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-[#8A9A8B]">
                        {formatPrice(item.price)} / {item.unit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sil Butonu */}
                <button
                  data-testid={`remove-${item.id}`}
                  onClick={() => handleRemove(item)}
                  className="self-start p-2 text-[#8A9A8B] hover:text-red-500 hover:bg-red-50 
                           rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {/* Sepeti Temizle */}
            <button
              data-testid="clear-cart"
              onClick={() => {
                clearCart();
                toast.info('Sepet temizlendi');
              }}
              className="text-red-500 hover:text-red-600 font-medium text-sm"
            >
              Sepeti Temizle
            </button>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-[200px]">
              <h2 className="text-xl font-bold text-[#2C3E2D] mb-6">Sipariş Özeti</h2>

              <div className="space-y-4 pb-4 border-b border-[#E8E8E8]">
                <div className="flex justify-between">
                  <span className="text-[#8A9A8B]">Ara Toplam</span>
                  <span className="font-medium text-[#2C3E2D]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A9A8B]">Kargo</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-[#4A7C4E]' : 'text-[#2C3E2D]'}`}>
                    {shipping === 0 ? 'Ücretsiz' : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 1000 && (
                  <p className="text-xs text-[#8A9A8B] bg-[#F5F8F2] p-3 rounded-lg">
                    Ücretsiz kargo için {formatPrice(1000 - subtotal)} daha eklemeniz gerekiyor.
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4">
                <span className="text-lg font-bold text-[#2C3E2D]">Toplam</span>
                <span className="text-lg font-bold text-[#4A7C4E]">{formatPrice(total)}</span>
              </div>

              <Link
                to="/siparis"
                data-testid="checkout-btn"
                className="w-full py-4 bg-[#4A7C4E] text-white rounded-full font-semibold 
                         flex items-center justify-center gap-2 hover:bg-[#3A633D] 
                         transition-all shadow-lg hover:shadow-xl"
              >
                Siparişi Tamamla
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/"
                className="block text-center mt-4 text-[#4A7C4E] font-medium hover:underline"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
