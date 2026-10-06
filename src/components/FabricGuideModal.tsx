import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Feather, Droplets, Shirt } from 'lucide-react';

export const FabricGuideModal: React.FC = () => {
  const { isFabricGuideOpen, setIsFabricGuideOpen } = useShop();

  if (!isFabricGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#F7EAE0] border border-[#F9D2BA] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-[#1D4533] text-[#F7EAE0] flex items-center justify-between border-b border-[#153426]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F9D2BA] font-semibold">
              Heritage Fabric Encyclopedia
            </span>
            <h2 className="font-serif text-2xl font-light mt-1">
              The Science & Soul of Pakistani Lawn
            </h2>
          </div>

          <button
            onClick={() => setIsFabricGuideOpen(false)}
            className="text-[#F9D2BA]/70 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Close fabric guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8 text-xs text-[#5E3122]">
          <div className="p-4 bg-white border border-[#F9D2BA] flex gap-3">
            <Feather className="w-5 h-5 text-[#5E3122] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-base font-semibold text-[#1D4533]">
                Why Pakistani Lawn is Revered Globally
              </h3>
              <p className="mt-1 leading-relaxed text-[#5E3122]/80">
                Unlike conventional western cotton, Pakistani Lawn is crafted from high-staple Egyptian and Indus valley cotton combed to 80s yarn counts. It produces a whispering, feather-light textile that allows air circulation in 45°C dry heat or humid monsoons, while holding vibrant dyes and intricate needlework without warping.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-1.5 flex items-center gap-2">
              <Shirt className="w-4 h-4 text-[#5E3122]" />
              <span>Anatomy of an Authentic Pakistani 3-Piece Suite</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-[#F9D2BA]">
                <strong className="block text-[#1D4533] uppercase text-[10px] tracking-wider mb-1">
                  1. The Shirt (Kameez)
                </strong>
                <p className="text-[#5E3122]/80 leading-relaxed">
                  3.0 to 3.25 meters of combed lawn. Divided into embroidered front panel, digital printed back, sleeves, and delicate organza daman lace borders.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#F9D2BA]">
                <strong className="block text-[#1D4533] uppercase text-[10px] tracking-wider mb-1">
                  2. The Dupatta
                </strong>
                <p className="text-[#5E3122]/80 leading-relaxed">
                  2.5 meters of diaphanous pure bamber chiffon, soft organza, or 100% pure silk. Designed to drape majestically over shoulders and heads.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#F9D2BA]">
                <strong className="block text-[#1D4533] uppercase text-[10px] tracking-wider mb-1">
                  3. The Trouser (Shalwar)
                </strong>
                <p className="text-[#5E3122]/80 leading-relaxed">
                  2.5 meters of mercerized cotton cambric or cotton-silk, ready to be tailored into cigarette pants, tulip shalwars, or flared ghararas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5E3122]" />
              <span>Historic Artisanal Needlework Stitches</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-[#F9D2BA]">
                <strong className="block text-[#1D4533] text-xs">Multani Chikankari (Bakhiya / Shadow Work)</strong>
                <p className="text-[11px] text-[#5E3122]/80 mt-1">
                  Herringbone stitches worked on the reverse side of sheer mulmul fabric, creating an opaque shadow motif on the front.
                </p>
              </div>

              <div className="p-3 bg-white border border-[#F9D2BA]">
                <strong className="block text-[#1D4533] text-xs">Bahawalpuri Gota Patti & Marori</strong>
                <p className="text-[11px] text-[#5E3122]/80 mt-1">
                  Fine gold and silver metallic ribbons folded into geometric florets and hand-sewn along necklines and borders.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-1.5 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#5E3122]" />
              <span>Care Instructions for South Asian Midsummers</span>
            </h4>

            <div className="p-4 bg-white border border-[#F9D2BA] space-y-2 text-[#5E3122]/80">
              <p>• <strong>First Wash:</strong> Soak unstitched fabric in cold water for 15 minutes before tailoring to prevent post-stitch shrinkage.</p>
              <p>• <strong>Detergent:</strong> Use mild liquid wool-wash or non-bleach detergent to maintain deep botanical hues.</p>
              <p>• <strong>Drying:</strong> Always line-dry in the shade; never dry in harsh direct midday sun to prevent fading of digital florals.</p>
              <p>• <strong>Ironing:</strong> Iron on medium-warm heat with light steam on the reverse side of embroidery.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-[#F9D2BA] flex justify-end">
          <button
            onClick={() => setIsFabricGuideOpen(false)}
            className="px-6 py-2 bg-[#1D4533] text-[#F7EAE0] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-[#153426]"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
