import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';

export default () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};
