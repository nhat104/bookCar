import { col, fn, literal, Op } from 'sequelize';
import { Car, CarInPlace, CarType, Driver, Guess, Place, Ticket } from '../models/index.js';

// Xử lý logic đặt vé
export const buyTicket = async (req, res, next) => {
  const { carLineId, payment, time, userInfo } = req.body;
  const hourPart = time.hour.split('h');
  try {
    const guess = await Guess.create(userInfo);
    const carLine = await CarInPlace.findOne({ where: { id: carLineId } });
    const driver = await Driver.findOne({ order: literal('rand()') });
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

// Tạo data báo cáo theo ngày
export const reportByDate = async (req, res, next) => {
  // ngày, số vé bán được, doanh thu
  const { dateStart, dateEnd } = req.body;
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'id',
        'date',
        [fn('count', col('ticket.id')), 'count'],
        [fn('sum', col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      where: {
        date: {
          [Op.gte]: dateStart || '2000-01-01',
          [Op.lte]: dateEnd || '3000-01-01',
        },
      },
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
  const { dateStart, dateEnd } = req.body;
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        [fn('date_format', col('date'), '%Y-%m'), 'month'],
        [fn('count', col('ticket.id')), 'count'],
        [fn('sum', col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      where: {
        date: {
          [Op.gte]: dateStart || '2000-01-01',
          [Op.lte]: dateEnd || '3000-01-01',
        },
      },
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
  const { dateStart, dateEnd } = req.body;
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        [fn('date_format', col('date'), '%Y'), 'year'],
        [fn('count', col('ticket.id')), 'count'],
        [fn('sum', col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      where: {
        date: {
          [Op.gte]: dateStart || '2000-01-01',
          [Op.lte]: dateEnd || '3000-01-01',
        },
      },
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
  const { dateStart, dateEnd } = req.body;
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'driverId',
        [fn('count', col('ticket.id')), 'count'],
        [fn('sum', col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      where: {
        date: {
          [Op.gte]: dateStart || '2000-01-01',
          [Op.lte]: dateEnd || '3000-01-01',
        },
      },
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
        { model: Driver, attributes: ['name'] },
      ],
      group: ['driverId'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'driver', label: 'Tài xế' },
          { id: 'count', label: 'Số chuyến đã đi' },
          { id: 'sum_price', label: 'Tổng thu nhập (VND)' },
        ],
        rows: tickets.map((ticket, index) => ({
          stt: `${index + 1}`,
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
  const { dateStart, dateEnd } = req.body;
  try {
    const tickets = await Ticket.findAll({
      attributes: [
        'carsPlace.placeFromId',
        [fn('count', col('ticket.id')), 'count'],
        [fn('sum', col('carsPlace.car.carType.price')), 'sum_price'],
      ],
      where: {
        date: {
          [Op.gte]: dateStart || '2000-01-01',
          [Op.lte]: dateEnd || '3000-01-01',
        },
      },
      include: [
        {
          model: CarInPlace,
          attributes: ['placeFromId'],
          include: [
            {
              model: Car,
              attributes: ['id'],
              include: [{ model: CarType, attributes: ['price'] }],
            },
            {
              model: Place,
              attributes: ['name'],
              as: 'placeFrom',
            },
          ],
        },
      ],
      group: ['carsPlace.placeFromId'],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'place', label: 'Điểm đi' },
          { id: 'count', label: 'Số chuyến đi' },
          { id: 'sum_price', label: 'Tổng thu nhập (VND)' },
        ],
        rows: tickets.map((ticket, index) => ({
          stt: `${index + 1}`,
          place: ticket.toJSON().carsPlace.placeFrom.name,
          count: ticket.toJSON().count,
          sum_price: ticket.toJSON().sum_price,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const reportByDriverRate = async (req, res, next) => {
  try {
    const drivers = await Driver.findAll({
      attributes: ['id', 'name', 'rate'],
      order: [['rate', 'DESC']],
    });
    res.status(200).json({
      message: 'success',
      status: 200,
      data: {
        columns: [
          { id: 'stt', label: 'STT' },
          { id: 'driver', label: 'Tài xế' },
          { id: 'rate', label: 'Đánh giá' },
        ],
        rows: drivers.map((driver, index) => ({
          stt: `${index + 1}`,
          driver: driver.toJSON().name,
          rate: driver.toJSON().rate,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};
