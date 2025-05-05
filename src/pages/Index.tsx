
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

// Import components
import Hero from '@/components/home/Hero';
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants';
import HowItWorks from '@/components/home/HowItWorks';
import FoodCategories from '@/components/home/FoodCategories';
import HomeFoodSection from '@/components/home/HomeFoodSection';
import { Container } from '@/components/ui/container';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>PiEat-Me | {t('home.subtitle')}</title>
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      <Container>
        {/* Food Categories Section */}
        <FoodCategories />
        
        {/* Featured Restaurants Section */}
        <FeaturedRestaurants />
      </Container>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* HomeFood Section */}
      <HomeFoodSection />
    </>
  );
};

export default Index;
