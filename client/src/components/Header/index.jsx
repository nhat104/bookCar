import {
  Button,
  Dropdown,
  Input,
  Modal,
  Navbar,
  Text,
  User,
} from '@nextui-org/react';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import baseApiRequest from '../../api/baseApiRequest';
import { actions, useStore } from '../../store';
import { AcmeLogo } from '../logo';

// Giao diện Header cho các màn hình client
export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [{ userInfo }, dispatch] = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const closeHandler = () => {
    setOpenLogin(false);
    setOpenSignup(false);
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
      dispatch(actions.setUser(res.data.user));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setOpenLogin(false);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const username = data.get('username');
    const password = data.get('password');
    const address = data.get('address');
    const phone = data.get('phone');
    const cccd = data.get('cccd');
    const body = { username, password, name, address, phone, cccd };
    const res = await baseApiRequest.post('/auth/signup', body);
    if (res.status === 201) {
      dispatch(actions.setUser(res.data.user));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setOpenSignup(false);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      }
    }
  };

  const handleLogout = () => {
    dispatch(actions.setUser({}));
    localStorage.removeItem('user');
  };

  const navBars = [
    {
      name: 'Trang chủ',
      path: '/',
      show: true,
    },
    {
      name: 'Quản lý đơn hàng',
      path: '/ticket-info',
      show: userInfo.role === 'user',
    },
  ];

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
        {navBars.map(
          (navBar) =>
            navBar.show && (
              <Navbar.Link
                as="div"
                key={navBar.name}
                isActive={pathname === navBar.path}
                css={{ '& a': { color: '$accents9' } }}
              >
                <NavLink to={navBar.path}>{navBar.name}</NavLink>
              </Navbar.Link>
            )
        )}
      </Navbar.Content>
      {userInfo.role === 'user' ? (
        <Navbar.Content>
          <Dropdown>
            <Dropdown.Trigger>
              <User
                as="button"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                name={userInfo.name}
                pointer
              />
            </Dropdown.Trigger>

            <Dropdown.Menu color="primary" aria-label="User Actions">
              <Dropdown.Item key="logout" color="error">
                <div onClick={handleLogout}>Log Out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      ) : (
        <Navbar.Content>
          <Navbar.Item color="inherit">
            <Button auto light onPress={() => setOpenLogin(true)}>
              Đăng nhập
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button
              auto
              flat
              onPress={() => setOpenSignup(true)}
              color="primary"
            >
              Đăng ký
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      )}

      <Modal
        as="form"
        closeButton
        onSubmit={handleLogin}
        onClose={closeHandler}
        open={openLogin}
      >
        <Modal.Header>
          <Text b size={18}>
            Đăng nhập
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            aria-label="username"
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

      <Modal
        as="form"
        closeButton
        onSubmit={handleSignup}
        onClose={closeHandler}
        open={openSignup}
      >
        <Modal.Header>
          <Text b size={18}>
            Đăng ký
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            aria-label="name"
            bordered
            fullWidth
            name="name"
            color="primary"
            size="lg"
            placeholder="Họ tên"
            required
          />
          <Input
            aria-label="phone"
            labelLeft="(VN)+84"
            bordered
            fullWidth
            name="phone"
            color="primary"
            size="lg"
            placeholder="Số điện thoại"
            pattern="[0-9]*"
            required
          />
          <Input
            aria-label="username"
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
          <Input
            aria-label="address"
            bordered
            fullWidth
            name="address"
            color="primary"
            size="lg"
            placeholder="Địa chỉ"
            required
          />
          <Input
            aria-label="cccd"
            bordered
            fullWidth
            name="cccd"
            color="primary"
            size="lg"
            placeholder="Căn cước công dân"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto type="submit">
            Đăng ký
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
