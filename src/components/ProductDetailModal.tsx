import React, { useState } from 'react';
import { Product, StitchType } from '../types';
import { useShop } from '../context/ShopContext';
import { X, Check, Ruler, Scissors, ShieldCheck, Truck, RefreshCw, Star, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCustomTailoring: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomTailoring,
}) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedStitchType, setSelectedStitchType] = useState<StitchType>('unstitched');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'fabric' | 'embroidery' | 'shipping'>('fabric');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const stitchingFees = {
    unstitched: 0,
    'ready-to-wear': 2800,
    'custom-stitched': 4500,
  };

  const currentPricePKR = product.basePricePKR + stitchingFees[selectedStitchType];

  const handleAddToCart = () => {
    if (selectedStitchType === 'custom-stitched') {
      onClose();
      onOpenCustomTailoring(product);
      return;
    }
    addToCart(product, selectedStitchType, selectedSize, undefined, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#F7EAE0] border border-[#F9D2BA] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#1D4533] rounded-full transition-colors shadow-sm cursor-pointer"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto shrink-0 max-h-[500px]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 border overflow-hidden shrink-0 cursor-pointer transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#1D4533] ring-1 ring-[#1D4533]'
                        : 'border-[#F9D2BA] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative aspect-[3/4] bg-white border border-[#F9D2BA] overflow-hidden">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full text-[#1D4533] shadow transition-colors cursor-pointer"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#5E3122] text-[#5E3122]' : ''}`} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E3122]">
                  <span>{product.collection}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.category}</span>
                </div>

                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1D4533] leading-tight">
                    {product.name}
                  </h1>
                  <span className="font-serif text-sm sm:text-base text-[#5E3122]" dir="rtl">
                    {product.urduName}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-[#5E3122]/80">
                  <div className="flex items-center text-[#5E3122]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 font-semibold text-[#1D4533] tabular-nums">{product.rating}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{product.reviewsCount} Verified Customer Reviews</span>
                </div>

                <div className="mt-4 pb-4 border-b border-[#F9D2BA] flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-serif font-semibold text-[#1D4533] tabular-nums">
                      {formatPrice(currentPricePKR)}
                    </span>
                    {selectedStitchType !== 'unstitched' && (
                      <span className="block text-[11px] text-[#5E3122] mt-0.5">
                        Includes {selectedStitchType === 'ready-to-wear' ? 'standard tailoring' : 'master bespoke tailoring'} fee
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-[#1D4533] bg-[#F9D2BA]/40 px-2.5 py-1 border border-[#F9D2BA]">
                    In Stock · Ships in 24h
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <label className="block text-xs uppercase font-semibold tracking-wider text-[#5E3122]">
                    Choose Stitching Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedStitchType('unstitched')}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedStitchType === 'unstitched'
                          ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                          : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white text-[#5E3122]'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#1D4533]">Unstitched</p>
                      <p className="text-[10px] text-[#5E3122]/70 mt-0.5">Fabric + Patches</p>
                      <p className="text-[10px] text-[#5E3122] font-semibold mt-1">Included</p>
                    </button>

                    <button
                      onClick={() => setSelectedStitchType('ready-to-wear')}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedStitchType === 'ready-to-wear'
                          ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                          : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white text-[#5E3122]'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#1D4533]">Ready-to-Wear</p>
                      <p className="text-[10px] text-[#5E3122]/70 mt-0.5">Sizes XS to XL</p>
                      <p className="text-[10px] text-[#5E3122] font-semibold mt-1">+ {formatPrice(2800)}</p>
                    </button>

                    <button
                      onClick={() => setSelectedStitchType('custom-stitched')}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        selectedStitchType === 'custom-stitched'
                          ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                          : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white text-[#5E3122]'
                      }`}
                    >
                      <p className="text-xs font-semibold text-[#1D4533]">Bespoke</p>
                      <p className="text-[10px] text-[#5E3122]/70 mt-0.5">Custom Proportions</p>
                      <p className="text-[10px] text-[#5E3122] font-semibold mt-1">+ {formatPrice(4500)}</p>
                    </button>
                  </div>
                </div>

                {selectedStitchType === 'ready-to-wear' && (
                  <div className="mt-4 pt-3 border-t border-[#F9D2BA]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-semibold tracking-wider text-[#5E3122]">
                        Select Pret Size
                      </span>
                      <button
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-xs text-[#1D4533] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Size Chart (Inches)</span>
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {product.sizesAvailable.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-10 h-10 text-xs font-medium border flex items-center justify-center transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#1D4533] text-[#F7EAE0] border-[#1D4533]'
                              : 'bg-white text-[#5E3122] border-[#F9D2BA] hover:border-[#1D4533]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    {showSizeGuide && (
                      <div className="mt-3 p-3 bg-white border border-[#F9D2BA] text-[11px] text-[#5E3122]">
                        <p className="font-semibold text-[#1D4533] mb-1">Standard Ready-to-Wear Measurements (Inches):</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-center tabular-nums">
                            <thead>
                              <tr className="border-b border-[#F9D2BA] text-[#5E3122]/70">
                                <th className="py-1">Size</th>
                                <th>Chest</th>
                                <th>Shirt Length</th>
                                <th>Trouser</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="font-semibold py-1">XS</td><td>36"</td><td>40"</td><td>37"</td></tr>
                              <tr><td className="font-semibold py-1">S</td><td>38"</td><td>41"</td><td>38"</td></tr>
                              <tr><td className="font-semibold py-1">M</td><td>41"</td><td>42"</td><td>39"</td></tr>
                              <tr><td className="font-semibold py-1">L</td><td>44"</td><td>42"</td><td>40"</td></tr>
                              <tr><td className="font-semibold py-1">XL</td><td>47"</td><td>43"</td><td>40"</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedStitchType === 'custom-stitched' && (
                  <div className="mt-4 p-3 bg-white border border-[#F9D2BA] text-xs text-[#5E3122]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1D4533]">
                      <Scissors className="w-4 h-4 text-[#5E3122]" />
                      <span>Bespoke Tailoring Studio</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#5E3122]/80">
                      Click "Customize & Add" below to enter your exact chest, waist, shirt length, sleeve style
                      (bell with lace or straight fitted), and trouser cut (cigarette or tulip shalwar).
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center border border-[#F9D2BA] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-[#5E3122] hover:text-[#1D4533] cursor-pointer text-xs"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold tabular-nums text-[#1D4533]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-[#5E3122] hover:text-[#1D4533] cursor-pointer text-xs"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {selectedStitchType === 'custom-stitched' ? (
                      <>
                        <Scissors className="w-4 h-4 text-[#F9D2BA]" />
                        <span>Customize & Add to Bag</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-[#F9D2BA]" />
                        <span>Add to Bag ({formatPrice(currentPricePKR * quantity)})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F9D2BA] grid grid-cols-3 gap-2 text-center text-[10px] text-[#5E3122]">
                  <div className="flex flex-col items-center">
                    <Truck className="w-4 h-4 mb-1 text-[#1D4533]" />
                    <span>Free Pakistan Dispatch &gt; Rs 15k</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4 mb-1 text-[#1D4533]" />
                    <span>100% Pure Lawn Authenticity</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw className="w-4 h-4 mb-1 text-[#1D4533]" />
                    <span>7-Day Easy Exchange</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#F9D2BA]">
                <div className="flex border-b border-[#F9D2BA] text-xs font-medium uppercase tracking-wider text-[#5E3122]">
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2 mr-4 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'fabric'
                        ? 'border-[#1D4533] text-[#1D4533] font-semibold'
                        : 'border-transparent hover:text-[#1D4533]'
                    }`}
                  >
                    Fabric Details
                  </button>
                  <button
                    onClick={() => setActiveTab('embroidery')}
                    className={`pb-2 mr-4 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'embroidery'
                        ? 'border-[#1D4533] text-[#1D4533] font-semibold'
                        : 'border-transparent hover:text-[#1D4533]'
                    }`}
                  >
                    Needlework & Taanka
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'shipping'
                        ? 'border-[#1D4533] text-[#1D4533] font-semibold'
                        : 'border-transparent hover:text-[#1D4533]'
                    }`}
                  >
                    Shipping & Care
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#5E3122] space-y-1.5 leading-relaxed">
                  {activeTab === 'fabric' && (
                    <>
                      <p><strong>Shirt:</strong> {product.fabricDetails.shirt}</p>
                      <p><strong>Dupatta:</strong> {product.fabricDetails.dupatta}</p>
                      <p><strong>Trouser:</strong> {product.fabricDetails.trouser}</p>
                    </>
                  )}
                  {activeTab === 'embroidery' && (
                    <>
                      <p><strong>Technique:</strong> {product.fabricDetails.embroidery}</p>
                      <p className="text-[11px] text-[#5E3122]/80">
                        Carefully handcrafted by skilled women artisans across South Punjab and Lahore,
                        incorporating historic taanka needlework preserved across centuries.
                      </p>
                    </>
                  )}
                  {activeTab === 'shipping' && (
                    <>
                      <p><strong>Domestic (Pakistan):</strong> 2–3 business days via TCS / CallCourier (Cash on Delivery available).</p>
                      <p><strong>International:</strong> 4–6 business days via DHL Express to UK, USA, UAE, Canada, and Saudi Arabia.</p>
                      <p><strong>Care:</strong> Gentle handwash separately in cold water or dry clean to preserve delicate resham threadwork.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
