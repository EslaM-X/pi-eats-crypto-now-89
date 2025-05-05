
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const CartItemsList = () => {
  const { items } = useCart();
  
  if (items.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex items-start py-4 first:pt-0 last:pb-0">
            <div 
              className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4"
              style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}
            />
            <div className="flex-grow">
              <h3 className="font-medium">{item.name}</h3>
              {item.restaurantName && <p className="text-sm text-muted-foreground">From {item.restaurantName}</p>}
              <div className="flex items-center mt-1">
                <span>Quantity: {item.quantity}</span>
                <span className="mx-2">•</span>
                <span>π {item.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-right font-semibold">
              π {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartItemsList;
