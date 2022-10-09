import { Op, Sequelize } from 'sequelize';
import { Car, CarInPlace, CarType, Driver, Guess, Place, Ticket } from '../models/index.js';

export const buyTicket = async (req, res, next) => {
  const { carLineId, payment, time, userInfo } = req.body;
  const hourPart = time.hour.split('h');
  try {
    const guess = await Guess.create(userInfo);
    const carLine = await CarInPlace.findOne({ where: { id: carLineId } });
    const driver = await Driver.findOne({ order: Sequelize.literal('rand()') });
    const ticket = await Ticket.create({
      date: time.date,
      hour: `${hourPart[0]}:${hourPart[1]}:00`,
      payment,
      guessId: guess.toJSON().id,
      carsPlaceId: carLine.id,
      driverId: driver.id,
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        payment: ticket.payment,
        date: ticket.date,
        driver: driver.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByDate = async (req, res, next) => {
  // ngày, số vé bán được, doanh thu
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'id',
        'date',
        [Sequelize.fn('count', Sequelize.col('ticket.id')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      // where: true && { date: { [Op.gte]: '2022-10-10' } },
      include: [
        {
          model: CarInPlace,
          attributes: ['id'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
          ],
        },
      ],
      group: ['date'],
    });

    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'date', label: 'Ngày' },
          { id: 'count', label: 'Số vé bán được' },
          { id: 'sum_price', label: 'Doanh thu (VND)' },
        ],
        rows: tickets.map((ticket, index) => ({
          stt: `${index + 1}`,
          date: ticket.date,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByMonth = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        [Sequelize.fn('date_format', Sequelize.col('date'), '%Y-%m'), 'month'],
        [Sequelize.fn('count', Sequelize.col('ticket.id')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      // where: true && { date: { [Op.gte]: '2022-10-10' } },
      include: [
        {
          model: CarInPlace,
          attributes: ['id'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
          ],
        },
      ],
      group: ['month'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'month', label: 'Tháng' },
          { id: 'count', label: 'Số vé bán được' },
          { id: 'sum_price', label: 'Doanh thu (VND)' },
        ],
        rows: tickets.map((ticket, index) => ({
          stt: `${index + 1}`,
          month: ticket.toJSON().month,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByYear = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        [Sequelize.fn('date_format', Sequelize.col('date'), '%Y'), 'year'],
        [Sequelize.fn('count', Sequelize.col('ticket.id')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      // where: true && { date: { [Op.gte]: '2022-10-10' } },
      include: [
        {
          model: CarInPlace,
          attributes: ['id'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
          ],
        },
      ],
      group: ['year'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'year', label: 'Năm' },
          { id: 'count', label: 'Số vé bán được' },
          { id: 'sum_price', label: 'Doanh thu (VND)' },
        ],
        rows: tickets.map((ticket, index) => ({
          stt: `${index + 1}`,
          year: ticket.toJSON().year,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByDriver = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'driverId',
        [Sequelize.fn('count', Sequelize.col('ticket.id')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      // where: true && { date: { [Op.gte]: '2022-10-10' } },
      include: [
        {
          model: CarInPlace,
          attributes: ['id'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
          ],
        },
        {
          model: Driver,
          attributes: ['name'],
        },
      ],
      group: ['driverId'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: ['Tài xế', 'Số chuyến đã đi', 'Tổng thu nhập'],
        rows: tickets.map((ticket) => ({
          driver: ticket.toJSON().driver.name,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByPlace = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'placeId',
        [Sequelize.fn('count', Sequelize.col('ticket.id')), 'count'],
        [Sequelize.fn('sum', Sequelize.col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      // where: true && { date: { [Op.gte]: '2022-10-10' } },
      include: [
        {
          model: CarInPlace,
          attributes: ['id'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
          ],
        },
        {
          model: Place,
          attributes: ['name'],
        },
      ],
      group: ['placeId'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: ['Điểm đón', 'Số chuyến đã đi', 'Tổng thu nhập'],
        rows: tickets.map((ticket) => ({
          place: ticket.toJSON().place.name,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
