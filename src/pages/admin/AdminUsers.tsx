
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
  Mail, 
  Ban,
  CheckCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Generate mock user data
const mockUsers = [
  { id: 1, name: 'Ahmed Mahmoud', email: 'ahmed@example.com', role: 'user', status: 'active', orders: 15, lastLogin: '2 hours ago' },
  { id: 2, name: 'Sara Ali', email: 'sara@example.com', role: 'vendor', status: 'active', orders: 0, lastLogin: '1 day ago' },
  { id: 3, name: 'Mohamed Ahmed', email: 'mohamed@example.com', role: 'admin', status: 'active', orders: 5, lastLogin: 'Just now' },
  { id: 4, name: 'Laila Hassan', email: 'laila@example.com', role: 'user', status: 'inactive', orders: 8, lastLogin: '3 days ago' },
  { id: 5, name: 'Omar Khalid', email: 'omar@example.com', role: 'vendor', status: 'active', orders: 0, lastLogin: '5 hours ago' },
  { id: 6, name: 'Amira Essam', email: 'amira@example.com', role: 'user', status: 'suspended', orders: 2, lastLogin: '1 week ago' },
  { id: 7, name: 'Youssef Ali', email: 'youssef@example.com', role: 'user', status: 'active', orders: 20, lastLogin: '12 hours ago' },
  { id: 8, name: 'Nour Adel', email: 'nour@example.com', role: 'vendor', status: 'pending', orders: 0, lastLogin: 'Never' },
];

const AdminUsers = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Filter users based on search term and role
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    
    return matchesSearch && matchesRole;
  });
  
  // Handle status change
  const handleStatusChange = (userId: number, newStatus: boolean) => {
    console.log(`Changing status for user ${userId} to ${newStatus ? 'active' : 'inactive'}`);
    // In a real application, you would update the user status in the database
  };
  
  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">{t('admin.active')}</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-muted-foreground">{t('admin.inactive')}</Badge>;
      case 'suspended':
        return <Badge className="bg-red-500 hover:bg-red-600">{t('admin.suspended')}</Badge>;
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
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.users')}</h2>
          <p className="text-muted-foreground">
            {t('admin.manageUsersDescription')}
          </p>
        </div>
        <Button className="button-gradient">
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.addUser')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.usersList')}</CardTitle>
          <CardDescription>{t('admin.usersListDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('admin.searchUsers')}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={selectedRole === null ? "secondary" : "outline"} 
                onClick={() => setSelectedRole(null)}
                size="sm"
              >
                {t('admin.all')}
              </Button>
              <Button 
                variant={selectedRole === 'user' ? "secondary" : "outline"} 
                onClick={() => setSelectedRole('user')}
                size="sm"
              >
                {t('admin.users')}
              </Button>
              <Button 
                variant={selectedRole === 'vendor' ? "secondary" : "outline"} 
                onClick={() => setSelectedRole('vendor')}
                size="sm"
              >
                {t('admin.vendors')}
              </Button>
              <Button 
                variant={selectedRole === 'admin' ? "secondary" : "outline"} 
                onClick={() => setSelectedRole('admin')}
                size="sm"
              >
                {t('admin.admins')}
              </Button>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.name')}</TableHead>
                  <TableHead>{t('admin.email')}</TableHead>
                  <TableHead>{t('admin.role')}</TableHead>
                  <TableHead>{t('admin.status')}</TableHead>
                  <TableHead className="text-right">{t('admin.orders')}</TableHead>
                  <TableHead>{t('admin.lastLogin')}</TableHead>
                  <TableHead>{t('admin.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {t(`admin.${user.role}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-right">{user.orders}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Switch 
                          checked={user.status === 'active'} 
                          onCheckedChange={(checked) => handleStatusChange(user.id, checked)}
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
                              <Edit className="mr-2 h-4 w-4" />
                              <span>{t('admin.edit')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>{t('admin.sendEmail')}</span>
                            </DropdownMenuItem>
                            {user.status === 'active' ? (
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                <span>{t('admin.suspend')}</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>{t('admin.activate')}</span>
                              </DropdownMenuItem>
                            )}
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

export default AdminUsers;
