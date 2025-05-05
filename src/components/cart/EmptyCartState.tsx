
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCartState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center mb-6">
      <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
      <p className="text-muted-foreground mb-4">
        Start adding items from our restaurants to place an order
      </p>
      <Button onClick={() => navigate('/restaurants')} className="button-gradient">
        Browse Restaurants
      </Button>
    </div>
  );
};

export default EmptyCartState;
