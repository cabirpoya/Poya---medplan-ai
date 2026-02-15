import React from 'react';
import { FiCpu, FiLayers, FiDatabase, FiCloud, FiCheckCircle } from 'react-icons/fi';

export default function Technology() {
  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
           <div className="inline-block p-2 px-4 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4 border border-secondary/20">
             زیرساخت فنی
           </div>
           <h1 className="text-4xl lg:text-5xl font-black text-dark mb-6">
            معماری هوشمند <span className="text-gradient">POYA Core</span>
           </h1>
           <p className="text-muted max-w-2xl mx-auto text-lg">
             تلفیقی از شبکه‌های عصبی عمیق (Deep Learning) و مدل‌های زبانی بزرگ (LLM) برای درک همزمان تصویر و متن.
           </p>
        </div>
        
        {/* Main Tech Block */}
        <div className="glass-card p-8 lg:p-12 rounded-[2.5rem] mb-12 border border-white/60 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-bold text-dark mb-6">موتور پردازش عصبی</h2>
                  <p className="text-gray-600 leading-loose mb-8 text-justify">
                    این سیستم از یک معماری چندوجهی (Multimodal) اختصاصی بهره می‌برد. برخلاف مدل‌های کلاسیک که تنها تصویر را طبقه‌بندی می‌کردند، <span dir="ltr" className="font-bold text-primary">POYA Neural Core</span> تصویر را "می‌خواند". این موتور قادر است بافت میکروسکوپی برگ‌ها، الگوی رگبرگ‌ها و ساختار گل‌دهی را تحلیل کرده و آن را با دانش داروشناسی موجود در مدل زبانی تطبیق دهد.
                  </p>
                  <ul className="space-y-4">
                     {[
                       "دقت تشخیص بالای 99% در شرایط نوری مختلف",
                       "تحلیل بلادرنگ (Real-time) بدون تاخیر",
                       "استخراج خودکار داده‌ها از متون علمی ضمیمه شده"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-white">
                          <FiCheckCircle className="text-green-500 shrink-0" />
                          <span className="text-sm font-bold text-dark">{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="relative">
                  {/* Visual Representation of Tech */}
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-dark to-slate-800 p-8 relative overflow-hidden shadow-2xl flex items-center justify-center">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                     <div className="w-48 h-48 rounded-full bg-primary/20 blur-3xl absolute top-0 right-0 animate-pulse"></div>
                     <div className="w-48 h-48 rounded-full bg-secondary/20 blur-3xl absolute bottom-0 left-0 animate-pulse" style={{animationDelay: '1s'}}></div>
                     
                     <div className="relative z-10 text-center">
                        <div className="text-6xl text-white mb-4 flex justify-center"><FiCpu /></div>
                        <div className="text-white font-black text-2xl tracking-widest">NEURAL CORE</div>
                        <div className="text-emerald-400 font-mono text-sm mt-2">v2.5 STABLE</div>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiLayers />, color: "text-blue-500", bg: "bg-blue-50", title: "یادگیری تطبیقی", desc: "شناسایی الگوهای جدید بدون نیاز به بازآموزی کامل سیستم." },
              { icon: <FiDatabase />, color: "text-purple-500", bg: "bg-purple-50", title: "پایگاه دانش پویا", desc: "اتصال به منابع علمی معتبر جهانی برای به‌روزرسانی اطلاعات." },
              { icon: <FiCheckCircle />, color: "text-emerald-500", bg: "bg-emerald-50", title: "لایه ایمنی", desc: "فیلترهای سخت‌گیرانه برای جلوگیری از خطاهای پزشکی خطرناک." },
              { icon: <FiCloud />, color: "text-orange-500", bg: "bg-orange-50", title: "پردازش ابری امن", desc: "رمزنگاری دو طرفه داده‌ها در هنگام پردازش در سرور." },
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-3xl hover:-translate-y-2 transition-transform border border-white/50">
                 <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {item.icon}
                 </div>
                 <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                 <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}