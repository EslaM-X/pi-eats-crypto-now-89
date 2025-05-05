
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, WalletIcon, History, SendHorizontal, PlusCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePiAuth } from '@/contexts/PiAuthContext';
import PiNetworkLogo from '@/components/PiNetworkLogo';
import { PiPriceIndicator } from '@/components/PiPriceIndicator';
import { usePiPrice } from '@/contexts/PiPriceContext';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TransactionHistory from '@/components/TransactionHistory';
import { useWallet } from '@/contexts/WalletContext';
import { useLanguage } from '@/contexts/LanguageContext';

const PiWallet = () => {
  const { t, language } = useLanguage();
  const { user, login } = usePiAuth();
  const { convertPiToUsd } = usePiPrice();
  const { piBalance, transactions, sendPi, receivePi } = useWallet();
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [sendMemo, setSendMemo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const handleSendPi = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(t('wallet.loginRequired'));
      return;
    }
    
    if (!sendAmount || !sendAddress) {
      toast.error(t('wallet.fillAllFields'));
      return;
    }
    
    const amount = parseFloat(sendAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error(t('wallet.invalidAmount'));
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const success = await sendPi(amount, sendAddress, sendMemo || t('wallet.transfer'));
      
      if (success) {
        toast.success(t('wallet.transferSuccess'));
        setSendAmount('');
        setSendAddress('');
        setSendMemo('');
      } else {
        toast.error(t('wallet.transferFailed'));
      }
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error(t('wallet.transferError'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'محفظة Pi' : 'Pi Wallet'}</title>
      </Helmet>

      <Header />
      
      <Container className="pt-6 pb-24" dir={dir}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent">
              {t('wallet.piWallet')}
            </span>
          </h1>
          <PiPriceIndicator showDetails={true} />
        </div>
        
        {!user ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiNetworkLogo size="sm" />
                {t('wallet.connectWallet')}
              </CardTitle>
              <CardDescription>
                {t('wallet.connectToAccess')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={login} className="button-gradient">
                {t('auth.connectWithPi')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">
                      {t('wallet.piNetwork')}
                    </span>
                    <WalletIcon className="h-6 w-6 text-pi" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{t('wallet.balance')}</div>
                      <div className="text-4xl font-bold flex items-center">
                        <span className="mr-1 font-extrabold text-5xl">
                          <PiNetworkLogo size="md" />
                        </span>
                        <span>{piBalance.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col mt-1">
                        <div className="text-sm text-muted-foreground">
                          ≈ ${convertPiToUsd(piBalance).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    <Button variant="outline" className="flex items-center justify-center text-xs md:text-sm py-1 h-auto">
                      <WalletIcon className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                      <span>{t('wallet.connect')}</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center text-xs md:text-sm py-1 h-auto">
                      <SendHorizontal className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                      <span>{t('wallet.send')}</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center text-xs md:text-sm py-1 h-auto">
                      <History className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                      <span>{t('wallet.transactions')}</span>
                    </Button>
                    <Button variant="default" className="button-gradient flex items-center justify-center text-xs md:text-sm py-1 h-auto">
                      <PlusCircle className={`${language === 'ar' ? 'ml-1' : 'mr-1'} h-4 w-4`} />
                      <span>{t('wallet.topUp')}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="transactions">{t('wallet.transactions')}</TabsTrigger>
                  <TabsTrigger value="send">{t('wallet.send')}</TabsTrigger>
                  <TabsTrigger value="receive">{t('wallet.receive')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('wallet.recentTransactions')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TransactionHistory transactions={transactions} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="send" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('wallet.sendPi')}</CardTitle>
                      <CardDescription>
                        {t('wallet.sendPiDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSendPi} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">{t('wallet.recipientAddress')}</Label>
                          <Input
                            id="address"
                            value={sendAddress}
                            onChange={(e) => setSendAddress(e.target.value)}
                            placeholder={t('wallet.enterAddress')}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">{t('wallet.amount')}</Label>
                          <div className="relative">
                            <Input
                              id="amount"
                              value={sendAmount}
                              onChange={(e) => setSendAmount(e.target.value)}
                              type="number"
                              min="0.01"
                              step="0.01"
                              placeholder="0.00"
                              required
                            />
                            <div className="absolute right-3 top-2 text-muted-foreground">Pi</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memo">{t('wallet.memo')} ({t('wallet.optional')})</Label>
                          <Input
                            id="memo"
                            value={sendMemo}
                            onChange={(e) => setSendMemo(e.target.value)}
                            placeholder={t('wallet.enterMemo')}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full button-gradient" 
                          disabled={isProcessing}
                        >
                          {isProcessing ? t('loading') : t('wallet.send')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="receive" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('wallet.receivePi')}</CardTitle>
                      <CardDescription>
                        {t('wallet.receivePiDescription')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                      <div className="w-64 h-64 bg-white flex items-center justify-center rounded-lg">
                        <div className="text-center text-sm text-muted-foreground">
                          {t('wallet.qrCodePlaceholder')}
                        </div>
                      </div>
                      
                      <div className="w-full max-w-md p-4 border rounded-lg bg-muted/20">
                        <p className="text-sm mb-2 font-medium">{t('wallet.yourAddress')}:</p>
                        <div className="flex items-center">
                          <code className="bg-muted p-2 rounded text-xs flex-grow overflow-hidden text-ellipsis">
                            {user.walletAddress || 'GDNZ...R4YP'}
                          </code>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c0-1.1.9-2 2-2h2"/><path d="M4 12c0-1.1.9-2 2-2h2"/><path d="M4 8c0-1.1.9-2 2-2h2"/></svg>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('wallet.piInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wallet.currentPrice')}</span>
                    <span className="font-medium"><PiPriceIndicator /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wallet.balance')}</span>
                    <span className="font-medium">{piBalance.toFixed(2)} Pi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('wallet.value')}</span>
                    <span className="font-medium">${convertPiToUsd(piBalance).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    {t('wallet.viewOnExplorer')}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-pi/10 to-orange/10">
                <CardHeader>
                  <CardTitle className="text-lg">{t('wallet.earnMore')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-between" variant="outline">
                    {t('wallet.miningRewards')}
                    <span className="text-pi">+</span>
                  </Button>
                  <Button className="w-full justify-between" variant="outline">
                    {t('wallet.referFriends')}
                    <span className="text-pi">+</span>
                  </Button>
                  <Button className="w-full justify-between button-gradient">
                    {t('wallet.joinProgram')}
                    <span>→</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default PiWallet;
