import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { formatPrice, toggleWishlist, isInWishlist, addToCart } = useShop();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'unstitched');
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1600);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white rounded-none border border-[#F9D2BA] hover:border-[#1D4533] transition-all duration-300 cursor-pointer overflow-hidden relative shadow-[0_2px_8px_rgba(94,49,34,0.04)] hover:shadow-[0_8px_24px_rgba(29,69,51,0.09)] hover:-translate-y-0.5"
    >
      <div
        className="relative aspect-[3/4] w-full bg-[#F7EAE0] overflow-hidden"
        onMouseEnter={() => product.images.length > 1 && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        {!imageError ? (
          <img
            src={product.images[currentImgIndex] || product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7EAE0] p-4 text-center">
            <span className="font-serif text-lg text-[#1D4533] italic">{product.name}</span>
            <span className="text-xs text-[#5E3122] mt-1">{product.urduName}</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer ${
            isFavorited
              ? 'bg-[#5E3122] text-[#F7EAE0] shadow-md scale-105'
              : 'bg-[#F7EAE0]/85 backdrop-blur-xs text-[#1D4533] hover:text-[#5E3122] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#F7EAE0]' : ''}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            {quickAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F9D2BA]" />
                <span>Added Unstitched</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#F9D2BA]" />
                <span>Quick Bag (Unstitched)</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="py-2.5 px-3 bg-[#F7EAE0]/95 hover:bg-white text-[#1D4533] text-xs font-medium transition-colors shadow-md flex items-center justify-center cursor-pointer border border-[#F9D2BA]"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#5E3122]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.fabric.split('&')[0]}</span>
          </div>

          <div className="mt-1 flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#1D4533] group-hover:text-[#5E3122] transition-colors leading-snug">
              {product.name}
            </h3>
            <span className="text-xs text-[#5E3122] font-serif shrink-0 font-medium" dir="rtl">
              {product.urduName}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F9D2BA]/40 flex items-center justify-between text-xs">
          <div>
            <p className="font-medium text-sm text-[#1D4533] tabular-nums">
              {formatPrice(product.basePricePKR)}
            </p>
            <p className="text-[10px] text-[#5E3122]/70">Unstitched 3-Piece Base</p>
          </div>

          <div className="text-right text-[11px] text-[#5E3122] font-medium">
            <span>Stitching available</span>
          </div>
        </div>
      </div>
    </article>
  );
};
