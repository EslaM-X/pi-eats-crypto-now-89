
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface RestaurantHeaderProps {
  restaurant: any;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="relative h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${restaurant.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-4">
          <Link to="/restaurants">
            <Button variant="ghost" className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/40">
              <ChevronLeft className="h-5 w-5" />
              {t('restaurants.back')}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {restaurant.cuisine}
              </Badge>
              <div className="flex items-center text-white">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{restaurant.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-white">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
