import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, X, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { Product, Species } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface ShopPageProps {
  initialSpecies?: Species;
  onViewProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialSpecies, onViewProduct }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | 'all'>(initialSpecies || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [showBulkCalculator, setShowBulkCalculator] = useState(false);
  const [bulkFarmType, setBulkFarmType] = useState<'poultry' | 'dairy'>('poultry');
  const [bulkAnimalCount, setBulkAnimalCount] = useState<number>(2000);

  const poultryCount = useMemo(
    () => PRODUCTS.filter((p) => p.species === 'poultry').length,
    []
  );
  const dairyCount = useMemo(
    () => PRODUCTS.filter((p) => p.species === 'dairy').length,
    []
  );

  // Dynamically compute only non-empty categories
  const availableCategories = useMemo(() => {
    const scoped =
      selectedSpecies === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.species === selectedSpecies);
    return Array.from(new Set(scoped.map((p) => p.category)));
  }, [selectedSpecies]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedSpecies !== 'all' && product.species !== selectedSpecies) {
        return false;
      }
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCompany = product.company.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesDosage = product.dosage.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesPack = product.packSize.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesCompany &&
          !matchesDesc &&
          !matchesDosage &&
          !matchesCategory &&
          !matchesPack
        ) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedSpecies, selectedCategory, searchQuery, sortBy]);

  const handleSpeciesChange = (species: Species | 'all') => {
    setSelectedSpecies(species);
    setSelectedCategory('all');
  };

  const handleBulkWhatsAppInquiry = () => {
    const text = `Assalam-o-Alaikum Doctor Zain,\n\nI want to discuss Bulk Farm Pricing for my farm.\nFarm Type: ${bulkFarmType === 'poultry' ? 'Commercial Poultry Shed' : 'Commercial Dairy Herd'}\nAnimal Count: ${bulkAnimalCount} ${bulkFarmType === 'poultry' ? 'birds' : 'cows/buffaloes'}\n\nPlease share bulk availability and transport options.`;
    window.open(`https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Shop Intro */}
      <div className="border-b border-red-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider">
            <span>Dispensary Catalog</span>
            <span>·</span>
            <span>Poultry & Dairy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-red-950 mt-1">
            Veterinary Pharmacy & Farm Supplies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Verified poultry and dairy products stocked by Dr. Zain Rauf. Items marked "Call for price" or "See label" can be confirmed directly on WhatsApp.
          </p>
        </div>

        {/* Bulk order banner toggle button */}
        <button
          onClick={() => setShowBulkCalculator(!showBulkCalculator)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors shrink-0 whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{showBulkCalculator ? 'Hide Bulk Farm Quote' : 'Bulk Farm Order Inquiry'}</span>
        </button>
      </div>

      {/* Bulk Order Calculator Drawer / Banner */}
      {showBulkCalculator && (
        <div className="bg-gradient-to-br from-red-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl animate-in fade-in duration-200 border border-red-800">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Direct Farm-Gate Supply
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                Commercial Farmer Bulk Order Inquiry
              </h3>
              <p className="text-xs text-red-100/90 mt-0.5">
                Message Dr. Zain Rauf directly for carton and bulk farm stock pricing and dispatch rates.
              </p>
            </div>
            <button
              onClick={() => setShowBulkCalculator(false)}
              className="text-red-300 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-red-200 mb-1">
                Your Enterprise Type
              </label>
              <select
                value={bulkFarmType}
                onChange={(e) => setBulkFarmType(e.target.value as any)}
                className="w-full bg-red-950/80 text-white border border-red-700 rounded-lg px-3 py-2 text-xs font-medium focus:outline-amber-400"
              >
                <option value="poultry">Poultry (Broilers / Layers / Breeders)</option>
                <option value="dairy">Dairy (Cows / Buffaloes / Heifers)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-200 mb-1">
                Approximate Flock / Herd Count
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={bulkAnimalCount}
                onChange={(e) => setBulkAnimalCount(Number(e.target.value))}
                className="w-full bg-red-950/80 text-white border border-red-700 rounded-lg px-3 py-2 text-xs font-medium focus:outline-amber-400"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleBulkWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold px-4 py-2.5 rounded-lg text-xs transition-colors shadow-md whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Bulk Quote on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar Control Strip */}
      <div className="space-y-4">
        {/* Row 1: Search & Species Selector */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Species Selector Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-red-50 border border-red-200 rounded-xl shrink-0 self-start">
            <button
              onClick={() => handleSpeciesChange('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'all'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-red-800 hover:text-red-950'
              }`}
            >
              All Species ({PRODUCTS.length})
            </button>
            <button
              onClick={() => handleSpeciesChange('poultry')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'poultry'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-red-800 hover:text-red-950'
              }`}
            >
              <span>Poultry ({poultryCount})</span>
            </button>
            <button
              onClick={() => handleSpeciesChange('dairy')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'dairy'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-red-800 hover:text-red-950'
              }`}
            >
              <span>Dairy & Buffalo ({dairyCount})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, company, or category..."
              className="w-full bg-white border border-red-200 rounded-xl pl-9 pr-9 py-2 text-xs focus:border-red-600 focus:outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-red-700 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-red-200 rounded-xl px-3 py-2 text-xs font-medium text-red-950 focus:outline-none focus:border-red-600"
            >
              <option value="featured">Sort: Featured Items</option>
              <option value="name">Sort: Name (A–Z)</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Active Non-Empty Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-red-800 font-semibold shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white text-red-900 border border-red-200 hover:bg-red-50'
            }`}
          >
            All Categories
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-red-900 border border-red-200 hover:bg-red-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Results Status */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-red-100">
        <span>
          Showing <strong className="text-red-950 tabular-nums">{filteredProducts.length}</strong> veterinary products
          {selectedCategory !== 'all' && (
            <span> in <span className="text-red-700 font-bold capitalize">{selectedCategory}</span></span>
          )}
          {searchQuery && (
            <span> matching "{searchQuery}"</span>
          )}
        </span>

        {(selectedCategory !== 'all' || selectedSpecies !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedSpecies('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-red-700 hover:text-red-950 font-semibold underline underline-offset-2"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-red-300 p-8">
          <h3 className="text-base font-bold text-red-950">No matching veterinary items found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or ask Doctor Zain on WhatsApp directly to confirm stock.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedSpecies('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg text-xs font-semibold"
            >
              Clear Filters
            </button>
            <a
              href={CONTACT_CONFIG.whatsAppBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      )}

      {/* Support Strip */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
        <div>
          <h4 className="text-sm font-bold text-red-950">
            Need Price Confirmation or Dosage Guidance?
          </h4>
          <p className="text-xs text-red-800/80 mt-0.5">
            Contact Dr. Zain Rauf directly for items marked "Call for price" or "See label".
          </p>
        </div>
        <a
          href={CONTACT_CONFIG.whatsAppBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp ({CONTACT_CONFIG.phoneDisplay})</span>
        </a>
      </div>
    </div>
  );
};
