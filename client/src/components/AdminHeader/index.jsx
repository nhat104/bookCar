import { Button, Dropdown, Navbar, Text } from '@nextui-org/react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AcmeLogo } from '../logo';

export default function AdminHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
        {navBars.map((navBar) => (
          <Navbar.Link
            as="div"
            key={navBar.name}
            isActive={pathname === navBar.path}
            css={{ '& a': { color: '$accents9' } }}
          >
            <NavLink to={navBar.path}>{navBar.name}</NavLink>
          </Navbar.Link>
        ))}
        <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button auto light css={{ px: 0 }} ripple={false}>
              Features
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            css={{
              $$dropdownMenuWidth: '340px',
              $$dropdownItemHeight: '50px',
              '& .nextui-dropdown-item': {
                py: '$4',
                // dropdown item title
                '& .nextui-dropdown-item-content': {
                  w: '100%',
                  fontWeight: '$semibold',
                },
              },
            }}
          >
            <Dropdown.Item key="autoscaling">Autoscaling</Dropdown.Item>
            <Dropdown.Item key="usage_metrics">Usage Metrics</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    path: '/',
  },
];
