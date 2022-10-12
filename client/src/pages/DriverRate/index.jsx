import { Container, Loading, Table, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { toVND } from '../../utils';

export default () => {
  const [tableData, setTableData] = useState({ rows: null, columns: null });

  useEffect(() => {
    baseApiRequest.post(`/report/driver-rate`).then((res) => {
      setTableData(res.data);
    });
  }, []);

  return (
    // Báo cáo doanh thu theo thời gian
    <Container md css={{ mt: '$8' }}>
      <Text h3 css={{ d: 'flex', gap: '$4' }}>
        Xếp hạng tài xế
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
