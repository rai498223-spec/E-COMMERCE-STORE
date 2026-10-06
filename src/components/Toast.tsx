import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      <div className="flex items-center gap-3 bg-[#1F2421] text-[#FAF9F6] px-4 py-3 rounded shadow-xl text-xs border border-[#B3874B]/30">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#B3874B]/20 text-[#B3874B]">
          <Check className="w-3.5 h-3.5" />
        </span>
        <p className="font-medium">{toastMessage}</p>
      </div>
    </div>
  );
};
