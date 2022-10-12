import { Button, Checkbox, Input, Modal, Row } from '@nextui-org/react';
import { Card, Container, Grid, Loading, Radio, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import baseApiRequest from '../../api/baseApiRequest';
import { useStore } from '../../store';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('Visa Card');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ticket, setTicket] = useState({});
  const [{ placeFrom, placeTo, userInfo, time, chooseVehicle }] = useStore();
  const navigate = useNavigate();

  if (!userInfo.name) return <Navigate to="/" />;

  // Thao tác đặt vé của người dùng
  const handleBuyTicket = () => {
    const body = {
      carLineId: chooseVehicle.id,
      payment: paymentMethod,
      time,
      userInfo,
    };
    baseApiRequest.post('/buy-ticket', body).then((res) => {
      setLoading(false);
      setTicket(res.data);
      if (res.status === 200) {
        setOpenModal(true);
      }
    });
  };

  // convert yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (date) => {
    const datePart = date.split('-');
    return `${datePart[2]}/${datePart[1]}/${datePart[0]}`;
  };

  const closeHandler = () => {
    setOpenModal(false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoOrders = () => {
    navigate('/ticket-info');
  };

  return (
    // Giao diện màn hình thanh toán
    <Container sm css={{ mt: '$10' }}>
      <Grid.Container gap={2}>
        <Grid xs={8} css={{ fd: 'column', gap: '$6' }}>
          <Text h4>Phương thức thanh toán</Text>
          <Card variant="bordered" css={{ p: '$8' }}>
            <Radio.Group
              aria-label="label"
              value={paymentMethod}
              onChange={setPaymentMethod}
            >
              {payments.map((payment, index) => (
                <Card.Body
                  key={index}
                  css={{
                    borderBottom:
                      index !== payments.length - 1 && '1px solid $accents5',
                  }}
                >
                  <Radio
                    value={payment.value}
                    description={payment.description}
                  >
                    <div
                      style={{
                        marginLeft: '10px',
                        marginRight: '16px',
                      }}
                    >
                      <i className={payment.icon}></i>
                    </div>
                    {payment.name}
                  </Radio>
                </Card.Body>
              ))}
            </Radio.Group>
          </Card>
          <Card variant="bordered" css={{ mt: '$18' }}>
            <Card.Body css={{ px: '$8', fd: 'row', jc: 'space-between' }}>
              <Text size="$xl">Tổng tiền</Text>
              <Text size="$xl" color="primary">
                200.000đ
              </Text>
            </Card.Body>
          </Card>
          <Button css={{ mt: '$8' }} onPress={handleBuyTicket}>
            Thanh toán
            {loading && (
              <Loading
                type="points"
                css={{ pl: 4 }}
                color="currentColor"
                size="sm"
              />
            )}
          </Button>
        </Grid>
        <Grid xs={4} css={{ fd: 'column', gap: '$6' }}>
          <Text h4>Thông tin chuyến đi</Text>
          <Card variant="bordered" css={{ px: '$4' }}>
            <Card.Body css={{ borderBottom: '1px solid $accents5' }}>
              <Text size="small">Hành khách</Text>
              <Text css={{ mb: '$4' }}>{userInfo.name}</Text>
              <Text size="small">Số điện thoại</Text>
              <Text css={{ mb: '$4' }}>{userInfo.phone}</Text>
              <Text size="small">Địa chỉ</Text>
              <Text css={{ mb: '$4' }}>{userInfo.address}</Text>
              <Text size="small">Căn cước công dân</Text>
              <Text>{userInfo.cccd}</Text>
            </Card.Body>
            <Card.Body>
              <Text size="small">Điểm đón (dự kiến)</Text>
              <Text>
                {time.hour} - {formatDate(time.date)}
              </Text>
              <Text css={{ mb: '$4' }}>{placeFrom}</Text>
              <Text size="small">Điểm trả (dự kiến)</Text>
              <Text>{placeTo}</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      {ticket.driver && (
        <Modal
          aria-labelledby="modal-title"
          open={openModal}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text size={18}>Đặt xe thành công</Text>
          </Modal.Header>
          <Modal.Body>
            <Text>Thông tin tài xế của bạn</Text>
            <Text>Họ tên: {ticket.driver.name}</Text>
            <Text>Ngày sinh: {ticket.driver.dateOfBirth}</Text>
            <Text>Số điện thoại: {ticket.driver.phone}</Text>
          </Modal.Body>
          <Modal.Footer css={{ jc: 'space-between' }}>
            <Button auto flat onPress={handleGoHome}>
              Về trang chủ
            </Button>
            <Button auto onPress={handleGoOrders}>
              Quản lý đơn hàng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

const payments = [
  {
    name: 'Thẻ thanh toán quốc tế',
    value: 'Visa Card',
    description: 'Thẻ Visa, MasterCard, JCB',
    icon: 'fa-regular fa-credit-card',
  },
  {
    name: 'Thanh toán khi lên xe',
    value: 'Cash',
    description: 'Bạn có thể thanh toán cho tài xế khi lên xe',
    icon: 'fa-solid fa-bus-simple',
  },
];
