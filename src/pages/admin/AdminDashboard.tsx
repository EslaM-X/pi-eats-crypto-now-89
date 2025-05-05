
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Utensils,
  Wallet,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/section-title';

// Mock data for dashboard
const statCards = [
  { 
    title: 'users', 
    value: '456', 
    change: '+12%', 
    changeType: 'positive', 
    icon: <Users className="h-5 w-5" /> 
  },
  { 
    title: 'orders', 
    value: '235', 
    change: '+18%', 
    changeType: 'positive', 
    icon: <ShoppingBag className="h-5 w-5" /> 
  },
  { 
    title: 'restaurants', 
    value: '32', 
    change: '+5%', 
    changeType: 'positive', 
    icon: <Utensils className="h-5 w-5" /> 
  },
  { 
    title: 'revenue', 
    value: 'π 3,245', 
    change: '-2%', 
    changeType: 'negative', 
    icon: <Wallet className="h-5 w-5" /> 
  }
];

const recentOrders = [
  { id: 'ORD-1234', customer: 'Ahmed M.', restaurant: 'Pyramid Pizza', total: 45.2, status: 'completed' },
  { id: 'ORD-1235', customer: 'Sara A.', restaurant: 'Cairo Kebab', total: 32.75, status: 'processing' },
  { id: 'ORD-1236', customer: 'Mohamed K.', restaurant: 'Nile Sushi', total: 65.3, status: 'processing' },
  { id: 'ORD-1237', customer: 'Laila T.', restaurant: 'Alexandria Seafood', total: 28.9, status: 'cancelled' },
  { id: 'ORD-1238', customer: 'Omar S.', restaurant: 'Tahrir Tacos', total: 18.5, status: 'completed' }
];

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.dashboard')}</h2>
          <p className="text-muted-foreground">
            {t('admin.dashboardDescription')}
          </p>
        </div>
        <Button className="button-gradient">
          {t('admin.downloadReport')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t(`admin.${card.title}`)}
              </CardTitle>
              <div className="rounded-full bg-muted/50 p-2">
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center pt-1">
                {card.changeType === 'positive' ? (
                  <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <p className={`text-xs ${
                  card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {card.change} {t('admin.fromLastMonth')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('admin.salesOverview')}</CardTitle>
            <CardDescription>{t('admin.last30Days')}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Chart placeholder */}
            <div className="h-80 bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">{t('admin.salesChartPlaceholder')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{t('admin.recentOrders')}</CardTitle>
            <Link to="/admin/orders" className="inline-flex items-center text-sm font-medium text-pi hover:underline">
              {t('admin.viewAll')}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{order.restaurant}</span>
                      <span className="mx-1">•</span>
                      <span>{order.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{`π ${order.total.toFixed(2)}`}</p>
                    <span className={`inline-block text-xs rounded-full px-2 py-0.5 ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {t(`admin.${order.status}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Popular Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.popularRestaurants')}</CardTitle>
            <CardDescription>{t('admin.topPerformingRestaurants')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-md p-4">
                <p className="text-muted-foreground text-center my-6">{t('admin.popularRestaurantsPlaceholder')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.recentUsers')}</CardTitle>
            <CardDescription>{t('admin.newlyRegisteredUsers')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-md p-4">
                <p className="text-muted-foreground text-center my-6">{t('admin.recentUsersPlaceholder')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <SectionTitle title={t('admin.quickActions')} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
          <Link to="/admin/users">
            <Users className="h-6 w-6 mb-2" />
            <span>{t('admin.manageUsers')}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
          <Link to="/admin/restaurants">
            <Utensils className="h-6 w-6 mb-2" />
            <span>{t('admin.manageRestaurants')}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
          <Link to="/admin/orders">
            <ShoppingBag className="h-6 w-6 mb-2" />
            <span>{t('admin.manageOrders')}</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
          <Link to="/admin/payments">
            <Wallet className="h-6 w-6 mb-2" />
            <span>{t('admin.managePayments')}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
