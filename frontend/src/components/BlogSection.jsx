import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Çim Halı Nasıl Seçilir? Bahçeniz İçin En İyi Seçenekler',
    excerpt: 'Yüzyıllardır bahçe düzenlemesinin vazgeçilmezi olan çim halılar, hem geçmişi hem bugünü bir araya getirir.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop',
    date: '28',
    month: 'Oca'
  },
  {
    id: 2,
    title: 'Karo Halı Bakımı: Uzun Ömürlü Kullanım İçin İpuçları',
    excerpt: 'Modern ofislerin vazgeçilmezi karo halılar, doğru bakımla yıllarca ilk günkü gibi kalabilir.',
    image: 'https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=400&h=300&fit=crop',
    date: '25',
    month: 'Oca'
  },
  {
    id: 3,
    title: 'PVC Zemin vs Laminat: Hangisi Sizin İçin Doğru?',
    excerpt: 'Zemin kaplama seçimi yaparken bilinmesi gereken tüm detaylar. Avantaj ve dezavantajları karşılaştırıyoruz.',
    image: 'https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=400&h=300&fit=crop',
    date: '22',
    month: 'Oca'
  }
];

const BlogSection = () => {
  return (
    <section data-testid="blog-section" className="py-12 lg:py-16 bg-gray-50">
      <div className="px-6 lg:px-16">
        {/* LOGO + BAŞLIK */}
        <div className="flex items-start gap-4 mb-8">
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
              Zemin döşemeden faydalı bilgilere, işinize yarayacak herşey
              <span className="inline-block w-8 h-0.5 bg-[#4A7C4E] ml-2 align-middle"></span>
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Caveat', cursive" }}>
              Yer Döşeme Blog
            </h2>
          </div>
        </div>

        {/* BLOG KARTLARI - 3 YAN YANA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              data-testid={`blog-card-${post.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
            >
              {/* GÖRSEL + TARİH BADGE */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* TARİH BADGE - SAĞ ALT */}
                <div className="absolute bottom-3 right-3 bg-lime-400 text-gray-800 px-3 py-2 rounded-lg text-center min-w-[50px]">
                  <div className="text-xl font-bold leading-none">{post.date}</div>
                  <div className="text-xs uppercase">{post.month}</div>
                </div>
              </div>

              {/* İÇERİK */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#4A7C4E] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full font-semibold 
                               hover:bg-gray-800 hover:text-white transition-all inline-flex items-center gap-2 text-sm">
                  Devamını Oku
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* TÜMÜNÜ GÖR BUTONU */}
        <div className="mt-10 flex justify-end">
          <Link
            to="/blog"
            className="px-8 py-3 border-2 border-[#4A7C4E] text-[#4A7C4E] rounded-full font-semibold 
                     hover:bg-[#4A7C4E] hover:text-white transition-all inline-flex items-center gap-2"
          >
            Tüm Makaleler
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
