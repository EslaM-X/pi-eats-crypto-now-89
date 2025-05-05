
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  ShoppingBag, 
  Wallet, 
  BarChart, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import PiEatLogo from '@/components/PiEatLogo';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  
  const navItems = [
    {
      path: '/admin',
      label: t('admin.dashboard'),
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/admin/users',
      label: t('admin.users'),
      icon: <Users size={20} />
    },
    {
      path: '/admin/restaurants',
      label: t('admin.restaurants'),
      icon: <Utensils size={20} />
    },
    {
      path: '/admin/orders',
      label: t('admin.orders'),
      icon: <ShoppingBag size={20} />
    },
    {
      path: '/admin/payments',
      label: t('admin.payments'),
      icon: <Wallet size={20} />
    },
    {
      path: '/admin/statistics',
      label: t('admin.statistics'),
      icon: <BarChart size={20} />
    },
    {
      path: '/admin/settings',
      label: t('admin.settings'),
      icon: <Settings size={20} />
    }
  ];
  
  return (
    <div className={cn(
      'bg-background border-r border-border h-screen relative group transition-all duration-300 flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "absolute -right-3 top-6 z-10 rounded-full border shadow-md bg-background",
          isRtl && "right-auto -left-3"
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {isRtl ? 
          (collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />) :
          (collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />)
        }
      </Button>
      
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 px-4",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <Link to="/admin" className="flex items-center gap-2">
          <PiEatLogo size="md" />
          {!collapsed && <span className="font-bold text-lg">PiEat Admin</span>}
        </Link>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.path === location.pathname;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-pi/10 text-pi hover:bg-pi/20" 
                    : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      
      {/* Footer */}
      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        <Link to="/" className={cn(
          "text-muted-foreground hover:text-foreground flex items-center gap-3 group",
          collapsed && "justify-center"
        )}>
          <span className="text-sm">{!collapsed && t('admin.goToSite')}</span>
          {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
