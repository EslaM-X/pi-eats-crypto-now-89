
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChefHat, 
  Clock, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Settings, 
  PlusCircle, 
  Package,
  FileEdit,
  Trash2,
  Star,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

// Mock data for restaurant dashboard
const mockOrders = [
  { id: 'ORD-1234', customer: 'Ahmed Mahmoud', items: 3, total: 45.20, status: 'preparing', time: '10:30 AM' },
  { id: 'ORD-1235', customer: 'Sara Ali', items: 1, total: 18.50, status: 'ready', time: '10:45 AM' },
  { id: 'ORD-1236', customer: 'Mohamed Ahmed', items: 4, total: 62.75, status: 'delivered', time: '11:15 AM' },
  { id: 'ORD-1237', customer: 'Laila Kamal', items: 2, total: 37.90, status: 'new', time: '11:30 AM' },
];

const mockMenuItems = [
  { id: 1, name: 'Shawarma Sandwich', price: 15.99, category: 'Main Course', available: true, image: 'https://source.unsplash.com/random/100x100?shawarma' },
  { id: 2, name: 'Cheese Pizza', price: 25.50, category: 'Pizza', available: true, image: 'https://source.unsplash.com/random/100x100?pizza' },
  { id: 3, name: 'Chicken Wings', price: 18.75, category: 'Appetizer', available: false, image: 'https://source.unsplash.com/random/100x100?wings' },
  { id: 4, name: 'Grilled Vegetables', price: 12.25, category: 'Side Dish', available: true, image: 'https://source.unsplash.com/random/100x100?vegetables' },
];

const mockReviews = [
  { id: 1, customer: 'Ahmed', rating: 5, comment: 'Excellent food and service!', date: '2023-05-01' },
  { id: 2, customer: 'Sara', rating: 4, comment: 'Great food but delivery was a bit late.', date: '2023-04-28' },
  { id: 3, customer: 'Mohamed', rating: 5, comment: 'Best shawarma in town!', date: '2023-04-25' },
];

const RestaurantDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('orders');
  
  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };
  
  const handleToggleAvailability = (itemId: number) => {
    toast.success(`Menu item availability toggled`);
  };
  
  const handleAddMenuItem = () => {
    toast.success('Add menu item feature coming soon');
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Helmet>
        <title>{t('restaurantDashboard.title')} | PiEat-Me</title>
      </Helmet>
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{t('restaurantDashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('restaurantDashboard.subtitle')}</p>
      </header>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex py-4">
            <div className="rounded-full bg-orange/20 p-3 mr-4">
              <ShoppingBag className="h-6 w-6 text-orange" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex py-4">
            <div className="rounded-full bg-green-500/20 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
              <h3 className="text-2xl font-bold">π 245.50</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex py-4">
            <div className="rounded-full bg-blue-500/20 p-3 mr-4">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <h3 className="text-2xl font-bold">87</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex py-4">
            <div className="rounded-full bg-purple-500/20 p-3 mr-4">
              <Star className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
              <h3 className="text-2xl font-bold">4.7</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 overflow-auto">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage your restaurant orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-muted">All</Badge>
                  <Badge variant="outline" className="bg-orange/20 text-orange">New</Badge>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-500">Preparing</Badge>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500">Ready</Badge>
                  <Badge variant="outline" className="bg-purple-500/20 text-purple-500">Delivered</Badge>
                </div>
                <Input className="max-w-xs" placeholder="Search orders..." />
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-muted-foreground border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Items</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.items} items</td>
                        <td className="py-3 px-4">π {order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">{order.time}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            order.status === 'new' ? 'bg-orange/20 text-orange' : 
                            order.status === 'preparing' ? 'bg-blue-500/20 text-blue-500' :
                            order.status === 'ready' ? 'bg-green-500/20 text-green-500' :
                            'bg-purple-500/20 text-purple-500'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="h-8 text-xs">
                              Details
                            </Button>
                            <select 
                              className="text-xs border rounded p-1"
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Menu Tab */}
        <TabsContent value="menu">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage your restaurant menu</CardDescription>
              </div>
              <Button className="button-gradient" size="sm" onClick={handleAddMenuItem}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockMenuItems.map((item) => (
                  <Card key={item.id} className="flex overflow-hidden">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 flex-grow flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-semibold text-sm">π {item.price.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {item.category}
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <Badge variant="outline" className={item.available ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-7 w-7 text-blue-500"
                          >
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-7 w-7 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => handleToggleAvailability(item.id)}
                          >
                            <Package className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>View and respond to customer reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-medium mr-2">{review.customer}</span>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                    <div className="text-sm">{review.comment}</div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Customer Messages</CardTitle>
              <CardDescription>View and respond to customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No messages yet</h3>
                <p className="text-muted-foreground mb-4">
                  When customers send you messages, they will appear here
                </p>
                <Button variant="outline">Refresh</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Settings</CardTitle>
              <CardDescription>Manage your restaurant profile and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Restaurant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Restaurant Name</label>
                    <Input defaultValue="Ahmed's Shawarma" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Phone</label>
                    <Input defaultValue="+20 123-456-7890" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input defaultValue="123 Cairo Street, Egypt" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cuisine Type</label>
                    <Input defaultValue="Lebanese, Middle Eastern" className="mt-1" />
                  </div>
                </div>
                <Button className="mt-4">Save Information</Button>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Opening Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Monday - Friday</label>
                    <div className="flex gap-2 mt-1">
                      <Input defaultValue="10:00 AM" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="10:00 PM" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Saturday - Sunday</label>
                    <div className="flex gap-2 mt-1">
                      <Input defaultValue="11:00 AM" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="11:00 PM" />
                    </div>
                  </div>
                </div>
                <Button className="mt-4">Update Hours</Button>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Pi Network Integration</h3>
                <Card className="p-4 bg-pi/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pi Network Integration is Active</p>
                      <p className="text-sm text-muted-foreground">You are accepting Pi payments</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantDashboard;
