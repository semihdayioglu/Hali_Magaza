import React from 'react';
import { Package, Truck, Shield, Smile, Clock } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: '%100 Doğal',
    subtitle: 'Sağlıklı Ürünler',
    description: 'Tüm ürünlerimiz doğal ve sağlıklıdır'
  },
  {
    icon: Truck,
    title: 'Taze, El Yapımı',
    subtitle: '& Temiz İçerikli',
    description: 'El emeği ile özenle hazırlanır'
  },
  {
    icon: Shield,
    title: 'Koşulsuz İade',
    subtitle: '14 Gün İçinde',
    description: 'Memnun kalmazsanız iade edin'
  },
  {
    icon: Smile,
    title: '%100 Mutlu',
    subtitle: 'Müşteriler',
    description: 'Binlerce mutlu müşteri yorumu'
  },
  {
    icon: Clock,
    title: '%100 Güvenli',
    subtitle: 'Alışveriş',
    description: 'SSL sertifikalı güvenli ödeme'
  }
];

const WhyDifferent = () => {
  return (
    <section data-testid="why-different-section" className="py-16 lg:py-20 bg-gray-50">
      <div className="px-6 lg:px-16">
        
        {/* BAŞLIK */}
        <div className="mb-12">
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
                Neden Farklıyız?
                <span className="inline-block w-8 h-0.5 bg-[#4A7C4E] ml-2 align-middle"></span>
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E2D]" style={{ fontFamily: "'Caveat', cursive" }}>
                Çünkü Doğayı ve İnsanı Önemsiyoruz
              </h2>
            </div>
          </div>
        </div>

        {/* FEATURE KARTLARI - 5 YAN YANA */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                data-testid={`feature-card-${index}`}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center group cursor-pointer"
              >
                {/* İKON - YUVARLAK ARKA PLAN */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center 
                              group-hover:bg-emerald-50 transition-colors border-2 border-gray-200 group-hover:border-[#4A7C4E]">
                  <Icon className="w-10 h-10 text-gray-500 group-hover:text-[#4A7C4E] transition-colors" strokeWidth={1.5} />
                </div>

                {/* BAŞLIK */}
                <p className="text-xs text-gray-500 mb-1">{feature.title}</p>
                <h3 className="font-bold text-[#2C3E2D] text-sm leading-tight">
                  {feature.subtitle}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyDifferent;
