
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { PiPriceIndicator } from '@/components/PiPriceIndicator';
import { toast } from 'sonner';

// Mock data
const mockOrders = [
  { id: 'ORD-001', customerName: 'محمد أحمد', total: 15.5, status: 'pending', items: 3, time: '10:30 AM' },
  { id: 'ORD-002', customerName: 'سارة محمود', total: 22.75, status: 'completed', items: 5, time: '11:15 AM' },
  { id: 'ORD-003', customerName: 'أحمد علي', total: 18.25, status: 'processing', items: 4, time: '12:05 PM' },
  { id: 'ORD-004', customerName: 'فاطمة حسن', total: 9.75, status: 'delivered', items: 2, time: '01:45 PM' },
];

const mockMenuItems = [
  { id: '1', name: 'برجر دجاج', category: 'برجر', price: 8.5, available: true },
  { id: '2', name: 'بيتزا مارجريتا', category: 'بيتزا', price: 12.0, available: true },
  { id: '3', name: 'ساندويش فلافل', category: 'ساندويش', price: 5.5, available: false },
  { id: '4', name: 'سلطة سيزر', category: 'سلطة', price: 7.0, available: true },
];

const mockStats = {
  totalOrders: 156,
  totalSales: 2750.5,
  averageOrderValue: 17.63,
  pendingOrders: 5
};

const RestaurantDashboard = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const { user } = usePiAuth();
  const [orders] = useState(mockOrders);
  const [menuItems] = useState(mockMenuItems);
  const [stats] = useState(mockStats);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItemName || !newItemPrice || !newItemCategory) {
      toast.error(t('dashboard.fillAllFields'));
      return;
    }
    
    toast.success(t('dashboard.itemAdded'));
    setNewItemName('');
    setNewItemPrice('');
    setNewItemCategory('');
  };

  return (
    <>
      <Helmet>
        <title>{language === 'ar' ? 'لوحة تحكم المطعم | بِي إيت' : 'Restaurant Dashboard | PiEat-Me'}</title>
      </Helmet>

      <Header />
      
      <Container className="pt-6 pb-24" dir={dir}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent">
              {t('dashboard.title')}
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <PiPriceIndicator />
            {!user ? (
              <Button className="button-gradient">
                {t('auth.connectWithPi')}
              </Button>
            ) : (
              <div className="text-sm bg-muted/30 px-3 py-1 rounded-full">
                {user.username}
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('dashboard.totalOrders')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('dashboard.totalSales')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">π {stats.totalSales.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('dashboard.averageOrderValue')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">π {stats.averageOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('dashboard.pendingOrders')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.recentOrders')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-muted-foreground text-sm">
                        <th className="pb-2">{t('dashboard.orderId')}</th>
                        <th className="pb-2">{t('dashboard.customer')}</th>
                        <th className="pb-2">{t('dashboard.items')}</th>
                        <th className="pb-2">{t('dashboard.total')}</th>
                        <th className="pb-2">{t('dashboard.status')}</th>
                        <th className="pb-2">{t('dashboard.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border text-sm">
                          <td className="py-3">{order.id}</td>
                          <td className="py-3">{order.customerName}</td>
                          <td className="py-3">{order.items}</td>
                          <td className="py-3">π {order.total.toFixed(2)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">
                              {t('dashboard.view')}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t('dashboard.viewAllOrders')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.menuManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="items">
                  <TabsList className="mb-4">
                    <TabsTrigger value="items">{t('dashboard.items')}</TabsTrigger>
                    <TabsTrigger value="addItem">{t('dashboard.addItem')}</TabsTrigger>
                    <TabsTrigger value="categories">{t('dashboard.categories')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="items">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-muted-foreground text-sm">
                            <th className="pb-2">{t('dashboard.name')}</th>
                            <th className="pb-2">{t('dashboard.category')}</th>
                            <th className="pb-2">{t('dashboard.price')}</th>
                            <th className="pb-2">{t('dashboard.status')}</th>
                            <th className="pb-2">{t('dashboard.actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuItems.map((item) => (
                            <tr key={item.id} className="border-b border-border text-sm">
                              <td className="py-3">{item.name}</td>
                              <td className="py-3">{item.category}</td>
                              <td className="py-3">π {item.price.toFixed(2)}</td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.available ? t('dashboard.available') : t('dashboard.unavailable')}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm">
                                    {t('dashboard.edit')}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    {t('dashboard.delete')}
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="addItem">
                    <form onSubmit={handleAddMenuItem} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="itemName">{t('dashboard.itemName')}</Label>
                          <Input 
                            id="itemName" 
                            value={newItemName} 
                            onChange={(e) => setNewItemName(e.target.value)} 
                            placeholder={t('dashboard.enterItemName')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="itemCategory">{t('dashboard.category')}</Label>
                          <Input 
                            id="itemCategory" 
                            value={newItemCategory} 
                            onChange={(e) => setNewItemCategory(e.target.value)} 
                            placeholder={t('dashboard.enterCategory')}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="itemPrice">{t('dashboard.price')}</Label>
                          <div className="relative">
                            <Input 
                              id="itemPrice" 
                              type="number" 
                              step="0.01" 
                              min="0.01" 
                              value={newItemPrice} 
                              onChange={(e) => setNewItemPrice(e.target.value)} 
                              placeholder="0.00"
                            />
                            <div className="absolute right-3 top-2 text-muted-foreground">Pi</div>
                          </div>
                        </div>
                      </div>
                      <Button type="submit" className="button-gradient">
                        {t('dashboard.addItem')}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="categories">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>برجر</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">{t('dashboard.edit')}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">{t('dashboard.delete')}</Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>بيتزا</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">{t('dashboard.edit')}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">{t('dashboard.delete')}</Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>ساندويش</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">{t('dashboard.edit')}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">{t('dashboard.delete')}</Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>سلطة</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">{t('dashboard.edit')}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">{t('dashboard.delete')}</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quickActions')}</CardTitle>
                <CardDescription>{t('dashboard.manageYourRestaurant')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell mr-2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                  {t('dashboard.manageOrders')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils mr-2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18.5 15a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 2.5-2.5V2"/></svg>
                  {t('dashboard.editMenu')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  {t('dashboard.updatePhotos')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings mr-2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  {t('dashboard.restaurantSettings')}
                </Button>
                <Button variant="default" className="w-full justify-start button-gradient">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet mr-2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 7v12a2 2 0 0 0 2 2h16v-5"/><path d="M16 12h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z"/></svg>
                  {t('dashboard.piPayments')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.earnings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.today')}</span>
                  <span className="font-bold">π 125.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.thisWeek')}</span>
                  <span className="font-bold">π 875.25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.thisMonth')}</span>
                  <span className="font-bold">π 2,750.50</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('dashboard.pendingPayout')}</span>
                  <span className="font-bold text-pi">π 2,750.50</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full button-gradient">
                  {t('dashboard.withdrawFunds')}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.customerReviews')}</CardTitle>
                <CardDescription>{t('dashboard.recentReviews')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">أحمد محمد</span>
                    <div className="flex">
                      {'★★★★☆'}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">طعام رائع وخدمة ممتازة! سأعود مرة أخرى بالتأكيد.</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">سارة أحمد</span>
                    <div className="flex">
                      {'★★★★★'}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">من أفضل المطاعم التي جربتها. الأكل لذيذ والأسعار معقولة.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t('dashboard.viewAllReviews')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RestaurantDashboard;
