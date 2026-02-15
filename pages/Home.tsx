import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import HowItWorksSection from '../components/HowItWorksSection';
import TechStack from '../components/TechStack';
import AnimatedSection from '../components/AnimatedSection';
import { FiShield, FiActivity, FiSearch, FiHexagon, FiAlertCircle, FiCpu, FiArrowLeft, FiCheckCircle, FiLayers } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Blobs (Static now, reduced opacity) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* TEXT CONTENT */}
            <div className="flex-1 text-center lg:text-right">
              <AnimatedSection delay={0}>
                 <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-full px-4 py-1.5 text-sm font-bold text-primary mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>نسل جدید هوش مصنوعی پزشکی</span>
                 </div>
                 <h1 className="text-5xl lg:text-7xl font-black text-dark mb-6 leading-tight tracking-tight">
                   طبیعت را با
                   <br/>
                   <span className="text-gradient">چشم هوش مصنوعی</span>
                   <br/>
                   ببینید.
                 </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={0.1}>
                <p className="text-lg text-muted mb-10 max-w-xl mx-auto lg:mx-0 leading-loose">
                  سامانه هوشمند <span dir="ltr" className="font-bold text-dark">POYA</span>، دستیار تخصصی شما برای شناسایی گیاهان دارویی، تحلیل ترکیبات شیمیایی و بررسی ایمنی مصرف با دقت بالینی.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    to="/demo" 
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                  >
                    <span>شروع تحلیل رایگان</span>
                    <FiArrowLeft />
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="bg-white/50 hover:bg-white text-dark border border-white/60 hover:border-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                  >
                    چگونه کار می‌کند؟
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* VISUAL CONTENT (Cleaned Up) */}
            <div className="flex-1 w-full max-w-md lg:max-w-lg mx-auto">
              <AnimatedSection delay={0.3}>
                 {/* Main Static Card */}
                 <div className="glass-card rounded-3xl p-0 overflow-hidden shadow-2xl border border-white/60 bg-white/40 backdrop-blur-xl">
                    
                    {/* Card Header */}
                    <div className="bg-white/50 border-b border-gray-100 p-5 flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                             <FiCheckCircle size={20} />
                          </div>
                          <div>
                             <h3 className="font-bold text-dark text-base">گزارش آنالیز نهایی</h3>
                             <p className="text-xs text-muted font-mono" dir="ltr">ID: #POYA-8821</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          تایید شده
                       </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                       {/* Plant Details */}
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <h2 className="text-2xl font-black text-dark mb-1">بابونه شیرازی</h2>
                             <p className="text-sm text-muted font-sans italic mb-3" dir="ltr">Matricaria chamomilla</p>
                             <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                                <FiActivity />
                                <span>دقت تشخیص: 99.8%</span>
                             </div>
                          </div>
                          <div className="text-right">
                             <span className="block text-xs text-muted mb-1">خانواده</span>
                             <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold">کاسنیان</span>
                          </div>
                       </div>

                       {/* Analysis Grid */}
                       <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/60 p-4 rounded-2xl border border-white/50 hover:bg-white transition-colors">
                             <div className="flex items-center gap-2 text-primary mb-2">
                                <FiActivity className="text-lg" />
                                <span className="text-xs font-bold text-gray-500">خواص اصلی</span>
                             </div>
                             <div className="font-bold text-dark text-sm">ضد التهاب، آرامبخش</div>
                          </div>
                          <div className="bg-white/60 p-4 rounded-2xl border border-white/50 hover:bg-white transition-colors">
                             <div className="flex items-center gap-2 text-secondary mb-2">
                                <FiHexagon className="text-lg" />
                                <span className="text-xs font-bold text-gray-500">ترکیبات موثر</span>
                             </div>
                             <div className="font-bold text-dark text-sm">بیزابولول، آزولن</div>
                          </div>
                       </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex justify-between items-center text-xs">
                       <div className="flex items-center gap-2 text-muted">
                          <FiCpu />
                          <span>پردازش شده توسط هسته <span className="font-bold font-sans">POYA AI</span></span>
                       </div>
                       <div className="text-gray-400 font-mono">
                          {new Date().toLocaleDateString('fa-IR')}
                       </div>
                    </div>
                 </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS */}
      <section className="py-10 border-y border-white/50 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { icon: <FiShield />, val: "100%", label: "امنیت داده‌ها" },
               { icon: <FiActivity />, val: "99.9%", label: "دقت تشخیص" },
               { icon: <FiCpu />, val: "+50k", label: "پارامتر مدل" },
               { icon: <FiHexagon />, val: "24/7", label: "در دسترس" },
             ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center justify-center text-center group">
                 <div className="text-3xl text-primary/50 group-hover:text-primary transition-colors mb-2">{stat.icon}</div>
                 <div className="font-black text-2xl text-dark font-sans">{stat.val}</div>
                 <div className="text-sm text-muted">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-dark mb-4">ویژگی‌های پلتفرم</h2>
            <p className="text-muted max-w-xl mx-auto">ترکیبی از دانش سنتی گیاه‌شناسی و قدرت پردازش مدرن</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <FeatureCard 
                icon={<FiSearch />}
                title="تشخیص هوشمند"
                description="شناسایی دقیق گونه‌های گیاهی با الگوریتم‌های بینایی ماشین پیشرفته و تطبیق مورفولوژیک."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <FeatureCard 
                icon={<FiHexagon />}
                title="تحلیل فیتوشیمیایی"
                description="استخراج پروفایل شیمیایی گیاه و بررسی ترکیبات موثره دارویی موجود در بافت."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <FeatureCard 
                icon={<FiAlertCircle />}
                title="ایمنی و سمیت"
                description="بررسی آنی تداخلات دارویی، عوارض جانبی و هشدارهای مصرف برای بیماران خاص."
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. OTHER SECTIONS */}
      <HowItWorksSection />
      <TechStack />

      {/* 5. CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-emerald-800 p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
             
             <div className="relative z-10">
               <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 tracking-tight">
                 آینده پزشکی گیاهی را امروز تجربه کنید
               </h2>
               <Link 
                  to="/demo" 
                  className="inline-block bg-white text-primary hover:bg-gray-50 font-bold py-4 px-10 rounded-2xl transition-transform hover:scale-105 shadow-xl"
                >
                  شروع رایگان
               </Link>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}