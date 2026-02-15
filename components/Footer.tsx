import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-divider pt-20 pb-10 mt-auto relative z-10" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-1 font-sans text-dark whitespace-nowrap" dir="ltr">
              <span className="text-primary">POYA</span>
              <span className="text-gray-300">|</span>
              <span>MEDPLANT</span>
              <span className="text-secondary">Ai</span>
            </h3>
            <p className="text-muted text-sm leading-loose">
              اولین سامانه هوشمند تشخیص و تحلیل گیاهان دارویی با رویکرد ایمنی و علمی.
              <br/>
              ترکیبی از هوش مصنوعی و دانش سنتی.
            </p>
          </div>
          
          <nav aria-label="دسترسی سریع">
            <h4 className="text-lg font-bold mb-6 text-dark">دسترسی سریع</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">صفحه اصلی</Link></li>
              <li><Link to="/about" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">درباره ما</Link></li>
              <li><Link to="/technology" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">تکنولوژی‌ها</Link></li>
              <li><Link to="/demo" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">دمو آنلاین</Link></li>
            </ul>
          </nav>
          
          <nav aria-label="منابع">
            <h4 className="text-lg font-bold mb-6 text-dark">منابع</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/docs" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">مستندات فنی</Link></li>
              <li><Link to="/docs" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">API Reference</Link></li>
              <li><Link to="/docs" className="text-muted hover:text-primary transition-colors hover:pl-2 block transition-all">حریم خصوصی</Link></li>
            </ul>
          </nav>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-dark">ارتباط با ما</h4>
            <div className="space-y-4">
               <a href="mailto:info@poya.ai" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100 group cursor-pointer">
                 <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors" aria-hidden="true">✉️</span>
                 <span dir="ltr" className="text-sm font-sans text-muted">info@poya.ai</span>
               </a>
               <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100 group cursor-pointer" aria-label="تلگرام">
                 <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors" aria-hidden="true">✈️</span>
                 <span dir="ltr" className="text-sm font-sans text-muted">@poya_ai</span>
               </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-divider pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p dir="ltr">© 2025 POYA - MEDPLANTAi. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
             <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold" role="status">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
               System Online
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}