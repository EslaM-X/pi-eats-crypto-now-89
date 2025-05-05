
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuItemProps {
  item: any;
  theme: string;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  addToCart: (item: any) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const MenuItem = ({ 
  item, 
  theme, 
  isInCart, 
  getItemQuantity, 
  addToCart, 
  updateItemQuantity 
}: MenuItemProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className={`overflow-hidden ${theme === 'dark' ? 'bg-muted/20' : ''}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 h-32 sm:h-auto">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="font-medium">
                {item.name}
                {item.popular && (
                  <Badge variant="secondary" className="ml-2 bg-orange/20 text-orange">
                    {t('restaurants.popular')}
                  </Badge>
                )}
              </h3>
              <div className="font-semibold">π {item.price.toFixed(2)}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          
          <div className="mt-4">
            {!isInCart(item.id) ? (
              <Button 
                onClick={() => addToCart(item)}
                size="sm"
                className="w-full button-gradient"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('restaurants.addToCart')}
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, getItemQuantity(item.id) - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium px-2">
                  {getItemQuantity(item.id)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, getItemQuantity(item.id) + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItem;
