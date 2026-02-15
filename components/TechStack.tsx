import React from 'react';
import AnimatedSection from './AnimatedSection';
import { FiCpu, FiLayers, FiDatabase } from 'react-icons/fi';

export default function TechStack() {
  return (
    <section className="py-24 bg-light">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              معماری سیستم <span dir="ltr" className="font-sans">POYA</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              ساختار مهندسی شده برای دقت بالینی و امنیت داده‌ها
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-divider hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary mb-6">
                <FiCpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Diagnosis Engine</h3>
              <p className="text-muted text-sm leading-relaxed">
                موتور تشخیص مرکزی مبتنی بر شبکه‌های عصبی کانولوشنال (CNN) برای شناسایی دقیق مورفولوژی گیاهان.
              </p>
            </div>
          </AnimatedSection>

          {/* Card 2 */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-divider hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary mb-6">
                <FiLayers size={24} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Multidisciplinary Panel</h3>
              <p className="text-muted text-sm leading-relaxed">
                پنل هوش مصنوعی چندگانه که داده‌های تصویری را با پایگاه دانش فیتوشیمیایی و فارماکولوژیک تطبیق می‌دهد.
              </p>
            </div>
          </AnimatedSection>

          {/* Card 3 */}
          <AnimatedSection delay={0.3}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-divider hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary mb-6">
                <FiDatabase size={24} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Clinical Data Processing</h3>
              <p className="text-muted text-sm leading-relaxed">
                پردازشگر داده‌های بالینی برای استخراج هشدارهای ایمنی، تداخلات دارویی و میزان سمیت.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}