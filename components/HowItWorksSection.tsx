import React from 'react';
import AnimatedSection from './AnimatedSection';

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "آپلود تصویر بالینی",
      desc: "بارگذاری تصویر گیاه با قابلیت برش دقیق ناحیه مورد نظر برای آنالیز."
    },
    {
      step: "02",
      title: "پردازش هسته عصبی",
      desc: "تحلیل همزمان ساختار گیاه توسط موتور هوش مصنوعی POYA Core."
    },
    {
      step: "03",
      title: "دریافت گزارش پزشکی",
      desc: "مشاهده نتایج شامل نام علمی، پروفایل شیمیایی و هشدارهای ایمنی."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              روند تشخیص هوشمند
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              مسیر تبدیل تصویر خام به داده‌های معتبر پزشکی در سه مرحله ساده
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-light p-8 rounded-2xl border border-divider hover:border-secondary/30 transition-all duration-200 h-full relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary/10 group-hover:bg-primary transition-colors duration-200"></div>
                <div className="text-6xl font-black text-gray-200 absolute -bottom-4 -left-4 z-0 opacity-50 group-hover:text-primary/10 transition-colors duration-200 font-sans">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="text-primary font-bold text-lg mb-4 font-sans">{item.step}</div>
                  <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}