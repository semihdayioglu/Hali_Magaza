import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, User, Mail, Phone, MapPin, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const OrderPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 1000 ? 0 : 49.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Ad Soyad gerekli';
    if (!formData.email.trim()) newErrors.email = 'E-posta gerekli';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta girin';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon gerekli';
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Geçerli bir telefon girin';
    if (!formData.city.trim()) newErrors.city = 'İl gerekli';
    if (!formData.district.trim()) newErrors.district = 'İlçe gerekli';
    if (!formData.address.trim()) newErrors.address = 'Adres gerekli';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const productList = cartItems.map(item => 
      `• ${item.name} x ${item.quantity} ${item.unit} = ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    return encodeURIComponent(
`🛒 YENİ SİPARİŞ

📦 ÜRÜNLER:
${productList}

💰 TOPLAM: ${formatPrice(total)}
${shipping === 0 ? '🚚 Ücretsiz Kargo' : `🚚 Kargo: ${formatPrice(shipping)}`}

👤 MÜŞTERİ BİLGİLERİ:
Ad Soyad: ${formData.fullName}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Adres: ${formData.address}, ${formData.district}/${formData.city}
${formData.notes ? `📝 Not: ${formData.notes}` : ''}
`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Sepetiniz boş');
      navigate('/sepet');
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Open WhatsApp with order details
    const whatsappUrl = `https://wa.me/905325398429?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');

    setOrderComplete(true);
    clearCart();
    toast.success('Siparişiniz alındı! WhatsApp ile iletişime geçilecek.');
    
    setIsSubmitting(false);
  };

  if (orderComplete) {
    return (
      <div data-testid="order-complete" className="container mx-auto px-4 md:px-20 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#4A7C4E] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Siparişiniz Alındı!</h1>
          <p className="text-[#8A9A8B] mb-8">
            WhatsApp üzerinden sizinle en kısa sürede iletişime geçeceğiz. 
            Teşekkür ederiz!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-8 py-4 
                     rounded-full font-medium hover:bg-[#3A633D] transition-all"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-20 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Sepetiniz Boş</h1>
        <p className="text-[#8A9A8B] mb-8">Sipariş vermek için önce sepetinize ürün ekleyin.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-6 py-3 rounded-full font-medium"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="order-page" className="bg-[#F5F8F2] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 md:px-20">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#8A9A8B] hover:text-[#4A7C4E]">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
            <Link to="/sepet" className="text-[#8A9A8B] hover:text-[#4A7C4E]">Sepet</Link>
            <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
            <span className="text-[#2C3E2D] font-medium">Sipariş</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-8">
        <h1 className="text-3xl font-bold text-[#2C3E2D] mb-8">Sipariş Bilgileri</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Teslimat Bilgileri */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#2C3E2D] mb-6">Teslimat Adresi</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ad Soyad */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9A8B]" />
                      <input
                        type="text"
                        name="fullName"
                        data-testid="input-fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Adınız Soyadınız"
                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                          errors.fullName ? 'border-red-500' : 'border-[#D4D4D4]'
                        } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* E-posta */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      E-posta *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9A8B]" />
                      <input
                        type="email"
                        name="email"
                        data-testid="input-email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@email.com"
                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-[#D4D4D4]'
                        } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Telefon */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      Telefon *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9A8B]" />
                      <input
                        type="tel"
                        name="phone"
                        data-testid="input-phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="5XX XXX XX XX"
                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                          errors.phone ? 'border-red-500' : 'border-[#D4D4D4]'
                        } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* İl */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      İl *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9A8B]" />
                      <input
                        type="text"
                        name="city"
                        data-testid="input-city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="İstanbul"
                        className={`w-full h-12 pl-12 pr-4 rounded-xl border ${
                          errors.city ? 'border-red-500' : 'border-[#D4D4D4]'
                        } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all`}
                      />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  {/* İlçe */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      İlçe *
                    </label>
                    <input
                      type="text"
                      name="district"
                      data-testid="input-district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Kadıköy"
                      className={`w-full h-12 px-4 rounded-xl border ${
                        errors.district ? 'border-red-500' : 'border-[#D4D4D4]'
                      } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all`}
                    />
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>

                  {/* Adres */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      Açık Adres *
                    </label>
                    <textarea
                      name="address"
                      data-testid="input-address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Mahalle, sokak, bina no, daire no..."
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.address ? 'border-red-500' : 'border-[#D4D4D4]'
                      } focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all resize-none`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* Sipariş Notu */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
                      Sipariş Notu (Opsiyonel)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#8A9A8B]" />
                      <textarea
                        name="notes"
                        data-testid="input-notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Siparişinizle ilgili eklemek istediğiniz notlar..."
                        rows={3}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#D4D4D4] 
                                 focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-[200px]">
                <h2 className="text-xl font-bold text-[#2C3E2D] mb-6">Sipariş Özeti</h2>

                {/* Ürünler */}
                <div className="space-y-4 pb-4 border-b border-[#E8E8E8] max-h-[300px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2C3E2D] line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[#8A9A8B]">{item.quantity} x {formatPrice(item.price)}</p>
                        <p className="text-sm font-semibold text-[#4A7C4E]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fiyat Detayları */}
                <div className="space-y-3 py-4 border-b border-[#E8E8E8]">
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
                </div>

                <div className="flex justify-between py-4">
                  <span className="text-lg font-bold text-[#2C3E2D]">Toplam</span>
                  <span className="text-lg font-bold text-[#4A7C4E]">{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  data-testid="submit-order"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#4A7C4E] text-white rounded-full font-semibold 
                           flex items-center justify-center gap-2 hover:bg-[#3A633D] 
                           transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      WhatsApp ile Sipariş Ver
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-[#8A9A8B] text-center mt-4">
                  Siparişiniz WhatsApp üzerinden onaylanacaktır.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
