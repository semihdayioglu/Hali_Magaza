import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.features.some(f => f.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  return (
    <div data-testid="search-page" className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#F5F8F2] py-4">
        <div className="container mx-auto px-4 md:px-20">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#8A9A8B] hover:text-[#4A7C4E] transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="w-4 h-4 text-[#D4D4D4]" />
            <span className="text-[#2C3E2D] font-medium">Arama Sonuçları</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-20 py-8">
        {/* Arama Başlığı */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-[#4A7C4E]" />
            <h1 className="text-2xl font-bold text-[#2C3E2D]">
              "{query}" için arama sonuçları
            </h1>
          </div>
          <p className="text-[#8A9A8B]">
            {searchResults.length} ürün bulundu
          </p>
        </div>

        {/* Sonuçlar */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-[#D4D4D4] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#2C3E2D] mb-2">Sonuç Bulunamadı</h2>
            <p className="text-[#8A9A8B] mb-8 max-w-md mx-auto">
              "{query}" aramanızla eşleşen ürün bulunamadı. Farklı anahtar kelimeler deneyin.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#4A7C4E] text-white px-6 py-3 
                       rounded-full font-medium hover:bg-[#3A633D] transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
