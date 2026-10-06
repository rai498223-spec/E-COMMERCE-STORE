import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    formatPrice,
    addToCart,
    setSelectedProductForModal,
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7EAE0] border-l border-[#F9D2BA] shadow-2xl flex flex-col">
          <div className="p-5 border-b border-[#F9D2BA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#5E3122] fill-[#5E3122]" />
              <h2 className="font-serif text-lg font-medium text-[#1D4533]">
                Saved Creations ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 text-[#5E3122]/60 hover:text-[#1D4533] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-10 h-10 mx-auto text-[#5E3122]/30 stroke-[1.2]" />
                <p className="font-serif text-lg text-[#1D4533]">Your wishlist is empty</p>
                <p className="text-xs text-[#5E3122]/70">
                  Click the heart icon on any piece to save your favorite summer ensembles.
                </p>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-[#F9D2BA] shadow-2xs relative"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover object-top border border-[#F9D2BA] shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProductForModal(product);
                    }}
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              setSelectedProductForModal(product);
                            }}
                            className="font-serif text-sm font-semibold text-[#1D4533] cursor-pointer hover:text-[#5E3122]"
                          >
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-[#5E3122]/70 block">{product.category}</span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#5E3122]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="font-serif font-semibold text-sm text-[#1D4533] mt-1 tabular-nums">
                        {formatPrice(product.basePricePKR)}
                      </p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(product, 'unstitched');
                          toggleWishlist(product.id);
                        }}
                        className="flex-1 py-1.5 px-2 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-[11px] font-medium tracking-wide flex items-center justify-center gap-1.5 cursor-pointer rounded"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#F9D2BA]" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
