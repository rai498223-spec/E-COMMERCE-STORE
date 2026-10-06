import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    formatPrice,
    subtotalPKR,
    discountPKR,
    shippingPKR,
    totalPKR,
    discountApplied,
    discountCode,
    applyDiscount,
    removeDiscount,
    setIsCheckoutOpen,
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThresholdPKR = 15000;
  const progressToFreeShipping = Math.min(100, (subtotalPKR / freeShippingThresholdPKR) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdPKR - subtotalPKR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyDiscount(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7EAE0] border-l border-[#F9D2BA] shadow-2xl flex flex-col">
          <div className="p-5 border-b border-[#F9D2BA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1D4533]" />
              <h2 className="font-serif text-lg font-medium text-[#1D4533]">
                Your Summer Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#5E3122]/60 hover:text-[#1D4533] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-3 bg-[#F9D2BA]/25 border-b border-[#F9D2BA] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#5E3122]">
                Add <strong className="text-[#1D4533] font-semibold">{formatPrice(remainingForFreeShipping)}</strong> more for free nationwide delivery!
              </p>
            ) : (
              <p className="text-[#1D4533] font-semibold flex items-center gap-1.5">
                <span>✓</span> You have unlocked complimentary nationwide delivery!
              </p>
            )}
            <div className="w-full bg-white h-1.5 mt-2 rounded-full overflow-hidden border border-[#F9D2BA]">
              <div
                className="bg-[#1D4533] h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 mx-auto text-[#5E3122]/30 stroke-[1.2]" />
                <p className="font-serif text-lg text-[#1D4533]">Your bag is currently empty</p>
                <p className="text-xs text-[#5E3122]/70">
                  Discover the exquisite textures of Pakistani Lawn & Chikankari.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#1D4533] text-[#F7EAE0] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                >
                  Explore Lawn Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#F9D2BA] shadow-2xs relative"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top border border-[#F9D2BA] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-semibold text-[#1D4533] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#5E3122]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#5E3122]/80 mt-1 space-y-0.5">
                        <p className="font-medium text-[#5E3122]">
                          {item.stitchType === 'unstitched'
                            ? 'Unstitched 3-Piece'
                            : item.stitchType === 'ready-to-wear'
                            ? `Ready-to-Wear (Size ${item.selectedSize})`
                            : 'Bespoke Master Tailored'}
                        </p>
                        {item.customMeasurements && (
                          <p className="text-[10px] text-stone-500">
                            Bust: {item.customMeasurements.bust}" · Length: {item.customMeasurements.shirtLength}" ·{' '}
                            {item.customMeasurements.trouserStyle.split(' ')[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F9D2BA]/30">
                      <div className="flex items-center border border-[#F9D2BA]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#5E3122] hover:text-[#1D4533] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-[#1D4533]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#5E3122] hover:text-[#1D4533] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-serif font-semibold text-sm text-[#1D4533] tabular-nums">
                        {formatPrice(item.unitPricePKR * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-[#F9D2BA] bg-white space-y-4">
              {!discountApplied ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E3122]/40" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon: SUMMERGULZAR"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#F9D2BA] rounded focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#F7EAE0] hover:bg-[#F9D2BA] text-[#1D4533] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#F9D2BA]/30 border border-[#F9D2BA] rounded text-xs text-[#1D4533]">
                  <span>Coupon <strong>{discountCode}</strong> Applied (-10%)</span>
                  <button
                    onClick={removeDiscount}
                    className="text-[#5E3122] hover:text-black underline text-[11px] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#5E3122]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1D4533]">{formatPrice(subtotalPKR)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#1D4533] font-medium">
                    <span>Cultural Heritage Discount (10%)</span>
                    <span className="tabular-nums">- {formatPrice(discountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Express Delivery</span>
                  <span className="tabular-nums font-medium">
                    {shippingPKR === 0 ? <strong className="text-[#1D4533]">Complimentary</strong> : formatPrice(shippingPKR)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F9D2BA] flex justify-between text-sm font-semibold text-[#1D4533]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg tabular-nums">{formatPrice(totalPKR)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F9D2BA]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#5E3122]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1D4533]" />
                <span>Cash on Delivery (Pakistan) & Encrypted International Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
