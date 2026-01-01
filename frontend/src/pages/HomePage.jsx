import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories, getFeaturedProducts, products } from '../data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const latestProducts = products.slice(0, 8);

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section 
        data-testid="hero-section"
        className="relative bg-gradient-to-b from-[#F5F8F2] to-white"
      >
        <div className="container mx-auto px-4 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px] py-12 lg:py-0">
            {/* Sol İçerik */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h1 
                className="font-['Caveat',cursive] text-4xl sm:text-5xl lg:text-6xl text-[#2C3E2D] mb-2"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Bahçenize Tazelik
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-semibold text-[#2C3E2D] leading-tight mb-6">
                Evinize Şıklık Katın
              </h2>
              <p className="text-[#5C6B5D] mb-8 text-lg max-w-md">
                Türkiye'nin en kaliteli çim halı, karo halı, PVC zemin ve paspas çeşitleri 
                ile yaşam alanlarınızı yenileyin.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/kategori/cim-hali"
                  data-testid="hero-cta-primary"
                  className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-8 py-4 
                           rounded-full font-medium hover:bg-[#3A633D] transition-all duration-300
                           shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Hemen Keşfet
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/kategori/pvc-zemin"
                  data-testid="hero-cta-secondary"
                  className="inline-flex items-center gap-2 border-2 border-[#4A7C4E] text-[#4A7C4E] 
                           px-8 py-4 rounded-full font-medium hover:bg-[#4A7C4E] hover:text-white 
                           transition-all duration-300"
                >
                  PVC Zemin
                </Link>
              </div>
            </div>

            {/* Sağ Görsel - Tetris Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 py-8">
              {/* Ana Görsel */}
              <div className="col-span-2 md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800"
                  alt="Çim Halı"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium opacity-80">En Çok Satan</p>
                  <p className="text-xl font-bold">Çim Halı</p>
                </div>
              </div>

              {/* Ücretsiz Kargo Kartı */}
              <div className="bg-[#C8D96F] rounded-2xl p-6 flex flex-col justify-center">
                <Truck className="w-10 h-10 text-[#2C3E2D] mb-3" />
                <p className="text-[#2C3E2D] font-bold text-lg">Ücretsiz Kargo</p>
                <p className="text-[#2C3E2D]/70 text-sm">1000 ₺ ve üzeri alışverişlerde</p>
              </div>

              {/* Küçük Görsel */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=600"
                  alt="PVC Zemin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium opacity-80">Yeni Koleksiyon</p>
                  <p className="text-lg font-bold">PVC Zemin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel İndikatörler */}
        <div className="flex justify-center gap-3 pb-8">
          <span className="w-3 h-3 rounded-full bg-[#4A7C4E]"></span>
          <span className="w-3 h-3 rounded-full bg-[#D4D4D4]"></span>
          <span className="w-3 h-3 rounded-full bg-[#D4D4D4]"></span>
        </div>
      </section>

      {/* Özellikler Bandı */}
      <section className="bg-white py-8 border-y border-[#E8E8E8]">
        <div className="container mx-auto px-4 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-14 h-14 bg-[#F5F8F2] rounded-full flex items-center justify-center">
                <Truck className="w-7 h-7 text-[#4A7C4E]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C3E2D]">Hızlı Teslimat</p>
                <p className="text-sm text-[#8A9A8B]">2-4 iş günü içinde</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="w-14 h-14 bg-[#F5F8F2] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#4A7C4E]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C3E2D]">Kalite Garantisi</p>
                <p className="text-sm text-[#8A9A8B]">10 yıla kadar garanti</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="w-14 h-14 bg-[#F5F8F2] rounded-full flex items-center justify-center">
                <Clock className="w-7 h-7 text-[#4A7C4E]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C3E2D]">7/24 Destek</p>
                <p className="text-sm text-[#8A9A8B]">Her zaman yanınızdayız</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section 
        data-testid="categories-section"
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E2D]">Kategoriler</h2>
              <p className="text-[#8A9A8B] mt-2">İhtiyacınıza uygun ürünleri keşfedin</p>
            </div>
            <Link 
              to="/kategoriler"
              className="hidden md:flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                data-testid={`category-card-${category.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/70 text-sm line-clamp-1">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Çok Satan Ürünler */}
      <section 
        data-testid="featured-products-section"
        className="py-16 bg-[#F5F8F2]"
      >
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E2D]">Çok Satan Ürünler</h2>
              <p className="text-[#8A9A8B] mt-2">Müşterilerimizin favorileri</p>
            </div>
            <Link 
              to="/urunler"
              className="hidden md:flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tüm Ürünler */}
      <section 
        data-testid="all-products-section"
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 md:px-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E2D]">Tüm Ürünler</h2>
              <p className="text-[#8A9A8B] mt-2">En yeni ürünlerimizi keşfedin</p>
            </div>
            <Link 
              to="/urunler"
              className="hidden md:flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#4A7C4E]">
        <div className="container mx-auto px-4 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Profesyonel Destek Alın
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Yer döşeme konusunda uzman ekibimizden ücretsiz danışmanlık alın. 
            Projenize en uygun ürünleri birlikte belirleyelim.
          </p>
          <a
            href="https://wa.me/905325398429?text=Merhaba,%20yer%20döşeme%20ürünleri%20hakkında%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-cta"
            className="inline-flex items-center gap-2 bg-white text-[#4A7C4E] px-8 py-4 
                     rounded-full font-semibold hover:bg-[#F5F8F2] transition-all duration-300
                     shadow-lg hover:shadow-xl"
          >
            WhatsApp ile İletişime Geç
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
