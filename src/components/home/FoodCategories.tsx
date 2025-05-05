
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionTitle } from '@/components/ui/section-title';
import { motion } from 'framer-motion';

// Define food categories with images
const categories = [
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    emoji: '🍕'
  },
  {
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    emoji: '🍔'
  },
  {
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    emoji: '🍣'
  },
  {
    name: 'Middle Eastern',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    emoji: '🥙'
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400',
    emoji: '🍰'
  },
  {
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400',
    emoji: '🍳'
  }
];

const FoodCategories = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16">
      <SectionTitle 
        title={t('home.categories')}
        subtitle={t('home.categoriesSubtitle')}
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group border-muted hover:border-pi/30"
            >
              <div className="h-28 md:h-32 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                  <span className="text-2xl">{category.emoji}</span>
                </div>
              </div>
              <CardContent className="p-3 text-center">
                <h3 className="font-medium text-lg">{category.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;
