
import React from 'react';
import { ArrowRight, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FoodProviderCard from '../FoodProviderCard';
import { useHomeFood } from '@/contexts/homefood/HomeFoodContext';
import { Container } from '@/components/ui/container';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionTitle } from '@/components/ui/section-title';
import { motion } from 'framer-motion';

const HomeFoodSection = () => {
  const { providers, favorites } = useHomeFood();
  const { t, language } = useLanguage();
  
  // Get the latest 3 providers
  const latestProviders = providers.slice(0, 3);
  
  return (
    <section className="py-16 bg-gradient-to-t from-muted/10 via-background to-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle 
            title={language === 'ar' ? t('home.homefood') : 'Home Food'}
            subtitle={language === 'ar' ? t('home.homefoodDescription') : 'Homemade meals from local chefs'}
            className="md:mb-0"
          />
          <Button variant="ghost" size="sm" asChild className="self-start md:self-auto">
            <Link to="/homefood" className="flex items-center group">
              {t('home.viewAll')}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FoodProviderCard 
                provider={provider} 
                isFavorite={favorites.includes(provider.id)}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button asChild className="button-gradient rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-6 h-auto text-lg group">
            <Link to="/homefood/add" className="flex items-center">
              <ChefHat className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {language === 'ar' ? t('home.addListing') : 'Add Your Food Listing'}
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default HomeFoodSection;
