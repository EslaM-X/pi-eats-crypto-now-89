
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from 'react-helmet-async';
import InstallPWA from "@/components/InstallPWA";
import { motion } from "framer-motion";
import { ShoppingBag, ChefHat, Wallet } from "lucide-react";

import PiEatLogo from "@/components/PiEatLogo";
import Hero from "@/components/home/Hero";

const Index = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Calculate animation delay based on index
  const getAnimationDelay = (index) => {
    return 0.1 + index * 0.1;
  };

  useEffect(() => {
    // Check if app is installed and being launched in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                          || (window.navigator as any).standalone 
                          || document.referrer.includes('android-app://');
    
    if (isStandalone) {
      console.log('App launched in standalone mode');
    }
    
    // Fix for mobile viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  // Feature items for the homepage
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 mb-3 text-pi" />,
      title: t('features.restaurantDelivery'),
      description: t('features.restaurantDesc')
    },
    {
      icon: <ChefHat className="h-8 w-8 mb-3 text-orange-500" />,
      title: t('features.homeCookedFood'),
      description: t('features.homeCookedDesc')
    },
    {
      icon: <Wallet className="h-8 w-8 mb-3 text-green-500" />,
      title: t('features.piPayments'),
      description: t('features.piPaymentsDesc')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('app.name')} | {t('home.subtitle')}</title>
        <meta name="description" content={t('home.subtitle')} />
      </Helmet>
      
      <div className="bg-gradient-to-b from-background to-background/95 min-h-screen">
        <Header />
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          {/* Hero Section with enhanced animations */}
          <Hero />
          
          <div className="container mx-auto px-4 py-12">
            {/* PWA Install Button with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center my-8"
            >
              <InstallPWA />
            </motion.div>
            
            {/* App Features with enhanced animations and styling */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent">
                  {language === 'ar' ? 'مزايا التطبيق' : 'App Features'}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: getAnimationDelay(index) }}
                    className="elevated-card p-6 hover-lift"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-full p-4 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className={`text-muted-foreground ${language === 'ar' ? 'arabic-text' : ''}`}>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Get Started Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('home.readyToStart')}
              </h2>
              <p className={`text-lg text-muted-foreground mb-8 ${language === 'ar' ? 'arabic-text' : ''}`}>
                {t('home.futureOfDelivery')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/restaurants')} 
                  className="button-gradient text-lg py-6 px-8 interactive-button"
                  size="lg"
                >
                  {t('home.exploreRestaurants')}
                </Button>
                <Button 
                  onClick={() => navigate('/homefood')} 
                  variant="outline" 
                  className="text-lg py-6 px-8 interactive-button"
                  size="lg"
                >
                  {t('home.exploreHomeFood')}
                </Button>
              </div>
            </motion.div>
            
            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-16 pb-20"
            >
              <div className="mb-4">
                <PiEatLogo size="md" className="mx-auto logo-animate" style="gradient" />
              </div>
              <p className="text-sm text-muted-foreground">
                © 2023-2025 PiEat-Me. All rights reserved.
              </p>
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Index;
