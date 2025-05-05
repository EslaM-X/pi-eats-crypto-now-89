
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PiEatLogo from '../PiEatLogo';
import { Container } from '@/components/ui/container';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-pi/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      
      {/* Decorative circles */}
      <div className="hidden md:block absolute top-20 right-20 w-16 h-16 rounded-full bg-orange/20 animate-pulse-slow" />
      <div className="hidden md:block absolute bottom-20 left-20 w-12 h-12 rounded-full bg-pi/20 animate-pulse-slow" />
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 transform hover:scale-105 transition-transform duration-300"
          >
            <PiEatLogo size={isMobile ? "lg" : "xl"} showEmoji={true} style="gradient" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {language === 'ar' ? (
              <div className="flex flex-col gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange animate-pulse-slow welcome-highlight">
                  {t('home.welcomeHighlight')}
                </h2>
                <h1 className="app-name text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent">
                  {t('home.welcome')}
                </h1>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange animate-pulse-slow">
                  Use Pi to order food
                </h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent">
                  {t('home.welcome')}
                </h1>
              </div>
            )}
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed ${language === 'ar' ? 'arabic-text' : ''}`}
          >
            {t('home.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full max-w-md mx-auto"
          >
            <Button asChild className={`button-gradient text-lg h-12 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${language === 'ar' ? 'text-sm' : ''}`}>
              <Link to="/restaurants" className="flex items-center gap-2">
                {t('nav.restaurants')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className={`text-lg h-12 px-8 border-pi hover:bg-pi/10 rounded-full ${language === 'ar' ? 'text-sm' : ''}`}>
              <Link to="/homefood" className="flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                HomeFood
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-muted/40 backdrop-blur-lg' : 'glass-card'} max-w-2xl mx-auto`}
          >
            <p className={`text-muted-foreground ${language === 'ar' ? 'arabic-text' : ''}`}>
              {t('app.tagline')}
            </p>
          </motion.div>

          {/* Decorative food emojis */}
          <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2">
            <div className="text-4xl rotate-12 opacity-20">🍔</div>
          </div>
          <div className="hidden md:flex absolute bottom-1/4 -left-4">
            <div className="text-4xl -rotate-12 opacity-20">🍕</div>
          </div>
        </div>
      </Container>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-12 text-background dark:text-background">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-current"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
