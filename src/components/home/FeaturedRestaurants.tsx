
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../RestaurantCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionTitle } from '@/components/ui/section-title';
import { motion } from 'framer-motion';

// Mock featured restaurants data
const featuredRestaurants = [
  {
    id: '1',
    name: 'Pyramid Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800',
    cuisine: 'Pizza, Italian',
    rating: 4.7,
    deliveryTime: '20-30 min',
    priceRange: 'π 10-15',
    featured: true
  },
  {
    id: '2',
    name: 'Cairo Kebab',
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=800',
    cuisine: 'Middle Eastern',
    rating: 4.5,
    deliveryTime: '25-40 min',
    priceRange: 'π 15-25',
    featured: true
  },
  {
    id: '3',
    name: 'Nile Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    cuisine: 'Japanese, Sushi',
    rating: 4.8,
    deliveryTime: '30-45 min',
    priceRange: 'π 20-35',
    featured: true
  }
];

const FeaturedRestaurants = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <SectionTitle 
          title={t('home.featured')}
          className="md:mb-0"
        />
        <Button variant="ghost" size="sm" asChild className="self-start md:self-auto">
          <Link to="/restaurants" className="flex items-center group">
            {t('home.viewAll')}
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featuredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <RestaurantCard {...restaurant} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
