
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction } from '@/contexts/wallet/WalletTypes';
import { PiPriceIndicator } from '@/components/PiPriceIndicator';
import { ArrowRightLeft, ExternalLink, PlusCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PiWalletOverviewProps {
  transactions: Transaction[];
}

const PiWalletOverview: React.FC<PiWalletOverviewProps> = ({ transactions }) => {
  const { t, language } = useLanguage();
  
  return (
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
              {transactions.slice(0, 3).map((tx, i) => (
                <div key={i} className="flex justify-between text-xs py-1">
                  <span className="truncate">{tx.description}</span>
                  <span className={tx.type === 'receive' ? 'text-green-500' : 'text-orange'}>
                    {tx.type === 'receive' ? '+' : '-'} π{tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
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
  );
};

export default PiWalletOverview;
