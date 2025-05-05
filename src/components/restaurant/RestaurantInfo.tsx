
import React from 'react';
import { MapPin, Clock, Phone, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface RestaurantInfoProps {
  restaurant: any;
  theme: string;
}

const RestaurantInfo = ({ restaurant, theme }: RestaurantInfoProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className={`mb-6 ${theme === 'dark' ? 'bg-muted/20' : ''}`}>
      <CardContent className="p-6">
        <p className="text-muted-foreground mb-4">{restaurant.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{restaurant.address}</span>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{restaurant.openingHours}</span>
          </div>
          <div className="flex items-start">
            <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{restaurant.phone}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-1" />
          <span>
            {t('restaurants.minOrder')}: π{restaurant.minOrder.toFixed(2)} • 
            {t('restaurants.deliveryFee')}: π{restaurant.deliveryFee.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
