import { Button, Card } from '@nextui-org/react';
import { Dropdown, Grid, Input, Text, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actions, useStore } from '../../store';

export default function VehicleInfo({ vehicle }) {
  const [hour, setHour] = useState(new Set([vehicle.times[0]]));
  const [{ placeFrom, placeTo, chooseVehicle, time }, dispatch] = useStore();
  const navigate = useNavigate();

  const toVND = (price) =>
    Number(price).toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });

  const handleChooseVehicle = () => {
    dispatch(actions.setVehicle(vehicle));
  };

  const handleBookCar = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const phone = '0' + data.get('phone');
    const address = data.get('address');
    const cccd = data.get('cccd');
    const note = data.get('note') || '';
    dispatch(actions.setUser({ name, phone, address, cccd, note }));
    dispatch(actions.setTime({ ...time, hour: hour.keys().next().value }));
    navigate('/payment');
  };

  return (
    <Card css={{ p: '$6', mw: '750px' }}>
      <Card.Body
        css={{
          pt: '$2',
          flexDirection: 'row',
          borderBottom:
            chooseVehicle.id === vehicle.id && '1px solid $accents5',
        }}
      >
        <img
          alt="nextui logo"
          style={{ objectFit: 'cover' }}
          src="./car1.png"
          width="150px"
          height="150px"
        />
        <Grid.Container css={{ pl: '$10', pt: '$8' }}>
          <Grid xs={12}>
            <Grid xs={2} css={{ ai: 'center' }}>
              <Text h5>{vehicle.name}</Text>
            </Grid>
            <Grid xs={4} css={{ gap: '$3', ai: 'center', color: '$blue500' }}>
              <i
                style={{ marginBottom: '10px' }}
                className="fa-regular fa-star"
              ></i>
              <Text color="primary" h5>
                4.9 (15)
              </Text>
            </Grid>
            <Grid xs={6} css={{ jc: 'end' }}>
              <Text color="primary" h4>
                {toVND(vehicle.price)}
              </Text>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Text>Giường nằm 46 chỗ</Text>
          </Grid>
          <Grid
            xs={12}
            css={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Dropdown>
              <Dropdown.Button rounded flat color="primary">
                {hour}
              </Dropdown.Button>
              <Dropdown.Menu
                color="primary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={hour}
                onSelectionChange={setHour}
              >
                {vehicle.times.map((time) => (
                  <Dropdown.Item css={{ w: '500px' }} key={time}>
                    {time}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Text as="div">
              <Text>Điểm đón: {placeFrom}</Text>
              <Text>Điểm dừng: {placeTo}</Text>
            </Text>
            <Button
              auto
              css={{ justifySelf: 'end' }}
              onPress={handleChooseVehicle}
            >
              Chọn tuyến
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Body>
      {chooseVehicle.id === vehicle.id && (
        <form onSubmit={handleBookCar}>
          <Card.Body
            css={{
              fd: 'column',
              px: '$32',
              gap: '$10',
              borderBottom: '1px solid $accents5',
            }}
          >
            <Text h4>Nhập thông tin</Text>
            <Input required label="Họ tên" rounded fullWidth name="name" />
            <Input
              label="Số điện thoại"
              labelLeft="(VN)+84"
              rounded
              name="phone"
              fullWidth
              required
              // pattern="^((\+84-?)|0)?[0-9]{9}$"
              pattern="[0-9]*"
            />
            <Input label="Địa chỉ" required rounded name="address" fullWidth />
            <Input
              label="Căn cước công dân"
              required
              rounded
              fullWidth
              name="cccd"
              pattern="[0-9]*"
            />
            <Textarea
              label="Ghi chú hoặc yêu cầu khác (Nếu có)"
              placeholder="Các yêu cầu đặc biệt không thể được đảm bảo - nhưng nhà xe sẽ cố gắng hết sức để đáp ứng như cầu của bạn."
              fullWidth
              name="note"
              maxRows={3}
            />
          </Card.Body>
          <Card.Footer css={{ jc: 'end' }}>
            <Text>Tổng cộng: {toVND(vehicle.price)}</Text>
            <Button auto type="submit" css={{ ml: '$6' }}>
              Tiếp tục
            </Button>
          </Card.Footer>
        </form>
      )}
    </Card>
  );
}
