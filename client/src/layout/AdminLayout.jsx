import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

// Layout cho các màn hình client
export default () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};
