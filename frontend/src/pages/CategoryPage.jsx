import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getCategoryBySlug, getProductsByCategory, categories } from '../data/products';

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const category = getCategoryBySlug(slug);
  const allCategoryProducts = getProductsByCategory(slug);

  // Sorting
  const sortOption = searchParams.get('sort') || 'default';
  
  const sortedProducts = useMemo(() => {
    const products = [...allCategoryProducts];
    
    switch (sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'popular':
        return products.sort((a, b) => b.reviews - a.reviews);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'new':
        return products.filter(p => p.badge === 'Yeni').concat(products.filter(p => p.badge !== 'Yeni'));
      default:
        return products;
    }
  }, [allCategoryProducts, sortOption]);

  const handleSortChange = (value) => {
    if (value === 'default') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }
    setSearchParams(searchParams);
  };

  if (!category) {
    return (
      <div className="container mx-auto px-4 md:px-20 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Kategori Bulunamadı</h1>
        <p className="text-[#8A9A8B] mb-8">Aradığınız kategori mevcut değil.</p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-6 py-3 rounded-full font-medium"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="category-page" className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#F5F8F2] py-4">
        <div className="container mx-auto px-4 md:px-20">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#8A9A8B] hover:text-[#4A7C4E] transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
            <span className="text-[#2C3E2D] font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="relative h-[200px] md:h-[280px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 
              data-testid="category-title"
              className="text-4xl md:text-5xl font-bold mb-2"
            >
              {category.name}
            </h1>
            <p className="text-white/80 max-w-md mx-auto">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside 
            className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-[#F5F8F2] rounded-2xl p-6 sticky top-[200px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#2C3E2D]">Kategoriler</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-5 h-5 text-[#8A9A8B]" />
                </button>
              </div>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/kategori/${cat.slug}`}
                    data-testid={`filter-category-${cat.slug}`}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      cat.slug === slug
                        ? 'bg-[#4A7C4E] text-white'
                        : 'text-[#2C3E2D] hover:bg-white'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E8E8]">
              <p className="text-[#8A9A8B]">
                <span className="font-semibold text-[#2C3E2D]">{sortedProducts.length}</span> ürün bulundu
              </p>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#D4D4D4] rounded-full text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtrele
                </button>

                {/* Sort Dropdown */}
                <select
                  data-testid="sort-select"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-[#D4D4D4] rounded-full text-sm bg-white
                           focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent"
                >
                  <option value="default">Varsayılan Sıralama</option>
                  <option value="popular">En Popüler</option>
                  <option value="rating">En Yüksek Puan</option>
                  <option value="price-asc">Fiyat (Artan)</option>
                  <option value="price-desc">Fiyat (Azalan)</option>
                  <option value="new">En Yeni</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[#8A9A8B] text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
