import { Button, Input, Modal, Navbar, Row, Text } from '@nextui-org/react';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import baseApiRequest from '../../api/baseApiRequest';
import { AcmeLogo } from '../logo';

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const closeHandler = () => {
    setOpenLogin(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');
    const res = await baseApiRequest.post('/auth/login', {
      username,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setOpenLogin(false);
      navigate('/admin');
    }
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
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item color="inherit">
          <Button auto light onPress={() => setOpenLogin(true)}>
            Đăng nhập
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button auto flat color="primary">
            Đăng ký
          </Button>
        </Navbar.Item>
      </Navbar.Content>
      <Modal
        as="form"
        closeButton
        onSubmit={handleLogin}
        onClose={closeHandler}
        open={openLogin}
      >
        <Modal.Header>
          <Text b size={18}>
            Admin
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            aria-label="username"
            autoFocus
            bordered
            fullWidth
            name="username"
            color="primary"
            size="lg"
            placeholder="Tên đăng nhập"
            required
          />
          <Input
            aria-label="password"
            bordered
            fullWidth
            name="password"
            color="primary"
            size="lg"
            type="password"
            placeholder="Mật khẩu"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto type="submit">
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

const navBars = [
  {
    name: 'Trang chủ',
    path: '/',
  },
  {
    name: 'Quản lý đơn hàng',
    path: '/ticket-info',
  },
];
