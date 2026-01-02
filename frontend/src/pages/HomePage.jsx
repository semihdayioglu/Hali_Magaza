import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { categories, getFeaturedProducts, products } from '../data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const latestProducts = products.slice(0, 8);

  return (
    <div data-testid="home-page">
      {/* Hero Slider */}
      <HeroSlider />

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
