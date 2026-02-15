import React from 'react';
import { FiTarget, FiUsers, FiActivity, FiShield } from 'react-icons/fi';

export default function About() {
  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
           <h1 className="text-4xl lg:text-5xl font-black text-dark mb-4">
            درباره <span dir="ltr" className="text-gradient">POYA - MEDPLANTAi</span>
           </h1>
           <p className="text-muted text-lg">پیشگام در تلفیق هوش مصنوعی و طب سنتی</p>
        </div>
        
        {/* Main Content Card */}
        <div className="glass-card p-8 lg:p-12 rounded-[2.5rem] mb-12 border border-white/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl font-bold mb-6 text-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><FiTarget /></span>
            ماموریت ما
          </h2>
          <p className="text-gray-700 leading-loose text-lg mb-8 text-justify">
            <span dir="ltr" className="font-bold font-sans text-dark">POYA - MEDPLANTAi</span> پاسخی فناورانه به نیاز روزافزون شناسایی علمی گیاهان دارویی است. ما یک سامانه هوشمند طراحی کرده‌ایم که نه تنها گیاهان را می‌بیند، بلکه ماهیت شیمیایی و اثرات بالینی آن‌ها را درک می‌کند. هدف ما ایجاد پلی مطمئن بین دانش کهن گیاه‌شناسی و استانداردهای سخت‌گیرانه پزشکی مدرن است.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/60 to-white/30 p-6 rounded-2xl border border-white/50 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
                <FiActivity /> برای پژوهشگران
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                دسترسی آنی به پروفایل‌های فیتوشیمیایی پیچیده و آنالیز سریع داده‌های خام تصویری جهت تسریع فرآیند تحقیقات.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/60 to-white/30 p-6 rounded-2xl border border-white/50 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold mb-3 text-secondary flex items-center gap-2">
                <FiShield /> برای پزشکان
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ابزاری قابل اعتماد برای بررسی تداخلات دارویی گیاهان و اطمینان از ایمنی مصرف برای بیماران خاص.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-dark mb-2">استاندارد جهانی</h3>
              <p className="text-xs text-muted">تطبیق با آخرین مقالات علمی روز دنیا</p>
           </div>
           <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold text-dark mb-2">حریم خصوصی</h3>
              <p className="text-xs text-muted">پردازش امن و محلی داده‌های کاربر</p>
           </div>
           <div className="glass p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-dark mb-2">جامعه باز</h3>
              <p className="text-xs text-muted">یادگیری تعاملی از تجربیات کاربران</p>
           </div>
        </div>
      </div>
    </div>
  );
}