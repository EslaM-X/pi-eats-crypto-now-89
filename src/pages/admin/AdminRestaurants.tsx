
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
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock restaurant data
const mockRestaurants = [
  { 
    id: 1, 
    name: 'Pyramid Pizza', 
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100', 
    owner: 'Ahmed Ibrahim', 
    cuisine: 'Pizza, Italian', 
    status: 'active', 
    featured: true, 
    rating: 4.7, 
    orders: 234, 
    deliveryTime: '20-30 min' 
  },
  { 
    id: 2, 
    name: 'Cairo Kebab', 
    image: 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=100',
    owner: 'Mohamed Ali', 
    cuisine: 'Middle Eastern', 
    status: 'active', 
    featured: true, 
    rating: 4.5, 
    orders: 178, 
    deliveryTime: '25-40 min' 
  },
  { 
    id: 3, 
    name: 'Nile Sushi', 
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100', 
    owner: 'Sara Ahmed', 
    cuisine: 'Japanese, Sushi', 
    status: 'active', 
    featured: false, 
    rating: 4.8, 
    orders: 156, 
    deliveryTime: '30-45 min' 
  },
  { 
    id: 4, 
    name: 'Alexandria Seafood', 
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100', 
    owner: 'Omar Hassan', 
    cuisine: 'Seafood, Mediterranean', 
    status: 'pending', 
    featured: false, 
    rating: 0, 
    orders: 0, 
    deliveryTime: '25-40 min' 
  },
  { 
    id: 5, 
    name: 'Luxor Grill', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100', 
    owner: 'Laila Kamal', 
    cuisine: 'Grilled, BBQ', 
    status: 'inactive', 
    featured: false, 
    rating: 4.2, 
    orders: 89, 
    deliveryTime: '20-35 min' 
  },
  { 
    id: 6, 
    name: 'Tahrir Tacos', 
    image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=100', 
    owner: 'Amira Essam', 
    cuisine: 'Mexican, Fusion', 
    status: 'active', 
    featured: false, 
    rating: 4.6, 
    orders: 122, 
    deliveryTime: '15-25 min' 
  },
];

const AdminRestaurants = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Filter restaurants based on search term and status
  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus ? restaurant.status === selectedStatus : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle status change
  const handleStatusChange = (restaurantId: number, newStatus: boolean) => {
    console.log(`Changing status for restaurant ${restaurantId} to ${newStatus ? 'active' : 'inactive'}`);
    // In a real application, you would update the restaurant status in the database
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('admin.active')}</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-muted-foreground">{t('admin.inactive')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{t('admin.pending')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.restaurants')}</h2>
          <p className="text-muted-foreground">
            {t('admin.manageRestaurantsDescription')}
          </p>
        </div>
        <Button className="button-gradient">
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.addRestaurant')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.restaurantsList')}</CardTitle>
          <CardDescription>{t('admin.restaurantsListDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('admin.searchRestaurants')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedStatus === null ? "secondary" : "outline"} 
                onClick={() => setSelectedStatus(null)}
                size="sm"
              >
                {t('admin.all')}
              </Button>
              <Button 
                variant={selectedStatus === 'active' ? "secondary" : "outline"} 
                onClick={() => setSelectedStatus('active')}
                size="sm"
              >
                {t('admin.active')}
              </Button>
              <Button 
                variant={selectedStatus === 'pending' ? "secondary" : "outline"} 
                onClick={() => setSelectedStatus('pending')}
                size="sm"
              >
                {t('admin.pending')}
              </Button>
              <Button 
                variant={selectedStatus === 'inactive' ? "secondary" : "outline"} 
                onClick={() => setSelectedStatus('inactive')}
                size="sm"
              >
                {t('admin.inactive')}
              </Button>
            </div>
          </div>
          
          {/* Restaurants Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.restaurant')}</TableHead>
                  <TableHead>{t('admin.owner')}</TableHead>
                  <TableHead>{t('admin.cuisine')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead>{t('admin.rating')}</TableHead>
                  <TableHead className="text-right">{t('admin.orders')}</TableHead>
                  <TableHead>{t('admin.delivery')}</TableHead>
                  <TableHead>{t('admin.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={restaurant.image} alt={restaurant.name} />
                          <AvatarFallback>{restaurant.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {restaurant.name}
                            {restaurant.featured && (
                              <Badge className="bg-pi hover:bg-pi ml-2">{t('admin.featured')}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{restaurant.owner}</TableCell>
                    <TableCell>{restaurant.cuisine}</TableCell>
                    <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        {restaurant.rating > 0 ? restaurant.rating.toFixed(1) : '-'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{restaurant.orders}</TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {restaurant.deliveryTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Switch 
                          checked={restaurant.status === 'active'} 
                          onCheckedChange={(checked) => handleStatusChange(restaurant.id, checked)}
                          aria-label={t('admin.toggleStatus')}
                        />
                        
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
                              <span>{t('admin.view')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>{t('admin.edit')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              <span>
                                {restaurant.featured ? t('admin.unfeature') : t('admin.feature')}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>{t('admin.delete')}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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

export default AdminRestaurants;
