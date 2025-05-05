
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  MoreHorizontal,
  FilterX,
  FileEdit,
  ListFilter,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

// Mock order data
const mockOrders = [
  { 
    id: 'ORD-1234', 
    customer: 'Ahmed Mahmoud', 
    restaurant: 'Pyramid Pizza', 
    items: 3, 
    total: 45.20, 
    date: '2025-05-05', 
    time: '10:30 AM',
    status: 'delivered', 
    paymentMethod: 'Pi Wallet'
  },
  { 
    id: 'ORD-1235', 
    customer: 'Sara Ali', 
    restaurant: 'Cairo Kebab', 
    items: 1, 
    total: 18.50, 
    date: '2025-05-05', 
    time: '10:45 AM',
    status: 'ready', 
    paymentMethod: 'Cash on Delivery'
  },
  { 
    id: 'ORD-1236', 
    customer: 'Mohamed Ahmed', 
    restaurant: 'Nile Sushi', 
    items: 4, 
    total: 62.75, 
    date: '2025-05-04', 
    time: '19:15 PM',
    status: 'preparing', 
    paymentMethod: 'Pi Wallet'
  },
  { 
    id: 'ORD-1237', 
    customer: 'Laila Kamal', 
    restaurant: 'Alexandria Seafood', 
    items: 2, 
    total: 37.90, 
    date: '2025-05-04', 
    time: '20:30 PM',
    status: 'new', 
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-1238', 
    customer: 'Omar Samir', 
    restaurant: 'Tahrir Tacos', 
    items: 2, 
    total: 23.75, 
    date: '2025-05-03', 
    time: '13:20 PM',
    status: 'cancelled', 
    paymentMethod: 'Pi Wallet'
  },
  { 
    id: 'ORD-1239', 
    customer: 'Nour Adel', 
    restaurant: 'Luxor Grill', 
    items: 5, 
    total: 82.30, 
    date: '2025-05-03', 
    time: '19:45 PM',
    status: 'delivered', 
    paymentMethod: 'Cash on Delivery'
  },
];

const AdminOrders = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null
  });
  
  // Filter orders based on search term, status, payment method, and date range
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesPaymentMethod = selectedPaymentMethod ? order.paymentMethod === selectedPaymentMethod : true;
    
    let matchesDateRange = true;
    if (dateRange.start) {
      matchesDateRange = matchesDateRange && order.date >= dateRange.start;
    }
    if (dateRange.end) {
      matchesDateRange = matchesDateRange && order.date <= dateRange.end;
    }
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus(null);
    setSelectedPaymentMethod(null);
    setDateRange({ start: null, end: null });
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge className="bg-orange hover:bg-orange">{t('admin.new')}</Badge>;
      case 'preparing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">{t('admin.preparing')}</Badge>;
      case 'ready':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('admin.ready')}</Badge>;
      case 'delivered':
        return <Badge className="bg-purple-500 hover:bg-purple-600">{t('admin.delivered')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('admin.cancelled')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.orders')}</h2>
          <p className="text-muted-foreground">
            {t('admin.manageOrdersDescription')}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.ordersList')}</CardTitle>
          <CardDescription>{t('admin.ordersListDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('admin.searchOrders')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <Select value={selectedStatus || ''} onValueChange={(value) => setSelectedStatus(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.filterByStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('admin.allStatuses')}</SelectItem>
                <SelectItem value="new">{t('admin.new')}</SelectItem>
                <SelectItem value="preparing">{t('admin.preparing')}</SelectItem>
                <SelectItem value="ready">{t('admin.ready')}</SelectItem>
                <SelectItem value="delivered">{t('admin.delivered')}</SelectItem>
                <SelectItem value="cancelled">{t('admin.cancelled')}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Payment Method Filter */}
            <Select value={selectedPaymentMethod || ''} onValueChange={(value) => setSelectedPaymentMethod(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.filterByPayment')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('admin.allPaymentMethods')}</SelectItem>
                <SelectItem value="Pi Wallet">{t('admin.piWallet')}</SelectItem>
                <SelectItem value="Cash on Delivery">{t('admin.cashOnDelivery')}</SelectItem>
                <SelectItem value="Credit Card">{t('admin.creditCard')}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Advanced Filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <ListFilter className="mr-2 h-4 w-4" />
                  {t('admin.filters')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">{t('admin.dateRange')}</h4>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label className="text-sm" htmlFor="start-date">
                        {t('admin.startDate')}
                      </label>
                      <Input
                        id="start-date"
                        type="date"
                        value={dateRange.start || ''}
                        onChange={(e) => 
                          setDateRange(prev => ({ ...prev, start: e.target.value || null }))
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm" htmlFor="end-date">
                        {t('admin.endDate')}
                      </label>
                      <Input
                        id="end-date"
                        type="date"
                        value={dateRange.end || ''}
                        onChange={(e) => 
                          setDateRange(prev => ({ ...prev, end: e.target.value || null }))
                        }
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">{t('admin.orderTypes')}</label>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery" />
                        <label
                          htmlFor="delivery"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t('admin.delivery')}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pickup" />
                        <label
                          htmlFor="pickup"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {t('admin.pickup')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Reset Filters */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9" 
              onClick={resetFilters}
            >
              <FilterX className="mr-2 h-4 w-4" />
              {t('admin.resetFilters')}
            </Button>
          </div>
          
          {/* Orders Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.orderId')}</TableHead>
                  <TableHead>{t('admin.customer')}</TableHead>
                  <TableHead>{t('admin.restaurant')}</TableHead>
                  <TableHead>{t('admin.items')}</TableHead>
                  <TableHead>{t('admin.total')}</TableHead>
                  <TableHead>{t('admin.dateTime')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead>{t('admin.payment')}</TableHead>
                  <TableHead>{t('admin.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.restaurant}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>π {order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.date}</span>
                        <span className="text-xs text-muted-foreground">{order.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">{t('admin.openMenu')}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>{t('admin.viewDetails')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" />
                            <span>{t('admin.updateStatus')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
