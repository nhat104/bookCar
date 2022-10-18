import {
  Card,
  Container,
  Grid,
  Loading,
  Row,
  Table,
  Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { toVND } from '../../utils';

export default () => {
  const [cars, setCars] = useState([]);
  const [tableData, setTableData] = useState({ rows: null, columns: null });

  useEffect(() => {
    baseApiRequest.get(`/report/customer`).then((res) => {
      setTableData(res.data);
    });

    baseApiRequest.get('/cars').then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <Container md>
      <Text h2>Báo cáo chăm sóc khách hàng</Text>
      {tableData.rows ? (
        tableData.rows.length > 0 ? (
          <Table aria-label="table" css={{ height: 'auto' }}>
            <Table.Header columns={tableData.columns}>
              {(column) => (
                <Table.Column key={column.id}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={tableData.rows}>
              {(item) => (
                <Table.Row key={item.stt}>
                  {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        ) : (
          <Text h4 css={{ mt: '$10' }}>
            Không có dữ liệu
          </Text>
        )
      ) : (
        <Loading color="primary" size="lg" />
      )}

      <Text h2 css={{ mt: '$20' }}>
        Quản lý xe
      </Text>
      <Grid.Container gap={2} css={{ mh: '536px', overflow: 'auto' }}>
        {cars &&
          cars.map((car) => (
            <Grid xs={6} sm={3} key={car.id}>
              <Card isPressable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={car.image}
                    objectFit="cover"
                    width="100%"
                    height={140}
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
