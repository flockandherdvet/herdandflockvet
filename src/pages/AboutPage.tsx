import React from 'react';
import { Stethoscope, CheckCircle2, ShieldCheck, Award, MessageCircle, HeartHandshake } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface AboutPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5 text-red-600" />
          <span>Doctor of Veterinary Medicine (DVM) · Poultry & Dairy Specialist</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-red-950 tracking-tight leading-tight">
          About HERD AND FLOCK VET
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Founded and directed by Dr. Zain Rauf (DVM), specializing in commercial poultry flock management, high-yield bovine dairy production, and rural farmer support.
        </p>
      </div>

      {/* Main Split: Portrait and Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl overflow-hidden border-2 border-red-200 shadow-md bg-red-950">
            <img
              src="/src/assets/images/dr_zain_rauf.jpeg"
              alt="Dr. Zain Rauf, Veterinarian & Founder of Herd and Flock Vet"
              referrerPolicy="no-referrer"
              className="w-full aspect-square object-cover object-top"
            />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-red-100 space-y-2 text-xs shadow-xs">
            <div className="flex items-center justify-between font-bold text-red-950">
              <span className="text-sm">Dr. Zain Rauf</span>
              <span className="text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded">DVM Veterinarian</span>
            </div>
            <p className="text-gray-600">
              Specialized in Avian Flock Necropsy, Biosecurity Audits, Dairy Transition Cow Nutrition, and Bovine Mastitis Prevention.
            </p>
            <div className="pt-2 border-t border-red-100 flex items-center justify-between text-gray-700">
              <span>WhatsApp Direct:</span>
              <a
                href={CONTACT_CONFIG.whatsAppBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-red-700 hover:text-red-950"
              >
                {CONTACT_CONFIG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Founder's Story & Values */}
        <div className="lg:col-span-7 space-y-6 text-sm text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-red-950">
            The Story Behind the Store: Protecting Farmers from Fake Meds
          </h2>

          <p>
            During my clinical rotations across broiler sheds in Punjab and rural dairy colonies, I noticed a heartbreaking pattern: hardworking farmers investing their life savings into day-old chicks or imported dairy cattle, only to see their flocks wiped out or cows lose milk yield because they were sold counterfeit vitamins, expired vaccines with broken cold chains, or useless quack remedies.
          </p>

          <p>
            Commercial veterinary medicine is often gatekept behind opaque middleman markups, or diluted by unscrupulous dealers. I started <strong>HERD AND FLOCK VET</strong> to establish a clean, honest, and scientifically transparent bridge directly between university-level veterinary research and the farmer's shed.
          </p>

          <h3 className="text-lg font-bold text-red-950 pt-2">
            Our 4 Core Professional Commitments:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-red-950">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>100% Genuine Formulations</span>
              </div>
              <p className="text-xs text-gray-500">
                Every powder, drench, and vaccine is sourced directly from licensed pharmaceutical laboratories with batch analytical certificates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-red-950">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Unbroken Cold Chain</span>
              </div>
              <p className="text-xs text-gray-500">
                Live vaccines and temperature-sensitive biologics are dispatched in polyurethane thermoboxes packed with industrial phase-change ice packs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-red-950">
                <HeartHandshake className="w-4 h-4 text-red-600" />
                <span>Free Farmer Triage</span>
              </div>
              <p className="text-xs text-gray-500">
                Farmers shouldn't have to pay just to know if their birds have heat stress or bacterial enteritis. Our consultation tool is always 100% free.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-red-100 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-red-950">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Cash on Delivery</span>
              </div>
              <p className="text-xs text-gray-500">
                We believe in trust. Pay cash when the parcel arrives at your rural stop or village farm gate.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
            >
              Browse Veterinary Products
            </button>
            <button
              onClick={() => onNavigate('consultation')}
              className="px-6 py-3 bg-white hover:bg-red-50 text-red-800 border border-red-200 font-bold rounded-xl text-xs sm:text-sm transition-colors"
            >
              Start Free Case Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Social Ordering Reminder */}
      <div className="bg-red-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-red-800 shadow-lg">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-amber-300">
            Connect Directly with the Founder
          </h3>
          <p className="text-xs sm:text-sm text-red-100">
            Order or ask on WhatsApp / Facebook / Instagram
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={CONTACT_CONFIG.whatsAppBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: {CONTACT_CONFIG.phoneDisplay}</span>
          </a>
          <a
            href={CONTACT_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Facebook
          </a>
          <a
            href={CONTACT_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl text-xs transition-opacity shadow-sm"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};
