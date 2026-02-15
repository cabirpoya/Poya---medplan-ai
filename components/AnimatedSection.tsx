import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0 
}: { 
  // Fix: Make children optional to resolve TypeScript error about missing children prop in usage
  children?: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}