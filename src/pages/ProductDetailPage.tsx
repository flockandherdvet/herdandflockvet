import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Plus, Minus, MessageCircle, Facebook, Instagram, ShieldCheck, Check, Star, AlertTriangle, Truck } from 'lucide-react';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { CONTACT_CONFIG, getProductWhatsAppLink } from '../data/contactConfig';
import { formatProductPrice } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newFarmType, setNewFarmType] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      farmType: newFarmType.trim() || 'Poultry & Dairy Farmer',
      location: newLocation.trim() || 'Punjab, Pakistan',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment.trim(),
    };

    setReviewsList([review, ...reviewsList]);
    setNewAuthor('');
    setNewFarmType('');
    setNewLocation('');
    setNewComment('');
    setShowReviewForm(false);
  };

  const prefilledWhatsAppLink = getProductWhatsAppLink(product.name, quantity);
  const displayPrice = formatProductPrice(product, quantity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-red-800 hover:text-red-950 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span>Dispensary</span>
          <span>/</span>
          <span className="capitalize">{product.species}</span>
          <span>/</span>
          <span className="capitalize text-red-700 font-medium">{product.category}</span>
        </div>
      </div>

      {/* Main PDP Grid: Gallery on left, Required Details + Purchase Module on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image & Guarantees */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl bg-[#faf5f5] border border-red-100 overflow-hidden flex items-center justify-center p-4 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
            {/* Species Tag */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg shadow-xs ${
                  product.species === 'poultry'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-red-700 text-white border border-red-700'
                }`}
              >
                {product.species}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span className="bg-white/95 text-xs font-semibold text-red-800 px-2.5 py-1 rounded-md border border-red-200 shadow-xs">
                Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-2xl border border-red-100 text-xs shadow-xs">
            <div className="flex flex-col items-center text-center p-2 border-r border-red-100">
              <Truck className="w-4 h-4 text-red-600 mb-1" />
              <span className="font-bold text-red-950">Cash on Delivery</span>
              <span className="text-[11px] text-slate-500">Pay at delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <ShieldCheck className="w-4 h-4 text-red-600 mb-1" />
              <span className="font-bold text-red-950">Direct Vet Support</span>
              <span className="text-[11px] text-slate-500">Dr. Zain Rauf</span>
            </div>
          </div>
        </div>

        {/* Right: All Required Fields + Purchase Module */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-red-950 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Mandatory Prescription Notice */}
          {product.isPrescription && (
            <div className="p-3.5 rounded-2xl bg-red-50 border-2 border-red-300 flex items-center gap-3 text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider">Prescription Item</p>
                <p className="text-sm font-bold">Use under veterinary advice.</p>
              </div>
            </div>
          )}

          {/* Pricing Box */}
          <div className="p-4 bg-white rounded-2xl border border-red-100 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Price (PKR)
              </span>
              <span
                className={`font-black tabular-nums ${
                  product.price === null
                    ? 'text-xl sm:text-2xl text-amber-700'
                    : 'text-2xl sm:text-3xl text-red-950'
                }`}
              >
                {displayPrice}
              </span>
            </div>
            <span className="text-xs text-red-700 font-semibold">
              Cash on Delivery
            </span>
          </div>

          {/* Required Product Specifications Grid */}
          <div className="bg-white rounded-2xl border border-red-100 divide-y divide-red-50 text-xs sm:text-sm">
            <div className="p-3.5 grid grid-cols-3 gap-2">
              <span className="font-bold text-red-900">Company</span>
              <span className="col-span-2 text-slate-800 font-medium">{product.company}</span>
            </div>
            <div className="p-3.5 grid grid-cols-3 gap-2">
              <span className="font-bold text-red-900">Pack Size</span>
              <span className="col-span-2 text-slate-800 font-medium">{product.packSize}</span>
            </div>
            <div className="p-3.5 grid grid-cols-3 gap-2">
              <span className="font-bold text-red-900">Dosage</span>
              <span className="col-span-2 text-slate-800 font-medium">{product.dosage}</span>
            </div>
            <div className="p-3.5 grid grid-cols-3 gap-2">
              <span className="font-bold text-red-900">Milk / Meat Withdrawal Period</span>
              <span className="col-span-2 text-amber-900 font-semibold">{product.withdrawalPeriod}</span>
            </div>
            <div className="p-3.5 grid grid-cols-3 gap-2">
              <span className="font-bold text-red-900">Description</span>
              <span className="col-span-2 text-slate-700">{product.description}</span>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-red-900">
              Order Quantity:
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between border-2 border-red-200 rounded-xl overflow-hidden bg-white p-1 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="p-2 text-red-800 hover:bg-red-50 rounded-lg transition-colors font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-extrabold text-red-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 text-red-800 hover:bg-red-50 rounded-lg transition-colors font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap ${
                  isAdded
                    ? 'bg-red-800 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      {product.price === null
                        ? 'Add to Cart (Confirm Price)'
                        : `Add to Cart (${displayPrice})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* MANDATORY SOCIAL ORDERING SECTION */}
          <div className="p-4 rounded-2xl bg-red-950 text-white space-y-3 border border-red-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Direct Farmer Communication
              </span>
              <span className="text-[11px] text-red-200 tabular-nums">{CONTACT_CONFIG.phoneDisplay}</span>
            </div>

            <p className="text-xs font-bold text-red-50">
              Order or ask on WhatsApp / Facebook / Instagram
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a
                href={prefilledWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                title={`Order or ask about ${product.name} on WhatsApp`}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="truncate">WhatsApp Order</span>
              </a>

              <a
                href={CONTACT_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Message on Facebook"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4 shrink-0" />
                <span>Facebook</span>
              </a>

              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Message on Instagram"
                className="flex items-center justify-center gap-2 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-opacity shadow-sm"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="border-t border-red-100 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-red-100">
          <div>
            <h2 className="text-base font-bold text-red-950">Customer Reviews</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {reviewsList.length} review(s) submitted by practicing dairy and poultry farmers
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Farmer Review'}
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-red-50/40 p-6 rounded-2xl border border-red-200 space-y-4 animate-in fade-in"
          >
            <h3 className="text-sm font-bold text-red-950">
              Share Your Experience with {product.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-red-900 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Chaudhry Aslam"
                  className="w-full bg-white border border-red-200 rounded-lg px-3 py-2 text-xs focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-red-900 mb-1">
                  Farm Type & Size
                </label>
                <input
                  type="text"
                  value={newFarmType}
                  onChange={(e) => setNewFarmType(e.target.value)}
                  placeholder="e.g. Broiler Shed"
                  className="w-full bg-white border border-red-200 rounded-lg px-3 py-2 text-xs focus:outline-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-red-900 mb-1">
                  City / Tehsil
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Sahiwal"
                  className="w-full bg-white border border-red-200 rounded-lg px-3 py-2 text-xs focus:outline-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-900 mb-1">
                Rating (1 to 5 Stars)
              </label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="bg-white border border-red-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-red-600"
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Good</option>
                <option value={3}>3 Stars - Satisfactory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-red-900 mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your feedback on this product..."
                className="w-full bg-white border border-red-200 rounded-lg p-3 text-xs focus:outline-red-600"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviewsList.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-6 bg-white rounded-2xl border border-red-100">
              No reviews yet. Be the first farmer to review this product.
            </p>
          ) : (
            reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-red-100 space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-950">{rev.author}</span>
                    <span className="text-xs text-slate-400"> · {rev.farmType} ({rev.location})</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                <p className="text-[10px] text-slate-400 pt-1">{rev.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
