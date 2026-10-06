import React from 'react';
import heroImg from '../assets/images/hero_pakistan_summer_lawn_1791269454912.jpg';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCollection: (category?: string) => void;
  onOpenTailoring: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenTailoring }) => {
  return (
    <section id="hero" className="relative w-full bg-[#1D4533] text-[#F7EAE0] overflow-hidden">
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center">
        <img
          src={heroImg}
          alt="Pakistani woman wearing luxury pastel summer lawn three-piece suit with embroidered chiffon dupatta in a Lahore Mughal courtyard"
          className="absolute inset-0 w-full h-full object-cover object-[center_28%] opacity-90 transition-transform duration-1000 scale-100 hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Scrims tailored to Emerald (#1D4533) and Henna (#5E3122) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D4533]/95 via-[#1D4533]/70 to-[#5E3122]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D4533] via-transparent to-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#F9D2BA] font-medium">
              <span>SANAVA</span>
              <span aria-hidden="true">·</span>
              <span>Mausam-e-Gulzar</span>
              <span aria-hidden="true">·</span>
              <span>Summer Lawn Edit 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F7EAE0] leading-[1.12] text-balance">
              The Poetry of Pakistani Summer Lawn
            </h1>

            <p className="text-sm sm:text-base text-[#F7EAE0]/90 leading-relaxed max-w-xl font-normal">
              Heirloom 80s count combed cotton lawn, woven to breathe under midsummer heat.
              Intricately accented with Multani shadow-work, delicate organza borders, and
              hand-painted pure silk dupattas celebrating timeless Pakistani grace.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreCollection()}
                className="px-6 py-3.5 bg-[#F7EAE0] text-[#1D4533] hover:bg-white text-xs font-semibold uppercase tracking-widest transition-all rounded shadow-md flex items-center gap-2 cursor-pointer group"
              >
                <span>Shop Summer Lawn</span>
                <ArrowRight className="w-4 h-4 text-[#5E3122] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenTailoring()}
                className="px-6 py-3.5 border border-[#F9D2BA] hover:border-white text-[#F7EAE0] hover:bg-white/10 text-xs font-semibold uppercase tracking-widest transition-all rounded cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F9D2BA]" />
                <span>Bespoke Tailoring Studio</span>
              </button>
            </div>

            <div className="pt-8 border-t border-[#F9D2BA]/25 grid grid-cols-3 gap-4 text-xs text-[#F7EAE0]/80">
              <div>
                <p className="font-serif text-lg text-[#F9D2BA] font-medium">80s Pima</p>
                <p className="text-[11px] text-[#F7EAE0]/70">High-breathability lawn</p>
              </div>
              <div>
                <p className="font-serif text-lg text-[#F9D2BA] font-medium">3-Piece</p>
                <p className="text-[11px] text-[#F7EAE0]/70">Unstitched & Pret sizes</p>
              </div>
              <div>
                <p className="font-serif text-lg text-[#F9D2BA] font-medium">Worldwide</p>
                <p className="text-[11px] text-[#F7EAE0]/70">Pakistan & DHL global</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
