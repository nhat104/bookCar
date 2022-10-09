import { Container, Dropdown, Loading, Table, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { toVND } from '../../utils';

export default () => {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [time, setTime] = useState(new Set(['date']));

  useEffect(() => {
    baseApiRequest.post(`/report/${time.keys().next().value}`).then((res) => {
      setTableData(res.data);
    });
  }, [time]);

  return (
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
      {tableData.rows.length > 0 ? (
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
        </Table>
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
];

const timeObj = {
  date: 'Ngày',
  month: 'Tháng',
  year: 'Năm',
};
