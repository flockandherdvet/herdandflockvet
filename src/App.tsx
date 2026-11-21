/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Product, Species } from './types';
import { PRODUCTS } from './data/products';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopSpecies, setShopSpecies] = useState<Species | undefined>(undefined);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  const handleNavigate = (page: string, params?: { species?: Species; productId?: string }) => {
    if (params?.species) {
      setShopSpecies(params.species);
    }
    if (params?.productId) {
      const prod = PRODUCTS.find((p) => p.id === params.productId);
      if (prod) {
        setSelectedProduct(prod);
        setCurrentPage('product');
        return;
      }
    }
    setCurrentPage(page);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        );
      case 'shop':
        return (
          <ShopPage
            initialSpecies={shopSpecies}
            onViewProduct={handleViewProduct}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentPage('shop')}
            onViewProduct={handleViewProduct}
          />
        ) : (
          <ShopPage onViewProduct={handleViewProduct} />
        );
      case 'consultation':
        return <ConsultationPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return (
          <CheckoutPage
            onBackToShop={() => setCurrentPage('shop')}
            onNavigateHome={() => setCurrentPage('home')}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onViewProduct={handleViewProduct}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#fffafa] text-red-950">
        {/* Top Header */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Dynamic Page Content */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Global Slide-Out Cart Drawer */}
        <CartDrawer
          onProceedToCheckout={() => setCurrentPage('checkout')}
          onContinueShopping={() => setCurrentPage('shop')}
        />

        {/* Floating Quick Call & WhatsApp Buttons */}
        <FloatingContactButtons />

        {/* Trustworthy Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </CartProvider>
  );
}
