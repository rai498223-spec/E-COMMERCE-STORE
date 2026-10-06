import React, { useState } from 'react';
import { Product, CustomMeasurements } from '../types';
import { useShop } from '../context/ShopContext';
import { X, Scissors, Check, Sparkles, HelpCircle } from 'lucide-react';

interface CustomTailoringModalProps {
  product: Product | null;
  onClose: () => void;
}

export const CustomTailoringModal: React.FC<CustomTailoringModalProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice } = useShop();

  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: 38,
    shirtLength: 42,
    waist: 32,
    hips: 42,
    sleeveLength: 21,
    necklineStyle: 'Split V-Keyhole with Tassels',
    sleeveStyle: 'Bell Sleeves with Cutwork Lace',
    trouserStyle: 'Straight Cigarette Trousers',
    specialNotes: '',
  });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, 'custom-stitched', undefined, measurements, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#F7EAE0] border border-[#F9D2BA] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-[#1D4533] text-[#F7EAE0] flex items-center justify-between border-b border-[#153426]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#F9D2BA]/20 text-[#F9D2BA] rounded">
              <Scissors className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                Bespoke Master Tailoring Studio
              </h2>
              <p className="text-xs text-[#F7EAE0]/80">
                Custom cut & organza finishing for: <span className="text-[#F9D2BA] font-semibold">{product.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#F9D2BA]/70 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Close custom tailoring window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6 text-xs text-[#5E3122]">
          <div className="p-4 bg-white border border-[#F9D2BA] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#5E3122] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#1D4533]">Haute Couture Finish Guarantee</p>
              <p className="text-[11px] text-[#5E3122]/80 mt-0.5 leading-relaxed">
                Our in-house master tailors finish each unstitched lawn ensemble with breathable pure mulmul lining,
                scalloped organza daman lace, hand-fastened pearl loops, and custom proportions. Bespoke fee: {formatPrice(4500)}.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-2">
              1. Curate Your Silhouette & Cut
            </h3>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[#1D4533] mb-1.5">
                Neckline Cut
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Split V-Keyhole with Tassels',
                  'Boat Neck with Pearl Loop',
                  'Angrakha Wrap Overlap',
                  'Classic Round with Organza Insert',
                ].map((style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() =>
                      setMeasurements({ ...measurements, necklineStyle: style as any })
                    }
                    className={`p-3 text-left border cursor-pointer transition-all ${
                      measurements.necklineStyle === style
                        ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                        : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#1D4533]">{style}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[#1D4533] mb-1.5">
                Sleeve Styling
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Bell Sleeves with Cutwork Lace',
                  'Straight Fitted with Pearl Buttons',
                  'Flared 3/4 with Organza Borders',
                ].map((style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() =>
                      setMeasurements({ ...measurements, sleeveStyle: style as any })
                    }
                    className={`p-3 text-left border cursor-pointer transition-all ${
                      measurements.sleeveStyle === style
                        ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                        : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#1D4533]">{style}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-[#1D4533] mb-1.5">
                Trouser / Bottom Silhouette
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Straight Cigarette Trousers',
                  'Classic Tulip Shalwar',
                  'Flared Organza Culottes',
                  'Festive Wide-Leg Gharara Pants',
                ].map((style) => (
                  <button
                    type="button"
                    key={style}
                    onClick={() =>
                      setMeasurements({ ...measurements, trouserStyle: style as any })
                    }
                    className={`p-3 text-left border cursor-pointer transition-all ${
                      measurements.trouserStyle === style
                        ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                        : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white'
                    }`}
                  >
                    <p className="font-semibold text-[#1D4533]">{style}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-[#F9D2BA] pb-2">
              <h3 className="font-serif text-base font-semibold text-[#1D4533]">
                2. Exact Proportions (Inches)
              </h3>
              <span className="text-[11px] text-[#5E3122]/70 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> All measurements in inches
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                  Bust / Chest
                </label>
                <div className="flex items-center border border-[#F9D2BA] bg-white">
                  <input
                    type="number"
                    min={30}
                    max={56}
                    value={measurements.bust}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, bust: Number(e.target.value) })
                    }
                    className="w-full p-2 text-center text-xs focus:outline-none text-[#1D4533]"
                    required
                  />
                  <span className="pr-2 text-[#5E3122]/50">in</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                  Waist
                </label>
                <div className="flex items-center border border-[#F9D2BA] bg-white">
                  <input
                    type="number"
                    min={24}
                    max={52}
                    value={measurements.waist}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, waist: Number(e.target.value) })
                    }
                    className="w-full p-2 text-center text-xs focus:outline-none text-[#1D4533]"
                    required
                  />
                  <span className="pr-2 text-[#5E3122]/50">in</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                  Hips
                </label>
                <div className="flex items-center border border-[#F9D2BA] bg-white">
                  <input
                    type="number"
                    min={32}
                    max={60}
                    value={measurements.hips}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, hips: Number(e.target.value) })
                    }
                    className="w-full p-2 text-center text-xs focus:outline-none text-[#1D4533]"
                    required
                  />
                  <span className="pr-2 text-[#5E3122]/50">in</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                  Shirt Length
                </label>
                <div className="flex items-center border border-[#F9D2BA] bg-white">
                  <input
                    type="number"
                    min={36}
                    max={52}
                    value={measurements.shirtLength}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, shirtLength: Number(e.target.value) })
                    }
                    className="w-full p-2 text-center text-xs focus:outline-none text-[#1D4533]"
                    required
                  />
                  <span className="pr-2 text-[#5E3122]/50">in</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                  Sleeve Length
                </label>
                <div className="flex items-center border border-[#F9D2BA] bg-white">
                  <input
                    type="number"
                    min={15}
                    max={26}
                    value={measurements.sleeveLength}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, sleeveLength: Number(e.target.value) })
                    }
                    className="w-full p-2 text-center text-xs focus:outline-none text-[#1D4533]"
                    required
                  />
                  <span className="pr-2 text-[#5E3122]/50">in</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#1D4533] mb-1">
                Custom Tailor Notes (Optional)
              </label>
              <textarea
                value={measurements.specialNotes}
                onChange={(e) =>
                  setMeasurements({ ...measurements, specialNotes: e.target.value })
                }
                placeholder="e.g. Add extra sheer organza at the sleeve cuff; keep side chaak (slits) slightly higher..."
                rows={2}
                className="w-full p-2.5 text-xs bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#F9D2BA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#5E3122]/80">Total with Bespoke Stitching:</p>
              <p className="font-serif text-xl font-semibold text-[#1D4533] tabular-nums">
                {formatPrice(product.basePricePKR + 4500)}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 border border-[#F9D2BA] text-[#5E3122] hover:bg-white text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4 text-[#F9D2BA]" />
                <span>Confirm & Add to Bag</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
