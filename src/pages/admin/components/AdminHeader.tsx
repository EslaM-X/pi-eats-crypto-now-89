
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Search, 
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { PiPriceIndicator } from '@/components/PiPriceIndicator';

const AdminHeader = () => {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = usePiAuth();
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/95 backdrop-blur-sm">
      {/* Left Section - Search */}
      <div className="hidden lg:flex items-center w-72">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="search"
            placeholder={t('admin.search')}
            className="w-full h-9 rounded-md bg-muted/40 border-border pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-pi"
          />
        </div>
      </div>
      
      {/* Middle Section - Pi Price */}
      <div className="flex-1 flex justify-center">
        <PiPriceIndicator showDetails={true} />
      </div>
      
      {/* Right Section - User Menu */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" title={t('admin.notifications')}>
          <Bell className="h-5 w-5" />
        </Button>
        
        {/* Messages */}
        <Button variant="ghost" size="icon" title={t('admin.messages')}>
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        {/* Language Toggle */}
        <Button 
          variant="ghost"
          onClick={toggleLanguage}
          className="text-sm font-medium"
        >
          {language === 'ar' ? 'EN' : 'العربية'}
        </Button>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-pi text-white">
                  {user ? user.username.substring(0, 2).toUpperCase() : 'AD'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              {user ? user.username : t('admin.accountSettings')}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>{t('admin.profile')}</DropdownMenuItem>
              <DropdownMenuItem>{t('admin.settings')}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              {t('auth.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
