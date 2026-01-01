import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const TrackOrderPage = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Demo kargo takip verileri
  const demoTrackingData = {
    'YD123456': {
      code: 'YD123456',
      status: 'in_transit',
      estimatedDelivery: '25 Aralık 2024',
      carrier: 'Yurtiçi Kargo',
      timeline: [
        { status: 'ordered', title: 'Sipariş Alındı', date: '20 Aralık 2024, 14:30', completed: true },
        { status: 'preparing', title: 'Hazırlanıyor', date: '21 Aralık 2024, 09:00', completed: true },
        { status: 'shipped', title: 'Kargoya Verildi', date: '22 Aralık 2024, 11:45', completed: true },
        { status: 'in_transit', title: 'Dağıtımda', date: '24 Aralık 2024, 08:00', completed: true },
        { status: 'delivered', title: 'Teslim Edildi', date: '', completed: false },
      ],
    },
    'YD789012': {
      code: 'YD789012',
      status: 'delivered',
      estimatedDelivery: '22 Aralık 2024',
      carrier: 'Aras Kargo',
      timeline: [
        { status: 'ordered', title: 'Sipariş Alındı', date: '18 Aralık 2024, 10:15', completed: true },
        { status: 'preparing', title: 'Hazırlanıyor', date: '18 Aralık 2024, 15:00', completed: true },
        { status: 'shipped', title: 'Kargoya Verildi', date: '19 Aralık 2024, 09:30', completed: true },
        { status: 'in_transit', title: 'Dağıtımda', date: '21 Aralık 2024, 07:00', completed: true },
        { status: 'delivered', title: 'Teslim Edildi', date: '22 Aralık 2024, 14:20', completed: true },
      ],
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      toast.error('Lütfen takip numarası girin');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = demoTrackingData[trackingCode.toUpperCase()];
    
    if (result) {
      setTrackingResult(result);
      toast.success('Kargo bilgileri bulundu');
    } else {
      setTrackingResult(null);
      toast.error('Kargo bulunamadı. Lütfen takip numarasını kontrol edin.');
    }

    setIsSearching(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'in_transit':
        return 'text-blue-500';
      default:
        return 'text-[#4A7C4E]';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ordered':
        return 'Sipariş Alındı';
      case 'preparing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoya Verildi';
      case 'in_transit':
        return 'Dağıtımda';
      case 'delivered':
        return 'Teslim Edildi';
      default:
        return status;
    }
  };

  return (
    <div data-testid="track-order-page" className="bg-[#F5F8F2] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-20">
        <div className="max-w-2xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#4A7C4E] rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#2C3E2D] mb-2">Kargo Takip</h1>
            <p className="text-[#8A9A8B]">Siparişinizin durumunu takip edin</p>
          </div>

          {/* Arama Formu */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <label className="block text-sm font-medium text-[#2C3E2D] mb-2">
              Takip Numarası
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9A8B]" />
                <input
                  type="text"
                  data-testid="tracking-input"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Örn: YD123456"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#D4D4D4] 
                           focus:ring-2 focus:ring-[#4A7C4E] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                data-testid="track-btn"
                disabled={isSearching}
                className="px-6 h-12 bg-[#4A7C4E] text-white rounded-xl font-medium 
                         flex items-center gap-2 hover:bg-[#3A633D] transition-colors
                         disabled:opacity-70"
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Sorgula
              </button>
            </div>
            <p className="text-xs text-[#8A9A8B] mt-2">
              Demo takip numaraları: YD123456 (Dağıtımda), YD789012 (Teslim Edildi)
            </p>
          </form>

          {/* Sonuçlar */}
          {trackingResult && (
            <div 
              data-testid="tracking-result"
              className="bg-white rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4"
            >
              {/* Kargo Bilgileri */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E8E8]">
                <div>
                  <p className="text-sm text-[#8A9A8B]">Takip No</p>
                  <p className="font-bold text-[#2C3E2D]">{trackingResult.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#8A9A8B]">Kargo Firması</p>
                  <p className="font-medium text-[#2C3E2D]">{trackingResult.carrier}</p>
                </div>
              </div>

              {/* Durum Özeti */}
              <div className="py-6 border-b border-[#E8E8E8]">
                <div className="flex items-center gap-4">
                  {trackingResult.status === 'delivered' ? (
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  ) : (
                    <Clock className="w-12 h-12 text-blue-500" />
                  )}
                  <div>
                    <p className={`text-xl font-bold ${getStatusColor(trackingResult.status)}`}>
                      {getStatusText(trackingResult.status)}
                    </p>
                    <p className="text-sm text-[#8A9A8B]">
                      Tahmini Teslimat: {trackingResult.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="pt-6">
                <h3 className="font-semibold text-[#2C3E2D] mb-4">Kargo Geçmişi</h3>
                <div className="space-y-4">
                  {trackingResult.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          step.completed ? 'bg-[#4A7C4E]' : 'bg-[#D4D4D4]'
                        }`} />
                        {index < trackingResult.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.completed ? 'bg-[#4A7C4E]' : 'bg-[#D4D4D4]'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className={`font-medium ${
                          step.completed ? 'text-[#2C3E2D]' : 'text-[#8A9A8B]'
                        }`}>
                          {step.title}
                        </p>
                        {step.date && (
                          <p className="text-sm text-[#8A9A8B]">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Yardım Bölümü */}
          <div className="mt-8 text-center">
            <p className="text-[#8A9A8B] mb-4">Kargonuzla ilgili sorun mu var?</p>
            <a
              href="https://wa.me/905325398429?text=Merhaba,%20kargo%20takip%20ile%20ilgili%20yardım%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4A7C4E] font-medium hover:underline"
            >
              <MapPin className="w-5 h-5" />
              WhatsApp ile Destek Alın
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
