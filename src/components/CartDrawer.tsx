import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CONTACT_CONFIG } from '../data/contactConfig';
import { formatProductPrice } from '../data/products';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    hasUnpricedItems,
    deliveryFee,
    grandTotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.product.packSize}) x ${item.quantity} = ${formatProductPrice(
            item.product,
            item.quantity
          )}`
      )
      .join('\n');

    const totalNote = hasUnpricedItems
      ? `Known Subtotal: Rs. ${subtotal.toLocaleString()} (plus items marked Call for price)`
      : `Subtotal: Rs. ${subtotal.toLocaleString()}\nEstimated Total: Rs. ${grandTotal.toLocaleString()}`;

    const message = `Assalam-o-Alaikum Doctor Zain,\n\nI want to order the following items from Herd and Flock Vet website (Cash on Delivery):\n\n${itemsList}\n\n${totalNote}\n\nPlease confirm availability and dispatch to my address.`;
    window.open(
      `https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const freeDeliveryThreshold = 7000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-red-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 bg-red-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold">Your Order Cart</h2>
              <span className="text-xs bg-red-800 text-amber-300 px-2 py-0.5 rounded-full font-mono tabular-nums">
                {totalItems} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-md text-red-200 hover:text-white hover:bg-red-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-red-50 px-5 py-2.5 border-b border-red-100 text-xs">
            {subtotal >= freeDeliveryThreshold ? (
              <p className="text-red-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                You qualified for Free Farm Delivery!
              </p>
            ) : (
              <div>
                <p className="text-red-900 font-medium">
                  Add <span className="font-bold text-red-700">Rs. {(freeDeliveryThreshold - subtotal).toLocaleString()}</span> more for <span className="font-bold text-red-700">Free Farm Delivery</span>!
                </p>
                <div className="w-full bg-red-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-red-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="text-base font-bold text-red-950">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1 mb-5">
                  Browse our poultry and dairy veterinary products and add items to your cart.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onContinueShopping();
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Browse Veterinary Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-3 group">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-contain bg-[#faf5f5] border border-red-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-red-950 leading-tight line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 p-0.5 rounded transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Pack: {item.product.packSize} · <span className="capitalize">{item.product.species}</span>
                      </p>
                      {item.product.isPrescription && (
                        <p className="text-[10px] text-red-700 font-bold mt-0.5">
                          Use under veterinary advice.
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-red-200 rounded-md overflow-hidden bg-red-50/40">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-red-800 hover:bg-red-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-red-950 min-w-6 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-red-800 hover:bg-red-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            item.product.price === null ? 'text-amber-800' : 'text-red-950'
                          }`}
                        >
                          {formatProductPrice(item.product, item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 bg-red-50/50 border-t border-red-100 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold tabular-nums text-red-950">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Farm Delivery Fee:</span>
                  <span className="font-semibold tabular-nums text-red-950">
                    {deliveryFee === 0 ? (
                      <span className="text-red-700 font-bold">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-red-200 flex justify-between text-sm font-extrabold text-red-950">
                  <span>Estimated Total:</span>
                  <span className="text-red-700 text-base tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
                {hasUnpricedItems && (
                  <p className="text-[11px] text-amber-900 font-medium bg-amber-50 p-2 rounded-md border border-amber-200">
                    Includes items marked "Call for price" — exact price will be confirmed by Dr. Zain before dispatch.
                  </p>
                )}
                <p className="text-[11px] text-red-900 font-medium bg-white p-2 rounded-md border border-red-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Cash on Delivery (Pay cash when rider reaches your farm)</span>
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsAppCartOrder}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-800 border border-red-200 font-semibold py-2.5 px-4 rounded-xl transition-colors text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-red-600" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
