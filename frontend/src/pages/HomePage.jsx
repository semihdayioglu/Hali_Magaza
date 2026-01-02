import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import BlogSection from '../components/BlogSection';
import Newsletter from '../components/Newsletter';
import WhyDifferent from '../components/WhyDifferent';
import { categories, getFeaturedProducts, products } from '../data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const latestProducts = products.slice(0, 8);

  return (
    <div data-testid="home-page">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Kategoriler - Blog Stili Başlık + Büyük Kartlar */}
      <section 
        data-testid="categories-section"
        className="py-12 lg:py-16 bg-white"
      >
        <div className="px-6 lg:px-16">
          {/* BAŞLIK - BLOG STİLİNDE */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              {/* Yaprak Logo */}
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#22C55E" transform="rotate(0 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#22C55E" transform="rotate(45 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#22C55E" transform="rotate(90 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#22C55E" transform="rotate(135 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#16A34A" transform="rotate(180 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#16A34A" transform="rotate(225 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#16A34A" transform="rotate(270 32 32)" />
                  <ellipse cx="32" cy="12" rx="4" ry="8" fill="#16A34A" transform="rotate(315 32 32)" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  İhtiyacınıza uygun ürünleri keşfedin
                  <span className="inline-block w-8 h-0.5 bg-[#4A7C4E] ml-2 align-middle"></span>
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]" style={{ fontFamily: "'Caveat', cursive" }}>
                  Kategoriler
                </h2>
              </div>
            </div>
          </div>

          {/* GRID - 2 YAN YANA, BÜYÜK KARTLAR (400x280px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/kategori/${category.slug}`}
                data-testid={`category-card-${category.slug}`}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all h-[280px]"
              >
                {/* GÖRSEL */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* OVERLAY + İSİM */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white font-bold text-2xl">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Çok Satan Ürünler */}
      <section 
        data-testid="featured-products-section"
        className="py-12 lg:py-16 bg-[#F5F8F2]"
      >
        <div className="px-6 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]">Çok Satan Ürünler</h2>
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
        className="py-12 lg:py-16 bg-white"
      >
        <div className="px-6 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]">Tüm Ürünler</h2>
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

      {/* Blog Section */}
      <BlogSection />

      {/* E-Bülten */}
      <Newsletter />

      {/* Neden Farklıyız */}
      <WhyDifferent />
    </div>
  );
};

export default HomePage;
