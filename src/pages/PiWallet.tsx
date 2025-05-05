
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { usePiPrice } from '@/contexts/PiPriceContext';
import { useWallet } from '@/contexts/WalletContext';
import WalletCard from '@/components/WalletCard';
import TransactionHistory from '@/components/TransactionHistory';
import PiNetworkLogo from '@/components/PiNetworkLogo';
import { PiPriceIndicator } from '@/components/PiPriceIndicator';
import { ArrowRightLeft, ExternalLink, History, PlusCircle, RefreshCw, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">{t('piWallet.overview')}</TabsTrigger>
            <TabsTrigger value="transactions">{t('piWallet.transactions')}</TabsTrigger>
            <TabsTrigger value="apps">{t('piWallet.connectedApps')}</TabsTrigger>
            <TabsTrigger value="settings">{t('piWallet.settings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>{t('piWallet.overview')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">{t('piWallet.marketPrice')}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <PiPriceIndicator showDetails={true} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">{t('piWallet.recentActivity')}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4 font-mono">
                      {piTransactions.slice(0, 3).map((tx, i) => (
                        <div key={i} className="flex justify-between text-xs py-1">
                          <span className="truncate">{tx.description}</span>
                          <span className={tx.type === 'receive' ? 'text-green-500' : 'text-orange'}>
                            {tx.type === 'receive' ? '+' : '-'} π{tx.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {piTransactions.length === 0 && (
                        <p className="text-sm text-muted-foreground">{t('piWallet.noTransactions')}</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm">{t('piWallet.actions')}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRightLeft className="h-3 w-3 mr-1" />
                          {t('piWallet.swap')}
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <PlusCircle className="h-3 w-3 mr-1" />
                          {t('piWallet.buy')}
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Send className="h-3 w-3 mr-1" />
                          {t('piWallet.transfer')}
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {t('piWallet.explore')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>{t('piWallet.transactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionHistory transactions={piTransactions} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="apps">
            <Card>
              <CardHeader>
                <CardTitle>{t('piWallet.connectedApps')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-4 px-2">
                  <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pi to-purple-700 flex items-center justify-center text-white font-bold text-lg">
                      πE
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">PiEat-Me</h3>
                      <p className="text-sm text-muted-foreground">Connected on {new Date().toLocaleDateString()}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('piWallet.disconnect')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t('piWallet.settings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('piWallet.settingsDescription')}
                </p>
                <Button className="mt-4" variant="outline">{t('piWallet.openPiBrowser')}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <div className="text-5xl mb-4">π</div>
            <h2 className="text-xl font-bold mb-2">{t('piWallet.connectWallet')}</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t('piWallet.connectDescription')}
            </p>
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="button-gradient"
            >
              {isConnecting ? t('common.connecting') : t('piWallet.connectButton')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PiWallet;
