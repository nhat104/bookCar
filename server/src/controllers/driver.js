import { Driver } from '../models/index.js';

export const getDrivers = async (req, res) => {
  const drivers = await Driver.findAll();

  res.status(200).json({
    message: 'success',
    status: 200,
    data: {
      columns: [
        { name: 'Họ tên', uid: 'name' },
        { name: 'Giới tính', uid: 'gender' },
        { name: 'Điện thoại', uid: 'phone' },
        { name: 'ACTIONS', uid: 'actions' },
      ],
      drivers: drivers.map((driver, idx) => ({
        index: idx,
        ...driver.toJSON(),
      })),
    },
  });
};

export const addDriver = async (req, res) => {
  const { name, gender, phone, dateOfBirth } = req.body;
  const driver = await Driver.create({
    name,
    gender,
    dateOfBirth,
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    phone,
    rate: 0,
    rateCount: 0,
  });
  res.status(201).json({
    message: 'success',
    status: 201,
    data: {
      driver: driver.toJSON(),
    },
  });
};

export const editDriver = async (req, res) => {
  const { id } = req.params;
  const { name, dateOfBirth, gender, phone } = req.body;
  const driver = await Driver.findByPk(id);
  if (!driver) {
    return res.status(404).json({
      message: 'Không tìm thấy tài xế',
      status: 404,
    });
  }
  await driver.update({
    name,
    dateOfBirth,
    gender,
    phone,
  });
  res.status(200).json({
    message: 'success',
    status: 200,
    data: driver.toJSON(),
  });
};

export const deleteDriver = async (req, res) => {
  const { id } = req.params;
  const driver = await Driver.findByPk(id);
  if (!driver) {
    return res.status(404).json({
      message: 'Không tìm thấy tài xế',
      status: 404,
    });
  }
  await driver.destroy();
  res.status(200).json({
    message: 'success',
    status: 200,
  });
};
