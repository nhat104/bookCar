import { Button, Link, Navbar, Text } from '@nextui-org/react';
import React from 'react';
import { AcmeLogo } from './logo';

export default function Header() {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          BOOK CAR
        </Text>
      </Navbar.Brand>
      <Navbar.Content activeColor="primary" hideIn="xs" variant="underline-rounded">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} color="primary" href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
