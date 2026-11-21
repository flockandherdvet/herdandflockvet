import React from 'react';
import { MessageCircle, Facebook, Instagram, PhoneCall, ShieldCheck, Truck, Clock, HeartHandshake } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-red-950 text-red-100 border-t border-red-900">
      {/* Farmer Trust Highlights */}
      <div className="border-b border-red-900 bg-red-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-red-900 text-amber-400 border border-red-800">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Cash on Delivery</p>
                <p className="text-xs text-red-200/80">Pay cash upon delivery at your farm or village</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-red-900 text-amber-400 border border-red-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Cold-Chain Guaranteed</p>
                <p className="text-xs text-red-200/80">Vaccines shipped in certified ice-box thermopacks</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-red-900 text-amber-400 border border-red-800">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Free Vet Triage</p>
                <p className="text-xs text-red-200/80">Direct advice from Dr. Zain Rauf (DVM)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-2.5 rounded-lg bg-red-900 text-amber-400 border border-red-800">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Direct WhatsApp Support</p>
                <p className="text-xs text-red-200/80">Call or chat at {CONTACT_CONFIG.phoneDisplay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Bio Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/src/assets/images/dr_zain_rauf.jpeg"
                alt="Dr. Zain Rauf - Herd and Flock Vet"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-lg object-cover object-top border border-amber-400/60 shrink-0"
              />
              <span className="text-base font-bold tracking-tight text-white">
                HERD AND FLOCK VET
              </span>
            </div>
            <p className="text-xs text-red-200/80 leading-relaxed">
              Dedicated veterinary supplies, supplements, and free online consultation platform tailored for modern commercial and backyard poultry farmers, as well as progressive dairy and buffalo keepers.
            </p>
            <div className="pt-1">
              <p className="text-xs font-semibold text-amber-300">
                Directed by Dr. Zain Rauf
              </p>
              <p className="text-xs text-red-200/80">Veterinary Doctor · Avian & Bovine Specialist</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-red-200/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('consultation')}
                  className="hover:text-white transition-colors"
                >
                  Free Online Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Dr. Zain Rauf
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors"
                >
                  Veterinary Guides & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (Active Non-Empty Only) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Stocked Categories
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs text-red-200/80">
              <span className="font-semibold text-white">Poultry Health:</span>
              <ul className="space-y-1 pl-2 border-l border-red-800">
                <li>Vitamins & Electrolytes</li>
                <li>Feed Additives & Probiotics</li>
                <li>Disinfectants & Biosecurity</li>
                <li>Respiratory Care & Dewormers</li>
              </ul>
              <span className="font-semibold text-white pt-1">Dairy & Bovine:</span>
              <ul className="space-y-1 pl-2 border-l border-red-800">
                <li>Mineral Mixtures</li>
                <li>Calcium & Energy Boosters</li>
                <li>Vitamins & Antioxidants</li>
                <li>Tick, Fly Control & Dewormers</li>
              </ul>
            </div>
          </div>

          {/* Social Ordering & Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Order or Ask Us Direct
            </h3>
            <p className="text-xs text-red-100 font-medium">
              Order or ask on WhatsApp / Facebook / Instagram
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href={CONTACT_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp 0334-4859408"
                className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Page"
                className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Profile"
                className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white flex items-center justify-center transition-opacity shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 text-xs space-y-1 text-red-200/80">
              <p className="flex items-center gap-1.5 text-white font-semibold">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call/WhatsApp: {CONTACT_CONFIG.phoneDisplay}</span>
              </p>
              <p>Delivery: Nationwide via courier & cargo</p>
              <p>Payment: Cash on Delivery (COD) supported</p>
            </div>
          </div>
        </div>

        {/* Mandatory Veterinary Disclaimer */}
        <div className="mt-10 pt-6 border-t border-red-900 text-xs text-red-200/80 leading-relaxed bg-red-900/40 p-4 rounded-xl border border-red-800/70">
          <p className="font-semibold text-amber-300 mb-1">
            Veterinary Practice & Product Disclaimer:
          </p>
          <p>
            Herd and Flock Vet is directed and managed by Dr. Zain Rauf (DVM), specializing in avian flock medicine and bovine dairy production. All products cataloged are legitimate veterinary nutritional supplements, water-soluble electrolytes, feed additives, biosecurity disinfectants, hygiene solutions, and farm management equipment. The free online consultation is intended as supportive triage, management guidance, and nutritional stewardship. It does not replace a physical clinical examination or emergency surgical intervention by a licensed field veterinary officer. In sudden flock mortality outbreaks or acute recumbent cattle crises, please call a registered local practitioner immediately.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-red-300/80 gap-3">
          <p>© {new Date().getFullYear()} HERD AND FLOCK VET. All rights reserved.</p>
          <p className="text-red-300/80">
            Empowering Poultry & Dairy Farmers with Genuine Veterinary Science
          </p>
        </div>
      </div>
    </footer>
  );
};
