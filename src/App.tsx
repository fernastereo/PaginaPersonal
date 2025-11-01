import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './lib/i18n';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/clients/Login';
import Register from './pages/clients/Register';
import HomePage from './pages/clients/HomePage';
import Dashboard from './pages/clients/Dashboard';
import Users from './pages/clients/Users';
import Profile from './pages/clients/Profile';
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
                <Route element={<HomePage />}>
                  <Route path="home" element={<Dashboard />} />
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
