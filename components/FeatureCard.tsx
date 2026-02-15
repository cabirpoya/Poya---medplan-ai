import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 h-full group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-3xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-dark group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted leading-relaxed text-sm">{description}</p>
    </div>
  );
}