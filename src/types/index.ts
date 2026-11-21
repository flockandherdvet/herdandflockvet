export type Species = 'poultry' | 'dairy';

export type PoultryCategory =
  | 'vitamins and electrolytes'
  | 'feed additives and probiotics'
  | 'disinfectants and biosecurity'
  | 'respiratory care'
  | 'dewormers';

export type DairyCategory =
  | 'mineral mixtures'
  | 'calcium and energy boosters'
  | 'vitamins and antioxidants'
  | 'tick and fly control'
  | 'dewormers';

export type ProductCategory = PoultryCategory | DairyCategory;

export interface Review {
  id: string;
  author: string;
  farmType: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  company: string;
  species: Species;
  category: ProductCategory;
  price: number | null; // numeric PKR price, or null when "Call for price" / CONFIRM
  priceLabel?: string; // explicit display label e.g. "Call for price" or "Rs. 2,516 or Rs. 3,700 (Call for price)"
  priceUnitNote?: string; // e.g. "per carton"
  packSize: string; // exact pack size or "See label"
  inStock: boolean;
  featured?: boolean;
  isPrescription?: boolean; // shows "Use under veterinary advice."
  image: string;
  description: string;
  dosage: string; // exact user-given dosage or "See label"
  withdrawalPeriod: string; // exact withdrawal period or "See label"
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  villageCity: string;
  district: string;
  address: string;
  farmType: string;
  notes?: string;
  paymentMethod: 'cash_on_delivery';
  items: CartItem[];
  subtotal: number;
  hasUnpricedItems?: boolean;
  deliveryFee: number;
  total: number;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Dispatched';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  species: Species | 'all';
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  authorRole: string;
  content: string[];
  keyTips: string[];
}
