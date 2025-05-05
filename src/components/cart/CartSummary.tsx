
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { toast } from 'sonner';

const CartSummary = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = usePiAuth();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pi' | 'pieat'>('pi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to complete your order');
      return;
    }
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (!deliveryAddress) {
      toast.error('Please provide a delivery address');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const orderId = await createOrder(items, paymentMethod, deliveryAddress);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders?new=${orderId}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>π {totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>π 0.50</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>π {(totalAmount + 0.5).toFixed(2)}</span>
        </div>
        
        {/* Delivery Address */}
        <div className="mt-4">
          <Label htmlFor="address">Delivery Address</Label>
          <div className="flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
            <Input 
              id="address"
              placeholder="Enter your delivery address" 
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="mt-4">
          <Label>Payment Method</Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'pi' | 'pieat')}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pi" id="pi" />
              <Label htmlFor="pi" className="flex items-center">
                <div className="text-lg mr-2">π</div>
                <span>Pi Wallet</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="pieat" id="pieat" />
              <Label htmlFor="pieat" className="flex items-center">
                <div className="relative mr-2">
                  <div className="text-lg">π</div>
                  <div className="absolute -top-1 -right-2 text-xs bg-orange text-white rounded-full h-3 w-3 flex items-center justify-center">
                    🍕
                  </div>
                </div>
                <span>PiEat Balance</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full button-gradient" 
          onClick={handleCheckout}
          disabled={isProcessing || !deliveryAddress}
        >
          {isProcessing ? (
            <span className="flex items-center">
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Place Order
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
