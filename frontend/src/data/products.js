// Statik ürün verileri - JSON formatında yönetilebilir yapı
export const categories = [
  {
    id: "cim-hali",
    name: "Çim Halı",
    slug: "cim-hali",
    description: "Doğal görünümlü, dayanıklı çim halılar",
    image: "https://images.unsplash.com/photo-1703432043433-3bb86c844968?w=800",
  },
  {
    id: "karo-hali",
    name: "Karo Halı",
    slug: "karo-hali",
    description: "Ofis ve ev için modern karo halılar",
    image: "https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=800",
  },
  {
    id: "pvc-zemin",
    name: "PVC Zemin",
    slug: "pvc-zemin",
    description: "Dayanıklı ve şık PVC zemin kaplamaları",
    image: "https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=800",
  },
  {
    id: "paspas",
    name: "Paspas",
    slug: "paspas",
    description: "Kapı önü ve iç mekan paspasları",
    image: "https://images.unsplash.com/photo-1681258356422-e9d9531deb63?w=800",
  },
  {
    id: "aksesuar",
    name: "Aksesuar",
    slug: "aksesuar",
    description: "Zemin döşeme aksesuarları",
    image: "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?w=800",
  },
];

export const products = [
  // Çim Halı Ürünleri
  {
    id: "ch-001",
    name: "Premium Çim Halı 35mm",
    slug: "premium-cim-hali-35mm",
    categoryId: "cim-hali",
    price: 299.99,
    oldPrice: 349.99,
    unit: "m²",
    description: "35mm yüksekliğinde, doğal görünümlü premium çim halı. UV dayanımlı, 8 yıl garanti.",
    features: ["UV Dayanımlı", "8 Yıl Garanti", "Doğal Görünüm", "Kolay Temizlik"],
    images: [
      "https://images.unsplash.com/photo-1703432043433-3bb86c844968?w=800",
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800",
    ],
    stock: 150,
    rating: 4.8,
    reviews: 124,
    badge: "Çok Satan",
  },
  {
    id: "ch-002",
    name: "Bahçe Çim Halı 25mm",
    slug: "bahce-cim-hali-25mm",
    categoryId: "cim-hali",
    price: 199.99,
    oldPrice: null,
    unit: "m²",
    description: "25mm yüksekliğinde, ekonomik bahçe çim halısı. Balkon ve teras için ideal.",
    features: ["Ekonomik", "Balkon İçin İdeal", "Kolay Montaj", "5 Yıl Garanti"],
    images: [
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800",
    ],
    stock: 200,
    rating: 4.5,
    reviews: 89,
    badge: null,
  },
  {
    id: "ch-003",
    name: "Futbol Sahası Çim Halı 50mm",
    slug: "futbol-sahasi-cim-hali-50mm",
    categoryId: "cim-hali",
    price: 449.99,
    oldPrice: 499.99,
    unit: "m²",
    description: "50mm profesyonel futbol sahası çim halısı. FIFA onaylı, yüksek dayanıklılık.",
    features: ["FIFA Onaylı", "Profesyonel", "10 Yıl Garanti", "Yüksek Dayanıklılık"],
    images: [
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800",
    ],
    stock: 50,
    rating: 4.9,
    reviews: 45,
    badge: "Profesyonel",
  },
  {
    id: "ch-004",
    name: "Dekoratif Çim Halı 20mm",
    slug: "dekoratif-cim-hali-20mm",
    categoryId: "cim-hali",
    price: 149.99,
    oldPrice: null,
    unit: "m²",
    description: "20mm ince yaprak dokulu dekoratif çim halı. İç mekan kullanımına uygun.",
    features: ["İç Mekan Uygun", "İnce Yaprak", "Dekoratif", "Kolay Bakım"],
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    ],
    stock: 180,
    rating: 4.3,
    reviews: 67,
    badge: null,
  },

  // Karo Halı Ürünleri
  {
    id: "kh-001",
    name: "Ofis Karo Halı Antrasit",
    slug: "ofis-karo-hali-antrasit",
    categoryId: "karo-hali",
    price: 89.99,
    oldPrice: 109.99,
    unit: "m²",
    description: "50x50cm antrasit ofis karo halısı. Ses yalıtımlı, kolay değiştirilebilir.",
    features: ["Ses Yalıtımlı", "50x50cm", "Kolay Değiştirme", "Profesyonel Görünüm"],
    images: [
      "https://images.unsplash.com/photo-1676474987690-2fc0582a07ec?w=800",
    ],
    stock: 500,
    rating: 4.6,
    reviews: 203,
    badge: "Çok Satan",
  },
  {
    id: "kh-002",
    name: "Ev Tipi Karo Halı Bej",
    slug: "ev-tipi-karo-hali-bej",
    categoryId: "karo-hali",
    price: 79.99,
    oldPrice: null,
    unit: "m²",
    description: "Ev kullanımına uygun bej tonlarında karo halı. Yumuşak doku, sıcak görünüm.",
    features: ["Yumuşak Doku", "Ev İçin İdeal", "Sıcak Görünüm", "Leke Tutmaz"],
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
    ],
    stock: 300,
    rating: 4.4,
    reviews: 156,
    badge: null,
  },
  {
    id: "kh-003",
    name: "Premium Karo Halı Gri",
    slug: "premium-karo-hali-gri",
    categoryId: "karo-hali",
    price: 129.99,
    oldPrice: 149.99,
    unit: "m²",
    description: "Premium kalite gri karo halı. Yüksek trafik alanları için ideal.",
    features: ["Premium Kalite", "Yüksek Trafik", "Dayanıklı", "Modern Tasarım"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    stock: 250,
    rating: 4.7,
    reviews: 98,
    badge: "Premium",
  },

  // PVC Zemin Ürünleri
  {
    id: "pvc-001",
    name: "Ahşap Desenli PVC Zemin",
    slug: "ahsap-desenli-pvc-zemin",
    categoryId: "pvc-zemin",
    price: 159.99,
    oldPrice: 189.99,
    unit: "m²",
    description: "Doğal ahşap görünümlü PVC zemin kaplama. Su geçirmez, kolay montaj.",
    features: ["Ahşap Görünüm", "Su Geçirmez", "Kolay Montaj", "Uzun Ömürlü"],
    images: [
      "https://images.unsplash.com/photo-1617262869595-a0e5869d8fc7?w=800",
    ],
    stock: 400,
    rating: 4.8,
    reviews: 287,
    badge: "Çok Satan",
  },
  {
    id: "pvc-002",
    name: "Taş Desenli PVC Zemin",
    slug: "tas-desenli-pvc-zemin",
    categoryId: "pvc-zemin",
    price: 179.99,
    oldPrice: null,
    unit: "m²",
    description: "Doğal taş görünümlü PVC zemin. Banyo ve mutfak için ideal.",
    features: ["Taş Görünüm", "Banyo İçin İdeal", "Kaymaz Yüzey", "Hijyenik"],
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    stock: 280,
    rating: 4.5,
    reviews: 134,
    badge: null,
  },
  {
    id: "pvc-003",
    name: "Spor Salonu PVC Zemin",
    slug: "spor-salonu-pvc-zemin",
    categoryId: "pvc-zemin",
    price: 249.99,
    oldPrice: 299.99,
    unit: "m²",
    description: "Profesyonel spor salonu PVC zemin. Darbe emici, kaymaz.",
    features: ["Darbe Emici", "Kaymaz", "Profesyonel", "Hijyenik"],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    ],
    stock: 150,
    rating: 4.9,
    reviews: 76,
    badge: "Profesyonel",
  },

  // Paspas Ürünleri
  {
    id: "pas-001",
    name: "Kauçuk Paspas 60x90cm",
    slug: "kaucuk-paspas-60x90",
    categoryId: "paspas",
    price: 129.99,
    oldPrice: 149.99,
    unit: "adet",
    description: "Dayanıklı kauçuk kapı önü paspası. Toz tutucu, kolay temizlik.",
    features: ["Toz Tutucu", "Dayanıklı", "Kolay Temizlik", "Kaymaz Taban"],
    images: [
      "https://images.unsplash.com/photo-1681258356422-e9d9531deb63?w=800",
    ],
    stock: 200,
    rating: 4.4,
    reviews: 189,
    badge: null,
  },
  {
    id: "pas-002",
    name: "Dekoratif Kapı Paspası",
    slug: "dekoratif-kapi-paspasi",
    categoryId: "paspas",
    price: 89.99,
    oldPrice: null,
    unit: "adet",
    description: "Şık tasarımlı dekoratif kapı paspası. Ev girişinize stil katın.",
    features: ["Dekoratif", "Şık Tasarım", "Dayanıklı", "Kolay Yıkama"],
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    ],
    stock: 150,
    rating: 4.6,
    reviews: 112,
    badge: "Yeni",
  },
  {
    id: "pas-003",
    name: "Endüstriyel Paspas 90x150cm",
    slug: "endustriyel-paspas-90x150",
    categoryId: "paspas",
    price: 299.99,
    oldPrice: 349.99,
    unit: "adet",
    description: "Ağır hizmet endüstriyel paspas. Fabrika ve atölye girişleri için.",
    features: ["Ağır Hizmet", "Endüstriyel", "Ekstra Dayanıklı", "Büyük Boy"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    stock: 80,
    rating: 4.7,
    reviews: 45,
    badge: "Endüstriyel",
  },

  // Aksesuar Ürünleri
  {
    id: "aks-001",
    name: "Çim Halı Yapıştırıcı Bant",
    slug: "cim-hali-yapistirici-bant",
    categoryId: "aksesuar",
    price: 49.99,
    oldPrice: null,
    unit: "rulo",
    description: "10m çim halı birleştirme bandı. Güçlü yapışma, kolay uygulama.",
    features: ["10 Metre", "Güçlü Yapışma", "Kolay Uygulama", "UV Dayanımlı"],
    images: [
      "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?w=800",
    ],
    stock: 500,
    rating: 4.3,
    reviews: 234,
    badge: null,
  },
  {
    id: "aks-002",
    name: "Zemin Montaj Kiti",
    slug: "zemin-montaj-kiti",
    categoryId: "aksesuar",
    price: 199.99,
    oldPrice: 249.99,
    unit: "set",
    description: "Komple zemin montaj kiti. Maket bıçağı, cetvel, silikon tabancası dahil.",
    features: ["Komple Set", "Profesyonel Araçlar", "Kolay Kullanım", "Dayanıklı"],
    images: [
      "https://images.unsplash.com/photo-1581147036324-c17ac41f9b7e?w=800",
    ],
    stock: 100,
    rating: 4.8,
    reviews: 67,
    badge: "Komple Set",
  },
  {
    id: "aks-003",
    name: "PVC Zemin Temizleyici 5L",
    slug: "pvc-zemin-temizleyici-5l",
    categoryId: "aksesuar",
    price: 79.99,
    oldPrice: null,
    unit: "adet",
    description: "Profesyonel PVC zemin temizleme solüsyonu. 5 litre ekonomik boy.",
    features: ["5 Litre", "Profesyonel", "Leke Çıkarıcı", "Parlaklık Verici"],
    images: [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800",
    ],
    stock: 300,
    rating: 4.5,
    reviews: 145,
    badge: null,
  },
];

export const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.categoryId === categoryId);
};

export const getProductBySlug = (slug) => {
  return products.find((product) => product.slug === slug);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const getCategoryBySlug = (slug) => {
  return categories.find((category) => category.slug === slug);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.badge === "Çok Satan");
};

export const getNewProducts = () => {
  return products.filter((product) => product.badge === "Yeni");
};
