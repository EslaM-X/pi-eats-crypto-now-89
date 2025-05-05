
import React from 'react';
import MenuItem from './MenuItem';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuCategoryTabProps {
  category: any;
  theme: string;
  isInCart: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
  addToCart: (item: any) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const MenuCategoryTab = ({ 
  category, 
  theme,
  isInCart,
  getItemQuantity,
  addToCart,
  updateItemQuantity
}: MenuCategoryTabProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {category.items.map((item: any) => (
        <MenuItem
          key={item.id}
          item={item}
          theme={theme}
          isInCart={isInCart}
          getItemQuantity={getItemQuantity}
          addToCart={addToCart}
          updateItemQuantity={updateItemQuantity}
        />
      ))}
    </div>
  );
};

export default MenuCategoryTab;
