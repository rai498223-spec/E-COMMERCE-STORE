import React from 'react';
import logoImg from '../assets/images/sanava_luxury_logo_1791271765141.jpg';

interface SanavaLogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'emblem-full' | 'icon';
  colorTheme?: 'dark' | 'light' | 'gold';
}

export const SanavaLogo: React.FC<SanavaLogoProps> = ({
  className = '',
  variant = 'header',
  colorTheme = 'dark',
}) => {
  if (variant === 'emblem-full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={logoImg}
          alt="SANAVA - Women's Clothing"
          className="w-28 sm:w-36 h-auto object-contain rounded-full shadow-sm border border-[#F9D2BA]/60"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="SANAVA Icon"
          className="w-8 h-8 rounded-full object-cover border border-[#F9D2BA]"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start space-y-2 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#F9D2BA]/50 shrink-0 bg-[#153426] shadow-sm">
            <img
              src={logoImg}
              alt="SANAVA Women's Clothing"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.22em] font-medium text-white leading-none">
              SANAVA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#F9D2BA] mt-1 font-semibold">
              Women's Clothing
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: Header lockup with gold emblem badge + elegant SANAVA wordmark
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Emblem Mark */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#F9D2BA] shrink-0 bg-white shadow-2xs group-hover:border-[#1D4533] transition-colors">
        <img
          src={logoImg}
          alt="SANAVA Emblem"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center">
        <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] font-semibold text-[#1D4533] group-hover:text-[#5E3122] transition-colors leading-none">
          SANAVA
        </span>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#5E3122] font-semibold mt-1">
          Women's Clothing
        </span>
      </div>
    </div>
  );
};
