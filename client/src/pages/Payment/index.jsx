import { Button, Card, Container, Grid, Radio, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../store';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('1');
  const [{ placeFrom, placeTo, userInfo, time }] = useStore();

  const handleBuyTicket = () => {};

  if (!userInfo.name) return <Navigate to="/" />;

  // convert yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (date) => {
    const datePart = date.split('-');
    return `${datePart[2]}/${datePart[1]}/${datePart[0]}`;
  };

  return (
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
          <Card variant="bordered" css={{ mt: '$20' }}>
            <Card.Body css={{ px: '$8', fd: 'row', jc: 'space-between' }}>
              <Text size="$xl">Tổng tiền</Text>
              <Text size="$xl" color="primary">
                200.000đ
              </Text>
            </Card.Body>
          </Card>
          <Button css={{ mt: '$11' }} onClick={handleBuyTicket}>
            Thanh toán
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
              <Text>0123456789</Text>
              <Text>{placeTo}</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

const payments = [
  {
    name: 'Thẻ thanh toán quốc tế',
    value: '1',
    description: 'Thẻ Visa, MasterCard, JCB',
    icon: 'fa-regular fa-credit-card',
  },
  {
    name: 'Thanh toán khi lên xe',
    value: '2',
    description: 'Bạn có thể thanh toán cho tài xế khi lên xe',
    icon: 'fa-solid fa-bus-simple',
  },
];
