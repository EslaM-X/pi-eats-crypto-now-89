
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Helmet } from 'react-helmet-async';
import InstallPWA from "@/components/InstallPWA";

import PiEatLogo from "@/components/PiEatLogo";

const Index = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if app is installed and being launched in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                          || (window.navigator as any).standalone 
                          || document.referrer.includes('android-app://');
    
    if (isStandalone) {
      console.log('App launched in standalone mode');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('app.title')} | {t('app.subtitle')}</title>
        <meta name="description" content={t('home.subtitle')} />
      </Helmet>
      
      <div className="container mx-auto px-4 pb-20 md:pb-10">
        <Header />
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="py-10 md:py-20 max-w-3xl mx-auto text-center">
            <PiEatLogo size="xl" className="mx-auto mb-6" style="gradient" />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('home.welcome')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => navigate('/restaurants')} 
                className="button-gradient text-lg py-6 px-8"
              >
                {t('home.exploreRestaurants')}
              </Button>
              <Button 
                onClick={() => navigate('/homefood')} 
                variant="outline" 
                className="text-lg py-6 px-8"
              >
                {t('home.exploreHomeFood')}
              </Button>
            </div>
            
            {/* PWA Install Button */}
            <div className="flex justify-center my-4">
              <InstallPWA />
            </div>
            
            {/* App Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-br from-card/50 to-card p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">🏡</div>
                <h3 className="text-xl font-semibold mb-2">Home Cooked Food</h3>
                <p className="text-muted-foreground">Order authentic home-cooked meals from local chefs</p>
              </div>
              
              <div className="bg-gradient-to-br from-card/50 to-card p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">🍕</div>
                <h3 className="text-xl font-semibold mb-2">Restaurant Delivery</h3>
                <p className="text-muted-foreground">Order from your favorite local restaurants</p>
              </div>
              
              <div className="bg-gradient-to-br from-card/50 to-card p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-3">π</div>
                <h3 className="text-xl font-semibold mb-2">Pi Payments</h3>
                <p className="text-muted-foreground">Pay seamlessly with Pi cryptocurrency</p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <p className="text-sm text-muted-foreground">
                © 2023-2025 PiEat-Me. All rights reserved.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Index;
