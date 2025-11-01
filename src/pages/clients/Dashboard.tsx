import { signOut } from 'firebase/auth';
import { auth } from '@/integrations/firebase/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/clients/2ca/login');
  };

  return (
    <div>
      Dashboard 2.0
      <button onClick={handleLogout}>Cerrar sesión</button>;
    </div>
  );
};

export default Dashboard;
