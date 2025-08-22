import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../auth/RequireAuth';
import Dashboard from './Dashboard';
import UsersPanel from './UsersPanel';
import ContentManager from './ContentManager';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <RequireAuth role="admin">
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth role="admin">
            <UsersPanel />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/content"
        element={
          <RequireAuth role="admin">
            <ContentManager />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;