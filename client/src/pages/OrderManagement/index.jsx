import {
  Button,
  Image,
  Input,
  Loading,
  Modal,
  Pagination,
} from '@nextui-org/react';
import { Card, Collapse, Container, Grid, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { useStore } from '../../store';
import { toVND } from '../../utils';

export default () => {
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 3 });
  const [openCancelModel, setOpenCancelModel] = useState(0);

  const [{ userInfo }] = useStore();

  useEffect(() => {
    baseApiRequest
      .post('/all-ticket', { username: userInfo.username })
      .then((res) => {
        setTickets(res.data.tickets);
        setPagination({
          ...pagination,
          total: Math.floor(res.data.tickets.length / pagination.limit) + 1,
        });
      });
  }, []);

  const handleRate = (e, id) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const rate = data.get('rate');
    baseApiRequest
      .post('/rate-ticket', { id, rate })
      .then(() => {
        setTickets(
          tickets.map((ticket) =>
            ticket.id === id ? { ...ticket, rate } : ticket
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page });
  };

  // compare ticket date with now time
  const compareDate = (date, hour) => {
    const now = new Date();
    const ticketDate = new Date(date);
    const ticketHour = hour.split(':');
    ticketDate.setHours(ticketHour[0]);
    ticketDate.setMinutes(ticketHour[1]);
    return ticketDate.getTime() > now.getTime() ? 1 : 0;
  };

  const handleCancelTicket = () => {
    const id = openCancelModel;
    baseApiRequest
      .post('/cancel-ticket', { id })
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.id !== id));
        setOpenCancelModel(0);
      })
      .catch((err) => console.log(err));
  };

  const closeHandler = () => {
    setOpenCancelModel(0);
  };

  return (
    // Giao diện màn hình lịch sử mua vé
    <Container sm css={{ mt: '$10', pb: '$20' }}>
      {tickets.length > 0 ? (
        tickets
          .slice(
            (pagination.page - 1) * pagination.limit,
            pagination.page * pagination.limit
          )
          .map((ticket) => (
            <Card key={ticket.id} css={{ p: '$6', mw: '750px', my: '$12' }}>
              <Card.Body css={{ pt: '$2', fd: 'row' }}>
                <Image
                  width={300}
                  height={160}
                  src={ticket.car.image}
                  alt="Default Image"
                  objectFit="cover"
                />
                <Grid.Container css={{ pl: '$10', pt: '$6' }}>
                  <Grid xs={12}>
                    <Grid xs={6} css={{ ai: 'center' }}>
                      <Text h5>Mã chuyến đi: {ticket.id}</Text>
                    </Grid>
                    <Grid xs={6} css={{ jc: 'end' }}>
                      <Text color="primary" h4>
                        {toVND(ticket.car.price)}
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid xs={12} css={{ jc: 'space-between' }}>
                    <Grid xs={6}>
                      <Collapse
                        title={`Tài xế: ${ticket.driver.name}`}
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
                        <Text>Số điện thoại: {ticket.driver.phone}</Text>
                        <Text>Biển số xe: {ticket.car.licensePlate}</Text>
                      </Collapse>
                    </Grid>
                    <Grid xs={6} css={{ jc: 'end' }}>
                      <Text>
                        {ticket.car.desc} {ticket.car.seat} chỗ
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid xs={12} css={{ ai: 'end', jc: 'space-between' }}>
                    <Text as="div">
                      <Text>Điểm đón: {ticket.placeFrom}</Text>
                      <Text css={{ ml: '$10' }}>
                        {ticket.hour.split(':')[0] +
                          'h' +
                          ticket.hour.split(':')[1]}{' '}
                        {ticket.date}
                      </Text>
                      <Text>Điểm dừng: {ticket.placeTo}</Text>
                    </Text>
                    {}
                    {compareDate(ticket.date, ticket.hour) === 0 ? (
                      ticket.rate ? (
                        <Text color="success" size="$xl">
                          {ticket.rate} <i className="fa-regular fa-star"></i>
                        </Text>
                      ) : (
                        <Text
                          as="form"
                          css={{ dflex: 'center' }}
                          onSubmit={(e) => handleRate(e, ticket.id)}
                        >
                          <Input
                            aria-label="number"
                            type="number"
                            name="rate"
                            min={1}
                            max={5}
                            css={{ w: '40px' }}
                          />
                          <i className="fa-regular fa-star"></i>
                          <Button
                            auto
                            type="submit"
                            css={{ justifySelf: 'end', ml: '$6' }}
                          >
                            Đánh giá
                          </Button>
                        </Text>
                      )
                    ) : (
                      <Button
                        auto
                        onPress={() => setOpenCancelModel(ticket.id)}
                      >
                        Huỷ vé
                      </Button>
                    )}
                  </Grid>
                </Grid.Container>
              </Card.Body>
            </Card>
          ))
      ) : (
        <Loading color="primary" size="lg" />
      )}
      <Pagination
        total={pagination.total}
        initialPage={1}
        onChange={handlePageChange}
      />
      <Modal open={openCancelModel} onClose={closeHandler}>
        <Modal.Header>
          <Text size={18}>Xác nhận</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Bạn có chắc chắn muốn hủy vé này?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onPress={closeHandler}>
            Hủy
          </Button>
          <Button auto color="error" onPress={handleCancelTicket}>
            Huỷ vé
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
