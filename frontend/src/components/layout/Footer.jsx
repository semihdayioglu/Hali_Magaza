import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  CreditCard,
  Truck,
  ShieldCheck,
  HeadphonesIcon
} from 'lucide-react';

const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#2C3E2D] text-white">
      {/* Üst Bant - Özellikler */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-20 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Ücretsiz Kargo</p>
                <p className="text-sm text-white/70">1000 ₺ üzeri</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Güvenli Ödeme</p>
                <p className="text-sm text-white/70">256-bit SSL</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">Garanti</p>
                <p className="text-sm text-white/70">10 yıla kadar</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4A7C4E] rounded-full flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold">7/24 Destek</p>
                <p className="text-sm text-white/70">Canlı yardım</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Footer İçeriği */}
      <div className="container mx-auto px-4 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve İletişim */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#4A7C4E] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">YD</span>
              </div>
              <span className="text-lg font-bold">YER DÖŞEME</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Türkiye'nin en kaliteli yer döşeme ürünleri. 
              Çim halı, karo halı, PVC zemin ve paspas çeşitleri.
            </p>
            <div className="space-y-2">
              <a href="tel:+905325398429" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+90 532 539 84 29</span>
              </a>
              <a href="mailto:info@yerdoseme.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@yerdoseme.com</span>
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kategori/cim-hali" className="text-white/70 hover:text-white transition-colors text-sm">
                  Çim Halı
                </Link>
              </li>
              <li>
                <Link to="/kategori/karo-hali" className="text-white/70 hover:text-white transition-colors text-sm">
                  Karo Halı
                </Link>
              </li>
              <li>
                <Link to="/kategori/pvc-zemin" className="text-white/70 hover:text-white transition-colors text-sm">
                  PVC Zemin
                </Link>
              </li>
              <li>
                <Link to="/kategori/paspas" className="text-white/70 hover:text-white transition-colors text-sm">
                  Paspas
                </Link>
              </li>
              <li>
                <Link to="/kategori/aksesuar" className="text-white/70 hover:text-white transition-colors text-sm">
                  Aksesuar
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kargo-takip" className="text-white/70 hover:text-white transition-colors text-sm">
                  Kargo Takip
                </Link>
              </li>
              <li>
                <Link to="/siparis" className="text-white/70 hover:text-white transition-colors text-sm">
                  Sipariş Ver
                </Link>
              </li>
              <li>
                <Link to="/iade-kosullari" className="text-white/70 hover:text-white transition-colors text-sm">
                  İade Koşulları
                </Link>
              </li>
              <li>
                <Link to="/sss" className="text-white/70 hover:text-white transition-colors text-sm">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-white/70 hover:text-white transition-colors text-sm">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="text-white/70 hover:text-white transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/gizlilik" className="text-white/70 hover:text-white transition-colors text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/kullanim-kosullari" className="text-white/70 hover:text-white transition-colors text-sm">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link to="/kvkk" className="text-white/70 hover:text-white transition-colors text-sm">
                  KVKK
                </Link>
              </li>
            </ul>

            {/* Sosyal Medya */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Bizi Takip Edin</h3>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           hover:bg-[#4A7C4E] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           hover:bg-[#4A7C4E] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           hover:bg-[#4A7C4E] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bant - Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-20 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © 2024 Yer Döşeme. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" 
                alt="Mastercard" 
                className="h-6 opacity-70"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" 
                alt="Visa" 
                className="h-6 opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
