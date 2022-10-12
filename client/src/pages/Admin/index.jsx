import { Card, Container, Grid, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { toVND } from '../../utils';

export default () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    baseApiRequest.get('/cars').then((res) => {
      setCars(res.data);
    });
  }, []);

  const list = [
    {
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50',
    },
    {
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00',
    },
    {
      title: 'Cherry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00',
    },
    {
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
      price: '$5.30',
    },
    {
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70',
    },
    {
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00',
    },
    {
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50',
    },
    {
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20',
    },
  ];

  return (
    <Container md>
      <Text h2>Quản lý xe</Text>
      <Grid.Container gap={2} css={{ mh: '536px', overflow: 'auto' }}>
        {cars &&
          cars.map((car) => (
            <Grid xs={6} sm={3} key={car.id}>
              <Card isPressable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src="/car1.png"
                    objectFit="cover"
                    width="100%"
                    // height={140}
                    alt={car.name}
                  />
                </Card.Body>
                <Card.Footer css={{ fd: 'column', ai: 'start' }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{car.name}</Text>
                    <Text
                      css={{
                        color: '$accents7',
                        fontWeight: '$semibold',
                        fontSize: '$sm',
                      }}
                    >
                      {toVND(car.price)}
                    </Text>
                  </Row>
                  <Text>
                    {car.desc} {car.seat} chỗ
                  </Text>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
      </Grid.Container>
    </Container>
  );
};
