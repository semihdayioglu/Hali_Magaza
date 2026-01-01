import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

const AccountPage = () => {
  // Placeholder - İleride kullanıcı sistemi eklenecek
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div data-testid="account-page" className="bg-[#F5F8F2] min-h-screen py-8">
        <div className="container mx-auto px-4 md:px-20">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-20 h-20 bg-[#F5F8F2] rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-[#4A7C4E]" />
              </div>
              <h1 className="text-2xl font-bold text-[#2C3E2D] mb-4">Hesabım</h1>
              <p className="text-[#8A9A8B] mb-8">
                Şu anda misafir olarak alışveriş yapıyorsunuz. 
                Hesap sistemi yakında aktif olacak!
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-[#F5F8F2] rounded-xl text-left">
                  <h3 className="font-medium text-[#2C3E2D] mb-2">Misafir Özellikleri</h3>
                  <ul className="space-y-2 text-sm text-[#5C6B5D]">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#4A7C4E] rounded-full"></span>
                      Favorilere ekleme (tarayıcıda saklanır)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#4A7C4E] rounded-full"></span>
                      Sepet yönetimi
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#4A7C4E] rounded-full"></span>
                      WhatsApp ile sipariş
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#4A7C4E] rounded-full"></span>
                      Kargo takip
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8E8E8]">
                <p className="text-sm text-[#8A9A8B] mb-4">Hızlı Erişim</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/favoriler"
                    className="flex items-center justify-center gap-2 p-4 bg-[#F5F8F2] rounded-xl 
                             text-[#2C3E2D] hover:bg-[#4A7C4E] hover:text-white transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    Favoriler
                  </Link>
                  <Link
                    to="/sepet"
                    className="flex items-center justify-center gap-2 p-4 bg-[#F5F8F2] rounded-xl 
                             text-[#2C3E2D] hover:bg-[#4A7C4E] hover:text-white transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    Sepet
                  </Link>
                  <Link
                    to="/kargo-takip"
                    className="flex items-center justify-center gap-2 p-4 bg-[#F5F8F2] rounded-xl 
                             text-[#2C3E2D] hover:bg-[#4A7C4E] hover:text-white transition-colors col-span-2"
                  >
                    <Package className="w-5 h-5" />
                    Kargo Takip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Giriş yapılmış kullanıcı için (ileride aktif olacak)
  return (
    <div className="bg-[#F5F8F2] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2C3E2D] mb-8">Hesabım</h1>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 bg-[#4A7C4E] text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-lg">Hoş Geldiniz</p>
                  <p className="text-white/80">kullanici@email.com</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#E8E8E8]">
              <Link to="/siparislerim" className="flex items-center justify-between p-4 hover:bg-[#F5F8F2] transition-colors">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#4A7C4E]" />
                  <span className="font-medium text-[#2C3E2D]">Siparişlerim</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8A9A8B]" />
              </Link>
              
              <Link to="/favoriler" className="flex items-center justify-between p-4 hover:bg-[#F5F8F2] transition-colors">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#4A7C4E]" />
                  <span className="font-medium text-[#2C3E2D]">Favorilerim</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8A9A8B]" />
              </Link>
              
              <Link to="/ayarlar" className="flex items-center justify-between p-4 hover:bg-[#F5F8F2] transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-[#4A7C4E]" />
                  <span className="font-medium text-[#2C3E2D]">Hesap Ayarları</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8A9A8B]" />
              </Link>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-500">Çıkış Yap</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
