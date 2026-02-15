import React, { useState, useId } from 'react';
import { FiBook, FiHelpCircle, FiGithub, FiMail, FiMessageCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const contentId = `faq-content-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className={`rounded-2xl transition-all duration-300 mb-3 overflow-hidden border ${
      isOpen 
        ? 'bg-white border-primary/20 shadow-lg scale-[1.01]' 
        : 'bg-white/40 border-white/50 hover:bg-white/60 hover:shadow-sm'
    }`}>
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-right group focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-t-2xl"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={`font-bold text-sm transition-colors flex items-center gap-3 ${isOpen ? 'text-primary' : 'text-dark group-hover:text-primary'}`}>
          <span className={`w-2 h-2 rounded-full transition-colors ${isOpen ? 'bg-primary' : 'bg-gray-300 group-hover:bg-primary/50'}`}></span>
          {question}
        </span>
        <span className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-transparent text-gray-400 group-hover:bg-white group-hover:text-primary'}`}>
           <FiChevronDown size={18} aria-hidden="true" />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div 
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className="px-5 pb-6 pt-0 pl-8"
            >
               <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent mb-4" aria-hidden="true"></div>
               <p className="text-gray-600 text-sm leading-loose text-justify pr-5 border-r-2 border-primary/10">
                 {answer}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Docs() {
  const faqs = [
    {
      q: "آیا تصاویر من ذخیره می‌شوند؟",
      a: "خیر، پردازش تصاویر به صورت آنی (Real-time) انجام شده و پس از تولید گزارش از حافظه موقت سرور پاک می‌شوند. حریم خصوصی اولویت ماست."
    },
    {
      q: "دقت تشخیص چقدر است؟",
      a: "مدل فعلی (Gemini Pro Vision) در تست‌های آزمایشگاهی دقت بالای ۹۸٪ را در شناسایی گیاهان دارویی رایج نشان داده است. با این حال، همواره توصیه می‌شود نتایج توسط متخصص بازبینی شود."
    },
    {
      q: "آیا این سیستم جایگزین پزشک است؟",
      a: "خیر، POYA یک ابزار کمک‌تشخیصی است. تمامی اطلاعات ارائه شده جنبه آموزشی و اطلاع‌رسانی دارد و نباید مبنای اصلی تصمیم‌گیری‌های حیاتی پزشکی قرار گیرد."
    },
    {
      q: "چه نوع گیاهانی قابل شناسایی هستند؟",
      a: "دیتابیس فعلی شامل بیش از ۵۰۰ گونه گیاه دارویی بومی ایران و گیاهان رایج جهانی است. سیستم قادر است گیاهان خشک شده، تازه و حتی پودرهای با بافت مشخص را با دقت مناسبی شناسایی کند."
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-black text-dark mb-4">مرکز <span className="text-gradient">پشتیبانی</span></h1>
           <p className="text-muted">مستندات فنی، راهنما و ارتباط با توسعه‌دهندگان</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="glass-card p-8 rounded-[2rem] border border-white/60 hover:-translate-y-1 transition-transform h-fit">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6" aria-hidden="true"><FiBook /></div>
              <h2 className="text-xl font-bold text-dark mb-4">راهنمای شروع سریع</h2>
              <ul className="space-y-4 text-gray-600 text-sm">
                 <li className="flex items-start gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm shadow-primary/30" aria-hidden="true">1</span>
                    <span>ورود به بخش "دمو" یا "پایگاه دانش" از منوی اصلی.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm shadow-primary/30" aria-hidden="true">2</span>
                    <span>آپلود تصویر گیاه یا تایپ سوال در چت‌بات.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm shadow-primary/30" aria-hidden="true">3</span>
                    <span>مشاهده گزارش آنالیز و دانلود فایل PDF خروجی.</span>
                 </li>
              </ul>
           </div>

           <div className="glass-card p-8 rounded-[2rem] border border-white/60 hover:-translate-y-1 transition-transform h-fit">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary text-2xl mb-6" aria-hidden="true"><FiHelpCircle /></div>
              <h2 className="text-xl font-bold text-dark mb-6">سوالات متداول</h2>
              <div className="space-y-2">
                 {faqs.map((faq, i) => (
                   <FaqItem key={i} question={faq.q} answer={faq.a} />
                 ))}
              </div>
           </div>
        </div>

        {/* Contact Section */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-dark to-slate-800 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-8">ارتباط مستقیم با تیم توسعه</h2>
              <div className="flex flex-wrap justify-center gap-6">
                 <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-sm hover:scale-105 active:scale-95">
                    <FiGithub size={20} aria-hidden="true" /> <span className="font-bold">GitHub</span>
                 </a>
                 <a href="mailto:info@poya.ai" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-sm hover:scale-105 active:scale-95">
                    <FiMail size={20} aria-hidden="true" /> <span className="font-bold">Email</span>
                 </a>
                 <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-sm hover:scale-105 active:scale-95">
                    <FiMessageCircle size={20} aria-hidden="true" /> <span className="font-bold">Telegram</span>
                 </a>
              </div>
           </div>
           
           {/* Decorative */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] mix-blend-overlay" aria-hidden="true"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] mix-blend-overlay" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}