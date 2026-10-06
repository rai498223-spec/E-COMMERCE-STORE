import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES } from '../data/products';
import { CurrencyCode } from '../types';
import { SanavaLogo } from './SanavaLogo';
import { ShoppingBag, Heart, Menu, X, ChevronDown, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const {
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsLookbookOpen,
    setIsFabricGuideOpen,
  } = useShop();

  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7EAE0]/95 backdrop-blur-md border-b border-[#F9D2BA] transition-all">
      {/* Promotional Announcement Banner */}
      {!isBannerDismissed && (
        <aside aria-label="Announcement" className="bg-[#1D4533] text-[#F7EAE0] text-xs py-2 px-4 flex items-center justify-between border-b border-[#153426]">
          <div className="flex-1 text-center font-medium tracking-wide">
            <span>SANAVA Summer '26: Complimentary Nationwide Express Delivery over Rs. 15,000</span>
            <span className="hidden md:inline text-[#F9D2BA] ml-2 font-semibold">· Use code SUMMERGULZAR for 10% off</span>
          </div>
          <button
            onClick={() => setIsBannerDismissed(true)}
            className="text-[#F9D2BA]/70 hover:text-white transition-colors ml-2 p-0.5 cursor-pointer"
            aria-label="Dismiss announcement banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Strict 3-Zone Top Navigation Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: SANAVA Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="cursor-pointer"
          aria-label="SANAVA Women's Clothing Home"
        >
          <SanavaLogo variant="header" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium tracking-wider uppercase text-[#5E3122]">
          <button
            onClick={() => handleNavClick('summer-lawn')}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap"
          >
            Summer Lawn
          </button>
          <button
            onClick={() => handleNavClick('chikankari')}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap"
          >
            Chikankari
          </button>
          <button
            onClick={() => handleNavClick('festive-pret')}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap"
          >
            Festive Pret
          </button>
          <button
            onClick={() => handleNavClick('craftsmanship')}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap"
          >
            Artisanship
          </button>
          <button
            onClick={() => setIsLookbookOpen(true)}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5E3122]" />
            Lookbook
          </button>
          <button
            onClick={() => setIsFabricGuideOpen(true)}
            className="hover:text-[#1D4533] py-1 border-b border-transparent hover:border-[#1D4533] transition-all cursor-pointer whitespace-nowrap text-[#5E3122]/80"
          >
            Fabric Guide
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative">
            <button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              className="flex items-center gap-1 text-xs font-medium text-[#1D4533] hover:text-[#5E3122] py-1.5 px-2.5 rounded border border-[#F9D2BA] bg-white transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              aria-label="Select Currency"
            >
              <Globe className="w-3 h-3 text-[#5E3122]" />
              <span className="font-semibold">{currency.code}</span>
              <ChevronDown className="w-3 h-3 text-[#5E3122]/60" />
            </button>

            {isCurrencyMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-[#F9D2BA] rounded shadow-lg py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-[#5E3122]/60 border-b border-[#F9D2BA]/30">
                  Select Currency
                </div>
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code as CurrencyCode);
                      setIsCurrencyMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7EAE0] transition-colors cursor-pointer ${
                      currency.code === c.code ? 'font-semibold text-[#1D4533] bg-[#F7EAE0]/60' : 'text-[#5E3122]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-stone-400 font-normal">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#1D4533] hover:text-[#5E3122] transition-colors cursor-pointer"
            aria-label="View Saved Favorites"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#5E3122] text-[#F7EAE0] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] px-3.5 py-2 rounded text-xs font-medium tracking-wider transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#F9D2BA]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-semibold tabular-nums text-[#F9D2BA]">({cartCount})</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1D4533] hover:text-[#5E3122] cursor-pointer"
            aria-label="Toggle Mobile Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#F9D2BA] bg-[#F7EAE0] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wide uppercase text-[#5E3122]">
            <button
              onClick={() => handleNavClick('summer-lawn')}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] cursor-pointer"
            >
              Summer Lawn 3-Piece
            </button>
            <button
              onClick={() => handleNavClick('chikankari')}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] cursor-pointer"
            >
              Handcrafted Chikankari
            </button>
            <button
              onClick={() => handleNavClick('festive-pret')}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] cursor-pointer"
            >
              Festive Eid Pret
            </button>
            <button
              onClick={() => handleNavClick('craftsmanship')}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] cursor-pointer"
            >
              Indus Textile Craftsmanship
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsLookbookOpen(true);
              }}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] flex items-center justify-between cursor-pointer"
            >
              <span>Summer Lookbook</span>
              <Sparkles className="w-4 h-4 text-[#5E3122]" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFabricGuideOpen(true);
              }}
              className="text-left py-2 border-b border-[#F9D2BA]/50 hover:text-[#1D4533] cursor-pointer"
            >
              Pakistani Lawn Care & Fabric Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
