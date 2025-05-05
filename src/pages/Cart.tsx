
import React from 'react';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import EmptyCartState from '@/components/cart/EmptyCartState';
import CartItemsList from '@/components/cart/CartItemsList';
import CartSummary from '@/components/cart/CartSummary';

const Cart = () => {
  const { items } = useCart();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center">
            <EmptyCartState />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CartItemsList />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
