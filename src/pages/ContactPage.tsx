import React, { useState } from 'react';
import { MessageCircle, Facebook, Instagram, PhoneCall, MapPin, Send, CheckCircle2, Clock, Truck } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmType, setFarmType] = useState('Commercial Broiler');
  const [villageCity, setVillageCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const handleSendViaWhatsApp = () => {
    const formatted = `Assalam-o-Alaikum Doctor Zain,\n\nName: ${name || 'Farmer'}\nPhone: ${phone || 'Unprovided'}\nFarm: ${farmType}\nLocation: ${villageCity || 'Punjab'}\n\nMessage / Inquiry: ${message || 'I want to inquire about supplies and farm advice.'}`;
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(formatted)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
          <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
          <span>Direct Farm Helpline & Supply Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-red-950 tracking-tight">
          Get in Touch with Herd and Flock Vet
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Whether you need a quick medication inquiry, wholesale broiler crates, cold-chain live vaccines, or an emergency case discussion, we are available directly.
        </p>
      </div>

      {/* Direct Farmer Social & WhatsApp Access */}
      <div className="bg-red-950 text-white rounded-3xl p-6 sm:p-10 border border-red-900 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-800/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Direct Farmer Social & WhatsApp Access
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-1 text-white">
              Order or ask on WhatsApp / Facebook / Instagram
            </h2>
          </div>
          <div className="text-xs text-red-200 tabular-nums">
            Emergency Phone: <strong className="text-amber-300">{CONTACT_CONFIG.phoneDisplay}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* WhatsApp Card */}
          <a
            href={CONTACT_CONFIG.whatsAppBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-red-600 hover:bg-red-500 text-white p-5 rounded-2xl transition-all shadow-md group transform hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-white text-red-600 flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-xs text-red-100 block font-medium">Chat & Audio Messages</span>
              <strong className="text-base font-bold block tabular-nums">{CONTACT_CONFIG.phoneDisplay}</strong>
              <span className="text-[11px] text-amber-200 underline underline-offset-2 font-semibold">Open WhatsApp Chat &rarr;</span>
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href={CONTACT_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white p-5 rounded-2xl transition-all shadow-md group transform hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Facebook className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-blue-100 block font-medium">Official Facebook Page</span>
              <strong className="text-base font-bold block">Dr. Zain Rauf</strong>
              <span className="text-[11px] text-blue-100 underline underline-offset-2">Visit Facebook Profile &rarr;</span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={CONTACT_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 hover:brightness-110 text-white p-5 rounded-2xl transition-all shadow-md group transform hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-rose-100 block font-medium">Instagram Stories & Case Logs</span>
              <strong className="text-base font-bold block">@zainrauf408</strong>
              <span className="text-[11px] text-white underline underline-offset-2">View Instagram Profile &rarr;</span>
            </div>
          </a>
        </div>
      </div>

      {/* Contact Information & Dispatch Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-red-100 p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-base font-extrabold text-red-950">
              Veterinary Dispatch & Operations Hub
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 border border-red-100 shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-red-950 block">Direct Telephone & WhatsApp</span>
                  <a href={`tel:${CONTACT_CONFIG.phoneRaw}`} className="text-red-700 font-semibold hover:underline tabular-nums">
                    {CONTACT_CONFIG.phoneDisplay}
                  </a>
                  <p className="text-slate-500 text-[11px] mt-0.5">Available 7 days a week for urgent cases</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-red-950 block">Nationwide Delivery & Cargo</span>
                  <p className="text-slate-600">Dispatched via Daewoo Cargo, Leopard Courier, and rural bus terminals across Punjab, Sindh, KPK, and Balochistan.</p>
                  <p className="text-red-700 font-semibold text-[11px] mt-0.5">Cash on Delivery available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 border border-red-100 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-red-950 block">Dispensary Hub & Farm Visit Base</span>
                  <p className="text-slate-600">Lahore / Kasur / Okara agricultural corridor, Punjab, Pakistan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-700 border border-red-100 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-red-950 block">Consultation Hours</span>
                  <p className="text-slate-600">Monday – Sunday: 7:00 AM to 10:00 PM</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Emergency audio notes answered around the clock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-white rounded-3xl border border-red-100 p-6 space-y-3 text-xs shadow-xs">
            <h4 className="font-bold text-red-950">Farmer Frequently Asked Questions:</h4>
            <div className="space-y-2 text-slate-700">
              <p>
                <strong className="text-red-900">Q: How do live vaccines survive transit in summer?</strong><br />
                A: We pack live vaccines inside insulated polyurethane thermoboxes with 4 pre-frozen phase-change refrigerant gel packs. We test arrival temperature with thermolabels.
              </p>
              <p>
                <strong className="text-red-900">Q: How does Cash on Delivery work for rural farms?</strong><br />
                A: If your farm is near a main road or village center, riders deliver directly. For deep interior lands, packages can be picked up at the nearest tehsil courier hub.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Farmer Message & Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-red-100 p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-red-950">
              Send a Direct Message or Inquiry
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Have a bulk order, inquiry, or question about a specific formulation? Fill in below or send straight to WhatsApp.
            </p>
          </div>

          {isSent ? (
            <div className="p-6 bg-red-50 rounded-2xl border border-red-200 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-red-600 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-red-950">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-700 mt-1">
                  Thank you! Doctor Zain will review your inquiry. You can also send this message directly to WhatsApp for a faster response.
                </p>
              </div>
              <button
                onClick={handleSendViaWhatsApp}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp ({CONTACT_CONFIG.phoneDisplay})</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-red-950 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mian Rashid"
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-red-950 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0334-XXXXXXX"
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-red-950 mb-1">
                    Farm Type
                  </label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value)}
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                  >
                    <option value="Commercial Broiler Farm">Commercial Broiler Farm</option>
                    <option value="Layer Poultry Farm">Commercial Layer / Breeder</option>
                    <option value="Dairy Cattle Farm">Dairy Cattle Farm (Holstein / Crossbred)</option>
                    <option value="Dairy Buffalo Colony">Dairy Buffalo Colony (Nili-Ravi)</option>
                    <option value="Backyard / Desi Flock">Backyard / Fancy Poultry</option>
                    <option value="Feed / Veterinary Store">Feed / Agro-Vet Dealer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-red-950 mb-1">
                    Village / Tehsil / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={villageCity}
                    onChange={(e) => setVillageCity(e.target.value)}
                    placeholder="e.g. Chichawatni, Sahiwal"
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-red-950 mb-1">
                  Your Message or Product Inquiry *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail the medicines, quantity needed, or symptoms you would like advice on..."
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto px-5 py-3 bg-amber-50 hover:bg-amber-100 text-red-950 border border-amber-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-red-600" />
                  <span>Send Direct to WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
