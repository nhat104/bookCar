import { Text, Button } from '@nextui-org/react';
import { Container, Dropdown, Input, Loading, Table } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { toVND } from '../../utils';

export default () => {
  const [tableData, setTableData] = useState({ rows: null, columns: null });
  const [time, setTime] = useState(new Set(['date']));

  useEffect(() => {
    baseApiRequest.post(`/report/${time.keys().next().value}`).then((res) => {
      setTableData(res.data);
    });
  }, [time]);

  const handleFilter = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dateStart = data.get('fromDate');
    const dateEnd = data.get('toDate');
    baseApiRequest
      .post(`/report/${time.keys().next().value}`, { dateStart, dateEnd })
      .then((res) => {
        setTableData(res.data);
      });
  };

  return (
    // Báo cáo doanh thu theo thời gian
    <Container md css={{ mt: '$8' }}>
      <Text h3 css={{ d: 'flex', gap: '$4' }}>
        Báo cáo doanh thu theo
        <Dropdown>
          <Dropdown.Button flat color="primary" css={{ tt: 'capitalize' }}>
            {timeObj[time.keys().next().value]}
          </Dropdown.Button>
          <Dropdown.Menu
            color="primary"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={time}
            onSelectionChange={setTime}
          >
            {times.map((time) => (
              <Dropdown.Item key={time.key}>{time.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Text>
      <Text
        as="form"
        css={{ my: '$10', d: 'flex', ai: 'end', gap: '$10' }}
        onSubmit={handleFilter}
      >
        <Input
          label="Từ ngày"
          type="date"
          name="fromDate"
          rounded
          color="primary"
        />
        <Input
          label="Đến ngày"
          type="date"
          name="toDate"
          rounded
          color="primary"
        />
        <Button rounded type="submit" auto>
          Lọc
        </Button>
      </Text>
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
                  {(columnKey) => (
                    <Table.Cell>
                      {columnKey === 'sum_price'
                        ? toVND(item[columnKey]).slice(0, -4)
                        : item[columnKey]}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={5} />
          </Table>
        ) : (
          <Text h4 css={{ mt: '$10' }}>
            Không có dữ liệu
          </Text>
        )
      ) : (
        <Loading color="primary" size="lg" />
      )}
    </Container>
  );
};

const times = [
  { key: 'date', name: 'Ngày' },
  { key: 'month', name: 'Tháng' },
  { key: 'year', name: 'Năm' },
  { key: 'place', name: 'Khu vực' },
  { key: 'driver', name: 'Tài xế' },
];

const timeObj = {
  date: 'Ngày',
  month: 'Tháng',
  year: 'Năm',
  place: 'Khu vực',
  driver: 'Tài xế',
};
