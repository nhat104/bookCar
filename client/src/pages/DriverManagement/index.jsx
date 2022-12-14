import { Button, Container, Loading, Modal, styled } from '@nextui-org/react';
import { Col, Row, Table, Text, Tooltip, Input, User } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import baseApiRequest from '../../api/baseApiRequest';
import { DeleteIcon, EditIcon } from '../../components/Icon';

export default () => {
  const [openEditModal, setOpenEditModal] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [driverData, setDriverData] = useState({
    drivers: [],
    columns: [],
  });

  useEffect(() => {
    setLoading(true);
    baseApiRequest.get(`/drivers`).then((res) => {
      setDriverData(res.data);
      setLoading(false);
    });
  }, []);

  const closeHandler = () => {
    setOpenEditModal(null);
    setOpenDeleteModal(null);
  };

  const renderCell = (driver, columnKey) => {
    const cellValue = driver[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <User squared src={driver.avatar} name={cellValue} css={{ p: 0 }}>
            {driver.dateOfBirth}
          </User>
        );
      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col>
              <Tooltip content="Edit driver">
                <IconButton onClick={() => setOpenEditModal(driver.index)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip
                content="Delete driver"
                color="error"
                onClick={() => setOpenDeleteModal(driver.index)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const handleAddDriver = () => {
    setOpenEditModal(driverData.drivers.length);
  };

  const handleEditDriver = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const driver = {
      name: data.get('name'),
      phone: data.get('phone'),
      gender: data.get('gender'),
      dateOfBirth: data.get('dateOfBirth'),
    };

    if (openEditModal === driverData.drivers.length) {
      baseApiRequest.post(`/driver`, driver).then((res) => {
        setDriverData({
          ...driverData,
          drivers: [
            ...driverData.drivers,
            { ...res.data.driver, index: driverData.drivers.length },
          ],
        });
        setOpenEditModal(null);
      });
    } else {
      const driverId = driverData.drivers[openEditModal].id;
      baseApiRequest.put(`/driver/${driverId}`, driver).then((res) => {
        const newDrivers = [...driverData.drivers];
        newDrivers[openEditModal] = { index: openEditModal, ...res.data };
        setDriverData({ ...driverData, drivers: newDrivers });
        setOpenEditModal(null);
      });
    }
  };

  const handleDeleteDriver = () => {
    const driverId = driverData.drivers[openDeleteModal].id;
    baseApiRequest.delete(`/driver/${driverId}`).then(() => {
      const newDrivers = [...driverData.drivers];
      newDrivers.splice(openDeleteModal, 1);
      setDriverData({ ...driverData, drivers: newDrivers });
      setOpenDeleteModal(null);
    });
  };

  return (
    <Container md css={{ mt: '$8' }}>
      <Text h3>Qu???n l?? t??i x???</Text>
      <Button auto onPress={handleAddDriver}>
        Th??m t??i x???
      </Button>
      {driverData.drivers.length ? (
        <Table css={{ height: 'auto', minWidth: '100%' }} selectionMode="none">
          <Table.Header columns={driverData.columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                hideHeader={column.uid === 'actions'}
                align={column.uid === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={driverData.drivers}>
            {(item) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      ) : loading ? (
        <Loading color="primary" size="lg" />
      ) : (
        <Text h4 css={{ mt: '$10' }}>
          Kh??ng c?? d??? li???u
        </Text>
      )}
      {openEditModal !== null && (
        <Modal
          as="form"
          open={openEditModal !== null}
          onClose={closeHandler}
          onSubmit={handleEditDriver}
        >
          <Modal.Header>
            <Text size={18}>S???a th??ng tin t??i x???</Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              label="H??? t??n"
              name="name"
              required
              initialValue={
                openEditModal < driverData.drivers.length
                  ? driverData.drivers[openEditModal].name
                  : ''
              }
            />
            <Input
              label="Ng??y sinh"
              name="dateOfBirth"
              initialValue={
                openEditModal < driverData.drivers.length
                  ? driverData.drivers[openEditModal].dateOfBirth
                  : ''
              }
              type="date"
            />
            <Input
              label="Gi???i t??nh"
              name="gender"
              initialValue={
                openEditModal < driverData.drivers.length
                  ? driverData.drivers[openEditModal].gender
                  : ''
              }
            />
            <Input
              label="S??? ??i???n tho???i"
              name="phone"
              required
              type="number"
              initialValue={
                openEditModal < driverData.drivers.length
                  ? driverData.drivers[openEditModal].phone
                  : ''
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              H???y
            </Button>
            <Button auto type="submit">
              L??u
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal open={openDeleteModal !== null} onClose={closeHandler}>
        <Modal.Header>
          <Text size={18}>X??c nh???n</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>B???n c?? ch???c ch???n x??a t??i x??? n??y?</Text>
          <Text>D??? li???u v??? c??c chuy???n xe t??i x??? n??y ???? ??i s??? b??? thay ?????i!</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onPress={closeHandler}>
            H???y
          </Button>
          <Button auto color="error" onPress={handleDeleteDriver}>
            X??a
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// IconButton component will be available as part of the core library soon
export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    opacity: '0.6',
  },
});
