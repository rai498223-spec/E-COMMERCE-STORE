import React from 'react';
import craftDetailImg from '../assets/images/craft_artisanal_embroidery_1791269515540.jpg';
import { ARTISANAL_NOTES, REVIEWS_DATA } from '../data/products';
import { Sparkles, Star } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 bg-[#F7EAE0] border-y border-[#F9D2BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] bg-white border border-[#F9D2BA] overflow-hidden shadow-lg">
              <img
                src={craftDetailImg}
                alt="Close-up macro detail of handcrafted Pakistani cotton lawn showing fine needlework chikankari and organza cutwork"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#5E3122]/80">
              <span>Hand-worked Taanka on 80s combed lawn</span>
              <span>Bahawalpur & Multan Guilds</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#5E3122] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#5E3122]" />
              <span>Cultural Heritage & Artisanship</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1D4533] leading-tight text-balance">
              The Living Legacy of Pakistani Summer Textiles
            </h2>

            <p className="text-sm text-[#5E3122]/85 leading-relaxed">
              {ARTISANAL_NOTES.craftsmanshipStory}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-[#F9D2BA]">
              <div className="space-y-1.5">
                <span className="font-serif text-base font-semibold text-[#1D4533] block">
                  80s Combed Lawn
                </span>
                <p className="text-[11px] text-[#5E3122]/80 leading-normal">
                  Micro-fine yarns that absorb moisture and breathe in 40°C heat without clinging.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-serif text-base font-semibold text-[#1D4533] block">
                  Heirloom Needlecraft
                </span>
                <p className="text-[11px] text-[#5E3122]/80 leading-normal">
                  Multani shadow-work, delicate bakhiya, and Bahawalpuri gota patti sewn by master craftswomen.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-serif text-base font-semibold text-[#1D4533] block">
                  Fluid Silk Dupattas
                </span>
                <p className="text-[11px] text-[#5E3122]/80 leading-normal">
                  Generous 2.5m bamber chiffon and pure silk dupattas designed for regal cultural draping.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-[#F9D2BA]">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#5E3122] font-semibold">
              Voice of the Diaspora & Homeland
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1D4533]">
              Worn with Pride Worldwide
            </h3>
            <p className="text-xs text-[#5E3122]/80">
              From summer garden parties in Lahore to diaspora celebrations in London and Dubai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 border border-[#F9D2BA] flex flex-col justify-between shadow-xs hover:border-[#1D4533] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-[#5E3122] gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h4 className="font-serif text-base font-semibold text-[#1D4533]">
                    "{rev.title}"
                  </h4>

                  <p className="text-xs text-[#5E3122]/85 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F9D2BA]/30 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#1D4533]">{rev.author}</p>
                    <p className="text-[11px] text-[#5E3122]/70">{rev.city}</p>
                  </div>
                  <span className="text-[10px] text-[#1D4533] bg-[#F9D2BA]/30 px-2 py-0.5 border border-[#F9D2BA]">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
