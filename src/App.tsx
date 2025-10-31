import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './lib/i18n';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/clients/Login';
import Dashboard from './pages/clients/Dashboard';
import { AuthProvider } from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clients">
              <Route path="login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="dashboard" element={<Dashboard />} />
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
