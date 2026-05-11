import { Navigate, Outlet, useLocation, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import AdminLayout from './AdminLayout';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import ClientesList from './pages/ClientesList';
import VentasList from './pages/VentasList';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <RequireAuth>
      <AdminLayout>
        <Routes>
          <Route index element={<Navigate to="/admin/prodotti" replace />} />
          <Route path="prodotti" element={<ProductList />} />
          <Route path="prodotti/nuovo" element={<ProductForm />} />
          <Route path="prodotti/:id/modifica" element={<ProductForm />} />
          <Route path="utenti" element={<UserList />} />
          <Route path="utenti/nuovo" element={<UserForm />} />
          <Route path="utenti/:id/modifica" element={<UserForm />} />
          <Route path="clienti" element={<ClientesList />} />
          <Route path="clienti/nuovo" element={<div>Modulo Cliente (da implementare)</div>} />
          <Route path="clienti/:id/modifica" element={<div>Modulo Cliente (da implementare)</div>} />
          <Route path="vendite" element={<VentasList />} />
          <Route path="vendite/nuovo" element={<div>Modulo Vendita (da implementare)</div>} />
          <Route path="vendite/:id/modifica" element={<div>Modulo Vendita (da implementare)</div>} />
        </Routes>
      </AdminLayout>
    </RequireAuth>
  );
};

export default AdminRoutes;
