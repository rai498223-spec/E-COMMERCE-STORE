import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export const LookbookModal: React.FC = () => {
  const { isLookbookOpen, setIsLookbookOpen, setSelectedProductForModal } = useShop();

  if (!isLookbookOpen) return null;

  const lookbookEdits = [
    {
      title: "Look 01: The Lahore Garden Soiree",
      subtitle: "Breeze & Blossom in Sage Chikankari",
      product: PRODUCTS[0],
      drapeStyle: "Single-Shoulder Cascading Dupatta",
      drapeTips: "Pleat the organza dupatta along its length, pinning softly at the left shoulder. Let the embroidered scallop edge trail naturally down your arm.",
      footwear: "Gold tilla hand-embroidered Lahore khussas",
      jewelry: "Raw freshwater pearl drop earrings and thin gold bangles",
    },
    {
      title: "Look 02: Midsummer Chai in Shalimar",
      subtitle: "Heirloom Pima Lawn with Pure Silk Dupatta",
      product: PRODUCTS[1],
      drapeStyle: "Double-Arm Floating Wrap",
      drapeTips: "Let the light silk dupatta rest across both elbows, allowing the digital Kashmiri floral motifs to catch the warm natural sunlight.",
      footwear: "Neutral leather mules or pointed kolhapuris",
      jewelry: "Minimalist ruby & uncut polki studs",
    },
    {
      title: "Look 03: The Zamurrad Royal Soirée",
      subtitle: "Emerald Festive Lawn with Golden Tilla & Peach Floss",
      product: PRODUCTS[2],
      drapeStyle: "Regal Scalloped Arm Drape",
      drapeTips: "Drape the scalloped organza dupatta over one arm, letting the peach resham embroidery contrast against the deep emerald cotton net.",
      footwear: "Embroidered velvet block heels or rose gold juttis",
      jewelry: "Antique emerald teardrop jhumkis with micro pearl accents",
    },
    {
      title: "Look 04: The Summer Eid Courtyard",
      subtitle: "Regal Ivory & Antique Gota Patti Angrakha",
      product: PRODUCTS[3],
      drapeStyle: "Regal Pleated Front Pallu",
      drapeTips: "Drape across the chest in an angrakha contour, pinning the kiran lace dupatta over the right shoulder for a traditional Mughal silhouette.",
      footwear: "Antique gold mirrored high block heels",
      jewelry: "Heirloom multi-tier jhumkas and delicate chaandbali",
    },
    {
      title: "Look 05: Sunset Saffron in Anarkali",
      subtitle: "Warm Marigold Jacquard with Pure Silk",
      product: PRODUCTS[4],
      drapeStyle: "Diagonal Regal Shoulder Throw",
      drapeTips: "Pin cleanly on the left shoulder and let the illustrated pure silk dupatta billow behind as you walk through summer gardens.",
      footwear: "Mustard hand-stitched Multani khussas",
      jewelry: "Warm brass filigree rings and delicate kundan necklace",
    },
    {
      title: "Look 06: The Indus River Indigo",
      subtitle: "Traditional Chunri Tie-Dye with White Taanka",
      product: PRODUCTS[5],
      drapeStyle: "Breeze Neck Wrap",
      drapeTips: "Wrap gently around the neck with both ends falling equally in front, framing the delicate white shadow-work neckline embroidery.",
      footwear: "Silver gota-trimmed Kolhapuri sandals",
      jewelry: "Oxidized silver tribal cuffs and small silver chaandbalis",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#F7EAE0] border border-[#F9D2BA] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 bg-[#1D4533] text-[#F7EAE0] flex items-center justify-between border-b border-[#153426]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F9D2BA] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Styling Lookbook</span>
            </div>
            <h2 className="font-serif text-2xl font-light mt-1">
              Mausam-e-Gulzar: How to Style Pakistani Summer Lawn
            </h2>
          </div>

          <button
            onClick={() => setIsLookbookOpen(false)}
            className="text-[#F9D2BA]/70 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Close lookbook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-12">
          {lookbookEdits.map((edit, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-[#F9D2BA] last:border-b-0"
            >
              <div className="md:col-span-5 relative aspect-[3/4] bg-white overflow-hidden border border-[#F9D2BA] shadow-sm">
                <img
                  src={edit.product.images[0]}
                  alt={edit.title}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#1D4533]/90 backdrop-blur-xs p-2 text-[#F7EAE0] text-[11px] flex justify-between items-center">
                  <span className="font-serif">{edit.product.name}</span>
                  <span className="text-[#F9D2BA] font-semibold">{edit.product.urduName}</span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 text-xs text-[#5E3122]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#5E3122] font-semibold">
                    {edit.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#1D4533] mt-1">
                    {edit.title}
                  </h3>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="p-3 bg-white border border-[#F9D2BA]">
                    <strong className="block text-[#1D4533] uppercase text-[10px] tracking-wider mb-0.5">
                      Dupatta Drape: {edit.drapeStyle}
                    </strong>
                    <p className="text-[11px] leading-relaxed text-[#5E3122]/80">
                      {edit.drapeTips}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-white border border-[#F9D2BA]">
                      <strong className="block text-[#1D4533] text-[10px] uppercase">Footwear Pairing</strong>
                      <span className="text-[#5E3122]/80">{edit.footwear}</span>
                    </div>

                    <div className="p-2.5 bg-white border border-[#F9D2BA]">
                      <strong className="block text-[#1D4533] text-[10px] uppercase">Jewelry Accents</strong>
                      <span className="text-[#5E3122]/80">{edit.jewelry}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsLookbookOpen(false);
                      setSelectedProductForModal(edit.product);
                    }}
                    className="px-5 py-2.5 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 rounded cursor-pointer"
                  >
                    <span>Inspect & Shop This Look</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F9D2BA]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
