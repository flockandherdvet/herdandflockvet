import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, MessageCircle, Check, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { getProductWhatsAppLink } from '../data/contactConfig';
import { formatProductPrice, formatUnitPrice } from '../data/products';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getProductWhatsAppLink(product.name, quantity);
    window.open(url, '_blank');
  };

  const displayPrice = formatProductPrice(product, quantity);

  return (
    <div
      onClick={() => onViewProduct(product)}
      className="group bg-white rounded-2xl border border-red-100 hover:border-red-400 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-0.5"
    >
      {/* Neutral Product Image Box */}
      <div className="relative aspect-4/3 w-full bg-[#faf5f5] overflow-hidden flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />

        {/* Species Tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs ${
              product.species === 'poultry'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-red-700 text-white border border-red-700'
            }`}
          >
            {product.species}
          </span>
        </div>

        {/* Stock Status */}
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 bg-white/95 text-[11px] font-semibold text-red-800 px-2 py-0.5 rounded-md border border-red-200 shadow-xs">
            Available
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category */}
          <div className="text-[11px] capitalize font-semibold text-red-700 truncate">
            {product.category}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-red-950 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Company & Pack Size */}
          <div className="text-xs text-slate-600 space-y-0.5 pt-0.5">
            <p>
              Company: <span className="font-semibold text-slate-800">{product.company}</span>
            </p>
            <p>
              Pack size: <span className="font-semibold text-slate-800">{product.packSize}</span>
            </p>
            <p className="line-clamp-1">
              Dosage: <span className="font-medium text-slate-700">{product.dosage}</span>
            </p>
          </div>

          {/* Prescription Warning */}
          {product.isPrescription && (
            <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-300 text-red-900 text-[11px] font-bold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>Use under veterinary advice.</span>
            </div>
          )}
        </div>

        {/* Price & Buying Module */}
        <div className="mt-4 pt-3 border-t border-red-50">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <span
              className={`font-extrabold tabular-nums ${
                product.price === null
                  ? 'text-sm text-amber-800'
                  : 'text-base text-red-950'
              }`}
            >
              {displayPrice}
            </span>
            {product.price !== null && quantity > 1 && (
              <span className="text-[11px] text-red-700 font-medium tabular-nums shrink-0">
                ({formatUnitPrice(product)}/unit)
              </span>
            )}
          </div>

          {/* Quantity Selector + Add to Cart Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center border border-red-200 rounded-lg overflow-hidden bg-red-50/40 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="px-2.5 py-1.5 text-red-800 hover:bg-red-100 transition-colors font-bold text-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-bold text-red-950 min-w-7 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="px-2.5 py-1.5 text-red-800 hover:bg-red-100 transition-colors font-bold text-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${quantity} ${product.name} to cart`}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 whitespace-nowrap ${
                  isAdded
                    ? 'bg-red-800 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              title={`Ask or order ${product.name} on WhatsApp`}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg text-[11px] font-semibold border border-red-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Ask / Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
