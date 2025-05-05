import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChefHat, Utensils, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RestaurantCard from '@/components/RestaurantCard';
import PiEatLogo from '@/components/PiEatLogo';
import Header from '@/components/Header';

// Import mock data for restaurants
const featuredRestaurants = [
  {
    id: '1',
    name: 'Cairo Grill House',
    image: 'https://source.unsplash.com/random/300x200?restaurant',
    cuisine: 'Middle Eastern, Grill',
    rating: 4.8,
    deliveryTime: '20-30 min',
    priceRange: 'π 10-20',
    featured: true
  },
  {
    id: '2',
    name: 'Alexandria Seafood',
    image: 'https://source.unsplash.com/random/300x200?seafood',
    cuisine: 'Seafood, Mediterranean',
    rating: 4.6,
    deliveryTime: '25-35 min',
    priceRange: 'π 15-30',
    featured: true
  },
  {
    id: '3',
    name: 'Luxor Veggies',
    image: 'https://source.unsplash.com/random/300x200?vegetables',
    cuisine: 'Vegetarian, Healthy',
    rating: 4.7,
    deliveryTime: '15-25 min',
    priceRange: 'π 8-15',
    featured: true
  }
];

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
      <section className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/90 to-orange/90 
                    -z-10 transform -skew-y-3 origin-top-left h-[110%]"
        ></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-6">
              <PiEatLogo size="xl" style="bold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {t('home.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/restaurants')}
                className="bg-white text-primary hover:bg-white/90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
                  <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                  <path d="M21 9H3"></path>
                  <path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
                  <path d="M21 15H3"></path>
                  <path d="M9 9v12"></path>
                  <path d="M15 9v12"></path>
                </svg>
                {t('home.findRestaurants')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/homefood')}
                className="bg-transparent border-white text-white hover:bg-white/20"
              >
                <ChefHat className="mr-2 h-5 w-5" />
                HomeFood
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">{t('home.featuredRestaurants')}</h2>
            <p className="text-muted-foreground mt-1">
              {t('home.featuredDescription')}
            </p>
          </div>
          <Button 
            variant="ghost"
            className="flex items-center"
            onClick={() => navigate('/restaurants')}
          >
            {t('home.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.howItWorks')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none">
              <CardContent className="pt-6 text-center">
                <div className="bg-orange/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Utensils className="h-8 w-8 text-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.step1Title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.step1Desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.step2Title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.step2Desc')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none">
              <CardContent className="pt-6 text-center">
                <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">π</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.step3Title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.step3Desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
