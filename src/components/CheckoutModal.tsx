import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';
import { X, CheckCircle2, Truck, CreditCard, Banknote, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    clearCart,
    formatPrice,
    subtotalPKR,
    discountPKR,
    shippingPKR,
    totalPKR,
    discountApplied,
    discountCode,
  } = useShop();

  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [country, setCountry] = useState('Pakistan');
  const [formData, setFormData] = useState({
    fullName: 'Fatima Zahra',
    email: 'fatima.z@example.com',
    phone: '+92 300 1234567',
    city: 'Lahore',
    address: 'House 42, Block C-1, Gulberg III',
    postalCode: '54000',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `KB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const order: OrderDetails = {
      orderId,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      country: country,
      shippingAddress: formData.address,
      paymentMethod,
      items: cart.map((c) => ({
        productName: c.product.name,
        stitchType: c.stitchType,
        size: c.selectedSize,
        quantity: c.quantity,
        price: formatPrice(c.unitPricePKR * c.quantity),
      })),
      subtotal: formatPrice(subtotalPKR),
      shippingFee: shippingPKR === 0 ? 'Complimentary' : formatPrice(shippingPKR),
      discount: discountApplied ? `- ${formatPrice(discountPKR)} (${discountCode})` : 'Rs 0',
      total: formatPrice(totalPKR),
      orderDate: today,
      estimatedDelivery: '3 to 5 Business Days',
    };

    setConfirmedOrder(order);
    clearCart();
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#F7EAE0] border border-[#F9D2BA] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#1D4533] text-[#F7EAE0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-lg font-medium tracking-wide">
              {step === 'form' ? 'Checkout & Dispatch' : 'Order Confirmed'}
            </h2>
            <span className="text-xs text-[#F9D2BA]">· SANAVA</span>
          </div>

          <button
            onClick={onClose}
            className="text-[#F9D2BA]/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="overflow-y-auto flex-1 p-6 space-y-6 text-xs text-[#5E3122]">
            <div className="bg-white p-4 border border-[#F9D2BA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-[#1D4533] block">Delivery Destination</span>
                <span className="text-[11px] text-[#5E3122]/80">
                  {country === 'Pakistan'
                    ? 'Nationwide Express (TCS / CallCourier) · COD Available'
                    : 'International Express (DHL) · 4-6 Days Delivery'}
                </span>
              </div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-[#F7EAE0] border border-[#F9D2BA] px-3 py-1.5 text-xs text-[#1D4533] rounded font-medium"
              >
                <option value="Pakistan">Pakistan (Domestic)</option>
                <option value="United Kingdom">United Kingdom (DHL)</option>
                <option value="United States">United States (DHL)</option>
                <option value="United Arab Emirates">United Arab Emirates (DHL)</option>
                <option value="Saudi Arabia">Saudi Arabia (DHL)</option>
                <option value="Canada">Canada (DHL)</option>
              </select>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-sm font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-1.5">
                1. Customer & Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D4533] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D4533] mb-1">
                    Email (for invoice & tracking) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D4533] mb-1">
                    Phone Number (for courier SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#1D4533] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Lahore, Karachi, Islamabad..."
                    className="w-full p-2 bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[#1D4533] mb-1">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white border border-[#F9D2BA] focus:outline-none focus:border-[#1D4533] text-[#1D4533]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-sm font-semibold text-[#1D4533] border-b border-[#F9D2BA] pb-1.5">
                2. Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 text-left border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                      : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-[#1D4533]">
                    <Banknote className="w-4 h-4 text-[#5E3122]" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-[10px] text-[#5E3122]/80 mt-1">
                    Pay in cash directly to courier upon delivery anywhere across Pakistan.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 text-left border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#1D4533] bg-white ring-1 ring-[#1D4533]'
                      : 'border-[#F9D2BA] bg-[#F7EAE0] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-[#1D4533]">
                    <CreditCard className="w-4 h-4 text-[#5E3122]" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <p className="text-[10px] text-[#5E3122]/80 mt-1">
                    Visa, MasterCard & UnionPay. Instant encrypted processing.
                  </p>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-3 bg-white border border-[#F9D2BA] space-y-2 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="col-span-2 p-2 border border-[#F9D2BA] text-xs text-[#1D4533]"
                      defaultValue="Fatima Zahra"
                    />
                    <input
                      type="text"
                      placeholder="Card Number (•••• •••• •••• 4242)"
                      className="col-span-2 p-2 border border-[#F9D2BA] text-xs text-[#1D4533]"
                      defaultValue="4242 •••• •••• 4242"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="p-2 border border-[#F9D2BA] text-xs text-[#1D4533]"
                      defaultValue="08/28"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      className="p-2 border border-[#F9D2BA] text-xs text-[#1D4533]"
                      defaultValue="888"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#F9D2BA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#5E3122]/80 block">Final Payable Amount:</span>
                <span className="font-serif text-2xl font-semibold text-[#1D4533] tabular-nums">
                  {formatPrice(totalPKR)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1D4533] hover:bg-[#153426] text-[#F7EAE0] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer shadow-md rounded flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-[#F9D2BA]" />
                <span>Confirm & Place Order</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 text-xs text-[#5E3122]">
            <div className="text-center space-y-2 py-4">
              <CheckCircle2 className="w-12 h-12 mx-auto text-[#1D4533]" />
              <h3 className="font-serif text-2xl font-semibold text-[#1D4533]">
                Shukriya, {confirmedOrder?.customerName}!
              </h3>
              <p className="text-xs text-[#5E3122]/80 max-w-md mx-auto">
                Your order <strong className="text-[#1D4533]">{confirmedOrder?.orderId}</strong> has been received at our Lahore atelier. A courier tracking SMS and email invoice have been dispatched.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#F9D2BA] space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-[#F9D2BA]/30 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#5E3122]/60">Order Reference</span>
                  <p className="font-mono font-semibold text-sm text-[#1D4533]">{confirmedOrder?.orderId}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#5E3122]/60">Order Date</span>
                  <p className="font-semibold text-xs text-[#1D4533]">{confirmedOrder?.orderDate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase text-[#5E3122]">Curated Items:</span>
                {confirmedOrder?.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#F9D2BA]/20 text-xs">
                    <div>
                      <span className="font-medium text-[#1D4533]">{item.productName}</span>
                      <span className="text-[11px] text-[#5E3122]/70 ml-2">
                        ({item.stitchType} {item.size ? `· ${item.size}` : ''} × {item.quantity})
                      </span>
                    </div>
                    <span className="tabular-nums font-semibold text-[#1D4533]">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F9D2BA] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#1D4533] font-medium">{confirmedOrder?.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#1D4533]">
                  <span>Discount</span>
                  <span className="tabular-nums">{confirmedOrder?.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({confirmedOrder?.country})</span>
                  <span className="tabular-nums text-[#1D4533]">{confirmedOrder?.shippingFee}</span>
                </div>
                <div className="pt-2 border-t border-[#F9D2BA] flex justify-between font-bold text-sm text-[#1D4533]">
                  <span>Total Amount Due</span>
                  <span className="font-serif text-base tabular-nums">{confirmedOrder?.total}</span>
                </div>
              </div>

              <div className="bg-[#F7EAE0] p-3 text-[11px] border border-[#F9D2BA] text-[#5E3122] space-y-1">
                <p><strong>Shipping To:</strong> {confirmedOrder?.shippingAddress}, {confirmedOrder?.city}, {confirmedOrder?.country}</p>
                <p><strong>Payment Mode:</strong> {confirmedOrder?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card (Paid)'}</p>
                <p><strong>Estimated Arrival:</strong> {confirmedOrder?.estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#F9D2BA] text-[#5E3122] hover:bg-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1D4533] text-[#F7EAE0] hover:bg-[#153426] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
