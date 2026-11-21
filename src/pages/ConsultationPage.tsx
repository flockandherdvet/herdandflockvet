import React, { useState } from 'react';
import { Send, MessageCircle, AlertTriangle, CheckCircle2, Stethoscope, PhoneCall } from 'lucide-react';
import { CONTACT_CONFIG, getConsultationWhatsAppLink } from '../data/contactConfig';

interface ConsultationPageProps {
  onNavigate: (page: string, params?: any) => void;
}

const POULTRY_SYMPTOMS = [
  'Heat stress / excessive panting',
  'Watery white or green diarrhea',
  'Sudden drop in egg production',
  'Thin or soft-shelled eggs',
  'Respiratory wheezing / gasping / sneezing',
  'Swollen heads / facial edema',
  'Unabsorbed yolk / chick mortality in first week',
  'Lameness / splayed legs / rickets',
  'Lethargy / ruffled feathers / low feed intake',
];

const DAIRY_SYMPTOMS = [
  'Swollen, hot or painful udder (Mastitis)',
  'Watery milk / clots / blood in milk',
  'Downer cow / unable to stand post-calving (Milk Fever)',
  'Calf white or yellowish watery scours (diarrhea)',
  'Silent heat / repeat breeding (not settling with AI)',
  'Low milk yield / sudden drop in peak production',
  'Ketosis / sweet breath / loss of appetite after calving',
  'Bloat / frothy tympany in rumen',
  'Pasture diarrhea / liver fluke / rough dull coat',
];

export const ConsultationPage: React.FC<ConsultationPageProps> = () => {
  const [species, setSpecies] = useState<'poultry' | 'dairy'>('poultry');
  const [animalSubtype, setAnimalSubtype] = useState('Commercial Broilers');
  const [herdSize, setHerdSize] = useState('2,000 birds');
  const [animalAge, setAnimalAge] = useState('24 days old');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [duration, setDuration] = useState('2 to 3 days');
  const [mortalityCount, setMortalityCount] = useState('0');
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerLocation, setFarmerLocation] = useState('');

  const [submittedCase, setSubmittedCase] = useState<any | null>(null);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSpeciesSwitch = (newSpecies: 'poultry' | 'dairy') => {
    setSpecies(newSpecies);
    setSelectedSymptoms([]);
    if (newSpecies === 'poultry') {
      setAnimalSubtype('Commercial Broilers');
      setHerdSize('2,000 birds');
      setAnimalAge('20 days old');
    } else {
      setAnimalSubtype('Holstein Friesian Cow');
      setHerdSize('15 milking cows');
      setAnimalAge('Early lactation (Day 14)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const symptomsString = [
      ...selectedSymptoms,
      otherSymptoms ? `Note: ${otherSymptoms}` : null,
    ]
      .filter(Boolean)
      .join(', ');

    const caseData = {
      species: species === 'poultry' ? `Poultry (${animalSubtype})` : `Dairy (${animalSubtype})`,
      flockSize: herdSize,
      age: animalAge,
      symptoms: symptomsString || 'Unspecified symptoms',
      duration,
      mortality: mortalityCount,
      farmerName: farmerName || 'Farmer',
      farmerPhone: farmerPhone || 'Unprovided',
      location: farmerLocation || 'Punjab, Pakistan',
      submittedAt: new Date().toLocaleTimeString(),
    };

    setSubmittedCase(caseData);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleOpenWhatsAppTriage = () => {
    if (!submittedCase) return;
    const link = getConsultationWhatsAppLink(
      submittedCase.species,
      submittedCase.flockSize,
      `${submittedCase.symptoms} (Mortality: ${submittedCase.mortality}, Duration: ${submittedCase.duration})`,
      submittedCase.farmerName,
      submittedCase.location
    );
    window.open(link, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5 text-red-600" />
          <span>Complimentary Clinical Triage · No Consultation Fee</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-red-950">
          Free Online Veterinary Consultation
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          Struggling with unexplained chick mortality, sudden drop in egg yield, mastitis, or downer cows? Submit your farm observation below. Dr. Zain Rauf will review your case and reply with supportive clinical guidance.
        </p>
      </div>

      {/* Case Review / Submitted Success Card */}
      {submittedCase ? (
        <div className="bg-white rounded-3xl border-2 border-red-500 p-6 sm:p-8 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Case Ticket Generated
              </span>
              <h2 className="text-xl font-extrabold text-red-950">
                Clinical Summary Prepared for Dr. Zain Rauf
              </h2>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="bg-red-50/40 rounded-2xl p-4 sm:p-6 border border-red-100 text-xs sm:text-sm space-y-3">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-red-100">
              <div>
                <span className="text-gray-500 block text-[11px]">Farmer Name:</span>
                <span className="font-bold text-red-950">{submittedCase.farmerName}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Location / Tehsil:</span>
                <span className="font-bold text-red-950">{submittedCase.location}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Species & Subtype:</span>
                <span className="font-bold text-red-800">{submittedCase.species}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Flock / Herd Size:</span>
                <span className="font-bold text-red-950">{submittedCase.flockSize}</span>
              </div>
            </div>

            <div>
              <span className="text-gray-500 block text-[11px] mb-1">Observed Symptoms & Notes:</span>
              <p className="font-semibold text-red-950 bg-white p-3 rounded-xl border border-red-100">
                {submittedCase.symptoms}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Duration: <strong className="text-red-950">{submittedCase.duration}</strong></span>
              <span>·</span>
              <span>Mortality: <strong className="text-red-700">{submittedCase.mortality}</strong></span>
            </div>
          </div>

          {/* Primary Action: Send to WhatsApp */}
          <div className="p-5 bg-red-950 text-white rounded-2xl space-y-3 border border-red-800">
            <h3 className="text-sm font-bold text-amber-300">
              Send This Clinical Case to Dr. Zain Rauf's WhatsApp ({CONTACT_CONFIG.phoneDisplay})
            </h3>
            <p className="text-xs text-red-100/90 leading-relaxed">
              Clicking below opens WhatsApp with all your case symptoms automatically formatted. You can attach photos of droppings, post-mortem organs, or milk strips for direct evaluation.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleOpenWhatsAppTriage}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Case to Doctor on WhatsApp</span>
              </button>
              <button
                onClick={() => setSubmittedCase(null)}
                className="text-xs text-red-200 hover:text-amber-300 underline underline-offset-4 font-medium"
              >
                Start New Consultation Form
              </button>
            </div>
          </div>

          {/* Quick Veterinary Recommendations */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Immediate Supportive Actions While You Wait For Reply:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Ensure fresh cool water is accessible immediately; add electrolytes if animals are weak.</li>
              <li>Isolate visibly moribund birds or sick animals from the main pen to prevent aerosol contagion.</li>
              <li>Do not blindly administer heavy aminoglycoside antibiotics without dosage verification.</li>
              <li>Check shed ventilation and water line pressure right away.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Intake Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-red-100 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Step 1: Species Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-red-800 uppercase tracking-wider">
              Step 1: Select Animal Enterprise
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSpeciesSwitch('poultry')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  species === 'poultry'
                    ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                    : 'border-red-100 hover:border-amber-300'
                }`}
              >
                <span className="text-2xl mb-1 block">🐓</span>
                <span className="text-sm font-bold text-red-950 block">Poultry Flock</span>
                <span className="text-xs text-gray-500">Broilers, layers, desi, breeders</span>
              </button>

              <button
                type="button"
                onClick={() => handleSpeciesSwitch('dairy')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  species === 'dairy'
                    ? 'border-red-600 bg-red-50/70 shadow-xs'
                    : 'border-red-100 hover:border-red-300'
                }`}
              >
                <span className="text-2xl mb-1 block">🐄</span>
                <span className="text-sm font-bold text-red-950 block">Dairy & Buffalo</span>
                <span className="text-xs text-gray-500">Milking cows, buffaloes, calves</span>
              </button>
            </div>
          </div>

          {/* Step 2: Animal Subtype & Numbers */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-red-800 uppercase tracking-wider">
              Step 2: Farm Details & Animal Stage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Animal Category</label>
                <input
                  type="text"
                  value={animalSubtype}
                  onChange={(e) => setAnimalSubtype(e.target.value)}
                  placeholder={species === 'poultry' ? 'e.g. Commercial Broiler' : 'e.g. Sahiwal Cow'}
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Flock or Herd Size</label>
                <input
                  type="text"
                  value={herdSize}
                  onChange={(e) => setHerdSize(e.target.value)}
                  placeholder={species === 'poultry' ? 'e.g. 5,000 birds' : 'e.g. 25 milking cows'}
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Age / Production Stage</label>
                <input
                  type="text"
                  value={animalAge}
                  onChange={(e) => setAnimalAge(e.target.value)}
                  placeholder={species === 'poultry' ? 'e.g. 18 days old' : 'e.g. 3 weeks post-calving'}
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Observable Symptoms Clickable Tags */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-red-800 uppercase tracking-wider">
                Step 3: Click Symptoms You Are Seeing (Easy Selection)
              </label>
              <span className="text-[11px] text-gray-400">Select all that apply</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(species === 'poultry' ? POULTRY_SYMPTOMS : DAIRY_SYMPTOMS).map((sym) => {
                const isSelected = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-red-50/30 text-red-950 border-red-100 hover:bg-red-50'
                    }`}
                  >
                    <span>{sym}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-white ml-2" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="block text-xs text-gray-600 mb-1">
                Other Symptoms or Feed History (Optional)
              </label>
              <textarea
                rows={2}
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)}
                placeholder="Describe color of droppings, feed brand, recent vaccinations, or medications already attempted..."
                className="w-full bg-red-50/30 border border-red-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-red-600"
              />
            </div>
          </div>

          {/* Step 4: Duration & Mortality */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-red-800 uppercase tracking-wider">
              Step 4: Clinical Urgency
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">How Long Have Symptoms Lasted?</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                >
                  <option value="Started today (< 24 hours)">Started today (Less than 24 hours)</option>
                  <option value="2 to 3 days">2 to 3 days</option>
                  <option value="4 to 7 days">4 to 7 days</option>
                  <option value="More than 1 week (chronic)">More than 1 week (chronic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Mortality / Deaths (If Any)</label>
                <input
                  type="text"
                  value={mortalityCount}
                  onChange={(e) => setMortalityCount(e.target.value)}
                  placeholder="e.g. 12 birds yesterday or 0"
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>
          </div>

          {/* Step 5: Farmer Contact */}
          <div className="space-y-3 pt-4 border-t border-red-100">
            <label className="block text-xs font-bold text-red-800 uppercase tracking-wider">
              Step 5: Farmer Contact Details (For Doctor's Reply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Chaudhry Tariq"
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  placeholder="e.g. 0300-1234567"
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Village / City *</label>
                <input
                  type="text"
                  required
                  value={farmerLocation}
                  onChange={(e) => setFarmerLocation(e.target.value)}
                  placeholder="e.g. Depalpur, Okara"
                  className="w-full bg-red-50/30 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Generate Consultation Ticket</span>
            </button>

            <a
              href={CONTACT_CONFIG.whatsAppBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-950"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Or Call Emergency Help directly: {CONTACT_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
