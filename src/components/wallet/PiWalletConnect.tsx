
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PiWalletConnectProps {
  isConnecting: boolean;
  handleConnect: () => Promise<void>;
}

const PiWalletConnect: React.FC<PiWalletConnectProps> = ({ isConnecting, handleConnect }) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default PiWalletConnect;
