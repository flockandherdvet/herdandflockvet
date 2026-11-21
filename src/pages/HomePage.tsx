import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, Stethoscope, ChevronRight, MessageCircle, Truck, CheckCircle2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';
import { ProductCard } from '../components/ProductCard';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewProduct }) => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const latestGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-red-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_veterinary_farm_1794124351843.jpg"
            alt="Dairy cattle and poultry shed"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-950/88 to-red-900/55" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-900/80 border border-red-500/40 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <Stethoscope className="w-4 h-4 text-amber-400" />
              <span>Directed by Dr. Zain Rauf · Poultry & Dairy Care</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Science-Backed Poultry & Dairy Veterinary Supplies
            </h1>

            <p className="text-base sm:text-lg text-red-100/90 leading-relaxed">
              Veterinary vitamins, electrolytes, probiotics, mineral mixtures, dewormers, and free online triage delivered across Pakistan with Cash on Delivery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('shop')}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <span>Shop Farm Supplies</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('consultation')}
                className="flex items-center gap-2 bg-red-800/70 hover:bg-red-700/80 text-white border border-red-400/40 font-semibold px-5 py-3.5 rounded-xl backdrop-blur-xs transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Free Online Consultation</span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-red-100">
              <span className="flex items-center gap-1 font-semibold text-amber-300">
                <MessageCircle className="w-4 h-4 text-amber-400" />
                WhatsApp: {CONTACT_CONFIG.phoneDisplay}
              </span>
              <span className="text-red-400">·</span>
              <span>Cash on Delivery</span>
              <span className="text-red-400">·</span>
              <span>Order Direct via WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Species Selection Cards — ONLY showing active stocked categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Poultry Gateway */}
          <div
            onClick={() => onNavigate('shop', { species: 'poultry' })}
            className="group bg-white rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-amber-800">
                  Flock Medicine
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">Broilers · Layers · Breeders</span>
              </div>
              <h3 className="text-xl font-extrabold text-red-950 group-hover:text-amber-700 transition-colors">
                Poultry Health & Nutrition
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                Vitamins and electrolytes, probiotics, liver support, biosecurity disinfectants, respiratory care, and dewormers.
              </p>
              <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <span>Browse Poultry Supplies</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl" role="img" aria-label="Chicken">🐓</span>
            </div>
          </div>

          {/* Dairy Gateway */}
          <div
            onClick={() => onNavigate('shop', { species: 'dairy' })}
            className="group bg-white rounded-2xl p-6 border-2 border-red-200 hover:border-red-500 shadow-md hover:shadow-xl transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-red-700">
                  Bovine Production
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">Cows · Buffaloes · Calves</span>
              </div>
              <h3 className="text-xl font-extrabold text-red-950 group-hover:text-red-700 transition-colors">
                Dairy Cattle & Buffalo Supplies
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                Mineral mixtures, calcium & energy boosters, vitamins & antioxidants, tick and fly control, and dewormers.
              </p>
              <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-bold text-red-700">
                <span>Browse Dairy Supplies</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl" role="img" aria-label="Cow">🐄</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Value Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-red-100 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-950">Cash on Delivery</h4>
                <p className="text-xs text-slate-600 mt-0.5">Pay safely upon arrival at your farm gate or local village stop.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-950">Vet-Curated Stock</h4>
                <p className="text-xs text-slate-600 mt-0.5">All stocked poultry & dairy medicines reviewed by Dr. Zain Rauf.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-950">Free Farm Consultation</h4>
                <p className="text-xs text-slate-600 mt-0.5">Submit symptoms online or WhatsApp for rapid medical triage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-950">Bulk Farm Orders</h4>
                <p className="text-xs text-slate-600 mt-0.5">Message directly for carton rates and farm-gate logistics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider">
              <span>Dispensary Catalog</span>
              <span>·</span>
              <span>Poultry & Dairy Stock</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-950 mt-1">
              Featured Veterinary Supplies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Click any item to inspect full company, pack size, dosage, and withdrawal information.
            </p>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700 hover:text-red-900 transition-colors"
          >
            <span>View All Products ({PRODUCTS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Meet The Founder Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-red-100 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative bg-red-950 min-h-96 lg:min-h-full">
            <img
              src="/src/assets/images/dr_zain_rauf.jpeg"
              alt="Dr. Zain Rauf, Veterinarian & Founder of Herd and Flock Vet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/85 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
              <p className="text-sm font-bold">Dr. Zain Rauf</p>
              <p className="text-xs text-amber-300">Veterinary Doctor & Founder</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
                <span>Behind Herd and Flock Vet</span>
                <span>·</span>
                <span>Clinical & Field Practice</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-red-950">
                Bridging Veterinary Science With Everyday Farm Reality
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                I founded <strong>HERD AND FLOCK VET</strong> to give poultry and dairy farmers direct access to genuine supplies, honest dosage instructions, and free online triage on WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-red-900 font-medium bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Avian flock health & management</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-red-900 font-medium bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Dairy cattle & buffalo nutrition</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-red-900 font-medium bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Cash on Delivery across Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-red-900 font-medium bg-red-50/70 p-2.5 rounded-lg border border-red-100">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Direct WhatsApp consultation</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-red-100 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                Read About Dr. Zain Rauf
              </button>
              <a
                href={CONTACT_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-950"
              >
                <MessageCircle className="w-4 h-4 text-red-600" />
                <span>Chat Directly ({CONTACT_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Free Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-red-800 via-red-900 to-red-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-red-700/50">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              100% Free · Farmer Support Initiative
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Facing Broiler Mortality or Milk Drop? Get Free Online Vet Triage.
            </h2>
            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
              Share your animal species, flock or herd size, and observed symptoms with our interactive triage tool. Receive rapid clinical advice directly on WhatsApp.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('consultation')}
                className="bg-amber-400 text-red-950 hover:bg-amber-300 font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-xs sm:text-sm active:scale-95"
              >
                Start Free Consultation Now
              </button>
              <a
                href={CONTACT_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-red-100 hover:text-amber-300 font-semibold underline underline-offset-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Voice Note ({CONTACT_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Veterinary Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider">
              <span>Farmer Education</span>
              <span>·</span>
              <span>Preventative Veterinary Medicine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-950 mt-1">
              Field Guides & Management Protocols
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Practical guides written specifically for farm managers to prevent losses before they happen.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-700 hover:text-red-950 transition-colors"
          >
            <span>View All Guides ({BLOG_POSTS.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onNavigate('blog')}
              className="bg-white rounded-2xl border border-red-100 p-5 hover:border-red-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-red-700 uppercase">{guide.category}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-red-950 line-clamp-2 hover:text-red-700 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-red-50 flex items-center justify-between text-xs font-semibold text-red-700 mt-4">
                <span>Read Full Protocol</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ordering & Social Helpline CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-red-800 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Prefer Ordering or Inquiring by Phone or Social Media?
            </h3>
            <p className="text-xs sm:text-sm text-red-200/80 max-w-xl">
              Order or ask on WhatsApp / Facebook / Instagram. We accept voice notes, symptom photos, and direct orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={CONTACT_CONFIG.whatsAppBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-3 rounded-xl transition-colors text-xs sm:text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {CONTACT_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-colors shadow-md"
            >
              Facebook
            </a>
            <a
              href={CONTACT_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-3 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-xs sm:text-sm font-bold transition-opacity shadow-md"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
