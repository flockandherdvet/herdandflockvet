import React, { useState } from 'react';
import { MessageCircle, PhoneCall, ChevronUp, ChevronDown } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';

export const FloatingContactButtons: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside aria-label="Quick contact links" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 print:hidden">
      {/* Expanded direct call link */}
      {isExpanded && (
        <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Direct Phone Call Button */}
          <a
            href={`tel:${CONTACT_CONFIG.phoneRaw}`}
            aria-label="Call Doctor directly"
            className="group flex items-center gap-2.5 bg-white text-gray-800 hover:text-red-700 pl-3.5 pr-3 py-2 rounded-full shadow-lg border border-red-100 hover:border-red-300 transition-all transform hover:-translate-x-1"
          >
            <span className="text-xs font-semibold text-gray-700 group-hover:text-red-700 hidden sm:inline">
              Call {CONTACT_CONFIG.phoneDisplay}
            </span>
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>
        </div>
      )}

      {/* Main Primary WhatsApp Floating Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse contact options' : 'Expand contact options'}
          className="w-8 h-8 rounded-full bg-white text-red-700 border border-red-200 shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        <a
          href={CONTACT_CONFIG.whatsAppBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp 0334-4859408"
          className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-xs font-medium opacity-95 leading-tight">Order or Ask on WhatsApp</span>
            <span className="text-sm font-bold tracking-tight">{CONTACT_CONFIG.phoneDisplay}</span>
          </div>
        </a>
      </div>
    </aside>
  );
};
