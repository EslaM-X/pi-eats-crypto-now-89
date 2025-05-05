
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const EmptyCartState = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-6">
      <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
      <h1 className="text-2xl font-bold mb-2">{t('cart.empty')}</h1>
      <p className="text-muted-foreground mb-4">
        {t('cart.startAdding')}
      </p>
      <div className="space-y-2">
        <Button onClick={() => navigate('/restaurants')} className="button-gradient w-full">
          {t('cart.browseRestaurants')}
        </Button>
        <Button onClick={() => navigate('/homefood')} variant="outline" className="w-full">
          {t('cart.exploreHomeFood')}
        </Button>
      </div>
    </div>
  );
};

export default EmptyCartState;
