import React, { useState } from 'react';
import { ShoppingBag, Menu, X, MessageCircle, Facebook, Instagram, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'consultation', label: 'Free Consultation' },
    { id: 'about', label: 'About' },
    { id: 'blog', label: 'Vet Guides' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-xs">
      {/* Farmer quick helpline banner */}
      <div className="bg-red-950 text-red-50 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-between">
        <span className="hidden sm:inline text-red-200">
          Veterinary Supplies & Free Consultation by Dr. Zain Rauf (DVM)
        </span>
        <div className="flex items-center justify-center gap-4 mx-auto sm:mx-0">
          <a
            href={`tel:${CONTACT_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Emergency Help: {CONTACT_CONFIG.phoneDisplay}</span>
          </a>
          <span className="text-red-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-amber-300 font-semibold">Cash on Delivery Available</span>
        </div>
      </div>

      {/* Main 3-zone Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Dr. Zain Rauf Portrait */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          <img
            src="/src/assets/images/dr_zain_rauf.jpeg"
            alt="Dr. Zain Rauf - Herd and Flock Vet"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover object-top border-2 border-red-600 shadow-sm group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-red-950 group-hover:text-red-700 transition-colors whitespace-nowrap">
              HERD AND FLOCK VET
            </span>
            <span className="text-[11px] font-semibold text-red-700 tracking-wide uppercase whitespace-nowrap">
              Poultry & Dairy Veterinary Care
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative hover:text-red-700 ${
                  isActive ? 'text-red-800 font-bold' : 'text-gray-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Top-bar Social Contact Icons (kept intact) + Cart Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Header Social Icons (WhatsApp, Facebook, Instagram) */}
          <div className="hidden md:flex items-center gap-2 border-r border-red-100 pr-3 mr-1">
            <a
              href={CONTACT_CONFIG.whatsAppBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp (0334-4859408)"
              className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our Facebook page"
              className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on Instagram"
              className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-colors border border-rose-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open cart with ${totalItems} items`}
            className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="min-w-5 h-5 px-1 bg-amber-400 text-red-950 text-xs font-black rounded-full flex items-center justify-center leading-none tabular-nums">
              {totalItems}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-red-900 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-red-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'text-gray-700 hover:bg-red-50/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-red-100 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Order or Ask:</span>
            <div className="flex items-center gap-2">
              <a
                href={CONTACT_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={CONTACT_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-blue-600 text-white rounded-md"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-md"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
