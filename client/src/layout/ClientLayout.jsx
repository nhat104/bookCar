import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

// Layout cho các màn hình admin
export default () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
