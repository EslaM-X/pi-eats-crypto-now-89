
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  Utensils,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionTitle } from '@/components/ui/section-title';

const AdminStatistics = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('7days');
  
  // Placeholder chart component
  const ChartPlaceholder = ({ height = 300, title }: { height?: number, title: string }) => (
    <div 
      className="bg-muted/20 rounded-md flex items-center justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="text-center">
        <p className="text-muted-foreground mb-2">{title}</p>
        <p className="text-xs text-muted-foreground">{t('admin.chartPlaceholder')}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.statistics')}</h2>
          <p className="text-muted-foreground">
            {t('admin.statisticsDescription')}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('admin.selectTimeRange')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">{t('admin.last7Days')}</SelectItem>
              <SelectItem value="30days">{t('admin.last30Days')}</SelectItem>
              <SelectItem value="90days">{t('admin.last90Days')}</SelectItem>
              <SelectItem value="year">{t('admin.thisYear')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('admin.exportReport')}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.totalRevenue')}
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">π 12,345.67</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500">
                +12.5% {t('admin.fromLastPeriod')}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.totalUsers')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500">
                +8.3% {t('admin.fromLastPeriod')}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.totalOrders')}
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500">
                +15.8% {t('admin.fromLastPeriod')}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.averageOrderValue')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">π 32.5</div>
            <div className="flex items-center pt-1">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <p className="text-xs text-red-500">
                -2.1% {t('admin.fromLastPeriod')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            {t('admin.revenue')}
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            {t('admin.orders')}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {t('admin.users')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.revenueOverTime')}</CardTitle>
              <CardDescription>
                {timeRange === '7days' && t('admin.last7Days')}
                {timeRange === '30days' && t('admin.last30Days')}
                {timeRange === '90days' && t('admin.last90Days')}
                {timeRange === 'year' && t('admin.thisYear')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder title={t('admin.revenueChartPlaceholder')} height={350} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.ordersTrends')}</CardTitle>
              <CardDescription>
                {timeRange === '7days' && t('admin.last7Days')}
                {timeRange === '30days' && t('admin.last30Days')}
                {timeRange === '90days' && t('admin.last90Days')}
                {timeRange === 'year' && t('admin.thisYear')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder title={t('admin.ordersChartPlaceholder')} height={350} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('admin.userGrowth')}</CardTitle>
              <CardDescription>
                {timeRange === '7days' && t('admin.last7Days')}
                {timeRange === '30days' && t('admin.last30Days')}
                {timeRange === '90days' && t('admin.last90Days')}
                {timeRange === 'year' && t('admin.thisYear')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder title={t('admin.usersChartPlaceholder')} height={350} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Additional Charts */}
      <SectionTitle title={t('admin.additionalInsights')} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Categories */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.popularCategories')}</CardTitle>
            <CardDescription>{t('admin.topFoodCategories')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <PieChart className="h-10 w-10 text-muted-foreground" />
            </div>
            <ChartPlaceholder title={t('admin.categoriesChartPlaceholder')} height={200} />
          </CardContent>
        </Card>
        
        {/* Top Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.topRestaurants')}</CardTitle>
            <CardDescription>{t('admin.bestPerformingRestaurants')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <Utensils className="h-10 w-10 text-muted-foreground" />
            </div>
            <ChartPlaceholder title={t('admin.restaurantsChartPlaceholder')} height={200} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;
