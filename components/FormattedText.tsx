import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export default function FormattedText({ text, className = "text-gray-800" }: FormattedTextProps) {
  // If text is not a string, render it as is
  if (typeof text !== 'string') return <div className={`text-sm leading-relaxed ${className}`}>{text}</div>;

  // Split text by "###" to find sections
  const sections = text.split('###');

  return (
    <div className={`text-sm leading-relaxed ${className}`}>
      {sections.map((section, index) => {
        if (!section.trim()) return null;

        // Split the section into Title (first line) and Content (rest)
        const lines = section.split('\n');
        const title = lines[0].trim(); // First line is the title (was after ###)
        const content = lines.slice(1).join('\n').trim(); // Rest is content

        // Helper to parse inline bolding (**text**)
        const parseBold = (str: string) => {
          const parts = str.split(/(\*\*.*?\*\*)/g);
          return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });
        };

        // If it's the very first section and didn't start with ### (index 0), treat as intro text
        // Otherwise treat first line as Header
        const isHeaderSection = index > 0 || text.trim().startsWith('###');

        return (
          <div key={index} className="mb-4 last:mb-0">
            {isHeaderSection && title && (
              <div className="font-bold text-lg mb-2 flex items-center opacity-90">
                 <span className="w-2 h-2 bg-current rounded-full ml-2 inline-block opacity-50"></span>
                 {title.replace(/\*/g, '')}
              </div>
            )}
            
            {/* If it's not a header section (intro text), render the title line as normal text */}
            {!isHeaderSection && title && (
               <div className="mb-2">{parseBold(title)}</div>
            )}

            {content && (
              <div className={`whitespace-pre-wrap opacity-90 ${isHeaderSection ? 'pr-4 border-r-2 border-current/20 mr-1' : ''}`}>
                {parseBold(content)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}