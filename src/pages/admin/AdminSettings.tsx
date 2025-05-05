
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminSettings = () => {
  const { t } = useLanguage();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'PiEat-Me',
    description: 'Order food and earn Pi cryptocurrency',
    adminEmail: 'admin@pieat-me.com',
    contactPhone: '+20 123-456-7890',
    currency: 'Pi',
    language: 'en',
    timezone: 'UTC+2',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    systemUpdates: true,
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    enablePiPayments: true,
    enableCashOnDelivery: true,
    enableCreditCards: false,
    serviceFeePercentage: '1',
    minimumOrderAmount: '5',
    testMode: true,
  });
  
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentToggle = (setting: string, value: boolean) => {
    setPaymentSettings(prev => ({ ...prev, [setting]: value }));
  };
  
  const handleSaveSettings = () => {
    toast.success(t('admin.settingsSaved'));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('admin.settings')}</h2>
        <p className="text-muted-foreground">
          {t('admin.settingsDescription')}
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t('admin.general')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('admin.notifications')}</TabsTrigger>
          <TabsTrigger value="payments">{t('admin.paymentsSettings')}</TabsTrigger>
          <TabsTrigger value="security">{t('admin.security')}</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.generalSettings')}</CardTitle>
              <CardDescription>
                {t('admin.generalSettingsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{t('admin.siteName')}</Label>
                  <Input 
                    id="siteName" 
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">{t('admin.adminEmail')}</Label>
                  <Input 
                    id="adminEmail" 
                    name="adminEmail"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">{t('admin.siteDescription')}</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={generalSettings.description}
                    onChange={handleGeneralSettingsChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">{t('admin.contactPhone')}</Label>
                  <Input 
                    id="contactPhone" 
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">{t('admin.defaultCurrency')}</Label>
                  <Select 
                    value={generalSettings.currency}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectCurrency')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pi">Pi</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EGP">EGP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">{t('admin.defaultLanguage')}</Label>
                  <Select 
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t('admin.timezone')}</Label>
                  <Select 
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectTimezone')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                      <SelectItem value="UTC+1">UTC+1 (Paris)</SelectItem>
                      <SelectItem value="UTC+2">UTC+2 (Cairo)</SelectItem>
                      <SelectItem value="UTC+3">UTC+3 (Moscow)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="button-gradient">
                {t('admin.saveSettings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.notificationSettings')}</CardTitle>
              <CardDescription>
                {t('admin.notificationSettingsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.emailNotifications')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.emailNotificationsDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationToggle('emailNotifications', checked)}
                    aria-label={t('admin.toggleEmailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.pushNotifications')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.pushNotificationsDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationToggle('pushNotifications', checked)}
                    aria-label={t('admin.togglePushNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.orderUpdates')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.orderUpdatesDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationToggle('orderUpdates', checked)}
                    aria-label={t('admin.toggleOrderUpdates')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.marketingEmails')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.marketingEmailsDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationToggle('marketingEmails', checked)}
                    aria-label={t('admin.toggleMarketingEmails')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.systemUpdates')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.systemUpdatesDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationToggle('systemUpdates', checked)}
                    aria-label={t('admin.toggleSystemUpdates')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="button-gradient">
                {t('admin.saveSettings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.paymentSettings')}</CardTitle>
              <CardDescription>
                {t('admin.paymentSettingsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.enablePiPayments')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.enablePiPaymentsDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={paymentSettings.enablePiPayments}
                    onCheckedChange={(checked) => handlePaymentToggle('enablePiPayments', checked)}
                    aria-label={t('admin.togglePiPayments')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.enableCashOnDelivery')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.enableCashOnDeliveryDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={paymentSettings.enableCashOnDelivery}
                    onCheckedChange={(checked) => handlePaymentToggle('enableCashOnDelivery', checked)}
                    aria-label={t('admin.toggleCashOnDelivery')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.enableCreditCards')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.enableCreditCardsDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={paymentSettings.enableCreditCards}
                    onCheckedChange={(checked) => handlePaymentToggle('enableCreditCards', checked)}
                    aria-label={t('admin.toggleCreditCards')}
                  />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceFeePercentage">{t('admin.serviceFeePercentage')}</Label>
                    <div className="relative">
                      <Input 
                        id="serviceFeePercentage"
                        name="serviceFeePercentage" 
                        type="number"
                        min="0"
                        max="100"
                        value={paymentSettings.serviceFeePercentage}
                        onChange={handlePaymentSettingsChange}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrderAmount">{t('admin.minimumOrderAmount')}</Label>
                    <div className="relative">
                      <Input 
                        id="minimumOrderAmount"
                        name="minimumOrderAmount"
                        type="number"
                        min="0"
                        value={paymentSettings.minimumOrderAmount}
                        onChange={handlePaymentSettingsChange}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">π</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{t('admin.testMode')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('admin.testModeDescription')}
                    </p>
                  </div>
                  <Switch 
                    checked={paymentSettings.testMode}
                    onCheckedChange={(checked) => handlePaymentToggle('testMode', checked)}
                    aria-label={t('admin.toggleTestMode')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="button-gradient">
                {t('admin.saveSettings')}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.securitySettings')}</CardTitle>
              <CardDescription>
                {t('admin.securitySettingsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">{t('admin.changePassword')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t('admin.currentPassword')}</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t('admin.newPassword')}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('admin.confirmPassword')}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                
                <Button className="mt-2">{t('admin.changePassword')}</Button>
                
                <Separator className="my-6" />
                
                <h3 className="font-medium">{t('admin.twoFactorAuthentication')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('admin.twoFactorAuthenticationDescription')}
                </p>
                
                <Button variant="outline">{t('admin.enable2FA')}</Button>
                
                <Separator className="my-6" />
                
                <h3 className="font-medium">{t('admin.sessionManagement')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('admin.sessionManagementDescription')}
                </p>
                
                <Button variant="destructive">{t('admin.signOutAllDevices')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
