import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiChevronLeft, 
  FiHome, FiInfo, FiCpu, FiLayers, 
  FiPlayCircle, FiDatabase, FiMessageSquare, FiFileText,
  FiGrid, FiBookOpen
} from 'react-icons/fi';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Dropdown from './Dropdown';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  // Master list for mobile
  const allNavLinks = [
    { path: '/', label: 'خانه', icon: <FiHome /> },
    { path: '/about', label: 'درباره ما', icon: <FiInfo /> },
    { path: '/technology', label: 'فناوری', icon: <FiCpu /> },
    { path: '/demo', label: 'دمو (هوش مصنوعی)', icon: <FiPlayCircle /> },
    { path: '/knowledge-base', label: 'پایگاه دانش', icon: <FiDatabase /> },
    { path: '/chatbot', label: 'چت‌بات هوشمند', icon: <FiMessageSquare /> },
    { path: '/how-it-works', label: 'نحوه کار', icon: <FiLayers /> },
    { path: '/docs', label: 'مستندات', icon: <FiFileText /> },
  ];

  // Grouped for Desktop
  const mainLinks = [
    { path: '/', label: 'خانه', icon: <FiHome /> },
    { path: '/about', label: 'درباره ما', icon: <FiInfo /> },
    { path: '/technology', label: 'فناوری', icon: <FiCpu /> },
  ];

  const servicesLinks = [
    { path: '/demo', label: 'دمو (هوش مصنوعی)', icon: <FiPlayCircle /> },
    { path: '/knowledge-base', label: 'پایگاه دانش', icon: <FiDatabase /> },
    { path: '/chatbot', label: 'چت‌بات هوشمند', icon: <FiMessageSquare /> },
  ];

  const resourceLinks = [
    { path: '/how-it-works', label: 'نحوه کار', icon: <FiLayers /> },
    { path: '/docs', label: 'مستندات', icon: <FiFileText /> },
  ];

  // Mobile Menu Animation Variants
  const menuVariants: Variants = {
    closed: { 
      opacity: 0,
      x: "100%", 
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: { 
      opacity: 1,
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants: Variants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({ 
      x: 0, 
      opacity: 1, 
      transition: { delay: i * 0.05 + 0.2 } 
    })
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className={`rounded-2xl transition-all duration-300 flex justify-between items-center px-6 py-3 ${
            scrolled ? 'glass shadow-soft' : 'bg-transparent'
          }`}>
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="text-2xl font-black flex items-center gap-2 font-sans relative z-40 group" 
              dir="ltr"
              aria-label="POYA MedPlant AI Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white shadow-glow">
                 <span className="text-lg">P</span>
              </div>
              <span className="text-dark group-hover:text-primary transition-colors tracking-tight">MEDPLANT<span className="text-secondary">Ai</span></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2" aria-label="منوی اصلی دسکتاپ">
              {/* Direct Links */}
              {mainLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 relative overflow-hidden ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50/50'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-primary/10 z-[-1]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Dropdowns */}
              <Dropdown label="ابزارها" icon={<FiGrid className="text-lg" aria-hidden="true" />} items={servicesLinks} />
              <Dropdown label="منابع" icon={<FiBookOpen className="text-lg" aria-hidden="true" />} items={resourceLinks} />
              
              <div className="w-px h-6 bg-gray-200 mx-2" aria-hidden="true"></div>

              <Link 
                to="/demo" 
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-glow transition-all active:scale-95 flex items-center gap-2 text-sm"
                aria-label="شروع تحلیل هوشمند"
              >
                <span>شروع تحلیل</span>
                <FiPlayCircle className="w-4 h-4" aria-hidden="true" />
              </Link>
            </nav>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center z-40">
               <button 
                className="p-2.5 rounded-xl bg-white/50 text-dark border border-white/20 hover:bg-white transition-colors backdrop-blur-sm"
                onClick={() => setIsMenuOpen(true)}
                aria-label="باز کردن منو"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <FiMenu size={22} aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] lg:hidden flex flex-col h-full w-full overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
          >
             <div className="flex justify-between items-center p-6 border-b border-gray-100/50">
               <span className="font-bold text-dark text-xl tracking-tight">فهرست</span>
               <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="بستن منو"
                >
                  <FiX size={20} aria-hidden="true" />
               </button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-2">
               {allNavLinks.map((link, i) => (
                 <motion.div
                   key={link.path}
                   custom={i}
                   variants={itemVariants}
                 >
                   <Link
                     to={link.path}
                     onClick={() => setIsMenuOpen(false)}
                     className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all border ${
                       isActive(link.path) 
                         ? 'bg-primary/5 text-primary border-primary/20' 
                         : 'bg-transparent text-gray-600 border-transparent hover:bg-gray-50'
                     }`}
                     aria-current={isActive(link.path) ? 'page' : undefined}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${
                        isActive(link.path) ? 'bg-primary text-white shadow-glow' : 'bg-gray-100 text-gray-400'
                     }`}>
                        {link.icon}
                     </div>
                     <span className="flex-1">{link.label}</span>
                     {isActive(link.path) && <FiChevronLeft aria-hidden="true" />}
                   </Link>
                 </motion.div>
               ))}

               <motion.div
                 variants={itemVariants}
                 custom={allNavLinks.length}
                 className="pt-8"
               >
                 <Link 
                   to="/demo"
                   onClick={() => setIsMenuOpen(false)}
                   className="block w-full bg-gradient-to-r from-primary to-secondary text-white py-5 rounded-2xl font-bold text-center text-xl shadow-glow active:scale-95 transition-transform flex items-center justify-center gap-3"
                 >
                   <span>تحلیل هوشمند</span>
                   <FiPlayCircle aria-hidden="true" />
                 </Link>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}