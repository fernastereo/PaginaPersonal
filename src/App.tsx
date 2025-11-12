import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './lib/i18n';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/clients-portal/views/Login';
import Register from '@/clients-portal/views/Register';
import HomePage from '@/clients-portal/views/HomePage';
import Dashboard from '@/clients-portal/views/Dashboard';
import Users from '@/clients-portal/views/Users';
import Profile from '@/clients-portal/views/Profile';
import { AuthProvider } from '@/clients-portal/auth/AuthProvider';
import RequireAuth from '@/clients-portal/auth/RequireAuth';
import Tasks from '@/clients-portal/views/Tasks';
import {
  analytics,
  logEvent,
  isProduction,
} from '@/clients-portal/integrations/firebase/client';

const queryClient = new QueryClient();

function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    if (analytics && isProduction) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AnalyticsListener />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clients">
              <Route path="login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route element={<HomePage />}>
                  <Route path="home" element={<Dashboard />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="users" element={<Users />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="register" element={<Register />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
