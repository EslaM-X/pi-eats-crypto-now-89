
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
  Eye,
  Download,
  ListFilter,
  CreditCard,
  Banknote,
  Wallet
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

// Mock payment data
const mockPayments = [
  { 
    id: 'PAY-1234', 
    customer: 'Ahmed Mahmoud', 
    orderId: 'ORD-1234',
    amount: 45.20, 
    date: '2025-05-05', 
    time: '10:35 AM',
    method: 'Pi Wallet',
    status: 'completed', 
    fee: 0.45
  },
  { 
    id: 'PAY-1235', 
    customer: 'Sara Ali', 
    orderId: 'ORD-1235',
    amount: 18.50, 
    date: '2025-05-05', 
    time: '10:50 AM',
    method: 'Cash on Delivery',
    status: 'pending', 
    fee: 0.00
  },
  { 
    id: 'PAY-1236', 
    customer: 'Mohamed Ahmed', 
    orderId: 'ORD-1236',
    amount: 62.75, 
    date: '2025-05-04', 
    time: '19:20 PM',
    method: 'Pi Wallet',
    status: 'completed', 
    fee: 0.63
  },
  { 
    id: 'PAY-1237', 
    customer: 'Laila Kamal', 
    orderId: 'ORD-1237',
    amount: 37.90, 
    date: '2025-05-04', 
    time: '20:35 PM',
    method: 'Credit Card',
    status: 'completed', 
    fee: 1.14
  },
  { 
    id: 'PAY-1238', 
    customer: 'Omar Samir', 
    orderId: 'ORD-1238',
    amount: 23.75, 
    date: '2025-05-03', 
    time: '13:25 PM',
    method: 'Pi Wallet',
    status: 'refunded', 
    fee: 0.24
  },
  { 
    id: 'PAY-1239', 
    customer: 'Nour Adel', 
    orderId: 'ORD-1239',
    amount: 82.30, 
    date: '2025-05-03', 
    time: '19:50 PM',
    method: 'Cash on Delivery',
    status: 'completed', 
    fee: 0.00
  },
];

const AdminPayments = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null
  });
  
  // Filter payments based on search term, status, payment method, and date range
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus ? payment.status === selectedStatus : true;
    const matchesMethod = selectedMethod ? payment.method === selectedMethod : true;
    
    let matchesDateRange = true;
    if (dateRange.start) {
      matchesDateRange = matchesDateRange && payment.date >= dateRange.start;
    }
    if (dateRange.end) {
      matchesDateRange = matchesDateRange && payment.date <= dateRange.end;
    }
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus(null);
    setSelectedMethod(null);
    setDateRange({ start: null, end: null });
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('admin.completed')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('admin.pending')}</Badge>;
      case 'refunded':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('admin.refunded')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get payment method icon
  const getMethodIcon = (method: string) => {
    switch(method) {
      case 'Pi Wallet':
        return <Wallet className="h-4 w-4 mr-2 text-purple-500" />;
      case 'Credit Card':
        return <CreditCard className="h-4 w-4 mr-2 text-blue-500" />;
      case 'Cash on Delivery':
        return <Banknote className="h-4 w-4 mr-2 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.payments')}</h2>
          <p className="text-muted-foreground">
            {t('admin.managePaymentsDescription')}
          </p>
        </div>
        <Button variant="outline" className="space-x-2">
          <Download className="h-4 w-4" />
          <span>{t('admin.exportCSV')}</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.paymentsList')}</CardTitle>
          <CardDescription>{t('admin.paymentsListDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('admin.searchPayments')}
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
                <SelectItem value="completed">{t('admin.completed')}</SelectItem>
                <SelectItem value="pending">{t('admin.pending')}</SelectItem>
                <SelectItem value="refunded">{t('admin.refunded')}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Payment Method Filter */}
            <Select value={selectedMethod || ''} onValueChange={(value) => setSelectedMethod(value || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('admin.filterByMethod')} />
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
                    <label className="text-sm font-medium">{t('admin.amountRange')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder={t('admin.min')} type="number" min="0" />
                      <Input placeholder={t('admin.max')} type="number" min="0" />
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
          
          {/* Payments Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.paymentId')}</TableHead>
                  <TableHead>{t('admin.orderId')}</TableHead>
                  <TableHead>{t('admin.customer')}</TableHead>
                  <TableHead>{t('admin.amount')}</TableHead>
                  <TableHead>{t('admin.fee')}</TableHead>
                  <TableHead>{t('admin.dateTime')}</TableHead>
                  <TableHead>{t('admin.method')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead>{t('admin.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>π {payment.amount.toFixed(2)}</TableCell>
                    <TableCell>π {payment.fee.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{payment.date}</span>
                        <span className="text-xs text-muted-foreground">{payment.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getMethodIcon(payment.method)}
                        {payment.method}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                            <Download className="mr-2 h-4 w-4" />
                            <span>{t('admin.downloadReceipt')}</span>
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

export default AdminPayments;
