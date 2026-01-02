import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Bültene başarıyla abone oldunuz!');
      } else if (data.status === 'exists') {
        toast.info('Bu e-posta zaten kayıtlı');
      }
      
      setEmail('');
    } catch (error) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section data-testid="newsletter-section" className="py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* SOL TARAF - TEXT */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              
              {/* LOGO İKON */}
              <div className="w-16 h-16 mb-6 text-[#4A7C4E]">
                <Mail className="w-full h-full" />
              </div>

              {/* BAŞLIK */}
              <p className="text-sm text-gray-600 mb-2">
                Kampanya ve yeniliklerden haberdar olmak için e-bültenimize abone olun!
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Caveat', cursive" }}>
                E-Bülten Aboneliği
              </h2>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    data-testid="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresinizi giriniz"
                    required
                    className="w-full px-6 py-4 pr-36 rounded-full border-2 border-gray-300 
                             focus:border-[#4A7C4E] focus:ring-2 focus:ring-emerald-200 
                             outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    data-testid="newsletter-submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 
                             bg-[#4A7C4E] text-white rounded-full font-semibold 
                             hover:bg-[#3A633D] transition-colors flex items-center gap-2
                             disabled:opacity-70"
                  >
                    <Mail className="w-5 h-5" />
                    {isSubmitting ? '...' : 'Abone Ol'}
                  </button>
                </div>
              </form>

              {/* KÜÇÜK NOT */}
              <p className="text-xs text-gray-500 mt-4">
                E-posta adresiniz gizli tutulacak ve sadece kampanyalar için kullanılacaktır.
              </p>
            </div>

            {/* SAĞ TARAF - GÖRSEL */}
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=600&fit=crop"
                alt="E-Bülten"
                className="w-full h-full object-cover"
              />
              
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-[#4A7C4E]/10"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
