
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransactionHistory from '@/components/TransactionHistory';
import { Transaction } from '@/contexts/wallet/WalletTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import PiWalletOverview from './PiWalletOverview';

interface PiWalletTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  piTransactions: Transaction[];
}

const PiWalletTabs: React.FC<PiWalletTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  piTransactions 
}) => {
  const { t } = useLanguage();
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="overview">{t('piWallet.overview')}</TabsTrigger>
        <TabsTrigger value="transactions">{t('piWallet.transactions')}</TabsTrigger>
        <TabsTrigger value="apps">{t('piWallet.connectedApps')}</TabsTrigger>
        <TabsTrigger value="settings">{t('piWallet.settings')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <PiWalletOverview transactions={piTransactions} />
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
  );
};

export default PiWalletTabs;
