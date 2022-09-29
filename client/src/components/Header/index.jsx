import { Button, Navbar, Text } from '@nextui-org/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AcmeLogo } from '../logo';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar variant="sticky">
      <Link>
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            BOOK CAR
          </Text>
        </Navbar.Brand>
      </Link>
      <Navbar.Content activeColor="primary" hideIn="xs" variant="underline-rounded">
        {navBars.map((navBar) => (
          <Navbar.Link as="div" key={navBar.name} isActive={pathname === navBar.path}>
            <NavLink to={navBar.path}>{navBar.name}</NavLink>
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit">Login</Navbar.Link>
        <Navbar.Item>
          <Button auto flat color="primary">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

const navBars = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Order Management',
    path: '/ticket-info',
  },
  {
    name: 'Payment',
    path: '/payment',
  },
];
