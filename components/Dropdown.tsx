import React, { useState, useRef, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  label: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
}

export default function Dropdown({ label, icon, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const buttonId = `dropdown-button-${dropdownId}`;
  const menuId = `dropdown-menu-${dropdownId}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary/20 select-none ${
          isOpen 
            ? 'bg-primary/10 text-primary' 
            : 'text-gray-800 hover:text-primary hover:bg-gray-50'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
      >
        {icon && <span className="text-lg" aria-hidden="true">{icon}</span>}
        <span>{label}</span>
        <FiChevronDown 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'text-gray-600 group-hover:text-primary'}`} 
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-card border border-white/40 overflow-hidden ring-1 ring-black/5 origin-top-right"
            role="menu"
            aria-labelledby={buttonId}
            aria-orientation="vertical"
          >
            <div className="p-2 space-y-1">
              {items.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all group focus:bg-primary/5 focus:outline-none"
                  role="menuitem"
                >
                  {item.icon && (
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-lg" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-right">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}