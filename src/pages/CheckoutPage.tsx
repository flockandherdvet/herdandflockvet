import React, { useState } from 'react';
import { Truck, ArrowLeft, CheckCircle2, MessageCircle, Printer, PhoneCall, ShoppingBag, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { CONTACT_CONFIG, getOrderWhatsAppLink } from '../data/contactConfig';
import { formatProductPrice } from '../data/products';

interface CheckoutPageProps {
  onBackToShop: () => void;
  onNavigateHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToShop, onNavigateHome }) => {
  const { cart, subtotal, hasUnpricedItems, deliveryFee, grandTotal, placeOrder, lastOrder } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [villageCity, setVillageCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [farmType, setFarmType] = useState('Commercial Broiler');
  const [notes, setNotes] = useState('');

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(lastOrder || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    const newOrder = placeOrder({
      customerName,
      phone,
      alternatePhone,
      villageCity,
      district,
      address,
      farmType,
      notes,
      paymentMethod: 'cash_on_delivery',
    });

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  // If order is placed, show confirmation screen
  if (confirmedOrder) {
    const whatsAppConfirmationLink = getOrderWhatsAppLink(
      confirmedOrder.orderId,
      confirmedOrder.customerName,
      confirmedOrder.total,
      confirmedOrder.items.length,
      `${confirmedOrder.address}, ${confirmedOrder.villageCity}, ${confirmedOrder.district}`
    );

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3 bg-white rounded-3xl p-8 border border-red-100 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-700">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-red-950">
            Thank You, {confirmedOrder.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Your veterinary order <strong className="text-red-900 font-mono">#{confirmedOrder.orderId}</strong> is received. We are preparing your medicines and dispatching via Cash on Delivery.
          </p>
        </div>

        {/* WhatsApp 1-Click Order Confirmation Action */}
        <div className="bg-red-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-red-900 shadow-xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" />
            <span>Fast WhatsApp Dispatch Verification</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            Confirm Your Order Directly on WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
            To speed up same-day parcel dispatch from our dispensary, click below to send your order receipt directly to Dr. Zain Rauf at <strong className="text-amber-300">{CONTACT_CONFIG.phoneDisplay}</strong>.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={whatsAppConfirmationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Order on WhatsApp ({CONTACT_CONFIG.phoneDisplay})</span>
            </a>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-colors print:hidden whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
          </div>
        </div>

        {/* Printable Official Receipt */}
        <div className="bg-white rounded-3xl border border-red-100 p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-red-100 gap-2">
            <div>
              <div className="flex items-center gap-2.5">
                <img
                  src="/src/assets/images/dr_zain_rauf.jpeg"
                  alt="Dr. Zain Rauf - Herd and Flock Vet"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-lg object-cover object-top border border-red-300 shrink-0"
                />
                <span className="font-extrabold text-red-950 text-base">HERD AND FLOCK VET</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Veterinary Dispensary & Biological Cold-Chain Supplies · Dr. Zain Rauf</p>
            </div>
            <div className="text-right sm:text-right text-xs">
              <span className="text-slate-500 block">Order Reference:</span>
              <span className="font-bold font-mono text-red-950 text-sm">#{confirmedOrder.orderId}</span>
              <span className="text-slate-400 block text-[10px]">{new Date(confirmedOrder.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery & Farmer details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-red-50/60 p-4 rounded-2xl border border-red-100">
            <div>
              <span className="font-bold text-red-950 block mb-1">Delivering To:</span>
              <p className="font-semibold text-red-900">{confirmedOrder.customerName}</p>
              <p className="text-slate-600">{confirmedOrder.address}</p>
              <p className="text-slate-600">{confirmedOrder.villageCity}, {confirmedOrder.district}</p>
              <p className="text-slate-600">Primary Phone: {confirmedOrder.phone}</p>
              {confirmedOrder.alternatePhone && (
                <p className="text-slate-500">Alt Phone: {confirmedOrder.alternatePhone}</p>
              )}
            </div>
            <div>
              <span className="font-bold text-red-950 block mb-1">Payment & Logistics:</span>
              <p className="text-red-700 font-bold">Cash on Delivery (COD)</p>
              <p className="text-slate-600">Farm Type: {confirmedOrder.farmType}</p>
              <p className="text-slate-600">Status: <span className="text-red-800 font-semibold">{confirmedOrder.status}</span></p>
              {confirmedOrder.notes && (
                <p className="text-slate-500 text-[11px] mt-1 italic">Note: {confirmedOrder.notes}</p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-red-950 uppercase tracking-wider block">
              Ordered Supplies
            </span>
            <div className="divide-y divide-red-100 text-xs">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-red-950 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.product.packSize} · Qty: {item.quantity}
                    </p>
                    {item.product.isPrescription && (
                      <p className="text-[10px] font-bold text-red-700">Use under veterinary advice.</p>
                    )}
                  </div>
                  <span className="font-bold text-red-950 tabular-nums shrink-0">
                    {item.product.price === null
                      ? item.product.priceLabel || 'Call for price'
                      : `Rs. ${(item.product.price * item.quantity).toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-red-100 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (priced items):</span>
                <span className="font-semibold text-red-950 tabular-nums">Rs. {confirmedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Farm Delivery:</span>
                <span className="font-semibold text-red-700 tabular-nums">
                  {confirmedOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${confirmedOrder.deliveryFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-red-200 flex justify-between text-sm sm:text-base font-black text-red-950">
                <span>Total Amount Due on Delivery:</span>
                <span className="text-red-700 tabular-nums">
                  Rs. {confirmedOrder.total.toLocaleString()}
                  {confirmedOrder.hasUnpricedItems ? ' + Confirm items' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-order action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 bg-white hover:bg-red-50 text-red-900 border border-red-200 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
          >
            Return to Home
          </button>
          <button
            onClick={onBackToShop}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
          >
            Continue Browsing Catalog
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 opacity-80" />
        </div>
        <h2 className="text-2xl font-extrabold text-red-950">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Please add products from our poultry or dairy catalog to proceed to Cash on Delivery checkout.
        </p>
        <button
          onClick={onBackToShop}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors whitespace-nowrap"
        >
          Browse Veterinary Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Farmer Delivery Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-red-100 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">
              Cash on Delivery Checkout
            </span>
            <h1 className="text-2xl font-extrabold text-red-950 mt-1">
              Farm Delivery & Contact Details
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter where you would like your veterinary supplies delivered. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-red-950 mb-1">
                Farmer / Manager Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Haji Muhammad Tariq"
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>

            {/* Phone numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-red-950 mb-1">
                  Primary Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0334-XXXXXXX"
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500">Rider will call this number before arrival</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-red-950 mb-1">
                  Alternate Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  placeholder="e.g. Farm supervisor number"
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>

            {/* Farm Type & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-red-950 mb-1">
                  Farm Enterprise Type
                </label>
                <select
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                >
                  <option value="Commercial Broiler Farm">Commercial Broiler Farm</option>
                  <option value="Layer Poultry Farm">Commercial Layer Farm</option>
                  <option value="Dairy Cattle Farm">Dairy Cattle Farm</option>
                  <option value="Dairy Buffalo Colony">Dairy Buffalo Colony</option>
                  <option value="Backyard / Desi Flock">Backyard Flock</option>
                  <option value="Calf Rearing Unit">Calf Rearing Unit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-red-950 mb-1">
                  Village / Town / Tehsil *
                </label>
                <input
                  type="text"
                  required
                  value={villageCity}
                  onChange={(e) => setVillageCity(e.target.value)}
                  placeholder="e.g. Chak 42-12L, Chichawatni"
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-red-950 mb-1">
                District / Division *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Sahiwal / Okara / Faisalabad / Lahore"
                className="w-full bg-red-50/40 border border-red-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-red-600"
              />
            </div>

            {/* Full Detailed Address */}
            <div>
              <label className="block text-xs font-bold text-red-950 mb-1">
                Complete Farm Delivery Address / Landmark *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-red-500" />
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Shell Pump, 2km inside canal road, Poultry Shed Gate 1"
                  className="w-full bg-red-50/40 border border-red-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-red-600"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold text-red-950 mb-1">
                Delivery Notes / Vaccine Ice Box Request (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please send extra ice packs for live vaccines; deliver before 4 PM..."
                className="w-full bg-red-50/40 border border-red-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-red-600"
              />
            </div>

            {/* Cash on Delivery Notice Card */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-950">
                <p className="font-bold">Payment Method: Cash on Delivery (COD)</p>
                <p className="text-slate-700 mt-0.5">
                  You will pay cash to the courier representative once you inspect the medicines and seal at your farm gate.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm whitespace-nowrap"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Place Cash on Delivery Order</span>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Preview */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-red-100 p-6 space-y-5 shadow-xs">
          <h2 className="text-base font-bold text-red-950 pb-3 border-b border-red-100 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs text-red-700 font-mono font-semibold">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </h2>

          <div className="divide-y divide-red-100 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-contain bg-[#faf5f5] border border-red-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-red-950 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-slate-500">
                    Pack: {item.product.packSize} · Qty: {item.quantity}
                  </p>
                  {item.product.isPrescription && (
                    <p className="text-[10px] font-bold text-red-700">Use under veterinary advice.</p>
                  )}
                </div>
                <span
                  className={`text-xs font-bold tabular-nums shrink-0 ${
                    item.product.price === null ? 'text-amber-800' : 'text-red-950'
                  }`}
                >
                  {formatProductPrice(item.product, item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-red-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-red-950 tabular-nums">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Farm Delivery:</span>
              <span className="font-semibold text-red-950 tabular-nums">
                {deliveryFee === 0 ? (
                  <span className="text-red-700 font-bold">FREE (Above Rs. 7,000)</span>
                ) : (
                  `Rs. ${deliveryFee}`
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-red-200 flex justify-between text-base font-black text-red-950">
              <span>Total Payable (COD):</span>
              <span className="text-red-700 text-lg tabular-nums">
                Rs. {grandTotal.toLocaleString()}
                {hasUnpricedItems ? ' + Call items' : ''}
              </span>
            </div>
            {hasUnpricedItems && (
              <p className="text-[11px] text-amber-900 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                Includes items marked "Call for price" — Dr. Zain will confirm pricing before dispatch.
              </p>
            )}
          </div>

          <div className="p-3 bg-red-50/70 rounded-xl border border-red-100 text-[11px] text-slate-600 space-y-1">
            <p className="font-semibold text-red-900">Need help with your order?</p>
            <p>Call or WhatsApp Dr. Zain Rauf directly at <strong className="text-red-800">{CONTACT_CONFIG.phoneDisplay}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};
