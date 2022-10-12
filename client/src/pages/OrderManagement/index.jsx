import { Button, Input } from '@nextui-org/react';
import { Card, Collapse, Container, Grid, Text } from '@nextui-org/react';

export default () => {
  return (
    // Giao diện màn hình lịch sử mua vé
    <Container sm css={{ mt: '$10' }}>
      <Card css={{ p: '$6', mw: '750px' }}>
        <Card.Body css={{ pt: '$2', fd: 'row' }}>
          <img
            alt=""
            style={{ objectFit: 'cover' }}
            src="./car1.png"
            width="150px"
            height="150px"
          />
          <Grid.Container css={{ pl: '$10', pt: '$6' }}>
            <Grid xs={12}>
              <Grid xs={6} css={{ ai: 'center' }}>
                <Text h5>Mã chuyến đi</Text>
              </Grid>
              <Grid xs={6} css={{ jc: 'end' }}>
                <Text color="primary" h4>
                  200000
                </Text>
              </Grid>
            </Grid>
            <Grid xs={12} css={{ jc: 'space-between' }}>
              <Grid xs={6}>
                <Collapse
                  title="Tài xế: Trần Thị Thanh Thủy"
                  divider={false}
                  showArrow={false}
                  css={{
                    '& .nextui-collapse-view': {
                      p: 0,
                      '& .nextui-collapse-title': { fs: '$md' },
                    },
                    '& .nextui-collapse-content': { pl: '$6', pb: 0 },
                  }}
                >
                  <Text>Số điện thoại: 023154676</Text>
                  <Text>Biển số xe: 12A-13456</Text>
                </Collapse>
              </Grid>
              <Grid xs={6} css={{ jc: 'end' }}>
                <Text>Giường nằm 12 chỗ</Text>
              </Grid>
            </Grid>
            <Grid xs={12} css={{ ai: 'end', jc: 'space-between' }}>
              <Text as="div">
                <Text>Điểm đón: thời gian + địa điểm</Text>
                <Text>Điểm dừng: thời gian + địa điểm</Text>
              </Text>
              <Text as="div" css={{ dflex: 'center' }}>
                <Input
                  aria-label="number"
                  type="number"
                  min={1}
                  max={5}
                  css={{ w: '40px' }}
                />
                <i className="fa-regular fa-star"></i>
                <Button auto css={{ justifySelf: 'end', ml: '$6' }}>
                  Đánh giá
                </Button>
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
