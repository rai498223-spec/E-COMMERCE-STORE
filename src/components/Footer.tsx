import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SanavaLogo } from './SanavaLogo';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsFabricGuideOpen, setIsLookbookOpen, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast("Thank you for subscribing to SANAVA Women's Clothing Gazette");
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1D4533] text-[#F7EAE0] border-t border-[#153426] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F9D2BA]/20">
          <div className="lg:col-span-2 space-y-4">
            <SanavaLogo variant="footer" />
            <p className="text-[#F7EAE0]/80 leading-relaxed max-w-sm pt-2">
              Celebrating the romantic poetry of Pakistani summer lawn, handcrafted shadow-work
              chikankari, and regal festive pret. Designed with reverence for the modern South Asian woman.
            </p>
            <div className="pt-2 text-[11px] text-[#F9D2BA] space-y-1">
              <p>Mausam-e-Gulzar Collection '26</p>
              <p>Export Standard · Global DHL Express</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Summer Collections
            </h4>
            <ul className="space-y-2 text-[#F7EAE0]/75">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Summer Lawn 3-Piece
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Multani Chikankari
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Festive Eid Pret
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Pure Silk & Chiffon Dupattas
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsLookbookOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Summer Lookbook & Drape Guide
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Craft & Service
            </h4>
            <ul className="space-y-2 text-[#F7EAE0]/75">
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors">
                  Indus Valley Craft Guilds
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsFabricGuideOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  80s Lawn Fabric Guide
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Bespoke Master Tailoring
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Domestic COD Verification
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  7-Day Exchange Guarantee
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              The Summer Gazette
            </h4>
            <p className="text-[#F7EAE0]/75 leading-normal text-[11px]">
              Receive private invitations to unreleased lawn volumes and festive drops.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2.5 bg-[#153426] border border-[#F9D2BA]/40 text-xs text-white focus:outline-none focus:border-[#F9D2BA] placeholder:text-[#F7EAE0]/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#F9D2BA] text-[#1D4533] hover:bg-[#F7EAE0] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5E3122]" />
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#153426] border border-[#F9D2BA]/30 text-[#F9D2BA] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed to Gazette</span>
              </div>
            )}
          </div>
        </div>

        <div className="py-8 border-b border-[#F9D2BA]/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-[#F7EAE0]/75 text-[11px]">
          <div>
            <span className="font-semibold text-white block">Lahore Atelier</span>
            <p className="text-[#F7EAE0]/60">M.M. Alam Road, Gulberg III</p>
          </div>
          <div>
            <span className="font-semibold text-white block">Karachi Flagship</span>
            <p className="text-[#F7EAE0]/60">Bukhari Commercial, Phase VI, DHA</p>
          </div>
          <div>
            <span className="font-semibold text-white block">Islamabad Studio</span>
            <p className="text-[#F7EAE0]/60">Beverly Centre, Blue Area</p>
          </div>
          <div>
            <span className="font-semibold text-white block">London Concession</span>
            <p className="text-[#F7EAE0]/60">Knightsbridge, London SW1X</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7EAE0]/60 gap-4">
          <p>© 2026 SANAVA Women's Clothing. All rights reserved. Registered in Pakistan & United Kingdom.</p>
          <div className="flex items-center gap-4">
            <span>Cash on Delivery (Pakistan)</span>
            <span>·</span>
            <span>DHL Express Worldwide</span>
            <span>·</span>
            <span>Authentic Lawn Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
