import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, StitchType, Currency, CurrencyCode, CustomMeasurements } from '../types';
import { CURRENCIES, PRODUCTS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInPKR: number) => string;
  addToCart: (
    product: Product,
    stitchType: StitchType,
    selectedSize?: 'XS' | 'S' | 'M' | 'L' | 'XL',
    customMeasurements?: CustomMeasurements,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  
  customTailoringProduct: Product | null;
  setCustomTailoringProduct: (product: Product | null) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isLookbookOpen: boolean;
  setIsLookbookOpen: (open: boolean) => void;

  isFabricGuideOpen: boolean;
  setIsFabricGuideOpen: (open: boolean) => void;

  discountCode: string;
  discountApplied: boolean;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;

  cartCount: number;
  subtotalPKR: number;
  discountPKR: number;
  shippingPKR: number;
  totalPKR: number;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STITCHING_SURCHARGE = {
  unstitched: 0,
  'ready-to-wear': 2800,
  'custom-stitched': 4500,
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('PKR');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanava_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sanava_wishlist');
      return saved ? JSON.parse(saved) : ['kb-mint-01'];
    } catch {
      return ['kb-mint-01'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [customTailoringProduct, setCustomTailoringProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isFabricGuideOpen, setIsFabricGuideOpen] = useState(false);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sanava_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sanava_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const currency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  }, [currencyCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const formatPrice = (priceInPKR: number) => {
    const converted = priceInPKR * currency.rate;
    if (currency.code === 'PKR') {
      return `${currency.symbol} ${Math.round(converted).toLocaleString('en-PK')}`;
    }
    if (currency.code === 'AED' || currency.code === 'SAR') {
      return `${currency.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: Product,
    stitchType: StitchType,
    selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' = 'M',
    customMeasurements?: CustomMeasurements,
    quantity: number = 1
  ) => {
    const surcharge = STITCHING_SURCHARGE[stitchType];
    const unitPricePKR = product.basePricePKR + surcharge;

    const cartItemId = `${product.id}-${stitchType}-${stitchType === 'ready-to-wear' ? selectedSize : ''}-${
      customMeasurements ? JSON.stringify(customMeasurements).slice(0, 20) : ''
    }`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          stitchType,
          selectedSize: stitchType === 'ready-to-wear' ? selectedSize : undefined,
          customMeasurements,
          quantity,
          unitPricePKR,
        },
      ];
    });

    const stitchLabel =
      stitchType === 'unstitched'
        ? 'Unstitched 3-Piece'
        : stitchType === 'ready-to-wear'
        ? `Ready-to-Wear (Size ${selectedSize})`
        : 'Bespoke Custom Stitched';

    showToast(`Added "${product.name}" (${stitchLabel}) to bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`Saved "${prod?.name || 'Item'}" to your summer wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SUMMERGULZAR' || clean === 'KHAAB10' || clean === 'PAKISTAN14') {
      setDiscountCode(clean);
      setDiscountApplied(true);
      showToast('10% Summer Heritage discount applied!');
      return true;
    }
    showToast('Invalid coupon code. Try SUMMERGULZAR for 10% off.');
    return false;
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountApplied(false);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotalPKR = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPricePKR * item.quantity, 0),
    [cart]
  );

  const discountPKR = useMemo(() => (discountApplied ? Math.round(subtotalPKR * 0.1) : 0), [
    subtotalPKR,
    discountApplied,
  ]);

  const shippingPKR = useMemo(() => {
    if (subtotalPKR === 0) return 0;
    if (subtotalPKR >= 15000) return 0;
    return 600;
  }, [subtotalPKR]);

  const totalPKR = useMemo(() => Math.max(0, subtotalPKR - discountPKR + shippingPKR), [
    subtotalPKR,
    discountPKR,
    shippingPKR,
  ]);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency: setCurrencyCode,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        selectedProductForModal,
        setSelectedProductForModal,
        customTailoringProduct,
        setCustomTailoringProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isLookbookOpen,
        setIsLookbookOpen,
        isFabricGuideOpen,
        setIsFabricGuideOpen,
        discountCode,
        discountApplied,
        applyDiscount,
        removeDiscount,
        cartCount,
        subtotalPKR,
        discountPKR,
        shippingPKR,
        totalPKR,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
