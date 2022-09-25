import { Button, Card, Grid, Input, Text, Textarea } from '@nextui-org/react';

export default function VehicleInfo() {
  return (
    <Card css={{ p: '$6', mw: '700px' }}>
      <Card.Body css={{ pt: '$2', flexDirection: 'row', borderBottom: '1px solid $accents5' }}>
        <img
          alt="nextui logo"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width="150px"
          height="150px"
        />
        <Grid.Container css={{ pl: '$10', pt: '$8' }}>
          <Grid xs={12}>
            <Grid xs={2} css={{ ai: 'center' }}>
              <Text h5>Hải Bình</Text>
            </Grid>
            <Grid xs={4} css={{ gap: '$3', ai: 'center', color: '$blue500' }}>
              <i style={{ marginBottom: '10px' }} className="fa-regular fa-star"></i>
              <Text color="primary" h5>
                4.9 (15)
              </Text>
            </Grid>
            <Grid xs={6} css={{ jc: 'end' }}>
              <Text color="primary" h4>
                200.000đ
              </Text>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Text>Giường nằm 46 chỗ</Text>
          </Grid>
          <Grid xs={12} css={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Text css={{ m: 0 }} h4>
              9h00
            </Text>
            <Text>Điểm đón: Cổng chào Xuân Trường</Text>
            <Button auto css={{ justifySelf: 'end' }}>
              Chọn tuyến
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Body>
      <Card.Body css={{ fd: 'column', px: '$32', gap: '$10', borderBottom: '1px solid $accents5' }}>
        <Text h4>Nhập thông tin</Text>
        <Input label="Họ tên" rounded fullWidth />
        <Input label="Số điện thoại" labelLeft="(VN)+84" rounded fullWidth />
        <Input label="Email" type="email" labelRight="@gmail.com" rounded fullWidth />
        <Textarea
          label="Ghi chú hoặc yêu cầu khác (Nếu có)"
          placeholder="Các yêu cầu đặc biệt không thể được đảm bảo - nhưng nhà xe sẽ cố gắng hết sức để đáp ứng như cầu của bạn."
          fullWidth
          maxRows={3}
        />
      </Card.Body>
      <Card.Footer css={{ jc: 'end' }}>
        <Text>Tổng cộng: 200.000đ</Text>
        <Button auto css={{ ml: '$6' }}>
          Tiếp tục
        </Button>
      </Card.Footer>
    </Card>
  );
}
