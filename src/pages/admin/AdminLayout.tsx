
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { Container } from '@/components/ui/container';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminLayout = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex">
      <Helmet>
        <title>{t('admin.title')} | PiEat-Me</title>
      </Helmet>
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/10">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
