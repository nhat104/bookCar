import { Button, Navbar, Text } from '@nextui-org/react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { actions, useStore } from '../../store';
import { AcmeLogo } from '../logo';

// Giao diện Header cho các màn hình admin
export default function AdminHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [{}, dispatch] = useStore();

  const handleLogout = () => {
    dispatch(actions.setUser({}));
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar variant="sticky">
      <Link to="/">
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            BOOK CAR
          </Text>
        </Navbar.Brand>
      </Link>
      <Navbar.Content
        activeColor="primary"
        hideIn="xs"
        variant="underline-rounded"
      >
        {navBars.map((navBar, index) => (
          <Navbar.Link
            as="div"
            key={index}
            isActive={pathname === navBar.path}
            css={{ '& a': { color: '$accents9' } }}
          >
            <NavLink to={navBar.path}>{navBar.name}</NavLink>
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat color="primary" onPress={handleLogout}>
            Đăng xuất
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

const navBars = [
  {
    name: 'Trang chủ',
    path: '/admin',
  },
  {
    name: 'Báo cáo doanh thu',
    path: '/admin/report',
  },
  {
    name: 'Xếp hạng tài xế',
    path: '/admin/report/driver-rate',
  },
  {
    name: 'Quản lý tài xế',
    path: '/admin/driver-management',
  },
];
