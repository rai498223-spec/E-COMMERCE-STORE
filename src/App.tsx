import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionGrid } from './components/CollectionGrid';
import { HeritageStory } from './components/HeritageStory';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomTailoringModal } from './components/CustomTailoringModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookModal } from './components/LookbookModal';
import { FabricGuideModal } from './components/FabricGuideModal';
import { Toast } from './components/Toast';
import { Product } from './types';
import { PRODUCTS } from './data/products';
import { Sparkles, Scissors, Feather, Compass } from 'lucide-react';

const MainShop: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useShop();

  const [customTailorTarget, setCustomTailorTarget] = useState<Product | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'summer-lawn') {
      setActiveCategoryFilter('Summer Lawn 3-Piece');
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'chikankari') {
      setActiveCategoryFilter('Handcrafted Chikankari');
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'festive-pret') {
      setActiveCategoryFilter('Festive Pret');
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'craftsmanship') {
      const el = document.getElementById('craftsmanship');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreHero = (category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
    }
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTailoringStudio = () => {
    setCustomTailorTarget(PRODUCTS[0]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7EAE0] text-[#1D4533] selection:bg-[#F9D2BA] selection:text-[#1D4533]">
      <Header onNavigate={handleNavigate} />

      <main className="flex-1">
        <Hero
          onExploreCollection={handleExploreHero}
          onOpenTailoring={handleOpenTailoringStudio}
        />

        {/* Heritage Trust Feature Strip with Palette */}
        <section aria-label="Heritage Highlights" className="border-b border-[#F9D2BA] bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#5E3122]">
              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F9D2BA]/30 text-[#1D4533] rounded shrink-0">
                  <Feather className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#1D4533]">80s Pima Combed Lawn</h3>
                  <p className="text-[11px] text-[#5E3122]/75 mt-0.5">
                    Engineered for high breathability under 40°C South Asian summers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F9D2BA]/30 text-[#1D4533] rounded shrink-0">
                  <Scissors className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#1D4533]">Bespoke Master Tailoring</h3>
                  <p className="text-[11px] text-[#5E3122]/75 mt-0.5">
                    Choose unstitched 3-piece fabric or bespoke stitching to your exact inches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F9D2BA]/30 text-[#1D4533] rounded shrink-0">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#1D4533]">Multani Needlecraft Guilds</h3>
                  <p className="text-[11px] text-[#5E3122]/75 mt-0.5">
                    Authentic shadow work chikankari, Marori, and Bahawalpuri gota patti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-[#F9D2BA]/30 text-[#1D4533] rounded shrink-0">
                  <Compass className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#1D4533]">Domestic COD & Global DHL</h3>
                  <p className="text-[11px] text-[#5E3122]/75 mt-0.5">
                    Cash on delivery nationwide across Pakistan; express delivery to UK, US, UAE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CollectionGrid
          onSelectProduct={(p) => setSelectedProductForModal(p)}
          activeCategoryFilter={activeCategoryFilter}
          onCategoryChange={setActiveCategoryFilter}
        />

        <HeritageStory />
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onOpenCustomTailoring={(p) => setCustomTailorTarget(p)}
      />

      <CustomTailoringModal
        product={customTailorTarget}
        onClose={() => setCustomTailorTarget(null)}
      />

      <CartDrawer />
      <WishlistDrawer />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <LookbookModal />
      <FabricGuideModal />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainShop />
    </ShopProvider>
  );
}
