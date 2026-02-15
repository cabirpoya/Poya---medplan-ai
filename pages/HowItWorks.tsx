import React from 'react';
import { FiUpload, FiCpu, FiFileText, FiArrowDown } from 'react-icons/fi';

export default function HowItWorks() {
  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-black text-dark mb-6">
            مسیر تبدیل <span className="text-primary">تصویر</span> به <span className="text-secondary">دانش</span>
          </h1>
          <p className="text-muted text-lg">فرآیند پردازش در سیستم POYA در چهار مرحله دقیق انجام می‌شود</p>
        </div>

        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-secondary/20 to-primary/20 -translate-x-1/2 rounded-full"></div>

           <div className="space-y-12 md:space-y-24 relative">
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
                 <div className="flex-1 text-center md:text-left order-2 md:order-1">
                    <div className="glass-card p-8 rounded-3xl inline-block w-full text-right relative hover:scale-105 transition-transform duration-500">
                       <span className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold shadow-glow">1</span>
                       <h3 className="text-xl font-bold text-dark mb-3">آپلود و پیش‌پردازش</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">
                         تصویر یا سند گیاه توسط کاربر بارگذاری می‌شود. سیستم به صورت خودکار نویزهای تصویر را حذف کرده و ناحیه اصلی گیاه (برگ، گل یا ریشه) را برای تمرکز دقیق برش می‌دهد.
                       </p>
                    </div>
                 </div>
                 <div className="w-16 h-16 rounded-full bg-white border-4 border-primary/20 z-10 flex items-center justify-center text-primary text-2xl shadow-lg shrink-0 order-1 md:order-2">
                    <FiUpload />
                 </div>
                 <div className="flex-1 order-3 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
                 <div className="flex-1 hidden md:block order-1"></div>
                 <div className="w-16 h-16 rounded-full bg-white border-4 border-secondary/20 z-10 flex items-center justify-center text-secondary text-2xl shadow-lg shrink-0 order-1 md:order-2">
                    <FiCpu />
                 </div>
                 <div className="flex-1 text-center md:text-right order-2 md:order-3">
                    <div className="glass-card p-8 rounded-3xl inline-block w-full relative hover:scale-105 transition-transform duration-500 border-secondary/30">
                       <span className="absolute -top-4 -left-4 w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center font-bold shadow-glow-sec">2</span>
                       <h3 className="text-xl font-bold text-dark mb-3">تحلیل هسته عصبی</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">
                         داده‌ها رمزنگاری شده و به <span dir="ltr" className="font-bold">POYA Core</span> ارسال می‌شوند. مدل هوش مصنوعی همزمان ویژگی‌های ظاهری را با دیتابیس عظیم گیاه‌شناسی تطبیق می‌دهد.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
                 <div className="flex-1 text-center md:text-left order-2 md:order-1">
                    <div className="glass-card p-8 rounded-3xl inline-block w-full text-right relative hover:scale-105 transition-transform duration-500">
                       <span className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold shadow-glow">3</span>
                       <h3 className="text-xl font-bold text-dark mb-3">استخراج ایمنی و خواص</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">
                         پس از شناسایی، سیستم به سراغ پایگاه داده فارماکولوژی می‌رود. ترکیبات شیمیایی، میزان سمیت و تداخلات دارویی استخراج و اعتبارسنجی می‌شوند.
                       </p>
                    </div>
                 </div>
                 <div className="w-16 h-16 rounded-full bg-white border-4 border-emerald-200 z-10 flex items-center justify-center text-emerald-600 text-2xl shadow-lg shrink-0 order-1 md:order-2">
                    <FiFileText />
                 </div>
                 <div className="flex-1 order-3 hidden md:block"></div>
              </div>

               {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
                 <div className="flex-1 hidden md:block order-1"></div>
                 <div className="w-16 h-16 rounded-full bg-dark z-10 flex items-center justify-center text-white text-2xl shadow-lg shrink-0 order-1 md:order-2 ring-4 ring-gray-200">
                    <FiArrowDown />
                 </div>
                 <div className="flex-1 text-center md:text-right order-2 md:order-3">
                    <div className="bg-gradient-to-br from-dark to-slate-800 text-white p-8 rounded-3xl inline-block w-full relative hover:scale-105 transition-transform duration-500 shadow-2xl">
                       <span className="absolute -top-4 -left-4 w-10 h-10 bg-white text-dark rounded-xl flex items-center justify-center font-bold">4</span>
                       <h3 className="text-xl font-bold mb-3">نمایش گزارش نهایی</h3>
                       <p className="text-gray-300 text-sm leading-relaxed">
                         گزارش ساختاریافته شامل نام علمی، خواص، هشدارها و پروفایل شیمیایی به کاربر نمایش داده شده و قابلیت دانلود PDF فعال می‌شود.
                       </p>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}