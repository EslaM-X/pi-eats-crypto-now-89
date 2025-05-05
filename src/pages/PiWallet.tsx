
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { usePiPrice } from '@/contexts/PiPriceContext';
import { useWallet } from '@/contexts/WalletContext';
import WalletCard from '@/components/WalletCard';
import PiNetworkLogo from '@/components/PiNetworkLogo';
import { History, RefreshCw, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PiWalletTabs from '@/components/wallet/PiWalletTabs';
import PiWalletConnect from '@/components/wallet/PiWalletConnect';

const PiWallet = () => {
  const navigate = useNavigate();
  const { user, login } = usePiAuth();
  const { t, language } = useLanguage();
  const { priceData, convertPiToUsd, convertPiToEgp } = usePiPrice();
  const { piTransactions, refreshPiWallet } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Mock Pi balance for demo - in real app would come from Pi SDK
  const piBalance = user ? 24.65 : 0;
  
  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const result = await login();
      if (result) {
        refreshPiWallet();
      }
    } catch (error) {
      console.error('Failed to connect Pi wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };
  
  const handleOpenPiBrowser = () => {
    // In a real app, this would use Pi SDK deeplink to open Pi Browser
    window.open('https://minepi.com', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Helmet>
        <title>{t('piWallet.title')} | PiEat-Me</title>
      </Helmet>
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{t('piWallet.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('piWallet.subtitle')}</p>
      </header>
      
      <div className="mb-8">
        <WalletCard
          title={t('piWallet.piNetwork')}
          abbreviation="Pi"
          icon={<PiNetworkLogo />}
          balance={piBalance}
          symbol="π"
          isUser={!!user}
          isPi={true}
          usdValue={convertPiToUsd(piBalance)}
          egpValue={convertPiToEgp(piBalance)}
          onConnect={handleConnect}
          onExternal={handleOpenPiBrowser}
          customActions={
            user ? (
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center h-auto py-2"
                  onClick={() => navigate('/pi-payment')}
                >
                  <Send className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('wallet.send')}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center h-auto py-2"
                  onClick={() => refreshPiWallet()}
                >
                  <RefreshCw className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('wallet.refresh')}
                </Button>
                <Button 
                  variant="default" 
                  className="button-gradient flex items-center justify-center h-auto py-2"
                >
                  <History className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('wallet.history')}
                </Button>
              </div>
            ) : null
          }
        />
      </div>
      
      {user ? (
        <PiWalletTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          piTransactions={piTransactions}
        />
      ) : (
        <PiWalletConnect 
          isConnecting={isConnecting}
          handleConnect={handleConnect}
        />
      )}
    </div>
  );
};

export default PiWallet;
